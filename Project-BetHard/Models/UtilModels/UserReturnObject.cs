using Project_BetHard.Util;
using System;
using System.Text;

namespace Project_BetHard.Models.UtilModels
{
    public class UserReturnObject
    {
        public string Username { get; set; }
        public Wallet Wallet { get; set; }
        public byte[] Token { get; set; }
        public DateTime Expiration { get; set; } = Util.Expiration.GetIVExpiration();

        public UserReturnObject(User user)
        {
            Username = user.Username;
            Wallet = user.Wallet;
            Token = Util.Token.GetToken(user);
        }

        public UserReturnObject(User user, DateTime expiration)
        {
            Username = user.Username;
            Wallet = user.Wallet;
            Token = Util.Token.GetToken(user);
            Expiration = expiration;
        }

        public UserReturnObject()
        {
        }
    }
}