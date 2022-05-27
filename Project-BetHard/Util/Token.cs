using Project_BetHard.Models;
using System;

namespace Project_BetHard.Util
{
    public class Token
    {
        //Validate if a token is valid
        public static bool ValidateToken(byte[] token, User user)
        {
            if (user.IVExpiration < DateTime.UtcNow) return false;

            byte[] key = Encryption.GetKey(user.Password);

            return user.GUID.ToString("N") == Encryption.Decrypt(token, key, user.IV);
        }

        //Get a new token
        public static byte[] GetToken(User user)
        {
            return Encryption.Encrypt(user.GUID.ToString("N"), Encryption.GetKey(user.Password), user.IV);
        }
    }
}