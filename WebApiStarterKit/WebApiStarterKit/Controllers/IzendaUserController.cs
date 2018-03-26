using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiStarterKit.Controllers
{
    /// <summary>
    /// Provider api for Izenda client app get Izenda Access Token of current logged in user.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/IzendaUser")]
    public class IzendaUserController : ApiController
    {
        /// <summary>
        /// Generate Izenda Access Token for current logged in user.
        /// The token basically is encrypted by combine username and tenant name.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GenerateToken")]
        public string GenerateToken()
        {
            var username = User.Identity.GetUserName();
            var tenantName = ((System.Security.Claims.ClaimsIdentity)User.Identity).FindFirstValue("tenant");
            var user = new Models.AccessTokenInfo { UserName = username, TenantUniqueName = tenantName };
            var token = IzendaBoundary.IzendaTokenAuthorization.GetToken(user);

            return token;
        }
    }
}
