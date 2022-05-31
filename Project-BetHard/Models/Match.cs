using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class Match
    {
        public Area Area { get; set; }

        public Competition Competition { get; set; }

        public Season Season { get; set; }

        public int Id { get; set; }

        public DateTime? UtcDate { get; set; }
        public string?  Status    { get; set; } 

        public Team HomeTeam { get; set; }

        public Team AwayTeam { get; set; }

        public Score Score { get; set; }

        public Odds Odds { get; set; }



    }
}
