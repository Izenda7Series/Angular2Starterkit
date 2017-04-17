using System.Web;
using System.Web.Mvc;

namespace WebApi2StarterKit
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
