<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%>   
<link rel="stylesheet" href="${root}/resources/css/login.css">
<link rel="stylesheet"
	href="${root}/resources/fonts/iconic/css/material-design-iconic-font.min.css">
</head>
<script type="text/javascript">
	function modifymember() {

		// 비밀번호 정규식(A~Z,a~z,0~9로 시작하는 4~16자리 비밀번호를 설정)
		var pwJ = /^[A-Za-z0-9]{4,16}$/; 
		
		// 이름 정규식(가~힣, 한글로 이루어진 2~6자리 이름을 적어야한다.)
		var nameJ = /^[가-힣]{2,6}$/;
		
		// 이메일 검사 정규식
		var mailJ = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	

		
		var mnameerrorview = document.getElementById("nameblank");
		var mpwerrorview = document.getElementById("pwblank");
		var memailerrorview = document.getElementById("emailblank");
		
		var mnameCheck = $("#mname").val();
		var mpassCheck = $("#mpass").val();
		var memailCheck = $("#memail").val();

		if (document.getElementById("mid").value.trim().length == 0) {
			alert("아이디를 입력해주세요.")
			return;
		} else if (document.getElementById("mname").value.trim().length == 0) {
			alert("이름을 입력해주세요.")
			return;
		} else if (document.getElementById("mpass").value.trim().length == 0) {
			alert("비밀번호를 입력해주세요.")
			return;
		} else if (document.getElementById("mpass").value != document.getElementById("mpasscheck").value) {
			alert("비밀번호가 일치하지 않습니다.")
			return;
		} else if (document.getElementById("memail").value.trim().length == 0) {
			alert("이메일을 입력해주세요.")
			return;
		} else if(nameJ.test(mnameCheck) == false){
			mnameerrorview.innerHTML = "<font color='red'>이름은 2~6글자의 한글로 입력해주세요.</font>";
			mnameerrorview.style = "display:";
			mpwerrorview.style = "display: none";
			memailerrorview.style = "display: none";
			return;
		}else if(pwJ.test(mpassCheck) == false){
			mpwerrorview.innerHTML = "<font color='red'>4~16자리의 영문 대소문자 또는 숫자로 입력해주세요.</font>";
			mpwerrorview.style = "display:";
			mnameerrorview.style = "display: none";
			memailerrorview.style = "display: none";
			return;
		}else if(mailJ.test(memailCheck) == false){
			memailerrorview.innerHTML = "<font color='red'>이메일 형식을 확인해주세요.</font>";
			memailerrorview.style = "display:";
			mnameerrorview.style = "display: none";
			mpwerrorview.style = "display: none";
			return;
		}
		else {
			document.getElementById("modifymemberform").setAttribute("action",
					"${root}/member/modify.kok");
			document.getElementById("modifymemberform").submit();
		}
	}
	
	function changepass() {
		var changepass = document.getElementById("changepassDiv");
		$("#mpass").attr("readonly",false).attr("disabled",false);
		$("#mpasscheck").attr("readonly",false).attr("disabled",false);
		document.getElementById("mpass").value = null;
		document.getElementById("mpasscheck").value = null;
		 $("#chdiv").css("display", "none");
	}
</script>
<style>
#changepassBtn{
	border-radius: 0px;
	font-size: 0.9rem;
}

.changepassDiv{
    width: 30%;
    align-self: center;
    padding-top: 2%;
    padding-left: 45%;
}

.label-input100{
	font-weight: bold;
}
</style>
<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>
<c:if test="${userInfo == null}">
<script>	
alert('로그인 세션이 만료되었습니다.'); 
document.location.href = "${root}/index.jsp";
</script>
</c:if>
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">  
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">계정수정</h1>
          </div>
        </div>
      </div>
    </div>
    
    
   <!-- 내용시작 -->
	<section class="ftco-section ftco-degree-bg">
	<div class="container">
	<div class="row">
<!-- 왼쪽 검색창 -->	
<div class="col-lg-3 sidebar">
	<div class="sidebar-wrap bg-light ftco-animate">
		<form action="#">
			<div class="categories">
				<li><a href="${root}/member/myInfo.kok" class="dropdown-item" style="color:red;">내 정보관리</a></li>
				<li><a href="${root}/member/mywritelist.kok" class="dropdown-item">내가 작성한 일정</a></li>
				<li><a href="${root}/member/mywishschedule.kok" class="dropdown-item">내가 찜한 일정</a></li>
				<li><a href="${root}/member/mywishreview.kok" class="dropdown-item">내가 찜한 리뷰</a></li>
			</div>
		</form>
	</div>
</div>
<!-- 왼쪽 검색창 END -->

<!-- 오른쪽 목록 -->
		<div class="col-lg-9" align="center">
			<div class="wrap-login100" style="width: 600px;background: aliceblue;">
				<form class="login100-form validate-form" name="modifymemberform" id="modifymemberform" method="post" action="">
					<span class="login100-form-title"> 내정보 수정</span><br>
					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired" align="left">
						<span class="label-input100">아이디(수정불가)</span>
							<input class="input100" type="text" id="mid" name="mid" value="${userInfo.userid}" readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>
					<br>

					<div class="wrap-input100 validate-input" data-validate = "Username is reauired" align="left">
						<span class="label-input100">이름</span>
							<input class="input100" type="text" id="mname" name="mname" value="${userInfo.username}" placeholder="수정하실 이름을 입력해주세요.">
						<span class="focus-input100" data-symbol="&#xf203;"></span>
					</div>
					<div id="nameblank" style="display: none;" align="left"></div>

					<br>
					
					<div class="wrap-input100 validate-input" data-validate="Password is required" align="left">
						<span class="label-input100">비밀번호(수정을 원하시면 변경 버튼을 눌러 변경해주세요.)</span>
						<input class="input100" type="password" id="mpass" name="mpass" value="${userInfo.userpass}" placeholder="수정하실 비밀번호를 입력해주세요" readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					<div id="pwblank" style="display: none;" align="left"></div>
		
					<br>
					<div class="wrap-input100 validate-input" data-validate="Password is required" align="left">
						<span class="label-input100">비밀번호확인</span>
						<input class="input100" type="password" id="mpasscheck" name="mpasscheck" value="${userInfo.userpass}" placeholder="수정하실 비밀번호를 확인해주세요." readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf191;"></span>
					</div>
				
					<div class="changepassDiv" id="chdiv">
						<input type="button" value="비밀번호변경" class="btn btn-primary"
									id="changepassBtn" onclick="javascript:changepass();">
					</div>
					
					
					<br>
					<div class="wrap-input100 validate-input" data-validate="Password is required" align="left">
						<span class="label-input100">이메일</span>
						<input class="input100" type="text" id="memail" name="memail" value="${userInfo.useremail}">
						<span class="focus-input100" data-symbol="&#xf15a;"></span>
					</div>
					<div id="emailblank" style="display: none;" align="left"></div>
					
					<br><br>
						<div class="d-flex justify-content-center mb-3">
							<div class="col-lg-5">
							<input type="button" value="수정하기"
									class="btn btn-primary" style="width: 70%;"
									onclick="javascript:modifymember();">
							</div>
							<div class="col-lg-5">
								<input type="button" value="취소" class="btn btn-primary"
									style="width: 70%;"
									onclick="location.href='${root}/member/myInfo.kok'">
							</div>
						</div>			
					</form>
				</div>

       	
		</div> 
<!-- 오른쪽 목록  END-->
	</div> <!-- 큰 row END -->
	</div> <!-- 큰 container END -->
	</section>
<!-- 내용끝 -->



<%@ include file="/WEB-INF/views/include/footer.jsp"%> 
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>