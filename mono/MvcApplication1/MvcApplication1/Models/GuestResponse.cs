using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.ComponentModel;
using System.Net.Mail;

namespace MvcApplication1.Models
{
    public class GuestResponse : IDataErrorInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool? WillAttend { get; set; }

        public string Error { get { return null; } }
        public string this[string propName]
        {
            get
            {
                if ((propName == "Name") && string.IsNullOrEmpty(Name))
                    return "Please enter your name";

                if ((propName == "Email") && (string.IsNullOrEmpty(Email) || !Regex.IsMatch(Email, ".+\\@.+\\..+")))
                    return "Please enter valid email";

                if ((propName == "Phone") && string.IsNullOrEmpty(Phone))
                    return "Please enter your phone number";

                if ((propName == "WillAttend") && !WillAttend.HasValue)
                    return "Please specify you'll attend";
                return null;
            }
        }

        public void Submit()
        {
            EnsureCurrentlyValid();

            var message = new System.Text.StringBuilder();
            message.AppendFormat("Date: {0:yyyy-MM-dd hh:mm}\n", DateTime.Now);
            message.AppendFormat("RSVP from: {0}\n", Name);
            message.AppendFormat("Email: {0}\n", Email);
            message.AppendFormat("Phone: {0}\n", Phone);
            message.AppendFormat("Can come: {0}\n", WillAttend.Value ? "Yes" : "No");

            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Send(new MailMessage(
                "rsvp@example.com",
                "dantreKrt@gmail.com",
                Name + (WillAttend.Value ? "will" : "wont"),
                message.ToString()
               ));
        }

        private void EnsureCurrentlyValid()
        {
            var propsToValidate = new [] {"Name", "Email", "Phone", "WillAttend" };
            bool isValid = propsToValidate.All( x => this[x] == null);
            if (!isValid)
                throw new InvalidOperationException("Can't submit invalid Guest Responce");
        }        
    }
}