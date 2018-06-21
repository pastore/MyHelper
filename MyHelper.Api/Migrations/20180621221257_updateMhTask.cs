using Microsoft.EntityFrameworkCore.Migrations;

namespace MyHelper.Api.Migrations
{
    public partial class updateMhTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MhTasks_Tags_TagId",
                table: "MhTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Tags_TagId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_TagId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_MhTasks_TagId",
                table: "MhTasks");

            migrationBuilder.DropColumn(
                name: "TagId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "ScheduleMhTaskId",
                table: "MhTasks");

            migrationBuilder.DropColumn(
                name: "TagId",
                table: "MhTasks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TagId",
                table: "Notes",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ScheduleMhTaskId",
                table: "MhTasks",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TagId",
                table: "MhTasks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notes_TagId",
                table: "Notes",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_MhTasks_TagId",
                table: "MhTasks",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_MhTasks_Tags_TagId",
                table: "MhTasks",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Tags_TagId",
                table: "Notes",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
