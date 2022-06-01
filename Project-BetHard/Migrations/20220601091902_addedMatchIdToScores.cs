using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_BetHard.Migrations
{
    public partial class addedMatchIdToScores : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Odds_OddsId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_OddsId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "OddsId",
                table: "Matches");

            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "ScoreTimes",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "Scores",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "Odds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Odds_MatchId",
                table: "Odds",
                column: "MatchId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Odds_Matches_MatchId",
                table: "Odds",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Odds_Matches_MatchId",
                table: "Odds");

            migrationBuilder.DropIndex(
                name: "IX_Odds_MatchId",
                table: "Odds");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "ScoreTimes");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "Scores");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "Odds");

            migrationBuilder.AddColumn<int>(
                name: "OddsId",
                table: "Matches",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_OddsId",
                table: "Matches",
                column: "OddsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Odds_OddsId",
                table: "Matches",
                column: "OddsId",
                principalTable: "Odds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}