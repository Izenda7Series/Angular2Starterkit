using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiStarterKit.Models
{
    /// <summary>
    /// This model corresponding with Izenda AccessTokenInfo object from Izenda.BI.Framework Library.
    /// Never change property name of this model class, they have to map correctly with property name of AccessTokenInfo class to serialize and de-serialize in Izenda System.
    /// </summary>
    public class AccessTokenInfo
    {
        /// <summary>
        /// The Izenda Username
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// The Izenda Tenant Unique Name
        /// </summary>
        public string TenantUniqueName { get; set; }
    }
}