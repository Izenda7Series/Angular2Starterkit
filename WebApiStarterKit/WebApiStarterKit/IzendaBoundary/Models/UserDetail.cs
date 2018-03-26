using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiStarterKit.IzendaBoundary.Models
{
    public class UserDetail
    {
        public string Username { get; set; }
        public string TenantDisplayId { get; set; }
        public Guid? TenantId { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool InitPassword { get; set; }
        public bool Active { get; set; }

        private IList<RoleInfo> _roles;
        public IList<RoleInfo> Roles
        {
            get { return _roles ?? (_roles = new List<RoleInfo>()); }
            set { _roles = value; }
        }
    }
}