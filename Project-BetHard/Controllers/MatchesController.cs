using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project_BetHard.Database;
using Project_BetHard.Models;
using Project_BetHard.Models.Matches;
using Project_BetHard.Models.UtilModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Matches
        [Route("getallmatches")]
        [HttpGet]
        public async Task<IActionResult> GetAllMatches() //  IactionResult Returnar Ok()
        {
            List<Match> matches;
            if (await CheckIfUpdate())
            {
                matches = await GetMatchesWithIDs();
                foreach (var match in matches)
                {
                    await UpdateMatch(match);
                }
                await _context.UpdateHistories.AddAsync(new UpdateHistory());
                await _context.SaveChangesAsync();
            }
            else
            {
                matches = await _context.Matches
                    .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .ToListAsync();
            }
            return Ok(matches);
        }

        [Route("getrelevantmatches")]
        [HttpGet]
        public async Task<IActionResult> GetRelevantMatches() //  IactionResult Returnar Ok()
        {
            List<Match> matches;

            if (await CheckIfUpdate())
            {
                matches = await GetMatchesWithIDs();
                for (int i = 0; i < matches.Count; i++)
                {
                    if (matches[i].UtcDate > DateTime.UtcNow.AddDays(14) || matches[i].UtcDate < DateTime.UtcNow.AddDays(-14))
                    {
                        matches.RemoveAt(i);
                        continue;
                    }

                    await UpdateMatch(matches[i]);
                }
                await _context.UpdateHistories.AddAsync(new UpdateHistory());
                await _context.SaveChangesAsync();
            }
            else
            {
                matches = await _context.Matches
                    .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .Where(m => m.UtcDate > DateTime.UtcNow.AddDays(-14) && m.UtcDate < DateTime.UtcNow.AddDays(14))
                    .ToListAsync();
            }
            return Ok(matches);
        }

        //Hämtar en match utifrån dess id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatchById(int id)
        {

            //Hämta betmatchIDs från front end.


            var match = await _context.Matches
                    .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null) return NotFound();

            return Ok(match);
        }

        [Route("matchhistory")]
        [HttpGet]
        public async Task<IActionResult> GetMatchHistory()
        {
            List<Match> matches;
            if (await CheckIfUpdate())
            {
                matches = await GetMatchesWithIDs();
                for (int i = 0; i < matches.Count; i++)
                {
                    if (matches[i].UtcDate > DateTime.UtcNow)                       //Tar bort matcher som INTE har spelats
                    {
                        matches.RemoveAt(i);
                        continue;
                    }

                    await UpdateMatch(matches[i]);
                }
                //await _context.UpdateHistories.AddAsync(new UpdateHistory());        //Skriver inte till updatehistory då den bara uppdaterat gångna matcher
                //await _context.SaveChangesAsync();
            }
            else
            {
                matches = await _context.Matches
                    .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .Where(m => m.UtcDate < DateTime.UtcNow)
                    .ToListAsync();
            }
            return Ok(matches);
        }

        [Route("AllComingMatches")]
        [HttpGet]
        public async Task<IActionResult> GetAllComingMatches()
        {
            List<Match> matches;
            if (await CheckIfUpdate())            //Om servern inte uppdaterats inom de senaste 10 minuterna så kör den uppdateringen
            {
                matches = await GetMatchesWithIDs();
                for (int i = 0; i < matches.Count; i++)
                {
                    if (matches[i].Status.ToUpper() == "FINISHED") continue;          //Uppdaterar inte matcher vars resultat redan är färdigrapporterat
                    if (matches[i].UtcDate > DateTime.UtcNow)                       //Tar bort matcher som är i framtiden
                    {
                        matches.RemoveAt(i);
                        continue;
                    }

                    await UpdateMatch(matches[i]);
                }
                //await _context.UpdateHistories.AddAsync(new UpdateHistory());        //Skriver inte till updatehistory då den bara uppdaterat gångna matcher
                //await _context.SaveChangesAsync();
            }
            else
            {
                matches = await _context.Matches
                    .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .Where(m => m.UtcDate < DateTime.UtcNow)
                    .ToListAsync();
            }
            return Ok(matches);
        }

        [Route("getmatchesbyids")]
        [HttpPost]
        public async Task<IActionResult> GetMatchesByIDs([FromBody] BetMatchIds input)
        {
            if (input.MatchIds == null) return BadRequest("No array found");
            if (input.MatchIds.Length == 0) return BadRequest("No IDs in array.");

            var matches = await _context.Matches
                                     .Include(m => m.Area)
                    .Include(m => m.Season)
                    .Include(m => m.Competition)
                    .Include(m => m.HomeTeam)
                    .Include(m => m.AwayTeam)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.HalfTime)
                    .Include(m => m.Score)
                    .ThenInclude(s => s.FullTime)
                    .Include(m => m.Odds)
                    .ToListAsync();

            return Ok(matches.Where(m => input.MatchIds.Contains(m.Id)).ToList());
        }

        /// <summary>
        ///                  UTIL METHODS
        /// </summary>

        //Get all matches, with IDs assigned to the odds, scores, halftimes and fulltimes objects
        private async Task<List<Match>> GetMatchesWithIDs()
        {
            var odds = await _context.Odds.ToListAsync();
            var score = await _context.Scores.Include(x => x.FullTime).Include(x => x.HalfTime).ToListAsync();
            List<Match> matches = await Util.ApiCalls.GetBrazilMatches(); //skapar en lista av getbrazilmatches()

            foreach (Match match in matches)
            {
                //Add IDs and MatchId(foreign key) to Odds, Score, HalfTime, and FullTime
                match.Odds.MatchId = match.Id;
                match.Odds.Id = odds.First(x => x.MatchId == match.Id).Id;

                match.Score.MatchId = match.Id;
                match.Score.Id = score.First(x => x.MatchId == match.Id).Id;

                match.Score.HalfTime.MatchId = match.Id;
                match.Score.HalfTime.Id = score.First(x => x.MatchId == match.Id).HalfTime.Id;

                match.Score.FullTime.MatchId = match.Id;
                match.Score.FullTime.Id = score.First(x => x.MatchId == match.Id).FullTime.Id;

                //Add random odds WIP
                double maxOdds = 6;
                double minOdds = 1.15;
                Random rand = new Random();
                match.Odds.One = Math.Round(rand.NextDouble() * (maxOdds - minOdds) + minOdds, 2);
                match.Odds.Cross = Math.Round(rand.NextDouble() * (maxOdds - minOdds) + minOdds, 2);
                match.Odds.Two = Math.Round(rand.NextDouble() * (maxOdds - minOdds) + minOdds, 2);
            }
            return matches;
        }

        //Update all matches sent in and their related entities
        private async Task UpdateMatch(Match match)
        {
            _context.ChangeTracker.Clear();
            _context.Attach(match);
            _context.Matches.Update(match);
            _context.Scores.Update(match.Score);
            _context.ScoreTimes.UpdateRange(new ScoreTime[] { match.Score.HalfTime, match.Score.FullTime });
            _context.Odds.Update(match.Odds);
            await _context.SaveChangesAsync();
        }

        //Check if an update is needed
        private async Task<bool> CheckIfUpdate()
        {
            var lastUpdate = await _context.UpdateHistories.OrderBy(x => x.Id).LastOrDefaultAsync();        //Fetch latest update from database
            return lastUpdate == null || lastUpdate.LastUpdate < DateTime.UtcNow.AddMinutes(-10);           //Check if last update is more than 10 minutes ago
        }

        //// GET: api/Matches
        //[Route("Filldb")]
        //[HttpGet]
        //public async Task<IActionResult> GetMatch() //  IactionResult Returnar Ok()
        //{
        //    List<Match> matches = await Util.ApiCalls.GetBrazilMatches(); //skapar en lista av getbrazilmatches()

        //    foreach (var match in matches)
        //    {
        //        match.Odds.MatchId = match.Id;
        //        match.Score.MatchId = match.Id;
        //        match.Score.HalfTime.MatchId = match.Id;
        //        match.Score.FullTime.MatchId = match.Id;

        //        _context.ChangeTracker.Clear();
        //        _context.Attach(match);

        //        await _context.Matches.AddAsync(match);
        //        await _context.SaveChangesAsync();
        //    }

        //    return Ok(matches);
        //}
    }
}