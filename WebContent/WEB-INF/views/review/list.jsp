<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>    

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>방방콕콕 - 여행 리뷰</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%>
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<link rel="stylesheet" href="${root}/resources/css/review.css">
</head>
<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>
<%@ include file="/WEB-INF/views/review/writemodal.jsp"%>

<div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg');">
	<div class="overlay"></div>
	<div class="container">
      		<div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
         		<div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
               <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 리뷰</h1>
      		    </div>
    	    </div>
       </div>
</div>


<!-- 내용시작 -->   
	<section class="ftco-section ftco-degree-bg">
	<div class="container">
			<div class="row">					
				<div class="col-lg-12 sidebar ftco-animate">
					<div class="sidebar-wrap bg-light ftco-animate" style="padding-left:10%; padding-right:10%">
						<h3 class="heading mb-4">여행 리뷰</h3>
						<div class="form-group row">
								<div class="col-lg-3">
									<input type="button" value="통합 검색"  class="btn btn-primary" id="infoKeyword" style="background-color: #f8f9fa; color: #dc3545">
								</div>
								<div class="col-lg-3">
									<input type="button" value="장소 리뷰"  class="btn btn-primary" id="infoArea">
								</div>
								<div class="col-lg-3">
								<input type="button" value="숙박 리뷰" class="btn btn-primary" id="infoStay">
								</div>
								<div class="col-lg-3">
								<input type="button" value="맛집 리뷰"  class="btn btn-primary" id="infoFood">
								</div>												
						</div>
					</div>
				</div>
			</div>
			
		
<!-- 상단시작 -->
			<div class="row">				
				<div class="col-lg-3 sidebar ftco-animate">
					<div class="sidebar-wrap bg-light ftco-animate">
					<h3 class="heading mb-4 infoItemsTitle">통합 검색</h3>
							<div class="fields">	
								<div class="form-group infoitems infoKeyword">
									<input type="text" id="reviewSearchKeyword" class="form-control" placeholder="검색어 입력">
								</div>								
							</div>
							<div class="form-group">
								<input type="button" value="검 색" class="btn btn-primary py-2 px-5" onclick="javascript:reviewSearch();">
							</div>
							<hr>
							<h3 class="heading mb-4">리뷰 등록</h3>
						  	<div class="form-group">
						  	<c:if test="${userInfo == null}">
						  		<input type="button" id="impossibleAlert" value="리뷰등록하기" class="btn btn-primary py-2 px-5">
						  	</c:if>
						  	<c:if test="${userInfo != null}">
						  		<input type="button" id="getReviewList" value="리뷰등록하기" class="btn btn-primary py-2 px-5" data-toggle="modal" data-target="#reviewWriteModal">
						  	</c:if>
							</div>							
					</div>		
				</div>
			 <div class="col-lg-9" id="js-load">	
				<form action="" id="reviewListForm" name="reviewListForm" method="get">
				<input type="hidden"  name="seq" id="seq" value=""/>
					<div class="row" id="makeReviewList"></div>				
			</form>
		</div> 
 	</div>
</div>
</section>
<script src="${root}/resources/js/review_list.js"></script>
<%@ include file="/WEB-INF/views/include/footer.jsp"%>
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>