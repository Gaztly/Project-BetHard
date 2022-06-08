using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models.Matches
{
    public class Odds

    {
        public int Id { get; set; }

        public int MatchId { get; set; }

        public double One { get; set; }
        public double X { get; set; }

        public double Two { get; set; }
    }
}