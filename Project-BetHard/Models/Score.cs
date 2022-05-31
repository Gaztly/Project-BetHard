namespace Project_BetHard.Models
{
    public class Score
    {
        public int Id { get; set; }

        public string? Winner { get; set; }

        public string? Duration { get; set; }

        public ScoreTime FullTime { get; set; }

        public ScoreTime HalfTime { get; set; }



    }
}