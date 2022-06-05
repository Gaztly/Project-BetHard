using System.ComponentModel.DataAnnotations;

namespace Project_BetHard.Models.UtilModels
{
    public class LoginInput
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}