<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
</head>
<body>	
	<h1>Thank you, <%= Html.Encode(mvc.GuestResponse.Name) %>!</h1>
	<% if (Model.WillAttend == true){ %>
		It's great that you are coming
	<% } else { %>
		Sorry to hear that
	<% } %>
</body>
