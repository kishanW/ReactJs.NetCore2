using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ReactJs.Net.web.Migrations
{
    public partial class addingnavigationalproperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTaskEntity_TaskUserEntity_TaskUserEntityId",
                table: "UserTaskEntity");

            migrationBuilder.DropIndex(
                name: "IX_UserTaskEntity_TaskUserEntityId",
                table: "UserTaskEntity");

            migrationBuilder.DropColumn(
                name: "TaskUserEntityId",
                table: "UserTaskEntity");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskUserId",
                table: "UserTaskEntity",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskId",
                table: "UserTaskEntity",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_UserTaskEntity_TaskId",
                table: "UserTaskEntity",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTaskEntity_TaskUserId",
                table: "UserTaskEntity",
                column: "TaskUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTaskEntity_TaskEntity_TaskId",
                table: "UserTaskEntity",
                column: "TaskId",
                principalTable: "TaskEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTaskEntity_TaskUserEntity_TaskUserId",
                table: "UserTaskEntity",
                column: "TaskUserId",
                principalTable: "TaskUserEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTaskEntity_TaskEntity_TaskId",
                table: "UserTaskEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTaskEntity_TaskUserEntity_TaskUserId",
                table: "UserTaskEntity");

            migrationBuilder.DropIndex(
                name: "IX_UserTaskEntity_TaskId",
                table: "UserTaskEntity");

            migrationBuilder.DropIndex(
                name: "IX_UserTaskEntity_TaskUserId",
                table: "UserTaskEntity");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskUserId",
                table: "UserTaskEntity",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskId",
                table: "UserTaskEntity",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TaskUserEntityId",
                table: "UserTaskEntity",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTaskEntity_TaskUserEntityId",
                table: "UserTaskEntity",
                column: "TaskUserEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTaskEntity_TaskUserEntity_TaskUserEntityId",
                table: "UserTaskEntity",
                column: "TaskUserEntityId",
                principalTable: "TaskUserEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
