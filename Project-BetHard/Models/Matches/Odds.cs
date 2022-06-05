using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models.Matches
{
    public class Odds

    {
        public int Id { get; set; }

        public int MatchId { get; set; }

        public double One { get; set; }

        [Column("X")]
        public double Cross { get; set; }

        public double Two { get; set; }
    }
}