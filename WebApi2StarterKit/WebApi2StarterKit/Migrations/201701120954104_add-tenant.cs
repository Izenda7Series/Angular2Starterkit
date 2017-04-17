namespace WebApi2StarterKit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addtenant : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tenants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "TenantId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "TenantId");
            AddForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "TenantId", "dbo.Tenants");
            DropIndex("dbo.AspNetUsers", new[] { "TenantId" });
            DropColumn("dbo.AspNetUsers", "TenantId");
            DropTable("dbo.Tenants");
        }
    }
}
