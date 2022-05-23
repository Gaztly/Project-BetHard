using System;
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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        //POST: api/user/RegisterUser
        [Route("RegisterUser")]
        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User user)
        {
            if (!ModelState.IsValid || user == null) return BadRequest("Invalid fields");

            if (await _context.Users.AnyAsync(x => x.Username == user.Username)) return Conflict("Username taken.");

            if (await _context.Users.AnyAsync(x => x.Email == user.Email)) return Conflict("Email already in use.");

            var wallet = await _context.Wallets.AddAsync(new Wallet());
            user.Wallet = wallet.Entity;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            user.Password = "";

            return Ok(user);
        }

        //POST: api/user/Login
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<User>> RegisteredUser([FromBody] LoginInput input)
        {
            if (!ModelState.IsValid || input == null) return BadRequest("Invalid input");       //Kolla giltig input

            var user = await _context.Users.Include(u => u.Wallet).FirstAsync(x => x.Username == input.Username || x.Email == input.Username);     //Hitta användarnamn/email, hämta användare + wallet

            if (user == null) return BadRequest("Cannot find username or email.");          //Returnera BadRequest om ogiltigt

            if (user.Password != input.Password) return BadRequest("Incorrect password");   //Returnera BadRequest om fel lösen

            user.Password = "";
            return Ok(user);
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            user.Password = "";
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.Id }, user);
        //}

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}