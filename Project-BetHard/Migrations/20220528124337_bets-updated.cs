using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_BetHard.Migrations
{
    public partial class betsupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BetTeam",
                table: "Bets",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "OddsWhenBetsMade",
                table: "Bets",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BetTeam",
                table: "Bets");

            migrationBuilder.DropColumn(
                name: "OddsWhenBetsMade",
                table: "Bets");
        }
    }
}
