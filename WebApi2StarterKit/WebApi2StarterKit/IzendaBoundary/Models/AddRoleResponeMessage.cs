using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi2StarterKit.IzendaBoundary.Models
{
    public class AddRoleResponeMessage
    {
        public bool Success { get; set; }
        public RoleDetail Role { get; set; }
    }
}