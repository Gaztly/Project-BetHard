using Project_BetHard.Models;
using System;
using System.Diagnostics;
using System.Text;

namespace Project_BetHard.Util
{
    public class Token
    {
        //Get a new token
        public static byte[] GetToken(User user)
        {
            byte[] key = Encryption.GetKey(user.Password);
            var guidByte = Encryption.Encrypt(user.GUID.ToString("N"), key, user.IV);
            return guidByte;
        }

        //Validate if a token is valid
        public static bool ValidateToken(byte[] token, User user)
        {
            if (user.IVExpiration < DateTime.UtcNow) return false;

            byte[] key = Encryption.GetKey(user.Password);
            return user.GUID.ToString("N") == Encryption.Decrypt(token, key, user.IV);
        }
    }
}