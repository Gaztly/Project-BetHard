﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Project_BetHard.Database;

namespace Project_BetHard.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220531095124_MatchesAdded")]
    partial class MatchesAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Project_BetHard.Models.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Flag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("Project_BetHard.Models.Bet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("BetAmount")
                        .HasColumnType("float");

                    b.Property<string>("BetTeam")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<int>("MatchId")
                        .HasColumnType("int");

                    b.Property<double>("OddsWhenBetsMade")
                        .HasColumnType("float");

                    b.Property<bool>("PaidOut")
                        .HasColumnType("bit");

                    b.Property<DateTime>("TimePlaced")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Bets");
                });

            modelBuilder.Entity("Project_BetHard.Models.Competition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Emblem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("Project_BetHard.Models.Match", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AreaId")
                        .HasColumnType("int");

                    b.Property<int?>("AwayTeamId")
                        .HasColumnType("int");

                    b.Property<int?>("CompetitionId")
                        .HasColumnType("int");

                    b.Property<int?>("HomeTeamId")
                        .HasColumnType("int");

                    b.Property<int?>("OddsId")
                        .HasColumnType("int");

                    b.Property<int?>("ScoreId")
                        .HasColumnType("int");

                    b.Property<int?>("SeasonId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UtcDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("AwayTeamId");

                    b.HasIndex("CompetitionId");

                    b.HasIndex("HomeTeamId");

                    b.HasIndex("OddsId");

                    b.HasIndex("ScoreId");

                    b.HasIndex("SeasonId");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("Project_BetHard.Models.Odds", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Cross")
                        .HasColumnType("float");

                    b.Property<double>("One")
                        .HasColumnType("float");

                    b.Property<double>("Two")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Odds");
                });

            modelBuilder.Entity("Project_BetHard.Models.Score", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Duration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FullTimeId")
                        .HasColumnType("int");

                    b.Property<int?>("HalfTimeId")
                        .HasColumnType("int");

                    b.Property<string>("Winner")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FullTimeId");

                    b.HasIndex("HalfTimeId");

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("Project_BetHard.Models.ScoreTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Away")
                        .HasColumnType("int");

                    b.Property<int?>("Home")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ScoreTimes");
                });

            modelBuilder.Entity("Project_BetHard.Models.Season", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("MatchRound")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Winner")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Seasons");
                });

            modelBuilder.Entity("Project_BetHard.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Crest")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tla")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Project_BetHard.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateJoined")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("GUID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("IV")
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("IVExpiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("WalletId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WalletId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Project_BetHard.Models.Wallet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Balance")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Wallets");
                });

            modelBuilder.Entity("Project_BetHard.Models.Bet", b =>
                {
                    b.HasOne("Project_BetHard.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Project_BetHard.Models.Match", b =>
                {
                    b.HasOne("Project_BetHard.Models.Area", "Area")
                        .WithMany()
                        .HasForeignKey("AreaId");

                    b.HasOne("Project_BetHard.Models.Team", "AwayTeam")
                        .WithMany()
                        .HasForeignKey("AwayTeamId");

                    b.HasOne("Project_BetHard.Models.Competition", "Competition")
                        .WithMany()
                        .HasForeignKey("CompetitionId");

                    b.HasOne("Project_BetHard.Models.Team", "HomeTeam")
                        .WithMany()
                        .HasForeignKey("HomeTeamId");

                    b.HasOne("Project_BetHard.Models.Odds", "Odds")
                        .WithMany()
                        .HasForeignKey("OddsId");

                    b.HasOne("Project_BetHard.Models.Score", "Score")
                        .WithMany()
                        .HasForeignKey("ScoreId");

                    b.HasOne("Project_BetHard.Models.Season", "Season")
                        .WithMany()
                        .HasForeignKey("SeasonId");

                    b.Navigation("Area");

                    b.Navigation("AwayTeam");

                    b.Navigation("Competition");

                    b.Navigation("HomeTeam");

                    b.Navigation("Odds");

                    b.Navigation("Score");

                    b.Navigation("Season");
                });

            modelBuilder.Entity("Project_BetHard.Models.Score", b =>
                {
                    b.HasOne("Project_BetHard.Models.ScoreTime", "FullTime")
                        .WithMany()
                        .HasForeignKey("FullTimeId");

                    b.HasOne("Project_BetHard.Models.ScoreTime", "HalfTime")
                        .WithMany()
                        .HasForeignKey("HalfTimeId");

                    b.Navigation("FullTime");

                    b.Navigation("HalfTime");
                });

            modelBuilder.Entity("Project_BetHard.Models.User", b =>
                {
                    b.HasOne("Project_BetHard.Models.Wallet", "Wallet")
                        .WithMany()
                        .HasForeignKey("WalletId");

                    b.Navigation("Wallet");
                });
#pragma warning restore 612, 618
        }
    }
}
