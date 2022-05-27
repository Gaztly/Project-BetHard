using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        public DateTime DateJoined { get; set; } = DateTime.Now;

        [ForeignKey("WalletId")]
        public Wallet Wallet { get; set; }

        public Guid GUID { get; set; } = Guid.NewGuid();
        public byte[] IV { get; set; } = new byte[] { 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00 };
        public DateTime IVExpiration { get; set; } = DateTime.UtcNow;        //For when adding through sql scripts
    }
}