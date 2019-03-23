<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%>
<link rel="stylesheet" href="${root}/resources/css/community.css">
<link rel="stylesheet" href="${root}/resources/css/review.css">
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
var articleSeq = '${article.seq}';
var userInfoUserid = '${userInfo.userid}';
var admincode ='${userInfo.admincode}';
</script>
</head>
<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>
<%@ include file="/WEB-INF/views/include/commentsUpdateModal.jsp"%>

<div class="hero-wrap js-fullheight3" style="background-image: url('${root}/resources/images/bg_5.jpg');">
	<div class="overlay"></div>
	<div class="container">
		<div class="row no-gutters slider-text js-fullheight3 align-items-center justify-content-center" data-scrollax-parent="true">
			<div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
				<!-- <p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-2"><a href="index.jsp">Home</a></span> <span>Blog</span></p> -->
				<h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 꿀팁</h1>
			</div>
		</div>
	</div>
</div>

<section class="ftco-section ftco-degree-bg">
	<div class="container">
	<div class="row">
			<div class="col-md-12 ftco-animate destination">	
			
			
			<form name ="tipsViewForm" id="tipsViewForm" method="POST" action="">				
				<input type="hidden" name="seq" id="seq" value="">
							
							
							<span>
								<h3>&nbsp;&nbsp;${article.subject}</h3>
								
								<div align="right">
								<i class="icon-person"></i>작성자 : ${article.userid}<br>
								<i class="icon-pencil"></i>게시일 : ${article.logtime}<br><br>
								<div class="cnt" id="wishView"></div>
								<div class="cnt" id="recommendView"></div>
								<div class="cnt" id="likeView">
								<span><h5 class="heading mb-4"><i class="icon-eye"></i> 조회수 ${article.hit}</h5></span>
								</div>
								</div>					
							</span>
							<hr>
							<div class="review-cont">
							<div class="sl-loc-cont p-3">								
							${article.content}
							</div>
							</div>

							<!-- END comment-list -->

							<div class="pt-5a">
							
					        <!-- 댓글달기 -->           
					              <div class="comment-form-wrap pt-5">
				               		 <h5 class="mb-4"><i class="icon-comment"></i> 댓글 </h5>
					                 <div class="row commDiv">
					                    <textarea name="" id="ccontent" cols="30" rows="1" class="form-control commText" placeholder="내용과 무관한 댓글, 악플은 삭제될 수 있습니다."></textarea>
					                   	<div class="center commBtnDiv">
						                   	<input type="button" value="등록" class="btn btn-primary commBtn" id="commentsBtn">
					                   	</div>
					                 </div>
				             	  </div>	
				             	  			            
				           		  <div class="comment-form-wrap pt-5">
				            		 <ul class="comment-list" id="commentsList">					            	
					           		 </ul>
					          	  </div>
						     <!-- END comment-list -->
					              
					            </div>
					            
											
								<div class="form-group" style="margin-top: 320px;">
						        	<a href="${root}/tips/list.kok">
										<input type="button" value="글목록" class="btn btn-primary py-2 px-4">
									</a>
									<c:if test="${article.userid eq userInfo.userid}">
									<input type="button" id="tipsModifyBtn" tipsListSeq="${article.seq}" value="수정" class="btn btn-primary py-2 px-4" style="float: right;" >
									</c:if>
					      			<c:if test="${article.userid eq userInfo.userid || userInfo.admincode eq 1}">
					        		<input type="button" id="tipsDeleteBtn" value="삭제" class="btn btn-primary py-2 px-4" style="float: right; margin-right: 8px;">
					        		</c:if>
				          
				    			</div>
		    			
			</form>
			
</div>
</div>
</div>

<script type="text/javascript">

$(document).on("click", "#tipsDeleteBtn", function() {
	/* alert('${article.seq}'); */
	var tipsDeleteCheck = confirm("정말로 삭제하시겠습니까?");
	if(tipsDeleteCheck){
	$('#seq').val('${article.seq}');
	$("#tipsViewForm").attr("action","${root}/tips/delete.kok").submit();
	}else {return}
});

$(document).on("click", "#tipsModifyBtn", function() {
	/* alert('${article.seq}'); */
	$('#seq').val('${article.seq}');
	/* alert($('#seq').val()); */
	$("#tipsViewForm").attr("action","${root}/tips/modify.kok").submit();
});

 
//댓글쓰기
$(document).on("click", "#commentsBtn", function() {

	if( userInfoUserid!=""){
	var seq = '${article.seq}';	
 	var ccontent = $("#ccontent").val();
	$("#ccontent").val('');	
	var commentsData = JSON.stringify({'seq' : seq, 'ccontent' : ccontent});
	if(ccontent.trim().length != 0) {		
		$.ajax({
			url : contextPath+'/commentsWrite.kok',
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data : commentsData,
			success : function(response) {
				makeCommentsList(response);
			}
		});
	}else{
		alert("내용을 입력해 주세요.");
	}
	}else{
		alert("로그인 후 이용 가능합니다.");
	}
	
});
//댓글삭제
$(document).on("click", ".commentsDeleteBtn", function() {
	var commentsDeleteCheck = confirm("정말로 삭제하시겠습니까?");
	if(commentsDeleteCheck){
	var seq = articleSeq;	
	var cseq = $(this).attr("commentCseq");
	$("#ccontent").val('');
	var commentsData = JSON.stringify({'cseq' : cseq, 'seq' : seq});
		$.ajax({
			url : contextPath+'/commentsDelete.kok',
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

//댓글수정
var cseq = "";
$(document).on("click", ".moveCommentsUpdate", function() {
	cseq = $(this).attr("commentCseq");
});

$(document).on("click", "#commentsUpdateBtn", function() {
	var seq = articleSeq;	
 	var ccontentUpdate = $("#ccontentUpdate").val();
	$("#ccontent").val('');
	$("#ccontentUpdate").val('');
	var commentsData = JSON.stringify({'cseq' : cseq, 'seq' : seq, 'ccontent' : ccontentUpdate});
	if(ccontentUpdate.trim().length != 0) {		
		$.ajax({
			url : contextPath+'/commentsUpdate.kok',
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data : commentsData,
			success : function(response) {
				makeCommentsList(response);
				alert("댓글이 수정되었습니다.");
			}
		});
	}else{
		alert("내용을 입력해 주세요.");
	}	
});


//댓글리스트 불러오기
function getCommentsList(){
	var commentsData = JSON.stringify({'seq' : articleSeq});
	$.ajax({
		url : contextPath+'/commentsList.kok',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		dataType : 'json',
		data : commentsData,
		success : function(response) {
			makeCommentsList(response);
		}
	});
	
}


//댓글리스트 만드는 메소드
function makeCommentsList(response){
	$('#commentsList').empty();
	var commentsList = response.commentsList;
	var commentsListView = "";	
	for(var i=0;i<commentsList.length;i++){
		commentsListView +='<li class="comment">';
		commentsListView +='<div class="comment-body">';
		commentsListView +='<div class="row d-flex">';
		commentsListView +='<div class="p-2 mr-auto"> <span style="font-size: 1.2rem;"><i class="icon-person"></i>'+commentsList[i].userid+'</span>&nbsp;&nbsp;&nbsp;'+ commentsList[i].clogtime+'</div>';
		if(commentsList[i].userid == userInfoUserid){// 댓글 작성 ID와 로그인 ID가 같은때 수정버튼
		commentsListView +='<div class="p-2"><input type="button" value="수정" class="btn btn-primary commBtn moveCommentsUpdate" data-toggle="modal" data-target="#commentsUpdateModal" commentCseq ="'+commentsList[i].cseq+'"></div>';
		}
		if(commentsList[i].userid == userInfoUserid || admincode == 1){// 댓글 작성 ID와 로그인 ID가 같은때 , 관리자 삭제버튼
		commentsListView +='<div class="p-2"><input type="button" value="삭제" class="btn btn-primary commBtn commentsDeleteBtn" commentCseq ="'+commentsList[i].cseq+'"></div>';
		}
		commentsListView +='</div>';
		commentsListView +='<p>'+commentsList[i].ccontent+'</p>';
		commentsListView +='</div>';
		commentsListView +='</li>';		
	}	
	$('#commentsList').append(commentsListView);
}



//추천하기
//추천 불러오기
function getRecommendView(){
	 var getRecommendData = JSON.stringify({"seq" : articleSeq, "userid" : userInfoUserid});
	  $.ajax({
		  url: contextPath+"/checkRecommend.kok",
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

//추천 클릭시
$(document).on("click", "#recommendIcon", function() {	
	if( userInfoUserid !=""){
	var getRecommendData = JSON.stringify({"seq" : articleSeq, "userid" : userInfoUserid});
	  $.ajax({
		  url: contextPath+"/registerRecommend.kok",
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

//html 추천 만드는 메소드
function makeRecommendView(recommendCheck,recommendCount){
$("#recommendView").children("div").remove();
var makeRecommendView = "";
if(recommendCheck > 0){
	  makeRecommendView += '<div id="recommendIcon"><h5 class="heading mb-4"><i class="icon-thumbs-up"></i> 추천 '+ recommendCount +'</h5></div>';
}else{
	  makeRecommendView += '<div id="recommendIcon"><h5 class="heading mb-4"><i class="icon-thumbs-o-up"></i> 추천 '+ recommendCount +'</h5></div>';
}
$("#recommendView").append(makeRecommendView);
}	   



$(document).ready(function() {
	getCommentsList();	
	getRecommendView();
});
</script>

<%@ include file="/WEB-INF/views/include/footer.jsp"%>
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>

