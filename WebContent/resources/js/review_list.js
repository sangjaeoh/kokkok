/* 더보기 */
var i=0, maxnum=4 , reviewnum=0; //페이징처리 변수
var reviewBcode = "";
var reviewWord = "";
var reviewAjaxData ="";

//무한스크롤 
var win = $(window);
win.scroll(function() {
    if ($(document).height() - win.height() == win.scrollTop()) {    	
      	 maxnum = maxnum+4;
        if(maxnum > reviewnum){
        	maxnum = reviewnum;
        }
        reviewAjaxData = JSON.stringify({"bcode" : reviewBcode, "ccode" : "2", "word" : reviewWord});
        $.ajax({
            url: contextPath+"/review/setList.kok",
            type: "POST",
            contentType : 'application/json;charset=UTF-8',
            dataType: "json",
  		 	data: reviewAjaxData,
            success: function(response) {         
            	makeReviewList(response);
            }
        });
    }
});


//검색
function reviewSearch(){
	if($("#reviewSearchKeyword").val().trim() == ""){
		alert("검색어를 입력해 주세요.");
	}else{
	i=0;
	maxnum=4;
	reviewWord = $("#reviewSearchKeyword").val();
	$('#makeReviewList').empty();
	reviewAjaxData = JSON.stringify({'bcode' : reviewBcode, 'ccode' : '2', 'word' : reviewWord});
    $.ajax({
        url: contextPath+"/review/setList.kok",
        type: "POST",
        contentType : 'application/json;charset=UTF-8',
        dataType: "json",
		 	data: reviewAjaxData,
        success: function(response) {
        	$('#makeReviewList').empty();
        	makeReviewList(response);
        }
    });
	}
}
//카테고리 클릭
function reviewCategory(){
	i=0;
	maxnum=4;	
	$('#makeReviewList').empty();
	reviewAjaxData = JSON.stringify({'bcode' : reviewBcode, 'ccode' : '2', 'word' : reviewWord});
    $.ajax({
        url: contextPath+"/review/setList.kok",
        type: "POST",
        contentType : 'application/json;charset=UTF-8',
        dataType: "json",
		 	data: reviewAjaxData,
        success: function(response) {
        	$('#makeReviewList').empty();
        	makeReviewList(response);
        }
    });
}


//view화면 이동
$(document).on("click", ".reviewListSeq", function() {
	$('#seq').val($(this).attr("reviewListSeq"));	
	$("#reviewListForm").attr("action",contextPath+"/review/view.kok").submit();
});


//리스트 불러오기
function getReviewList(){
	i=0;
	maxnum=4;
	reviewAjaxData = JSON.stringify({'bcode' : reviewBcode, 'ccode' : '2', 'word' : reviewWord});
	$.ajax({
		  url: contextPath+"/review/setList.kok",
		  type: "POST",
		  contentType : 'application/json;charset=UTF-8',
		  dataType: "json",
		  data: reviewAjaxData,
		  success: function(response){			  
			  makeReviewList(response);			  
		  }
	});
}

//ajax 받은 데이터로 reviewList 생성
function makeReviewList(response){
	var reviewList = response.reviewList;
	var reviewViewlist = "";
	reviewnum = reviewList.length;
	if(maxnum>reviewnum){
		maxnum=reviewnum;
	}
	while(i<maxnum){
		reviewViewlist += '<div class="col-md-6 fadeInUp ftco-animate animated destination" id="loading">';
		reviewViewlist += '<div class="text p-3 review-list-cont">';
		reviewViewlist += '<div>';
		if(reviewList[i].bcode == 3){
			reviewViewlist += '<i class="flaticon-meeting-point" style="font-size: 1.5rem; font-weight: bold;">'+reviewList[i].subject+'</i>';
		}
		if(reviewList[i].bcode == 4){
			reviewViewlist += '<i class="flaticon-hotel" style="font-size: 1.5rem; font-weight: bold;">'+reviewList[i].subject+'</i>';
		}
		if(reviewList[i].bcode == 5){
			reviewViewlist += '<i class="flaticon-fork" style="font-size: 1.5rem; font-weight: bold;">'+reviewList[i].subject+'</i>';
		}
		reviewViewlist += '</div>';
		reviewViewlist += '<div align="right">';
		reviewViewlist += '<i class="icon-person" style="font-size: 1rem;">작성자 : '+reviewList[i].userid+'</i><br>';
		reviewViewlist += '<i class="icon-pencil" style="font-size: 1rem;"> '+reviewList[i].logtime+'</i>';
		reviewViewlist += '</div>';
		reviewViewlist += '<div class="text-overflow">';
		reviewViewlist += reviewList[i].content;
		reviewViewlist += '</div>';
		reviewViewlist += '<br>';
		reviewViewlist += '<h5 align="center"><a href="javascript:void(0);" class="reviewListSeq" reviewListSeq="'+reviewList[i].seq+'">상세보기</a></h5>';
		reviewViewlist += '<hr>';
		reviewViewlist += '<p class="bottom-area d-flex">';
		reviewViewlist += '<span><i class="icon-thumbs-o-up"></i> 추천 : '+reviewList[i].recommcount+' &nbsp;|&nbsp; <i class="icon-heart-o"></i> 찜 : '+reviewList[i].wishcount+'</span>';
		reviewViewlist += '</div>';
		reviewViewlist += '</div>';
		reviewViewlist += '</div>';
		reviewViewlist += '</div>';
		
		i++;
	}
	$('#makeReviewList').append(reviewViewlist);
}



//index에서 검색시 사용
//jquery를 이용해서 request parameter를 가져오기 위한 함수 코드
function urlParam(name){
	// 한글을 디코딩하기 위해서 decodeURI 사용
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURI(window.location.href));
	if (results == null) {
		return null;
    } else {
    	return results[1] || 0;
	}	
}

//비 로그인시 리뷰등록 클릭
$(document).on("click", "#impossibleAlert", function() {
	alert("로그인 후 이용 가능합니다.");
});


//정보 버튼들의 색을 원상태로 복원
function initInformationButtonColor() {
	$("#infoArea").attr("style", "");
	$("#infoKeyword").attr("style", "");
	$("#infoStay").attr("style", "");
	$("#infoFood").attr("style", "");
	
}

$(document).ready(function() {
	if (urlParam("searchWord") != null && urlParam("searchWord") != "") {		
		$("#reviewSearchKeyword").val(urlParam("searchWord"));		
		reviewSearch();	
	}	
	
	getReviewList();
	$("div.infoitems").hide();
	$("div.infoKeyword").show();
	$("h3.infoItemsTitle").text("통합 검색");
		
	// Change State When Buttons Click
	$("#infoKeyword").click(function(){
		$("h3.infoItemsTitle").text("통합 검색어 입력");
		reviewBcode = "";
		reviewWord = "";
		reviewCategory();
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoKeyword";
	});
	$("#infoArea").click(function(){	
		$("h3.infoItemsTitle").text("장소 리뷰");
		reviewBcode = 3;
		reviewWord = "";
		reviewCategory();
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoArea";
	});
	$("#infoStay").click(function(){
		$("h3.infoItemsTitle").text("숙박 리뷰");
		reviewBcode = 4;
		reviewWord = "";
		reviewCategory();
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoStay";
	});
	$("#infoFood").click(function(){
		$("h3.infoItemsTitle").text("맛집 리뷰");
		reviewBcode = 5;
		reviewWord = "";
		reviewCategory();
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoFood";
	});
});

