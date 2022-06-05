using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BetHard.Database;
using Project_BetHard.Models;
using Project_BetHard.Models.UtilModels;

namespace Project_BetHard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WalletController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/wallet/getupdatedwallet
        [HttpPost]
        public async Task<IActionResult> GetUpdatedWallet([FromBody] UserReturnObject input)
        {
            if (input == null) return BadRequest("No input.");

            if (!ModelState.IsValid) return BadRequest("Invalid input.");

            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == input.Wallet.Id);      //hämta wallet för användare

            if (wallet == null) return NotFound("Wallet not found.");

            input.Wallet = wallet;      //Assigna uppdaterade wallet till input-objektet
            return Ok(input);       //returnerar objektet igen (nu med uppdaterad wallet)
        }
    }
}