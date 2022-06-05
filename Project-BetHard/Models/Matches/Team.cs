using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models.Matches
{
    public class Team
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Tla { get; set; }

        public string Crest { get; set; }
    }
}