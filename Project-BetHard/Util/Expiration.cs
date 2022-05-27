using System;

namespace Project_BetHard.Util
{
    public class Expiration
    {
        public static DateTime GetIVExpiration()
        {
            return DateTime.UtcNow.AddMinutes(30);              //Change this when done testing
        }
    }
}