<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.regex.Pattern"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="root" value="${pageContext.request.contextPath}"/>
<%
	String id = (String) request.getAttribute("checkid");
%>
<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>

<link rel="stylesheet" href="${root}/resources/css/login.css">
<link rel="stylesheet"
	href="${root}/resources/fonts/iconic/css/material-design-iconic-font.min.css">

<link rel="stylesheet" href="${root}/resources/css/style.css">

<script type="text/javascript">
function idcheck(){
	if(document.getElementById("checkid").value.trim().length == 0) {
		alert("검색 아이디 입력!");
		return;
	} else{
		document.idform.action = "${root}/member/idsearch.kok";
		document.idform.submit();    	  
      }

	}
	

	function iduse(id) {
		opener.document.getElementById("userid").value = id;
		self.close();
	}
</script>
</head>

<body>
	<div align="center">
		<div class="wrap-login100">
			<form class="login100-form validate-form" name="idform" method="POST"
				action="" onsubmit="return false;">
				<input type="hidden" name="act" value="idcheck">
				<h2>아이디 중복 검사</h2>
				<br>

				<div class="row">

					<div class="wrap-input100 validate-input"
						data-validate="Username is reauired" align="left"
						style="width: 70%">
						<span class="label-input100">아이디</span> <input class="input100"
							type="text" id="checkid" name="checkid" placeholder="아이디를 입력해주세요"
							onkeypress="if(event.keyCode == 13){idcheck(); return;}"/>
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>
					<div class="idcheckDiv">
						<input type="button" value="검색" class="btn btn-primary"
							id="idsearchBtn" onclick="javascript:idcheck();">
					</div>

				</div>
				<div id="checkidblank" style="display: none;"></div>
				<br>
				
				<div align="left">

				<%
					if (id == null) {
				%>
					<div>아이디를 입력해주세요!</div>
					
				<%	  
				} 

					if(id != null) {
						String idReg = "^[a-z]{1}[a-z0-9]{3,15}$";
						boolean i = Pattern.matches(idReg, id);
						if(i == true){
						int cnt = (int) request.getAttribute("idCnt");
						if (cnt != 0) {
				%>
				<div class="div3">
					<%=id%>은 이미 존재하는 아이디 입니다.
				</div>

				<%
						} else{
				%>
				<div class="row">
					<div style="padding-right:20px">
						<%=id%>는 사용할수 있습니다.<br>사용하시겠습니까?<br> 
					</div>
					<div>
						<input type="button" value="사용하기" class="btn btn-primary" onclick="javascript:iduse('<%=id%>');">
					</div>
				</div>
				<%
						}
						
					} else {
				%>
				<div class="div3">
					<%=id%>는 부적합 합니다.<br>
					아이디는 영문으로 시작해야 하며,<br>
					영문 또는 숫자 4~16자리로 사용해야 합니다.<br>
					대문자는 사용하실 수 없습니다.
				</div>
				<%
						}
					}
				%>

				</div>
			</form>
		</div>
	</div>


</body>
</html>