
// 목록의 현재 페이지
var currPageNum = 1;
// 목록의 총 갯수
var listTotalCount = 0;
// 한 화면에 보여지는 네비개이션의 페이지 갯수
var navigation_size = 3;
// 관광 목록 한 페이지의 결과 수
var listNumOfRows = 6;
// 아이디 가져오기
var userid = $("#getuserId").val();


$(document).ready(function() {

	// 처음은 1페이지
	currPageNum = 1;
	myReviewList();
		
	// Search Button Click Event
//	$("#getMyReviewList").click(function() {
//		currPageNum = 1;
//		myReviewList();
//	});
	
});

function myReviewList() {
	
	var urlStr = contextPath + '/member/getmywishreview.kok';

	var param = {"pg": currPageNum, "listNumOfRows": listNumOfRows, "userid": userid}
			
	$.ajax({
		  url: urlStr,
		  type: 'GET',
		  contentType : 'application/json;charset=UTF-8',
		  dataType: 'json',
		  data: param,
		  success: function(response){			  
			  makeReviewList(response);		  
		  },
		  error : function() {
				alert("error : function()");
		  }
	});
}

function makeReviewList(json) {
//	alert("makeReviewList(json) start!!");
	var reviewListCnt = json.myReviewList.length;
	var contentStr = "";
	for (var i = 0; i < reviewListCnt; i++) {
		var review = json.myReviewList[i];
		var reviewName = "";
		var locationImg = "";
		if(review.bcode == 3){
			reviewName = "장소 리뷰";
			locationImg = "meeting-point";
		} else if(review.bcode == 4){
			reviewName = "숙박 리뷰";
			locationImg = "hotel"
		} else if(review.bcode == 5){
			reviewName = "맛집 리뷰";
			locationImg = "fork"
		}
		contentStr += "<div class='col-md-4 ftco-animate fadeInUp ftco-animated destination'>";
//		contentStr += "<a href='" + contextPath + "/review/view.kok?seq=" + review.seq + "' class='img img-2 d-flex justify-content-center align-items-center'>";		
//		contentStr += "style='background-image: url(" + contextPath + "/" + reviewList[i].savefolder + "/" + reviewList[i].savepicture + ");'>";		
//		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";		
//		contentStr += "<span class='icon-search2'></span>";		
//		contentStr += "</div>";		
		contentStr += "</a>";	
		
		contentStr += "<div class='text p-3'>";		
		contentStr += "<div class='d-flex'>";		
		contentStr += "<h3>"	
		contentStr += "<a href='" + contextPath + "/review/view.kok?seq=" + review.seq + "'>";
		contentStr += "<i class='flaticon-"+locationImg+"'/> "+ review.subject;
		contentStr += "</a></h3>";
		contentStr += "</div>";
		contentStr += "<hr>";
		contentStr += "<div class='myreviewdiv' onclick=\"location.href =\'"+ contextPath +"/review/view.kok?seq="+ review.seq + "\'\" style='cursor:pointer;'   ";		
		contentStr += review.content;			
		contentStr += "</div>";

		contentStr += "<br>";
		contentStr += "<p class='days' align='right'><i class='icon-pencil'></i><span> 작성일: "+review.logtime+"</span></p>";

		contentStr += "<hr>";		
		contentStr += "<p class='bottom-area d-flex'>";		
		contentStr += "<span><i class='icon-person'></i> 아이디: " + review.userid + "</span>";
		contentStr += "<span class='ml-auto'>"+reviewName;
		contentStr += "</span>";
		contentStr += "</p>";
		contentStr += "</div>";		
		contentStr += "</div>";		
	}
	
	// 일단 싹 지우고 리스트 추가
	$("#myreviewList").children("div").remove();
	$("#myreviewList").append(contentStr);
	listTotalCount = json.totCount;
	makeNavigator();
}


function makeNavigator() {
//	alert("makeNav Start!");
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 현재 페이지
	var pageNum = currPageNum;
	// 이전 페이지 그룹의 마지막 페이지
	var preLastPage = parseInt((pageNum - 1) / naviSize)  * naviSize;	
	// 시작 페이지
	var startPage = preLastPage + 1;	
	// 마지막 페이지
	var endPage = preLastPage + naviSize;
	// 다음 페이지 그룹의 시작 페이지
	var nextStartPage = startPage + naviSize;
	// html 코드
	var contentStr = "";
	
	// 마지막 페이지가 전체 페이지보다 클 수는 없음
	if (endPage > totalPageCount) {
		endPage = totalPageCount;
	}
	
	// 현재 페이지가 1이 아닌 경우
	if (pageNum != 1) {
		contentStr+= "<li id='firstPage' class=''><span>&lt;&lt;</span></li>";
	} else {
		contentStr+= "<li id=''><span>&lt;&lt;</span></li>";
	}
	
	// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
	if (preLastPage > 0) {
		contentStr+= "<li id='prevPageGroup' class=''><span>&lt;</span></li>";
	} else {
		contentStr+= "<li id=''><span>&lt;</span></li>";
	}	
	
	// 반복문을 돌며 네비게이터 코드를 작성
	for (var i = startPage; i <= endPage; i ++) {
		if (i != currPageNum) {
			contentStr+= "<li id='' class='naviNum'><span>" + i + "</span></li>";
		} else {
			contentStr+= "<li id='' class='active'><span>" + i + "</span></li>";
		}
				
	}
	
	// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
	if (nextStartPage <= totalPageCount) {
		contentStr+= "<li id='nextPageGroup' class=''><span>&gt;</span></li>";
	} else {
		contentStr+= "<li id=''><span>&gt;</span></li>";
	}
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (pageNum != totalPageCount) {
		contentStr+= "<li id='lastPage' class=''><span>&gt;&gt;</span></li>";
	} else {
		contentStr+= "<li id=''><span>&gt;&gt;</span></li>";
	}	
	
	$("#navigator").children("li").remove();
    $("#navigator").append(contentStr);
    
    // 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//    createListHash();
    
}

$(document).on("click", "#lastPage", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);	
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (currPageNum != totalPageCount) {
		currPageNum = totalPageCount;		
		myReviewList();
		makeNavigator();
	}	
});

$(document).on("click", "#firstPage", function() {
	// 현재 페이지가 1이 아닌 경우에만 첫 페이지로
	if (currPageNum != 1) {
		currPageNum = 1;
		myReviewList();
		makeNavigator();
	}	
});

$(document).on("click", "#nextPageGroup", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 이전 페이지 그룹의 마지막 페이지
	var preLastPage = parseInt((currPageNum - 1) / naviSize)  * naviSize;
	// 시작 페이지
	var startPage = preLastPage + 1;
	// 다음 페이지 그룹의 시작 페이지
	var nextStartPage = startPage + naviSize;
		
	// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
	if (nextStartPage <= totalPageCount) {
		currPageNum = nextStartPage;
		myReviewList();
		makeNavigator();
	}	
});

$(document).on("click", "#prevPageGroup", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 이전 페이지 그룹의 마지막 페이지
	var preLastPage = parseInt((currPageNum - 1) / naviSize)  * naviSize;	
		
	// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
	if (preLastPage > 0) {
		currPageNum = preLastPage;
		myReviewList();
		makeNavigator();
	}	
});

$(document).on("click", ".naviNum", function() {	
	currPageNum = $(this).text();
	myReviewList();
	makeNavigator();
});