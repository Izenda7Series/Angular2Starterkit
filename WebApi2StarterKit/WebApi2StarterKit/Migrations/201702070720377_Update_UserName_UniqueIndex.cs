namespace WebApi2StarterKit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_UserName_UniqueIndex : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants");
            DropIndex("dbo.AspNetUsers", new[] { "TenantId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            AlterColumn("dbo.AspNetUsers", "TenantId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", new[] { "UserName", "TenantId" }, unique: true, name: "UserNameIndex");
            AddForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants");
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            AlterColumn("dbo.AspNetUsers", "TenantId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "UserName", unique: true, name: "UserNameIndex");
            CreateIndex("dbo.AspNetUsers", "TenantId");
            AddForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants", "Id");
        }
    }
}
