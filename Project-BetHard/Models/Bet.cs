using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public DateTime TimePlaced { get; set; } = DateTime.Now;
        public bool PaidOut { get; set; } = false;
        public User User { get; set; }
        public double BetAmount { get; set; }
        public int MatchId { get; set; }
    }
}
