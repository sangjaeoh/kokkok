<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="root" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<script type="text/javascript">
function findpass() {		
	var findiderrorview = document.getElementById("findidblank");
	var findemailerrorview = document.getElementById("findemailblank");

	if (document.getElementById("findid").value.trim().length == 0) {
		findiderrorview.innerHTML = "<font color='red'>아이디를 입력하세요.</font>";
		findiderrorview.style = "display:";
		findemailerrorview.style = "display: none";
		return;
	} else if (document.getElementById("findemail").value.trim().length == 0) {
		findemailerrorview.innerHTML = "<font color='red'>이메일를 입력하세요.</font>";
		findemailerrorview.style = "display:";
		findiderrorview.style = "display: none";
		return;
	} else{
		document.getElementById("findpassform").setAttribute("action",
		"${root}/member/findpass.kok");
		document.getElementById("findpassform").submit();		
	}
}
</script>
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
		<div class="wrap-login100">
			<form class="login100-form validate-form" id="findpassform" name="findpassform" method="POST"
				action="" onsubmit="return false;">
				<input type="hidden" name="act" value="findpass">
				<h2>비밀번호 찾기</h2>
				<br>
				<div>
					<div class="wrap-input100 validate-input"
						data-validate="Username is reauired" align="left">
						<span class="label-input100">아이디</span> <input class="input100"
							type="text" id="findid" name="findid" placeholder="아이디를 입력해주세요" />
						<span class="focus-input100" data-symbol="&#xf206;"></span>		
					</div>
					<div id="findidblank" style="display: none;" align="left"></div>		
					<br>	
					<div class="wrap-input100 validate-input"
						data-validate="Username is reauired" align="left">
						<span class="label-input100">이메일</span> <input class="input100"
							type="text" id="findemail" name="findemail" placeholder="이메일을 입력해주세요" />
						<span class="focus-input100" data-symbol="&#xf15a;"></span>		
					</div>
					<div id="findemailblank" style="display: none;" align="left"></div>
					<br>
					<div class="findpassDiv" align="right">
						<input type="button" value="찾기" class="btn btn-primary"
							id="idsearchBtn" onclick="javascript:findpass();" style="width: 40%">
					</div>
				</div>
				<br>


			</form>
		</div>
	</div>


</body>
</html>