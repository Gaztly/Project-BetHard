using System;

namespace Project_BetHard.Util
{
    public class Expiration
    {
        public static DateTime GetIVExpiration()
        {
            return DateTime.UtcNow.AddHours(12);              //Change this when done testing
        }
    }
}