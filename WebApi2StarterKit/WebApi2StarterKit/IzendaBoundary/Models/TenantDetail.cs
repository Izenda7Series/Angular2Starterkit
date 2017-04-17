using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi2StarterKit.IzendaBoundary.Models
{
    public class TenantDetail
    {
        public bool Active { get; set; }
        public bool Disable { get; set; }
        public string Name { get; set; }
        public string TenantId { get; set; }
        public Guid Id { get; set; }
    }
}