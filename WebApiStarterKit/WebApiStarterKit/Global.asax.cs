using log4net;
using log4net.Config;
using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace WebApiStarterKit
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected ILog Logger
        {
            get
            {
                return LogManager.GetLogger(typeof(WebApiApplication));
            }
        }

        protected void Application_Start()
        {
            Logger.Info("Izenda Integrated App is starting up");

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Logger.Info("Izenda Integrated App has been started successfully");
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var exception = Server.GetLastError();
            Logger.Error("Unhandled error", exception);

            Server.ClearError();
        }
    }
}
