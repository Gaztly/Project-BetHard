namespace Project_BetHard.Models.Matches
{
    public class ScoreTime
    {
        public int Id { get; set; }
        public int MatchId { get; set; }

        public int? Home { get; set; }

        public int? Away { get; set; }
    }
}