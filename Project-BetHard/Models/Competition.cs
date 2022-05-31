using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models
{
    public class Competition
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Emblem { get; set; }

    }
}