﻿using Project_BetHard.Models.Matches;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project_BetHard.Models.UtilModels
{
    public class BetInput
    {
        [Required]
        public Bet Bet { get; set; }

        [Required]
        public UserReturnObject userReturn { get; set; }
    }
}