using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class Wallet
    {
        public int Id { get; set;}
        public int Balance { get; set; }
        public User User { get; set; }
    }
}
