<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>방방콕콕</title>
  	<%@ include file="/WEB-INF/views/include/link.jsp"%>  	
  	<%@ include file="/WEB-INF/views/include/loader.jsp"%>
  	
  	<script type="text/javascript">
	var contextPath='<%=request.getContextPath()%>';
	var rootPt = '${root}'; // sseul 추가
	</script>
	<link rel="stylesheet" href="${root}/resources/css/index.css"> 
	
</head>
  <body>
  <%@ include file="/WEB-INF/views/include/nav.jsp"%>
    <!-- 대문 -->
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_1.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate" data-scrollax=" properties: { translateY: '70%' }"> 
          <!-- 대문 내용 -->        
            <h1 class="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><strong><br></strong>전국 방방곡곡 여행지를 콕콕!</h1>
            <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 계획, 여행 후기, 여행꿀팁, 축제 정보, 숙박 정보 등을 공유해 보세요!</p>
            <div class="block-17 my-4">
            <!-- 검색 위치 form태그-->
              <form action="" id="formSearchKeyword" method="get" class="d-block d-flex">
              	<input type="hidden" name="searchWord" id="searchWord" value="">
                <div class="fields d-block d-flex">
                <!-- 검색 카테고리 -->
	                <div class="select-wrap one-two">
	                    <div class="icon"><span class="ion-ios-arrow-down"></span></div>
	                    <select name="" id="mainSearchKey" class="form-control">
	                      <option value="1">여행 정보</option>
	                      <option value="2">여행 일정</option>
	                      <option value="3">여행 리뷰</option>
	                      <option value="4">여행 꿀팁</option>
	                    </select>
                  	</div>
                  	<!-- 검색 TEXT -->
	                  <div class="textfield-search one-third">
	                  	<input type="text" id="mainSearchWord" class="form-control" placeholder="예: 강릉, 축제, 맛집 리뷰">
	                  </div>                  
                </div>
                <!-- 검색 버튼 -->
                <input type="button" id="btnMainSearch" class="search-submit btn btn-primary" value="검색">  
              </form>
            </div>          
          </div>
        </div>
      </div>
    </div>
        
	<!-- 여행 정보 섹션 -->
	    <section class="ftco-section ftco-destination">
	    	<div class="container">
	    		<div class="row justify-content-start mb-1 pb-3">
	        		<div class="col-md-7 heading-section ftco-animate">
						<!-- 여행 정보 제목 -->     
						<span class="subheading">여행정보</span>
						<h2 class="mb-4"><strong>행사  &amp; 축제</strong></h2>
					</div>
	        	</div>        
	    		<div class="row">
	    			<div class="col-md-12">  				
	    			<div class="destination-slider owl-carousel ftco-animate">
	    			<c:forEach begin="0" end="11" varStatus="status"> 
	    			<div class='item informationItemList${status.index}'></div>    						
	    			</c:forEach>
	    			</div>	    				   			   				
	    			</div>
	    		</div>
	    	</div>
	    </section>    
    
    
    
		<!-- 여행 후기 섹션 -->
		    <section class="ftco-section bg-light">
		      <div class="container">
		        <div class="row justify-content-start mb-1 pb-3">
		          <div class="col-md-7 heading-section ftco-animate">
		            <span class="subheading">여행일정</span>
		            <h2><strong>여행 후기</strong></h2>
		          </div>
		        </div>
		        <div id="commentList" class="row">                    
		        </div>
		      </div>
		    </section>		    
		    
		   <!-- 여행 계획 섹션 -->
		    <section class="ftco-section">
		      <div class="container">
		        <div class="row justify-content-start mb-1 pb-3">
		          <div class="col-md-7 heading-section ftco-animate">
		            <span class="subheading">여행일정</span>
		            <h2><strong>여행 계획</strong></h2>
		          </div>
		        </div>
		        <div id="scheduleList" class="row">                    
		        </div>
		      </div>
		    </section>
		    	
  
<!-- 통계 섹션 -->
    <section class="ftco-section ftco-counter img" id="section-counter" style="background-image: url(${root}/resources/images/bg_1.jpg);">
    	<div class="container">
    		<div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
            <h2 class="mb-4">여행 통계</h2>
            <span class="subheading">선호 여행지와 날짜를 통계를 통해 알아보세요!</span>
          </div>
        </div>
    		<div class="row justify-content-center">
    			<div class="col-md-12">
		    		<div class="row">		 
		    		   					    				    		
			            <!-- Donut Chart -->
			            <div class="col-xl-6 col-lg-7">
			              <div class="card shadow mb-4">
			                <!-- Card Header - Dropdown -->
			                <div class="card-header py-3" align="center">
			                  <h5 class="m-0 font-weight-bold text-primary">여행 선호 지역</h5>
			                </div>
			                <!-- Card Body -->
			                <div class="card-body">
			                  <div class="chart-pie pt-4">
			                    <canvas id="locationPieChart"></canvas>
			                  </div>
			                  <br>		                 
			                </div>
			              </div>
			            </div>	        
			            
			            <!-- Donut Chart -->
			            <div class="col-xl-6 col-lg-7">
			              <div class="card shadow mb-4">
			                <!-- Card Header - Dropdown -->
			                <div class="card-header py-3" align="center">
			                  <h5 class="m-0 font-weight-bold text-primary">여행 선호 날짜</h5>
			                </div>
			                <!-- Card Body -->
			                <div class="card-body">
			                  <div class="chart-pie pt-4">
			                    <canvas id="monthPieChart"></canvas>
			                  </div>
			                  <br>			   		                 
			                </div>
			              </div>
			            </div>					
		        </div>
	        </div>
        </div>
    	</div>
    </section>    
<%@ include file="/WEB-INF/views/include/footer.jsp"%>	
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
<script src="${root}/resources/vendor/chart.js/Chart.min.js"></script>
<script src="${root}/resources/js/chart.js"></script>
<script src="${root}/resources/js/kokkok_index.js"></script>
<script type="text/javascript">


</script>
 </body>
</html>