using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.Validation;
using System.Data.Entity.Infrastructure;
using System.Collections.Generic;
using System.Linq;

namespace WebApi2StarterKit.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public int? TenantId { get; set; }
        [ForeignKey("TenantId")]
        public Tenant Tenant { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            if (Tenant != null)
            {
                userIdentity.AddClaims(new[] {
                    new Claim("tenant",Tenant.Name),
                    new Claim("tenantId",Tenant.Id.ToString()),
                });
            }

            return userIdentity;
        }
    }

    public class Tenant
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public virtual IDbSet<Tenant> Tenants { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var user = modelBuilder.Entity<ApplicationUser>();

            user.Property(u => u.UserName)
               .IsRequired()
               .HasMaxLength(256)
               .HasColumnAnnotation("Index", new IndexAnnotation(
                   new IndexAttribute("UserNameIndex") { IsUnique = true, Order = 1 }));

            user.Property(u => u.TenantId)
                //.IsRequired()
                .HasColumnAnnotation("Index", new IndexAnnotation(
                    new IndexAttribute("UserNameIndex") { IsUnique = true, Order = 2 }));
        }

        /// <summary>
        /// Currently, ASP.NET Identity doesn't allow duplicate UserName
        /// Overrid ValidateEntity to allow duplicate UserName, but UserName + Tenant must be Unique
        /// But UserManager.CreateAsync(user, model.Password) doesn't run into this method
        /// So we have to implement a CustomUserValidator
        /// </summary>
        protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items)
        {
            if (entityEntry != null && entityEntry.State == EntityState.Added)
            {
                var errors = new List<DbValidationError>();
                var user = entityEntry.Entity as ApplicationUser;

                if (user != null)
                {
                    if (this.Users.Any(u => string.Equals(u.UserName, user.UserName)
                      && u.TenantId == user.TenantId))
                    {
                        errors.Add(new DbValidationError("User",
                          string.Format("Username {0} is already taken for AppId {1}",
                            user.UserName, user.TenantId)));
                    }

                    if (this.RequireUniqueEmail
                      && this.Users.Any(u => string.Equals(u.Email, user.Email)
                      && u.TenantId == user.TenantId))
                    {
                        errors.Add(new DbValidationError("User",
                          string.Format("Email Address {0} is already taken for AppId {1}",
                            user.UserName, user.TenantId)));
                    }
                }
                else
                {
                    var role = entityEntry.Entity as IdentityRole;

                    if (role != null && this.Roles.Any(r => string.Equals(r.Name, role.Name)))
                    {
                        errors.Add(new DbValidationError("Role",
                          string.Format("Role {0} already exists", role.Name)));
                    }
                }
                if (errors.Any())
                {
                    return new DbEntityValidationResult(entityEntry, errors);
                }
            }

            return new DbEntityValidationResult(entityEntry, new List<DbValidationError>());
        }
    }
}