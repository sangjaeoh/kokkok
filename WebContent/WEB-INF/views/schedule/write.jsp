<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
  <head>
    <title>방방콕콕 - 여행 일정 쓰기</title>
  	<%@ include file="/WEB-INF/views/include/link.jsp"%>
  	<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
  	<link rel="stylesheet" href="${root}/resources/css/schedule.css">
  	<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
 	
<script type="text/javascript">
var setSubject = "";
var setContent = "";
var clickParentClass="", clickSubject = "", clickContent ="", clickLat = "",
clickLng = "", clickAddress ="";

$(document).ready(function() {
	$("#registerBtn").click(function() {
		var reviewResult = 0;
		for(var i=1; i<tripDays+1; i++){
			var test = $(".seul1_Item"+i).find(".itemBox"+i).attr("id");
			if(test == null){
				reviewResult += 1;
 			}
		}
		
		if($("#scheduleTitle").val() == "") {
			alert("여행 제목을 입력해주세요");
			return;
		} else if($("#scheduleMsg").val() == "") {
			alert("여행 소개를 입력해주세요");
			return;
		} else if(totalReview == 0) {
			alert("일정을 등록해주세요");
			return;
		} else if(reviewResult != 0) {
			alert("일차별로 일정을 한개 이상 작성해주세요");
			return;
		} else {
			var result = confirm("등록 하시겠습니까?");
			if(result){
				$('#ssubject').val($("#scheduleTitle").val());
				$('#scontent').val($("#scheduleMsg").val());
				$("#scheduleWriteForm").attr("action", "${root}/schedule/write.kok").submit();
			}
		}
	});
	$("#cancelBtn").click(function() {
		var result = confirm("등록을 취소 하시겠습니까?");
		if(result){
			history.back();
		}
	});
});

$(document).on("click", ".modifyBox", function() {
	var seq = $(this).siblings(".seq").val();
	setSubject = $(this).siblings(".subject").val();
	setContent = $(this).siblings(".content").val();	
	var tempClass= $(this).parent().attr("class");
	var tempClassArr = tempClass.split(" ");
	clickParentClass = tempClassArr[0];
	clickSubject = "";
	clickContent ="";
	clickLat = "";
	clickLng = "";
	clickAddress ="";	
	
});

</script>
<style type="text/css">
	#uploadFile{display: none;}

</style>
</head>
<body>
   <%@ include file="/WEB-INF/views/include/nav.jsp"%>
   <%@ include file="/WEB-INF/views/schedule/writemodal.jsp"%>
   <%@ include file="/WEB-INF/views/schedule/writeReviewmodal.jsp"%>
   
<!-- 이미지 -->
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_3.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 일정 쓰기</h1>
          </div>
        </div>
      </div>
    </div>

<!-- 내용시작 -->
	<section class="ftco-section ftco-degree-bg">
	<form action="" id="scheduleWriteForm" method="POST" enctype="multipart/form-data">
	
	<input type="hidden" name="sbcode" id="sbcode" value="">
	<input type="hidden" name="ssubject" id="ssubject" value="">
	<input type="hidden" name="scontent" id="scontent" value="">
	<input type="hidden" name="startdate" id="startdate" value="">
	<input type="hidden" name="enddate" id="enddate" value="">
	<input type="hidden" name="persons" id="persons" value="">
	<input type="hidden" name="thema" id="thema" value=""> 
	
	<div class="container">
	<div class="row">
<!-- 왼쪽 검색창 -->	
		<div class="col-lg-3 sidebar">
		<div class="sidebar-wrap bg-light ftco-animate">
			<h3 class="heading mb-4">대표 사진</h3>
			<div class="ftco-animate destination">
		    		<a href="javascript:uploadFile();" id="mainImg" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url('${root}/resources/images/destination-1.jpg');">		    		
			    		<div class="icon d-flex justify-content-center align-items-center">
	    					<span class="icon-plus"></span>
	    					<input type="file" id="uploadFile" name="uploadFile"/>
	    				</div>	    				
		    		</a>		    		
			</div>
		</div>
		
        <div class="sidebar-wrap bg-light ftco-animate">
			<h3 class="heading mb-4">일정 정보</h3>
        	<div class="fields">
        	
       			<div class="col-md-12">
					<!-- 일정(계획/후기) -->
        			<div class="form-group">
		            	<div class="select-wrap one-third">
		                	<div class="icon"><span class="ion-ios-arrow-down"></span></div>
		                    <select name="tripType" id="tripType" class="form-control">
		                    	<option value="여행 계획">여행 계획</option>
		                    	<option value="여행 후기">여행 후기</option>
		                    </select>
	                  	</div>
        			</div>
       			</div>        	
        	
	         	<div class="col-md-12">
					<!-- 달력1 -->
        			<div class="form-group">
	                	<input type="text" id="checkin_date" class="form-control" placeholder="출발일" readonly="readonly">
	              	</div>
	         	</div>
	         	<div class="col-md-12">
	             	 <div class="form-group">
	                	<input type="text" id="checkout_date" class="form-control" placeholder="도착일" readonly="readonly">
	             	 </div>
       			</div>
       			
				<div class="col-md-12">
       			<!-- 인원 -->
		        	<div class="form-group">
		                <div class="select-wrap one-third">
		                    <div class="icon"><span class="ion-ios-arrow-down"></span></div>
		                    <select name="tripPersons" id="tripPersons" class="form-control">
		                      	<option value="no">여행 인원</option>
		                      	<option value="1명">1명</option>
		                      	<option value="2명">2명</option>
		                      	<option value="3~5명">3~5명</option>
		                      	<option value="6~10명">6~10명</option>
		                      	<option value="단체">단체</option>
		                    </select>
	                  	</div>
		            </div>
				</div>
       	
	         	<div class="col-md-12">
					<!-- 일정(계획/후기) -->
        			<div class="form-group">
		            	<div class="select-wrap one-third">
		                	<div class="icon"><span class="ion-ios-arrow-down"></span></div>
		                    <select name="tripThema" id="tripThema" class="form-control">
		                    	<option value="no">여행 테마</option>
		                    	<option value="친구랑 여행">친구랑 여행</option>
		                    	<option value="나홀로 여행">나홀로 여행</option>
		                    	<option value="커플 여행">커플 여행</option>
		                    	<option value="가족 여행">가족 여행</option>
		                    	<option value="단체 여행">단체 여행</option>
		                    	<option value="패키지 여행">패키지 여행</option>
		                    </select>
	                  	</div>
        			</div>
       			</div>
       			
       			<!-- 검색 버튼 -->
	        	<div class="form-group">
	            	<input type="button" value="일정 만들기" id="setSchedule" class="btn btn-primary py-3 px-5">
	        	</div>
		    </div>
        </div>
		</div>
<!-- 왼쪽 검색창 END -->

<!-- 오른쪽 -->    
		<div class="col-md-8 ftco-animate destination">
			<div class="text p-3">
				
				<div class="comment-form-wrap">
	                <div class="p-4 bg-light">
	                	<div class="form-group">
	                    	<input type="text" id="scheduleTitle" class="form-control" placeholder="여행 제목을 입력하세요" readonly="readonly"><br>
	                    	<textarea name="scheduleMsg" id="scheduleMsg" cols="30" rows="5" class="form-control" placeholder="간단히 여행을 소개해주세요 =)" readonly="readonly"></textarea>
	                 	 </div>
	                 	 <hr>
						<p class="days">
							<span id="scheduleSetting">&nbsp;</span>
						</p>
	                </div>
	              </div>
	              <br>
				
				<!-- 지도 -->	<!-- 지도에서 선택하고 n일차, n번째 선택, 등록버튼? -->		
				<div class="">
					<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
					<div class="map_wrap">
    					<div id="writeMap" style="width:100%;height:400px;position:relative;overflow:hidden;"></div>
						<div id="daySelectWrap" class="bg_white">
					        <div class="select-wrap">
					            <select name="mapDay" id="mapDay" class="a" onchange="selectChange()">
					            </select>
							</div>
					    </div>
					</div>
				
				</div>		
				<br>
            	
            	<!-- 일차별 내용 -->	
            	<div class="daysAdd" id="daysAdd"></div>
            
			</div>
		</div>
<!-- 오른쪽 END -->
	</div>
	
		<div class="writeEnd" align="center">		
			<input type="button" value="등록" class="btn btn-primary py-3 px-5" id="registerBtn">
			<input type="button" value="취소" class="btn btn-primary py-3 px-5" id="cancelBtn">
	  	</div>
	
	</div>
	</form>
	</section>
<!-- 내용끝 -->

<%@ include file="/WEB-INF/views/include/footer.jsp"%> 
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
<script src="${root}/resources/js/schedule_map.js"></script>
<script src="${root}/resources/js/schedule_write.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" ></script> 
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
</body>
</html>