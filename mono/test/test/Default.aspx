<%@ Page Language="C#" AutoEventWireup="true" Inherits="test.Default" %>
<html>
<head id="Head1" runat="server">
	<title>Default</title>
</head>
<body>
	<form id="Main" runat="server">
		<div id="header">The beer House</div>
		<asp:ContentPlaceHolder ID="MainContent" runat="server">		
				Content
		</asp:ContentPlaceHolder>
		<div id="footer">Copyright Dantre 2013</div>
	</form>
</body>
</html>
