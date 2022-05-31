using Microsoft.EntityFrameworkCore;
using Project_BetHard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Project_BetHard.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Bet> Bets { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Wallet> Wallets { get; set; }

        public DbSet<Models.Match> Matches { get; set; }

        public DbSet<Area> Areas { get; set; }

        public DbSet<Competition> Competitions { get; set; }

        public DbSet<Odds> Odds { get; set; }

        public DbSet<Score> Scores { get; set; }

        public DbSet<ScoreTime> ScoreTimes { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Season> Seasons { get; set; }

        public DbSet<UpdateHistory> UpdateHistories { get; set; }







    }
}