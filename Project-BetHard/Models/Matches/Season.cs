using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BetHard.Models.Matches
{
    public class Season
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }


        [JsonProperty("currentMatchday")]
        public string MatchRound { get; set; }

        public string Winner { get; set; }



    }
}