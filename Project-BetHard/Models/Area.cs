using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models
{
    public class Area
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Flag { get; set; }


    }
}