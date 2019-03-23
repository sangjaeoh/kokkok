<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>방방콕콕 - 여행 일정</title>
  	<%@ include file="/WEB-INF/views/include/link.jsp"%>
  	<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
  	<link rel="stylesheet" href="${root}/resources/css/schedule.css">
  	<script type="text/javascript">
	var contextPath='<%=request.getContextPath()%>';
	var rootPt = '${root}';
	</script>
	<style>
	#lastPage,#firstPage,#nextPageGroup,#prevPageGroup,.naviNum {
		cursor: Pointer;
	}	
	</style>
  	
  </head>
  <body>
   <%@ include file="/WEB-INF/views/include/nav.jsp"%>
<!-- 이미지 -->
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 일정</h1>
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
        	<div class="form-group">
        		<c:if test="${userInfo != null}">
		        	<a href="${root}/schedule/write.kok">
						<input type="button" value="일정 만들기" id="writeScheduleBtn" class="btn btn-primary py-3 px-5">
					</a>
				</c:if>
				<c:if test="${userInfo == null}">
					<a href="javascript:void(0)" onclick="alert('로그인 후 이용 가능합니다.')">
						<input type="button" value="일정 만들기" id="writeScheduleBtn" class="btn btn-primary py-3 px-5">
					</a>
				</c:if>
		    </div>
		    <br>
        	
			<h3 class="heading mb-4">상세 검색</h3>
        	<form action="#">
        	<div class="fields">
        	
 		         <div class="row">
		         	<div class="col-md-12">
<!-- 일정(계획/후기) -->
	        			<div class="form-group">
			            	<div class="select-wrap one-third">
			                	<div class="icon"><span class="ion-ios-arrow-down"></span></div>
			                    <select name="" id="searchSchedule" class="form-control">
			                    	<option value="0">모든 일정</option>
			                    	<option value="1">여행 계획</option>
			                    	<option value="2">여행 후기</option>
			                    </select>
		                  	</div>
	        			</div>
        			</div>
		         </div>  
		         
		         <div class="row">
		         	<div class="col-md-12">
<!-- 조회 -->
	        			<div class="form-group">
			            	<div class="select-wrap one-third">
			                	<div class="icon"><span class="ion-ios-arrow-down"></span></div>
			                    <select name="" id="listSort" class="form-control">
			                    	<option value="1">인기순</option>
			                    	<option value="2">최신순</option>
			                    </select>
		                  	</div>
	        			</div>
        			</div>
		         </div>      	
        	
				<!-- <div class="row">
		         	<div class="col-md-12">
지역1
			        	<div class="form-group infoitems infoArea infoKeyword infoFestival infoStay">
								<div class="select-wrap one-third">
									<div class="icon"><span class="ion-ios-arrow-down"></span></div>
									<select name="" id="areaCodeList" class="form-control">																				
									</select>
								</div>
							</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
지역2
			        	<div class="form-group infoitems infoArea infoKeyword infoFestival infoStay">
							<div class="select-wrap one-third">
								<div class="icon"><span class="ion-ios-arrow-down"></span></div>
								<select name="" id="sigunguCodeList" class="form-control">																				
								</select>
							</div>
						</div>
					</div>
				</div> -->

				<div class="row">
		         	<div class="col-md-12">		            
<!-- 테마 -->
			            <div class="form-group">
			                <div class="select-wrap one-third">
			                    <div class="icon"><span class="ion-ios-arrow-down"></span></div>
			                    <select name="" id="searchThema" class="form-control">
			                    	<option value="0">테마 전체</option>
			                    	<option value="1">나홀로 여행</option>
			                    	<option value="2">친구와 함께</option>
			                      	<option value="3">커플 여행</option>
			                    	<option value="4">가족 여행</option>
			                      	<option value="5">단체 여행</option>
			                      	<option value="6">패키지 여행</option>
			                    </select>
		                  	</div>
			            </div>
			         </div>
			     </div>
		         
<!-- 여행기간 -->
		        	<div class="form-group">
		            	<div class="range-slider">
		              		<label for="name">여행기간</label>
		              		<span>
								<input type="number" id="term1_number" value="1" min="1" max="60"/>일  -
								<input type="number" id="term2_number" value="60" min="1" max="60"/>일
							</span>
							<p>
								<input type="range" id="term1_range" value="1" min="1" max="60" step="1"/>
								<input type="range" id="term2_range" value="60" min="1" max="60" step="1"/>
							</p>
						</div>
		        	</div>
		        	
		        	
<!-- 검색어 -->
		        	<div class="form-group">
		                <input type="text" id="searchWord" class="form-control" placeholder="검색어를 입력하세요">
		        	</div>
		        	
<!-- 버튼 -->
		        	<div class="form-group">
		            	<input type="button" id="getScheduleList" value="검색" class="btn btn-primary py-3 px-5">
		        	</div>

		    </div>
			</form>
        </div>
		</div>
<!-- 왼쪽 검색창 END -->

<!-- 오른쪽 목록 -->
		<div class="col-lg-9">
<!-- 목록들 -->
        	<div id="scheduleList" class="row">
        		
					<%-- <div class="col-md-4 ftco-animate destination">
			    		<a href="${root}/schedule/view.kok" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url('${root}/resources/images/destination-1.jpg');">
				    		<div class="icon d-flex justify-content-center align-items-center">
		    					<span class="icon-search2"></span>
		    				</div>
			    		</a>
			    		<div class="text p-3">
			    			<div class="d-flex">
					    		<h3><a href="#">여행 제목이 들어갑니다!!! </a></h3>
			    			</div>
			    			<p>#전라남도 #여수 #순천 #광양 #저기 #나혼자</p>
			    			<br>
			    			<p class="bottom-area d-flex">
			    				<span class="days">18.08.18 - 18.09.18 (30일)</span>
			    				<span class="ml-auto">후기</span>
			    			</p>
			    			<hr>
			    			<p class="bottom-area d-flex">
			    				<span><i class="icon-person"></i> 작성자id</span>
			    				<span class="list-cnt">
			    					<i class="icon-thumbs-o-up"></i> 18 &nbsp;
			    					<i class="icon-eye"></i> 18
			    				</span>
			    			</p>
			    		</div>
					</div> --%>
        		
          	</div>
<!-- 목록들 END -->

<!-- page -->
          	<div class="row mt-5">
		          <div class="col text-center">
		            <div class="block-27">
		              <ul id="navigator">
		                <li><a href="#">&lt;</a></li>
		                <li class="active"><span>1</span></li>
		                <li><a href="#">2</a></li>
		                <li><a href="#">3</a></li>
		                <li><a href="#">4</a></li>
		                <li><a href="#">5</a></li>
		                <li><a href="#">&gt;</a></li>
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

<script src="${root}/resources/js/schedule_list.js"></script>

<%@ include file="/WEB-INF/views/include/footer.jsp"%>   
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>