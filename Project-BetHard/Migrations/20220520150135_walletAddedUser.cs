using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_BetHard.Migrations
{
    public partial class walletAddedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_WalletId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WalletId",
                table: "Users",
                column: "WalletId",
                unique: true,
                filter: "[WalletId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_WalletId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WalletId",
                table: "Users",
                column: "WalletId");
        }
    }
}
