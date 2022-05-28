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
        public async Task<ActionResult<Bet>> GetBetsForUser([FromBody] UserReturnObject input)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == input.Username);  //Get user from username

            if (user == null) return NotFound("Invalid user.");                     //Check if null
            Debug.WriteLine("user: ", user.Username);
            if (!Util.Token.ValidateToken(input.Token, user)) return Unauthorized("Invalid credentials");   //Check if token is valid

            var bets = await _context.Bets.Include(b => b.User).ToListAsync();           //Get all bets
            bets = bets.FindAll(x => x.User.Id == user.Id);         //sort bets by user id

            if (bets == null) return NotFound();                // no bets found

            bets.ForEach(b => b.User = null);

            return Ok(bets);
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

        // PUT: api/Bet/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBet(int id, Bet bet)
        {
            if (id != bet.Id)
            {
                return BadRequest();
            }

            _context.Entry(bet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Bet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBet(int id)
        {
            var bet = await _context.Bets.FindAsync(id);
            if (bet == null)
            {
                return NotFound();
            }

            _context.Bets.Remove(bet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BetExists(int id)
        {
            return _context.Bets.Any(e => e.Id == id);
        }
    }
}