using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class Match
    {
        [ForeignKey("AreaId")]
        public Area Area { get; set; }

        [ForeignKey("CompetitionId")]
        public Competition Competition { get; set; }

        [ForeignKey("SeasonId")]
        public Season Season { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public DateTime? UtcDate { get; set; }
        public string?  Status    { get; set; }

        [ForeignKey("HomeTeamId")]
        public Team HomeTeam { get; set; }

        [ForeignKey("AwayTeamId")]
        public Team AwayTeam { get; set; }
       
        public Score Score { get; set; }

        public Odds Odds { get; set; }



    }
}
