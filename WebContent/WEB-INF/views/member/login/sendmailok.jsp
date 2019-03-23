<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="root" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<link rel="stylesheet" href="${root}/resources/css/login.css">
<link rel="stylesheet"
	href="${root}/resources/fonts/iconic/css/material-design-iconic-font.min.css">

<link rel="stylesheet" href="${root}/resources/css/style.css">

</head>

<style>
.findpassDiv {
    width: 100%;
    align-self: center;
    padding-top: 5%;
}
</style>

<body>
	<div align="center">
		<br>
		<div class="wrap-login100">
				<h2>비밀번호 찾기</h2>
				<br>
				<div>
					<div>
						<strong>${memberDto.useremail}</strong>로<br>
						임시비밀번호가 발송되었습니다.<br>
						메일 확인후 로그인 해주세요.			
					</div>
					<br>
					
					<div class="findpassDiv" align="right">
						<input type="button" value="닫기" class="btn btn-primary"
							id="idsearchBtn" onclick="self.close();" style="width: 40%">
					</div>
				</div>
				<br>
		</div>
	</div>


</body>
</html>