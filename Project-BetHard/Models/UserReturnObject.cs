using Project_BetHard.Util;
using System;
using System.Text;

namespace Project_BetHard.Models
{
    public class UserReturnObject
    {
        public string Username { get; set; }
        public Wallet Wallet { get; set; }
        public byte[] Token { get; set; }
        public DateTime Expiration { get; set; } = Util.Expiration.GetIVExpiration();

        public UserReturnObject(User user)
        {
            this.Username = user.Username;
            this.Wallet = user.Wallet;
            this.Token = Util.Token.GetToken(user);
        }

        public UserReturnObject(User user, DateTime expiration)
        {
            this.Username = user.Username;
            this.Wallet = user.Wallet;
            this.Token = Util.Token.GetToken(user);
            this.Expiration = expiration;
        }
    }
}