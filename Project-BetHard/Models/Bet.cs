using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public DateTime TimePlaced { get; set; } = DateTime.Now;
        public bool PaidOut { get; set; } = false;

        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public double BetAmount { get; set; }

        [Required]
        public int MatchId { get; set; }
    }
}