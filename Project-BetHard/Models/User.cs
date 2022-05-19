using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public string Password { get; set; }
        public Wallet Wallet { get; set; }
        public List <Bet> Bets { get; set; }
    }
}
