

//삭제버튼
$(document).on("click", "#reviewDeleteBtn", function() {
	var reviewDeleteCheck = confirm("정말로 삭제하시겠습니까?");
	if(reviewDeleteCheck){
	$('#seq').val(articleSeq);
	$("#reviewModifyForm").attr("action",contextPath+"/review/delete.kok").submit();
	}else {return}
});

//댓글쓰기
$(document).on("click", "#commentsBtn", function() {

	if( userInfoUserid!=""){
	var seq = articleSeq;
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



//////찜하기
//찜 불러오기
function getWishView(){
	 var getWishData = JSON.stringify({"seq" : articleSeq, "userid" : userInfoUserid});
	  $.ajax({
		  url: contextPath+"/checkWish.kok",
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

//찜버튼 클릭시
$(document).on("click", "#wishIcon", function() {

	if( userInfoUserid !=""){
	var getWishData = JSON.stringify({"seq" : articleSeq, "userid" : userInfoUserid});
	  $.ajax({
		  url: contextPath+"/registerWish.kok",
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

//html 찜 만드는 메소드
function makeWishView(wishCheck,wishCount){
  $("#wishView").children("div").remove();
  var makeWishView = "";
  if(wishCheck > 0){
	  makeWishView += '<div id="wishIcon"><h5 class="heading mb-4"><i class="icon-heart"></i> 찜 '+ wishCount +'</h5></div>';
  }else{
	  makeWishView += '<div id="wishIcon"><h5 class="heading mb-4"><i class="icon-heart-o"></i> 찜 '+ wishCount +'</h5></div>';
  }
  $("#wishView").append(makeWishView);
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
	getWishView();
	getRecommendView();
});