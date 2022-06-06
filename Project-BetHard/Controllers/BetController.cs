using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BetHard.Database;
using Project_BetHard.Models;
using Project_BetHard.Models.Matches;
using Project_BetHard.Models.UtilModels;

namespace Project_BetHard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BetController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bet>>> GetBets()
        {
            return await _context.Bets.ToListAsync();
        }

        // POST: api/Bet/getbetsforuser
        [Route("getbetsforuser")]
        [HttpPost]
        public async Task<IActionResult> GetBetsForUser([FromBody] UserReturnObject input)
        {
            //BetMatchIds.
            var user = await _context.Users.Include(u => u.Wallet).FirstOrDefaultAsync(u => u.Username == input.Username);  //Get user from username

            if (user == null) return NotFound("Invalid user.");                     //Check if null

            if (!Util.Token.ValidateToken(input.Token, user)) return Unauthorized("Invalid credentials");   //Check if token is valid

            var bets = await _context.Bets.Include(b => b.User).ToListAsync();           //Get all bets
            bets = bets.FindAll(x => x.User.Id == user.Id);         //sort bets by user id

            bets = await UpdateBets(bets, user);

            if (bets == null) return NotFound();                // no bets found

            bets.ForEach(b => b.User = null);

            return Ok(bets);
        }

        //UTIL method for updating bets for a user
        private async Task<List<Bet>> UpdateBets(List<Bet> bets, User user)
        {
            foreach (Bet b in bets)
            {
                if (b.PaidOut == true) continue;        //if bet is already paid out, then skip this iteration

                var match = await _context.Matches.Include(m => m.Score).FirstOrDefaultAsync(m => m.Id == b.MatchId);      //get match to check result
                if (match == null) continue;

                if (match.Status == null) continue;

                //Get resultchar for comparison
                char result = match.Score.Winner == "HOME_TEAM" ? '1' : match.Score.Winner == "DRAW" ? 'X' : '2';

                //check if bet is won
                if (b.BetTeam == result)
                {
                    await PayOut(b, user);
                    b.BetWon = true;
                }
                else
                {
                    b.BetWon = false;
                }
                b.PaidOut = true;

                _context.Bets.Update(b);
                await _context.SaveChangesAsync();
            }

            return bets;
        }

        //Pays out the money to the users wallet and updates the wallet
        private async Task PayOut(Bet bet, User user)
        {
            user.Wallet.Balance += bet.BetAmount * bet.OddsWhenBetsMade;
            _context.Wallets.Update(user.Wallet);
            await _context.SaveChangesAsync();
        }

        // POST: api/Bet
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bet>> PostBet([FromBody] BetInput input)
        {
            if (!ModelState.IsValid || input == null) return BadRequest("Invalid fields");

            var user = await _context.Users.Include(u => u.Wallet).FirstAsync(x => x.Username == input.userReturn.Username);   //User sparas i user, där användarei DB stämmer överrens med input-användaren.

            if (user == null) return NotFound("Invalid user");

            if (!Util.Token.ValidateToken(input.userReturn.Token, user)) return Unauthorized("Invalid credentials");

            if (await _context.Bets.Include(b => b.User).AnyAsync(x => (x.MatchId == input.Bet.MatchId && x.User.Id == user.Id))) return Conflict("You have already made a bet on this match.");

            var bet = input.Bet;             // tar bet från input och gör till ett bet. matchID och betamount sparas

            bet.User = user;                //user sparas ner i bet.user. Bet är nu ett fullständigt ifyllt objekt.

            var wallet = user.Wallet;
            if (wallet.Balance < input.Bet.BetAmount) return BadRequest("Insufficent funds");
            wallet.Balance -= input.Bet.BetAmount;

            await _context.Bets.AddAsync(bet);
            _context.Wallets.Update(wallet);
            await _context.SaveChangesAsync();

            bet.User.Password = "";
            return Ok(bet);
        }

        // POST: api/Bet/deletebet
        [Route("deletebet")]
        [HttpPost]
        public async Task<IActionResult> DeleteBet([FromBody] BetInput input)
        {
            var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == input.Bet.MatchId);     //Hämtar matchen

            if (match == null) return NotFound("Match not found.");         //kollar så matchen finns

            if (match.UtcDate < DateTime.UtcNow) return BadRequest("Match has already started. Cannot remove bet.");

            var user = await _context.Users.Include(u => u.Wallet).FirstAsync(x => x.Username == input.userReturn.Username);   //User sparas i user, där användarei DB stämmer överrens med input-användaren.

            if (user == null) return NotFound("Invalid user");

            var bet = await _context.Bets.FindAsync(input.Bet.Id);          //kolla så betet finns
            if (bet == null)
            {
                return NotFound("Bet could not be found.");
            }

            user.Wallet.Balance += bet.BetAmount;       //Användaren får tillbaka sina pengar
            _context.Wallets.Update(user.Wallet);

            _context.Bets.Remove(bet);          //Ta bort från databasen
            await _context.SaveChangesAsync();

            return Ok("Bet removed.");
        }
    }
}