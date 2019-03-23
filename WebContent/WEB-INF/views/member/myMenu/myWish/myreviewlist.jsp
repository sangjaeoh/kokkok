<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
<script type="text/javascript">
	var contextPath='<%=request.getContextPath()%>';
</script>
<style>
#lastPage,#firstPage,#nextPageGroup,#prevPageGroup,.naviNum {
	cursor: Pointer;
}	
.myreviewdiv{
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 200px;
    min-height: 200px;	
	max-height: 200px;
    }
.myreviewdiv p img{
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  display: block;
  margin: 0px auto;
}


</style>



</head>
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
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">내가 찜한 리뷰</h1>
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
		<div class="categories">
			<li><a href="${root}/member/myInfo.kok" class="dropdown-item">내 정보관리</a></li>
			<li><a href="${root}/member/mywritelist.kok" class="dropdown-item">내가 작성한 일정</a></li>
			<li><a href="${root}/member/mywishschedule.kok" class="dropdown-item">내가 찜한 일정</a></li>
			<li><a href="${root}/member/mywishreview.kok" class="dropdown-item" style="color:red;">내가 찜한 리뷰</a></li>
		</div>
	</div>
</div>

<!-- 왼쪽 검색창 END -->

<!-- 오른쪽 목록 -->

		<div class="col-lg-9">
<!-- 목록들 -->
	 	<form action="" id="reviewListForm" name="reviewListForm" method="get">	
	        <input type="hidden" id="getuserId" value="${userInfo.userid}">
	       	<div id="myreviewList" class="row"></div>
		</form>
          		<%-- <div class="col-md-4 ftco-animate destination">
	    		<a href="${root}/schedule/view.jsp" class="img img-2 d-flex justify-content-center align-items-center" 
	    		style="background-image: url('${root}/resources/images/destination1.jpg');">
		    		<div class="icon d-flex justify-content-center align-items-center">
    					<span class="icon-search2"></span>
    				</div>
	    		</a>
	    		<div class="text p-3">
	    			<div class="d-flex">
			    		<h3><a href="#">제목 </a></h3>
	    			</div>
	    			
	    			<p>내용</p>
	    			<br>
	    			<p class="days"><span>작성일</span></p>
	    			<hr>
	    			<p class="bottom-area d-flex">
	    				<span><i class="icon-person"></i> 작성자id</span> <!-- icon변경 -->
	    				<span class="ml-auto">장소(3),숙박(4),맛집(5)</span>
	    			</p>
	    		</div>
			</div>	 --%>

<!-- 목록들 END -->
<!-- page -->
          	<div class="row mt-5">
		          <div class="col text-center">
		            <div class="block-27">
		              <ul id="navigator">

		              </ul>
		            </div>
		          </div>
          	</div>
<!-- page END -->          	
		</div> 
<!-- 오른쪽 목록  END-->
	</div> <!-- 큰 row END -->
	</div> <!-- 큰 container END -->
	</section>
<!-- 내용끝 -->

<script src="${root}/resources/js/myreview_list.js"></script>


<%@ include file="/WEB-INF/views/include/footer.jsp"%>   
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>