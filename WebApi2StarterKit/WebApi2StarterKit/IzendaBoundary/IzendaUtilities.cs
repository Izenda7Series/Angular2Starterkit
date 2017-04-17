using WebApi2StarterKit.IzendaBoundary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebApi2StarterKit.IzendaBoundary
{
    public static class IzendaUtilities
    {
        public static async Task CreateTenant(string tenantName, string authToken)
        {
            var existingTenant = await GetIzendaTenantByName(tenantName, authToken);
            if (existingTenant != null)
                return;

            var tenantDetail = new TenantDetail
            {
                Active = true,
                Disable = false,
                Name = tenantName,
                TenantId = tenantName
            };

            await WebApiService.Instance.PostAsync("tenant", tenantDetail, authToken);
        }

        public static async Task<RoleDetail> CreateRole(string roleName, TenantDetail izendaTenant, string authToken)
        {
            var role = await GetIzendaRoleByTenantAndName(izendaTenant != null ? (Guid?)izendaTenant.Id : null, roleName, authToken);
            if (role == null)
            {
                role = new RoleDetail
                {
                    Active = true,
                    Deleted = false,
                    NotAllowSharing = false,
                    Name = roleName,
                    TenantId = izendaTenant != null ? (Guid?)izendaTenant.Id : null
                };

                var response = await WebApiService.Instance.PostReturnValueAsync<AddRoleResponeMessage, RoleDetail>("role", role, authToken);
                role = response.Role;
            }

            return role;
        }

        public static async Task<UserDetail> CreateUser(WebApi2StarterKit.Models.ApplicationUser hostingUser, string roleName, string authToken)
        {
            var izendaTenant = hostingUser.Tenant != null ? await GetIzendaTenantByName(hostingUser.Tenant.Name, authToken) : null;

            var izendaUser = new UserDetail
            {
                FirstName = izendaTenant != null ? izendaTenant.Name : "Admin",
                LastName = hostingUser.UserName.Split('@')[0],
                Username = hostingUser.UserName,
                TenantDisplayId = izendaTenant != null ? izendaTenant.Name : string.Empty,
                TenantId = izendaTenant != null ? (Guid?)izendaTenant.Id : null
            };

            if (!string.IsNullOrWhiteSpace(roleName))
            {
                var izendaRole = await CreateRole(roleName, izendaTenant, authToken);
                izendaUser.Roles.Add(izendaRole);
            }

            izendaUser = await WebApiService.Instance.PostReturnValueAsync<UserDetail, UserDetail>("user", izendaUser, authToken);

            return izendaUser;
        }

        private static async Task<RoleDetail> GetIzendaRoleByTenantAndName(Guid? tenantId, string roleName, string authToken)
        {
            var roles = await WebApiService.Instance.GetAsync<IList<RoleDetail>>("/role/all/" + (tenantId.HasValue ? tenantId.ToString() : null), authToken);

            if (roles != null)
                return roles.FirstOrDefault(r => r.Name.Equals(roleName, StringComparison.InvariantCultureIgnoreCase));

            return null;
        }

        private static async Task<TenantDetail> GetIzendaTenantByName(string tenantName, string authToken)
        {
            var tenants = await WebApiService.Instance.GetAsync<IList<TenantDetail>>("/tenant/allTenants", authToken);
            if (tenants != null)
                return tenants.FirstOrDefault(x => x.Name.Equals(tenantName, StringComparison.InvariantCultureIgnoreCase));

            return null;
        }
    }
}