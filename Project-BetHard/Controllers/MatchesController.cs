using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project_BetHard.Database;
using Project_BetHard.Models;
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
            var update = await _context.UpdateHistories.LastOrDefaultAsync();
            if (update == null || update.LastUpdate < DateTime.UtcNow.AddMinutes(10))
            {
                 matches = await Util.ApiCalls.GetBrazilMatches(); //skapar en lista av getbrazilmatches()
                foreach (var item in matches)
                {
                    _context.ChangeTracker.Clear();
                    _context.Attach(item);
                    _context.Matches.Update(item);
                    await _context.SaveChangesAsync();
                }
                
            }
            else
            {
                matches = await _context.Matches.ToListAsync();
            }

  
            return Ok(matches);

        
        }

      


        //// GET: api/Matches
        //[HttpGet]
        //public async Task<IActionResult> GetMatch() //  IactionResult Returnar Ok()
        //{

        //    List<Match> matches = await Util.ApiCalls.GetBrazilMatches(); //skapar en lista av getbrazilmatches()

        //    foreach (var item in matches)
        //    {
        //        _context.ChangeTracker.Clear();
        //        _context.Attach(item);
        //        await _context.Matches.AddAsync(item);
        //        await _context.SaveChangesAsync();
        //    }

        //    return Ok(matches);

        //    //Skapa en update på alla matcher som ändrats.
        //}
    }
}