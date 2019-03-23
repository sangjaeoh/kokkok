<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<style>
.modal {
	text-align: center;
}

@media screen and (min-width: 768px) {
	.modal:before {
		display: inline-block;
		vertical-align: middle;
		content: " ";
		height: 100%;
	}
}

.modal-dialog {
	display: inline-block;
	text-align: left;
	vertical-align: middle;
	width: 350px;
}
</style>



<link rel="stylesheet" href="${root}/resources/css/login.css">
<link rel="stylesheet"
	href="${root}/resources/fonts/iconic/css/material-design-iconic-font.min.css">

<script type="text/javascript">
	
	function openfindpass() {
		window.open("${root}/member/findpass.kok","idcheck","top=200, left=100, width=480, height=400, menubar=no, status=no, toolbar=no, location=no, scrollbars=no");
	}

	function login() {
		var iderrorview = document.getElementById("idblank");
		var passerrorview = document.getElementById("passblank");

		if (document.getElementById("loginid").value.trim().length == 0) {
			iderrorview.innerHTML = "<font color='red'>아이디를 입력하세요.</font>";
			iderrorview.style = "display:";
			passerrorview.style = "display: none";
			return;
		} else if (document.getElementById("loginpass").value.trim().length == 0) {
			passerrorview.innerHTML = "<font color='red'>비밀번호를 입력하세요.</font>";
			passerrorview.style = "display:";
			iderrorview.style = "display: none";
			return;
		} else {
			document.getElementById("loginform").setAttribute("action",
					"${root}/login.kok");
			document.getElementById("loginform").submit();
		}
	}
	
    $("body").on("hidden.bs.modal", ".modal", function () {
    	document.getElementById("loginid").value = null;
    	document.getElementById("loginpass").value = null;
    });
</script>
<!-- Modal -->
<div class="modal fade" id="myLoginModal" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div>
				<form class="login100-form validate-form" id="loginform"
					method="post" action="">
					<input type="hidden" name="act" value="login">
					<div class="loginModalHead" align="center">
						<br>
						<h2>
							<span class="glyphicon glyphicon-lock">로그인</span>
						</h2>
					</div>
					<br> <br>
					<div class="wrap-input100 validate-input m-b-23"
						data-validate="Username is reauired" align="left">
						<span class="label-input100">아이디</span> <input class="input100"
							type="text" name="loginid" id="loginid"
							placeholder="아이디를 입력해주세요."> <span class="focus-input100"
							data-symbol="&#xf206;"></span>
					</div>
					<div id="idblank" style="display: none;"></div>
					<br>
					<div class="wrap-input100 validate-input"
						data-validate="Password is required" align="left">
						<span class="label-input100">비밀번호</span> <input class="input100"
							type="password" name="loginpass" id="loginpass"
							placeholder="비밀번호를 입력해주세요."
							onkeypress="if(event.keyCode == 13){login(); return;}"> <span class="focus-input100"
							data-symbol="&#xf190;"></span>
					</div>
					<div id="passblank" style="display: none;"></div>
					<div class="text-right">
						<a href="javascript:openfindpass();"> 비밀번호를 잊으셨나요??!</a>
					</div>
					<br>
					<div class="d-flex justify-content-center mb-3">
						<div class="p-2">
							<input type="button" value="로그인"
								class="btn btn-primary py-3 px-4" onclick="javascript:login();"> &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="button" value="회원가입"
								class="btn btn-primary py-3 px-4"
								onclick="location.href='${root}/member?act=mvregister'">
						</div>
					</div>
				</form>
			</div>
		</div>

	</div>
</div>


<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

