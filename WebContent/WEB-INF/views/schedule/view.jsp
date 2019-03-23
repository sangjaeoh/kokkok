<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<title>방방콕콕 - 여행 일정 상세</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
<link rel="stylesheet" href="${root}/resources/css/schedule.css">
<script src="${root}/resources/js/schedule_view.js"></script>
<script type="text/javascript">
// 지도

//////////////////////////////


$(document).ready(function() {	
	// 찜, 추천, 댓글 가져오기
	getWishView();
	getRecommendView();
	getCommentsList();	
	
});
function scheduleDeleteBtn(){
	var result = confirm("삭제하시겠습니까?");
	if(result) {
		document.location.href = "${root}/schedule/delete.kok?sseq=${scheduleArticle.sseq}&seq=${scheduleArticle.seq}";
	}
}

// 찜하기
function getWishView(){
	
	 var getWishData = JSON.stringify({"seq" : "${scheduleArticle.seq}", "userid" : "${userInfo.userid}"});
	  $.ajax({
		  url: "${root}/checkWish.kok",
		  type: "POST",
		  dataType: "json",
		  contentType : 'application/json;charset=UTF-8',		  
		  data: getWishData,
		  success: function(response){
			 var wishCheck = response.wishCheck;
			 var wishCount = response.wishCount;				  
			 makeWishView(wishCheck,wishCount);			  
		  }
	  });
}
$(document).on("click", "#scheduleJJim", function() {
	if("${userInfo.userid}" !=""){
	var getWishData = JSON.stringify({"seq" : "${scheduleArticle.seq}", "userid" : "${userInfo.userid}"});
	  $.ajax({
		  url: "${root}/registerWish.kok",
		  type: "POST",
		  dataType: "json",
		  contentType : 'application/json;charset=UTF-8',		  
		  data: getWishData,
		  success: function(response){				
			  var wishCheck = response.wishCheck;
			  var wishCount = response.wishCount;				
			  makeWishView(wishCheck,wishCount);
		  }
	  });
	}else{
		alert("로그인 후 이용 가능합니다.");
	}
});

function makeWishView(wishCheck,wishCount){
	  $("#wishDiv").children("div").remove();
	  var makeWish = "";
	  if(wishCheck > 0){
		  makeWish += '<div id="scheduleJJim"><h3 class="heading mb-4"><i class="icon-heart"></i> 찜 '+ wishCount +'</h3></div>';
	  }else{
		  makeWish += '<div id="scheduleJJim"><h3 class="heading mb-4"><i class="icon-heart-o"></i> 찜 '+ wishCount +'</h3></div>';
	  }
	  $("#wishDiv").append(makeWish);
}

// 추천
function getRecommendView(){
	 var getRecommendData = JSON.stringify({"seq" : "${scheduleArticle.seq}", "userid" : "${userInfo.userid}"});
	  $.ajax({
		  url: "${root}/checkRecommend.kok",
		  type: "POST",
		  dataType: "json",
		  contentType : 'application/json;charset=UTF-8',		  
		  data: getRecommendData,
		  success: function(response){
			 var recommendCheck = response.recommendCheck;
			 var recommendCount = response.recommendCount;				  
			 makeRecommendView(recommendCheck,recommendCount);			  
		  }
	  });
}
$(document).on("click", "#scheduleRecomm", function() {
	if( "${userInfo.userid}" !=""){
	var getRecommendData = JSON.stringify({"seq" : "${scheduleArticle.seq}", "userid" : "${userInfo.userid}"});
	  $.ajax({
		  url: "${root}/registerRecommend.kok",
		  type: "POST",
		  dataType: "json",
		  contentType : 'application/json;charset=UTF-8',		  
		  data: getRecommendData,
		  success: function(response){				
			 var recommendCheck = response.recommendCheck;
			 var recommendCount = response.recommendCount;				  
			 makeRecommendView(recommendCheck,recommendCount);	
		  }
	  });	
	}else{
		alert("로그인 후 이용 가능합니다.");
	}
});
function makeRecommendView(recommendCheck,recommendCount){
	$("#recommDiv").children("div").remove();
	var makeRecommend = "";
	if(recommendCheck > 0){
		makeRecommend += '<div id="scheduleRecomm"><h3 class="heading mb-4"><i class="icon-thumbs-up"></i> 추천 '+ recommendCount +'</h3></div>';
	}else{
		makeRecommend += '<div id="scheduleRecomm"><h3 class="heading mb-4"><i class="icon-thumbs-o-up"></i> 추천 '+ recommendCount +'</h3></div>';
	}
	$("#recommDiv").append(makeRecommend);
}

// 댓글
// -쓰기
$(document).on("click", "#commentsBtn", function() { //댓글 등록 버튼 클릭시	
	if("${userInfo.userid}" !=""){	
	var seq = '${scheduleArticle.seq}';
 	var ccontent = $("#ccontent").val(); //댓글 내용 가져오기
	$("#ccontent").val('');	//댓글 내용 비우기
	var commentsData = JSON.stringify({'seq' : seq, 'ccontent' : ccontent});   //댓글 내용 넘기기
	if(ccontent.trim().length != 0) {		
		$.ajax({
			url : '${root}/commentsWrite.kok',
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data : commentsData,
			success : function(response) {
				makeCommentsList(response);
			}
		});
	}else{
		alert("내용을 입력해 주세요");
	}
	}else{
		alert("로그인 후 이용해주세요.");
	}
});

//-수정
var cseq = "";
$(document).on("click", ".moveCommentsUpdate", function() {
	cseq = $(this).attr("commentCseq");
});

$(document).on("click", "#commentsUpdateBtn", function() {
	var seq = '${scheduleArticle.seq}';	
 	var ccontentUpdate = $("#ccontentUpdate").val();
	$("#ccontent").val('');
	$("#ccontentUpdate").val('');
	var commentsData = JSON.stringify({'cseq' : cseq, 'seq' : seq, 'ccontent' : ccontentUpdate});
	if(ccontentUpdate.trim().length != 0) {	
	$.ajax({
			url : '${root}/commentsUpdate.kok',
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data : commentsData,
			success : function(response) {
				makeCommentsList(response);
			}
		});
	}else{
		alert("내용을 입력해 주세요");
	}
});

// -삭제
$(document).on("click", ".commentsDeleteBtn", function() {
	var commentsDeleteCheck = confirm("정말로 삭제하시겠습니까?");
	if(commentsDeleteCheck){
	var seq = '${scheduleArticle.seq}';	
	var cseq = $(this).attr("commentCseq");
	$("#ccontent").val('');
	var commentsData = JSON.stringify({'cseq' : cseq, 'seq' : seq});
		$.ajax({
			url : '${root}/commentsDelete.kok',
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data : commentsData,
			success : function(response) {
				makeCommentsList(response);
			}
		});
	}
});

function makeCommentsList(response){
	$('#commentsList').empty(); //댓글 리스트 목록 비우기
	var commentsList = response.commentsList; //댓글 리스트 가져오기
	var commentsListView = "";	
	for(var i=0;i<commentsList.length;i++){
		commentsListView +='<li class="comment">';
		commentsListView +='<div class="comment-body">';
		commentsListView +='<div class="row d-flex">';
		commentsListView +='<div class="row"> <h3><i class="icon-person"></i> '+commentsList[i].userid+'</h3><div class="meta">'+ commentsList[i].clogtime+'</div></div>';
		if(commentsList[i].userid == "${userInfo.userid}"){// 댓글 작성 ID와 로그인 ID가 같은때 수정버튼
		commentsListView +='<label class="commMDBtn moveCommentsUpdate" data-toggle="modal" data-target="#viewRecommModal" commentCseq ="'+commentsList[i].cseq+'">수정</label>';
		}
		if(commentsList[i].userid == "${userInfo.userid}" || "${userInfo.admincode}" == 1){// 댓글 작성 ID와 로그인 ID가 같은때 , 관리자 삭제버튼
		commentsListView +='<label class="commMDBtn commentsDeleteBtn" commentCseq ="'+commentsList[i].cseq+'">삭제</label>';
		}
		commentsListView +='</div>';
		commentsListView +='<p>'+commentsList[i].ccontent+'</p>';
		commentsListView +='</div>';
		commentsListView +='</li>';		
	}	
	$('#commentsList').append(commentsListView);
}

function getCommentsList(){
	var commentsData = JSON.stringify({'seq' : '${scheduleArticle.seq}'});
	$.ajax({
		url : '${root}/commentsList.kok',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		dataType : 'json',
		data : commentsData,
		success : function(response) {
			makeCommentsList(response);
		}
	});
}

</script>
<style>
.icon-heart { color: #f85e5e;}
.icon-thumbs-up { color: #6887f1;}
#daySelectWrap {
	position:absolute;top:10px;left:10px;width:110px;height:45px;
	margin:10px 0 30px 10px;padding:2px;overflow-y:auto;
	background:#f85959; z-index: 1;font-size:12px;border-radius: 5px;
}
#daySelectWrap #mapDay {
	position:absolute; width:106px; height:41px; padding-left: 10px; border-radius: 5px;
}
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>
<%@ include file="/WEB-INF/views/schedule/viewRecommModal.jsp"%>

    <!-- 내용 -->
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_4.jpg');">
      <div class="overlay"></div>
      <div class="container slcontainer">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 일정 보기</h1>
          </div>
        </div>
      </div>
    </div>

<!-- 내용시작 -->
	<section class="ftco-section ftco-degree-bg">
	<div class="container">
	<div class="row">

<!-- 헤드 -->	
		<div class="col-md-12 ftco-animate destination">
			<div class="text p-3 row">			
				<div class="col-md-4 ftco-animate destination">
					<img src="${root}/resources/${scheduleArticle.savefolder}/${scheduleArticle.savepicture}" alt="" class="img-fluid">
				</div>
				<div class="col-md-8">
						<c:choose>
							<c:when test="${scheduleArticle.bcode eq '1'}"><span class="ml-auto">여행 계획</span></c:when>
							<c:when test="${scheduleArticle.bcode eq '2'}"><span class="ml-auto">여행 후기</span></c:when>
						</c:choose>
						<h3 class="mb-3">${scheduleArticle.subject}</h3>
						${scheduleArticle.content}
						<hr>
						<p class="days">
							<span>
								#${scheduleArticle.persons} #${scheduleArticle.thema}<br>
								<i class="icon-person"></i> ${scheduleArticle.userid} &nbsp;|&nbsp; 
								<i class="icon-today"></i> 여행기간 : ${scheduleArticle.startdate} - ${scheduleArticle.enddate} (${scheduleArticle.period}일)<br>
								<i class="icon-pencil"></i> 게시일 : ${scheduleArticle.logtime} &nbsp;|&nbsp; <i class="icon-pencil"></i> 최종 수정일 : ${scheduleArticle.updatetime}<br>
							</span>
						</p>
				</div>
			</div>	
		</div>
<!-- 헤드 -->	
	
<!-- 왼쪽 -->
		<div class="col-md-4 sidebar ftco-animate">
		
			<div class="sidebar-wrap bg-light ftco-animate viewWrap">
				<div class="cnt">
					<div id="wishDiv"></div>
					<div id="recommDiv"></div>
					<div id="hitDiv"><div class="scheduleHit"><h3 class="heading mb-4"><i class="icon-eye"></i> 조회수 ${scheduleArticle.hit}</h3></div></div>
				</div>
				<h3 class="heading"><i class="icon-tag"></i> 여행지</h3>
              	<div class="tagcloud">
	               <c:forEach varStatus="days" var="reviews" items="${locationArticle}">
			    		<a href="#" class="tag-cloud-link">${reviews}</a>
	               </c:forEach>
	               
              	</div>
              	<hr>
              	<div align="center">
              		<c:if test="${scheduleArticle.userid eq userInfo.userid}">
              			<a href="${root}/schedule/modify.kok?sseq=${scheduleArticle.sseq}&seq=${scheduleArticle.seq}"><input type="button" value="일정 수정" class="btn btn-secondary modiDelBtn"></a>
              		</c:if>
              		<c:if test="${scheduleArticle.userid eq userInfo.userid || userInfo.admincode eq 1}">
              			<input type="button" value="일정 삭제" class="btn btn-secondary modiDelBtn" onclick="scheduleDeleteBtn();">
              		</c:if>
              	</div>
            </div>

<!-- 왼쪽 지도 -->		
        	<div class="sidebar-box ftco-animate">
				<div class="float_sidebar">
					<div class="" style="position: relative">
						<div class="map_wrap">
	    					<div id="writeMap" style="width:100%;height:400px;position:relative;overflow:hidden;"></div>
							<div id="daySelectWrap" class="bg_white">
					        <div class="select-wrap">
					            <select name="mapDay" id="mapDay" class="" onchange="selectChange()">
					            	<c:forEach begin="1" end="${scheduleArticle.period}" var="num">
					            		<option value="day_${num}">${num}일차</option>
					            	</c:forEach>
					            </select>
							</div>
					    </div>
						</div>
					</div>
				</div>
            </div>
        
		</div>
<!-- 왼쪽 End -->
      
<!-- 오른쪽 -->    
		<div class="col-md-8 ftco-animate destination">
	         
			<!-- 일차별 내용 -->	
            <div class="daysAdd3" id="daysAdd3">
            <c:set var="idx" value="0"/>
            <fmt:parseDate value="${scheduleArticle.startdate}" var="myday" pattern="yyyy/MM/dd"/>
            <c:forEach varStatus="day" var="review" items="${reviewArticle}">
            	<c:if test="${idx != review.tripday}">
            		<div class="sl-oneDay">
						<div class="sl-day">
							<label class="seul1" onclick="dayTogg(${review.tripday})">${review.tripday}일차
							<span>
								<jsp:useBean id="myday" class="java.util.Date"/>
								<fmt:formatDate value="${myday}" pattern="yyyy/MM/dd"/>
								<jsp:setProperty property="time" name="myday" value="${myday.time + 86400000}"/>

							</span></label>
							<hr>
						</div>
						<div class="seul1_Item${review.tripday}">
            		<c:set var="idx" value="${review.tripday}"/>
            	</c:if>
			            	<div class="itemBox sl-loc loc-updown">
			             		<span class="itemNum">${review.step}</span>
				            	<label class="seul2 itemTitle" id="itemTitle${review.tripday}_${review.step}">
				            	<c:set var="type" value="${review.bcode}"/>
					       		<c:choose>
					       			<c:when test="${type eq 3}"><i class="flaticon-meeting-point"></i> </c:when>
					       			<c:when test="${type eq 4}"><i class="flaticon-hotel"></i> </c:when>
					       			<c:when test="${type eq 5}"><i class="flaticon-fork"></i> </c:when>
					       		</c:choose>
				            	 ${review.subject}</label>
				            					
								<div class="sl-loc-cont itemCont1">
									${review.content}
								</div> 	
							</div>
            	<c:if test="${day.index < reviewArticle.size()-1}">
            		<c:if test="${reviewArticle.get(day.index+1).tripday != idx}">
            			</div>
            		</div>
            		</c:if>            	
            	</c:if>
        
			</c:forEach>
            </div> 
						
            <!-- 댓글달기  -->           
            <div class="pt-5a">
	        	<div class="comment-form-wrap pt-5">
	              <div class="bg-light commForm">
	                <h5 class="mb-4"><i class="icon-comment"></i> 댓글 </h5>
		               	<div class="row commDiv">
		                    <textarea name="" id="ccontent" cols="30" rows="1" class="form-control commText" placeholder="내용과 무관한 댓글, 악플은 삭제될 수 있습니다."></textarea>
		                   	<div class="center commBtnDiv">
			                   	<input type="button" value="등록" class="btn btn-primary commBtn" id="commentsBtn">
		                   	</div>
		                </div>
		          </div>
	             </div>				            
	           	 <div class="comment-form-wrap pt-3">
	            	<ul class="comment-list" id="commentsList">					            	
		            </ul>
		         </div>
	              <!-- END comment-list -->
            </div>		

		</div>
<!-- 오른쪽 END -->
	</div>
	</div>
	</section>
<!-- 내용끝 -->


<%@ include file="/WEB-INF/views/include/footer.jsp"%>
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
<script src="${root}/resources/js/schedule_view_map.js"></script>

</body>
</html>