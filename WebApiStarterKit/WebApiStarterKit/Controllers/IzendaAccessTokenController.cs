using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiStarterKit.Models;

namespace WebApiStarterKit.Controllers
{
    /// <summary>
    /// Provides api for Izenda API Service gets user info and user access token from access token which is received by Izenda Front-End application.
    /// </summary>
    [RoutePrefix("api/IzendaAccessToken")]
    public class IzendaAccessTokenController : ApiController
    {
        /// <summary>
        /// Izenda API Service calls this api to get access token info of user.
        /// </summary>
        /// <param name="access_token"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("ValidateIzendaAuthToken")]
        public AccessTokenInfo ValidateIzendaAuthToken(string access_token)
        {
            var userInfo = IzendaBoundary.IzendaTokenAuthorization.GetUserInfo(access_token);
            return userInfo;
        }

        /// <summary>
        /// This api is used for exporting only and is called by Izenda API Service.
        /// Using to decrypt authorization message to user object then generate token string for that user.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("GetIzendaAccessToken")]
        public IHttpActionResult GetIzendaAccessToken(string message)
        {
            var userInfo = IzendaBoundary.IzendaTokenAuthorization.DecryptIzendaAuthenticationMessage(message);
            var token = IzendaBoundary.IzendaTokenAuthorization.GetToken(userInfo);
            //return token;
            return Ok(new { Token = token });
        }
    }
}
