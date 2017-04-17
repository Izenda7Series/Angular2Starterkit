using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi2StarterKit.IzendaBoundary.Models
{
    public class RoleDetail : RoleInfo
    {
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public Guid? TenantId { get; set; }
        public bool NotAllowSharing { get; set; }
    }
}