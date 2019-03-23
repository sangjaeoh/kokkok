 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<style>

#adminMy{
	display: none;
}

</style>


<%@ include file="/WEB-INF/views/member/login/loginmodal.jsp"%>
   <!-- nav -->
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <a class="navbar-brand" href="${root}/index.jsp">방방콕콕</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="oi oi-menu"></span> Menu
      </button>
      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">          
          <!-- <li class="nav-item"><a href="about.jsp" class="nav-link">About</a></li>  -->         
		  <li class="nav-item"><a class="nav-link" href="${root}/information/list.kok">여행 정보<span class="caret"></span></a>	      
          <li class="nav-item"><a class="nav-link" href="${root}/schedule/list.kok">여행 일정<span class="caret"></span></a>	      
		  <li class="nav-item"><a class="nav-link" href="${root}/review/list.kok">여행 리뷰<span class="caret"></span></a>	      
		  <li class="nav-item"><a class="nav-link" href="${root}/tips/list.kok">여행 꿀팁<span class="caret"></span></a>	  
		  			<!-- 로그인 모달 추가! -->
			
<c:if test="${userInfo == null}">
		  <li class="nav-item cta" style="cursor: pointer"><a class="nav-link" data-toggle="modal" data-target="#myLoginModal"><span>로그인</span></a></li>&nbsp;&nbsp;
          <li class="nav-item cta"><a href="${root}/member/register.kok" class="nav-link"><span>회원가입</span></a></li>
</c:if>

<c:if test="${userInfo != null}">
          <!-- 로그인 -->
          <li class="nav-item cta dropdown">
          	<a href="" class="dropdown-toggle nav-link" data-toggle="dropdown"><span>마이페이지</span></a>
   		        <ul class="dropdown-menu">
				<li><a href="${root}/member/myInfo.kok" class="dropdown-item">내 정보관리</a></li>
				<li><a href="${root}/member/mywritelist.kok" class="dropdown-item">내가 작성한 일정</a></li>
				<li><a href="${root}/member/mywishschedule.kok" class="dropdown-item">내가 찜한 일정</a></li>
				<li><a href="${root}/member/mywishreview.kok" class="dropdown-item">내가 찜한 리뷰</a></li>

		<c:if test="${userInfo.admincode != 0}">
			    <li><a href="${root}/admin/memberlist.kok" class="dropdown-item">회원관리</a></li>              
		</c:if> 
		        </ul>
          </li>&nbsp;&nbsp;
          <li class="nav-item cta"><a href="${root}/logout.kok" class="nav-link"><span>로그아웃</span></a></li>

		</c:if>
	
           
        </ul>
      </div>
    </div>
  </nav>
    <!-- END nav -->