//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace WebApi2StarterKit
//{
//    public static class IzendaConfig
//    {
//        public static void RegisterLoginLogic()
//        {
//            UserIntegrationConfig.ValidateToken = (ValidateTokenArgs args) =>
//            {
//                var token = args.AccessToken;
//                var user = IzendaBoundary.IzendaTokenAuthorization.GetUserInfo(token);
//                return new ValidateTokenResult { UserName = user.UserName, TenantUniqueName = user.TenantUniqueName };
//            };
//        }
//    }
//}