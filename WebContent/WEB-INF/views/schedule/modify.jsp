<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
  <head>
    <title>방방콕콕 - 여행 일정 수정</title>
  	<%@ include file="/WEB-INF/views/include/link.jsp"%>
  	<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
  	<link rel="stylesheet" href="${root}/resources/css/schedule.css">
  	<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
 	
<script type="text/javascript">
/*
 * 리뷰 수정 클릭하고 등록시 내용 세팅 안됨... 뭘 가져가서 어떻게 세팅해야하지..
 */
var setSubject = "";
var setContent = "";
var clickParentClass="", clickSubject = "", clickContent ="", clickLat = "",
clickLng = "", clickAddress ="";


$(document).ready(function() {
	var arrObject = new Object();
	var deleteArr = new Array();
	var tripType = "";
	if("${scheduleArticle.bcode}" == 1) {
		tripType = "여행 계획";
	} else if("${scheduleArticle.bcode}" == 2) {
		tripType = "여행 후기";
	} 
	

	$("#tripType > option[value='"+tripType+"']").attr("selected", "true");
	$("#checkin_date").val("${scheduleArticle.startdate}");
	$("#checkout_date").val("${scheduleArticle.enddate}");		
	$("#tripPersons > option[value='${scheduleArticle.persons}']").attr("selected", "true");
	$("#tripThema > option[value='${scheduleArticle.thema}']").attr("selected", "true");
	
	var setStr = "${scheduleArticle.startdate} - ${scheduleArticle.enddate} ( ${scheduleArticle.period}일)  ,  "
		+ tripType  +"  ,  ${scheduleArticle.persons}  ,  ${scheduleArticle.thema}" ;
	$("#scheduleSetting").text(setStr);
	
			
	var tripDays = parseInt("${scheduleArticle.period}");
	setPreDays(tripDays);
	
	
	for(var i=1; i<tripDays+1; i++){
		reorder(i);
		listnumbering(i);
	}
	listReorder(); //list id,name 값 주기
	
	$(".loc-updown").hover(
		function() {	// 오버시 배경색 바꾸고 삭제 버튼 보여줌
            $(this).css('backgroundColor', '#ffecec');
            $(this).find('.modifyBox').show();
            $(this).find('.deleteBox').show();
        },
        function() {	// 아웃시 배경 원래대로 돌리고 삭제버튼 숨김
            $(this).css('background', 'none');
            $(this).find('.modifyBox').hide();
            $(this).find('.deleteBox').hide();
            
        }
	)
	.find(".deleteBox").click(function() {		// 삭제 버튼을 클릭했을 때 동작 지정. 아이템에 포함된 입력 필드에 값이 있으면 정말 삭제할지 물어봄
		var delCheck = confirm('삭제하시겠습니까?');
		if (delCheck == true){
			var seq = $(this).siblings(".seq").val();

			deleteArr.push(seq);
			arrObject.value = deleteArr;

			$(this).parent().remove();
			for(var i=1; i<tripDays+1; i++){
				reorder(i);
				listnumbering(i);
			}
		}
	});

	
	// 등록
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
		} else if(reviewResult != 0) {
			alert("일차별로 일정을 한개 이상 작성해주세요");
			return;
		} else {
			var result = confirm("등록 하시겠습니까?");
			if(result){
				// json 포맷으로 변환
				var arrJson = JSON.stringify(arrObject);
				$('input[id=deleteArr]').val(arrJson);
				
				$('#ssubject').val($("#scheduleTitle").val());
				$('#scontent').val($("#scheduleMsg").val());
				$("#scheduleWriteForm").attr("action", "${root}/schedule/modifyUpdate.kok").submit();
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
var rvCnt = 0;
function listnumbering(numm){
	$(".itemBox"+numm).each(function(i, box) {
		rvCnt += 1;
	});
	
}

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
   <%@ include file="/WEB-INF/views/schedule/modifymodal.jsp"%>
   <%@ include file="/WEB-INF/views/schedule/modifyReviewmodal.jsp"%>
   
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
	
	<input type="hidden" name="sseq" id="sseq" value="${scheduleArticle.sseq}">
	<input type="hidden" name="hseq" id="hseq" value="${scheduleArticle.seq}">
	<input type="hidden" name="sbcode" id="sbcode" value="${scheduleArticle.bcode}">
	<input type="hidden" name="ssubject" id="ssubject" value="${scheduleArticle.subject}">
	<input type="hidden" name="scontent" id="scontent" value='${scheduleArticle.content}'>
	<input type="hidden" name="startdate" id="startdate" value="${scheduleArticle.startdate}">
	<input type="hidden" name="enddate" id="enddate" value="${scheduleArticle.enddate}">
	<input type="hidden" name="persons" id="persons" value="${scheduleArticle.persons}">
	<input type="hidden" name="thema" id="thema" value="${scheduleArticle.thema}"> 
	
	<input type="hidden" name="deleteArr" id="deleteArr" value="">
	
	<div class="container">
	<div class="row">
<!-- 왼쪽 검색창 -->	
		<div class="col-lg-3 sidebar">
		<div class="sidebar-wrap bg-light ftco-animate">
			<h3 class="heading mb-4">대표 사진</h3>
			<div class="ftco-animate destination">
		    		<a href="javascript:uploadFile();" id="mainImg" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url('${root}/resources/${scheduleArticle.savefolder}/${scheduleArticle.savepicture}');">		    		
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
	            	<input type="button" value="일정 수정" id="setSchedule" class="btn btn-primary py-3 px-5">
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
	                    	<input type="text" id="scheduleTitle" class="form-control" value="${scheduleArticle.subject}"><br>
	                    	<textarea name="scheduleMsg" id="scheduleMsg" cols="30" rows="5" class="form-control">${scheduleArticle.content}</textarea>
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
            <div class="daysAdd" id="daysAdd">
            <c:set var="idx" value="0"/>
            <c:set var="listNum" value="0"/>
            <c:forEach varStatus="day" var="review" items="${reviewArticle}">
            	<c:if test="${idx != review.tripday}">
            		<div class="sl-oneDay" id="sl_oneDay_${review.tripday}">
						<div class="sl-day" id="sl_day_${review.tripday}">
							<label class="seul1" onclick="dayTogg(${review.tripday})">${review.tripday}일차
							<span>${scheduleArticle.startdate}</span></label>
							<input type="button" value="+일정 추가" class="btn btn-primary scheduleAdd" data-toggle="modal" data-target="#scheduleModifyModal" onclick="modalSetDay(${review.tripday});"/>
							<hr>
						</div>
						<div class="seul1_Item${review.tripday}" id="itemBoxWrap_${review.tripday}">
            		<c:set var="idx" value="${review.tripday}"/>
            	</c:if>
			            	<div class="itemBox${review.tripday} sl-loc loc-updown">
			             		<span class="itemNum${review.tripday}">${review.step}</span>
				            	<label class="seul2 itemTitle${review.tripday}" id="itemTitle${review.tripday}_${review.step}">
				            	<c:set var="type" value="${review.bcode}"/>
					       		<c:choose>
					       			<c:when test="${type eq 3}"><i class="flaticon-meeting-point reviewType" reviewType=meeting></i> </c:when>
					       			<c:when test="${type eq 4}"><i class="flaticon-hotel reviewType" reviewType="hotel"></i> </c:when>
					       			<c:when test="${type eq 5}"><i class="flaticon-fork reviewType" reviewType="fork"></i> </c:when>
					       		</c:choose>
				            	 ${review.subject}</label>
				            	 <label class="modifyBox" data-toggle="modal" data-target="#scheduleReviewModifyModal" onclick="">수정</label>
				            	 <label class="deleteBox">삭제</label>			
								<div class="sl-loc-cont itemCont${review.tripday}">
									${review.content}									
								</div>

								<input type="hidden" name="seq" class="seq" value="${review.seq}">

								<input type="hidden" class="bcode" value="${review.bcode}">
								<input type="hidden" class="subject" value="${review.subject}">
								<input type="hidden" class="content" value='${review.content}'>
								<input type="hidden" class="location" value="${review.location}">
								<input type="hidden" class="lat" value="${review.lat}">
								<input type="hidden" class="lng" value="${review.lng}">
								<input type="hidden" class="address" value="${review.address}">
								<input type="hidden" class="simpleaddr" value="${review.simpleaddr}">
								<input type="hidden" class="tripday" value="${review.tripday}">
								<input type="hidden" class="step" value="${review.step}">
								
								<c:set var="listNum" value="${listNum+1}"/>
							</div>
            	<c:if test="${day.index < reviewArticle.size()-1}">
            		<c:if test="${reviewArticle.get(day.index+1).tripday != idx}">
            			</div>
            		</div>
            		</c:if>            	
            	</c:if>
        
			</c:forEach>
            </div> 
            
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
<script src="${root}/resources/js/schedule_modify.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" ></script> 
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
</body>
</html>