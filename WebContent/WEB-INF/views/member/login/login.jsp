<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String root = request.getContextPath();

String id = (String)request.getAttribute("checkid");

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function idcheck(){
	if(document.getElementById("checkid").value.trim().length == 0) {
		alert("검색 아이디 입력!");
		return;
	} else {
		document.idform.action = "<%=root%>/member";
		document.idform.submit();
	}
}

function iduse(id){
	opener.document.getElementById("userid").value = id;
	self.close();
}
</script>
</head>
<body>
<div class="box3" align="center">
<form name="idform" method="get" action="" onsubmit="return false;">
<input type="hidden" name="act" value="idcheck">
<h3>아이디 중복 검사</h3>
<hr>
	<div class="div1" align="left">검색할 아이디를 입력하세요
		<div class="div2">
			<input type="text" name="checkid" id="checkid" onkeypress="javascript:if(event.keyCode == 13){ idcheck(); }">
			<input type="button" value="검색" onclick="javascript:idcheck();">
			<%
				if(id == null){
			%>

			<%
				}else{
				int cnt = (int)request.getAttribute("idCnt");
					if(cnt != 0){
			%>
						
					<div class="div3">
						 <%=id%>은 이미 존재하는 아이디 입니다.
					</div>

					<%	
					}else{

					%>
					<div>
					<%=id%>는 사용할수 있습니다.<br>사용하시겠습니까?<br>
					
					<input type="button" value="사용" onclick="javascript:iduse('<%=id%>');">
					</div>
					<%
					}
				}
			%>
		</div>

	</div>

</form>
</div>
</body>
</html>