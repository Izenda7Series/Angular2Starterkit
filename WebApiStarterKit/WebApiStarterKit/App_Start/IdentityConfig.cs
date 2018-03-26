using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using WebApiStarterKit.Models;
using System.Data.Entity;
using System.Linq;
using System;
using WebApiStarterKit.IdentityManagers.Validators;

namespace WebApiStarterKit
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new CustomUserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }

        /// <summary>
        /// Find user belong the sepecific tenant.
        /// </summary>
        /// <param name="tenant">The tenant unique name.</param>
        /// <param name="username">The user name.</param>
        /// <returns></returns>
        public async Task<ApplicationUser> FindTenantUserAsync(string tenant, string username)
        {
            var context = ApplicationDbContext.Create();

            var query = context.Users
                .Include(x => x.Tenant)
                .Where(x => x.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase));

            if (!string.IsNullOrWhiteSpace(tenant))
                query = query.Where(x => x.Tenant.Name.Equals(tenant, StringComparison.InvariantCultureIgnoreCase));
            else
                query = query.Where(x => x.Tenant == null);

            var user = await query.SingleOrDefaultAsync();

            return user;
        }
    }
}
