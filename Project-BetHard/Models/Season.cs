using Newtonsoft.Json;
using System;

namespace Project_BetHard.Models
{
    public class Season
    {
        public int Id   { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }


        [JsonProperty("currentMatchday")]
        public string? MatchRound { get; set; }

        public string? Winner { get; set; }



    }
}