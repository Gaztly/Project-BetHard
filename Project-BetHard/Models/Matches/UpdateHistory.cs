using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models.Matches
{
    public class UpdateHistory
    {
        public int Id { get; set; }

        public DateTime LastUpdate { get; set; } = DateTime.UtcNow;


    }
}
