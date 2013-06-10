using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

using mvc;
	
namespace Controllers
{
	public class HomeController : Controller
	{
		public ViewResult Index ()
		{
			int hour = DateTime.Now.Hour;
			ViewData ["Greeting"] = (hour<12 ? "now" : "after");
			return View ();
		}
		
		[AcceptVerbs (HttpVerbs.Get)]
		public ViewResult RSVPForm()
		{
			return View();	
		}
		
		[AcceptVerbs (HttpVerbs.Post)]
		public ViewResult RSVPForm(GuestResponse guestResponse)
		{	
			// send gR организатору
			return View("Thanks", guestResponse);
		}
	}
}

