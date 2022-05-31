using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_BetHard.Migrations
{
    public partial class MatchesAdded2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Matches",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                ;
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Matches",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                ;
        }
    }
}
