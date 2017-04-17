using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApi2StarterKit.Models;

namespace WebApi2StarterKit.Managers
{
    public class TenantManager
    {
        public Tenant GetTenantByName(string name)
        {
            using (var context = ApplicationDbContext.Create())
            {
                var tenant = context.Tenants.Where(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).SingleOrDefault();

                return tenant;
            }
        }


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