using Rhino.Licensing;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using WebApi2StarterKit.Models;

namespace WebApi2StarterKit.IzendaBoundary
{
    public class IzendaTokenAuthorization
    {
        const string KEY = "THISISKEY";
        /// <summary>
        /// Generate token from UserInfo. Userinfo will be encrypted before sending to Izenda.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string GetToken(UserInfo user)
        {
            /// remove tenant property when sending token to Izenda, if Tenant is System.
            if (user.TenantUniqueName == "System")
                user.TenantUniqueName = null;

            var serializedObject = Newtonsoft.Json.JsonConvert.SerializeObject(user);

            var token = StringCipher.Encrypt(serializedObject, KEY);
            return token;
        }

        /// <summary>
        /// Get the token for IzendaAdmin user, to communicate with Izenda to process when user has not been logged in.
        /// </summary>
        /// <returns></returns>
        public static string GetIzendaAdminToken()
        {
            var userName = ConfigurationManager.AppSettings["IzendaAdminUser"];

            var user = new UserInfo { UserName = userName };
            return GetToken(user);
        }


        /// <summary>
        /// Get User info from token. Token, which recieved from Izenda, will be decrypted to get user info.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static UserInfo GetUserInfo(string token)
        {
            var serializedObject = StringCipher.Decrypt(token, KEY);
            var user = Newtonsoft.Json.JsonConvert.DeserializeObject<UserInfo>(serializedObject);
            return user;
        }
    }
}