﻿using System;
using System.Collections.Generic;
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

        // POST: api/Bet/5
        [HttpPost("{id}")]
        public async Task<ActionResult<Bet>> GetBetsForUser([FromBody] int id)
        {
            var bets = await _context.Bets.ToListAsync();
            bets = bets.FindAll(x => x.User.Id == id);              //Detta måste gå att skriva på en rad, men kommer inte på hur just nu

            if (bets == null)
            {
                return NotFound();
            }

            return Ok(bets);
        }

        // POST: api/Bet
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bet>> PostBet(Bet bet)
        {
            _context.Bets.Add(bet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBet", new { id = bet.Id }, bet);
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