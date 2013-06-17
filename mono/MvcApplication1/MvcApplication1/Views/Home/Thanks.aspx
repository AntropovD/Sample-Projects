<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.GuestResponse>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Thanks</title>
</head>
<body>
    <h1> Thanks, <%=Html.Encode(Model.Name) %> !</h1>
    <% if (Model.WillAttend == true)
       { %>
        It's great that you are comming
    <% } else { %>
    Sorry to hear that you can't 
    <% } %>
</body>
</html>
