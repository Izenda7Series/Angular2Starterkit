using System;
using System.Linq;
using System.Threading.Tasks;
using WebApiStarterKit.Models;

namespace WebApiStarterKit.IdentityManagers
{
    public class TenantManager
    {
        /// <summary>
        /// The tenant by name.
        /// </summary>
        /// <param name="name">The tenant name.</param>
        /// <returns></returns>
        public Tenant GetTenantByName(string name)
        {
            using (var context = ApplicationDbContext.Create())
            {
                var tenant = context.Tenants.Where(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).SingleOrDefault();

                return tenant;
            }
        }

        /// <summary>
        /// Save new tenant into integrated database.
        /// </summary>
        /// <param name="tenant">The tenant entity object.</param>
        /// <returns></returns>
        public async Task<Tenant> SaveTenantAsync(Tenant tenant)
        {
            using (var context = ApplicationDbContext.Create())
            {
                context.Tenants.Add(tenant);
                await context.SaveChangesAsync();

                return tenant;
            }
        }
    }
}