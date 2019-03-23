// TourAPI 3.0 service key
var serviceKey = "0zAzf%2BGAdBrV1fO%2FpVDQLGfnTgpOC9OKxvQpqS7NtWBLDf06y1iIFk70Qg%2Bf5pBWhggl2%2F7lQTxABewTAmXPcw%3D%3D";
// 목록의 현재 페이지
var currPageNum = 1;
// 목록의 총 갯수
var listTotalCount = 0;
// 한 화면에 보여지는 네비개이션의 페이지 갯수
var navigation_size = 10;
// 관광 목록 한 페이지의 결과 수
var listNumOfRows = 12;
//일정 타입(0=모든 일정, 1=여행 계획, 2=여행 일정)
var listType;
//페이지의 정렬(1=인기순, 2=최신순)
var listArrange;
//테마
var thema;
var themaValue = 0;
//여행기간
var minTerm;
var maxTerm;
//검색어
var searchWord;

$(document).ready(function() {
	
	//해쉬가 있다면 그에 맞춰 값을 얻어오고 그렇지 않다면 초기화
	if (document.location.hash) {
		initPageByHash();
		
	} else {
		if (urlParam("searchWord") != null && urlParam("searchWord") != "") {
//			alert(urlParam("searchWord"));			
			$("#searchWord").val(urlParam("searchWord"));
		}
		
		// 처음은 1페이지
		currPageNum = 1;
		// 처음은 최신순
		$("#listSort").val(2);		
		
		// First Schedule List
		getScheduleList();	
	}
	
	// Input-Range Synchronize with Input-number	
	$("#term1_range").on("input", function() {
		var term1 = parseInt($("#term1_range").val());
		var term2 = parseInt($("#term2_range").val());
		
		if (term1 > term2) {
			$("#term2_number").val($("#term1_range").val());
		} else if (term1 == term2){
			$("#term1_number").val($("#term1_range").val());
			$("#term2_number").val($("#term1_range").val());
		} else {
			$("#term1_number").val($("#term1_range").val());
		}
		
	});
	$("#term2_range").on("input", function() {
		var term1 = parseInt($("#term1_range").val());
		var term2 = parseInt($("#term2_range").val());
		
		if (term2 < term1) {
			$("#term1_number").val($("#term2_range").val());
		} else if (term2 == term1){
			$("#term1_number").val($("#term2_range").val());
			$("#term2_number").val($("#term2_range").val());
		} else {
			$("#term2_number").val($("#term2_range").val());
		}		
		
	});
	
	// Search Button Click Event
	$("#getScheduleList").click(function() {
		currPageNum = 1;
		getScheduleList();
	});
	
});

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

function getScheduleList() {
	
	var urlStr = contextPath + '/schedule/getlist.kok';
	// 일정 타입(0=모든 일정, 1=여행 계획, 2=여행 일정)
	listType = $("#searchSchedule").val();
//	listType = 1;
	// 페이지의 정렬(1=인기순, 2=최신순)
	listArrange = $("#listSort").val();
	// 테마
	thema = $("#searchThema option:selected").text();
	themaValue = $("#searchThema").val();
//	alert(thema);
//	thema = "나홀로 여행";
	// 여행기간
	minTerm = $("#term1_number").val();
	maxTerm = $("#term2_number").val();
	// 검색어
	searchWord = $("#searchWord").val();
//	searchWord = "서울";
	
	var param = {"pg": currPageNum, "order": listArrange, "listNumOfRows": listNumOfRows, "listType": listType,
				 "thema": thema, "minTerm": minTerm, "maxTerm": maxTerm, "searchWord": searchWord};
	
	$.ajax({		
		url : urlStr,
		type : 'GET',
		contentType : 'application/json;charset=UTF-8',
		dataType : 'json',
		data: param,
		success : function(response) {
//			alert("success : function(schedulelist)");
			makeListHtml(response);
		},
		error : function() {
			alert("error : function()");			
		}
		
	});
}

function makeListHtml(json) {
//	alert("makeListHtml(json) start");
	var listcnt = json.schedulelist.length;
	var contentStr = "";
	var btypeNm = ["계획", "후기"];
	for (var i = 0; i < listcnt; i++) {
		var schedule = json.schedulelist[i];
		contentStr += "<div class='col-md-4 ftco-animate  fadeInUp ftco-animated destination'>";		
		contentStr += "<a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq + "&seq= "+schedule.seq+"' class='img img-2 d-flex justify-content-center align-items-center' ";		
		//contentStr += "style='background-image: url(" + contextPath + "/" + schedule.savefolder + "/" + schedule.savepicture + ");'>";		

		contentStr += "style='background-image: url("+rootPt+"/resources/"+schedule.savefolder+"/"+ schedule.savepicture +");'>";		
		
		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";		
		contentStr += "<span class='icon-search2'></span>";		
		contentStr += "</div>";		
		contentStr += "</a>";		
		contentStr += "<div class='text p-3'>";		
		contentStr += "<div class='d-flex'>";		
		contentStr += "<h3><a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq + "'>" + schedule.subject + "</a></h3>";		
		contentStr += "</div>";
		contentStr += "<p>";
//		if (schedule.simpleaddr != null && schedule.simpleaddr != "") {
//			var saddr = schedule.simpleaddr;
//			var addr_array = saddr.split(" ");
////			alert(saddr + " " + addr_array.length);			
//			
//			for(var j = 0; j < addr_array.length; j++){
//				contentStr += "#" + addr_array[j] + " ";
//			}			
//		}
		contentStr += "<br>#" + schedule.persons + "&nbsp;";
		contentStr += "#" + schedule.thema;
		contentStr += "</p>";
		contentStr += "<p class='bottom-area d-flex'>";		
		contentStr += "<span class='days'>" + schedule.startdate + " - " + schedule.enddate + " (" + schedule.period + "일)</span>";
		contentStr += "<span class='ml-auto'>" + btypeNm[schedule.bcode - 1] + "</span>";
		contentStr += "</p>";
		contentStr += "<hr>";		
		contentStr += "<p class='bottom-area d-flex'>";		
		contentStr += "<span><i class='icon-person'></i>" + schedule.userid + "</span>";
		contentStr += "<span class='list-cnt'>";
		contentStr += "<i class='icon-thumbs-o-up'></i> " + schedule.recommcount + " &nbsp;";
		contentStr += "<i class='icon-heart-o'></i> " + schedule.wishcount ;
		contentStr += "</span>";
		contentStr += "</p>";
		contentStr += "</div>";		
		contentStr += "</div>";		
	}
	
	// 일단 싹 지우고 리스트 추가
	$("#scheduleList").children("div").remove();
	$("#scheduleList").append(contentStr);
	listTotalCount = json.totCount;
    // 네비게이터를 만듬
    makeNavigator();
}

function makeNavigator() {
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
    createListHash();
    
}

$(document).on("click", "#lastPage", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);	
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (currPageNum != totalPageCount) {
		currPageNum = totalPageCount;		
		getScheduleList();
		makeNavigator();
	}	
});

$(document).on("click", "#firstPage", function() {
	// 현재 페이지가 1이 아닌 경우에만 첫 페이지로
	if (currPageNum != 1) {
		currPageNum = 1;
		getScheduleList();
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
		getScheduleList();
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
		getScheduleList();
		makeNavigator();
	}	
});

$(document).on("click", ".naviNum", function() {	
	currPageNum = $(this).text();
	getScheduleList();
	makeNavigator();	
});

//웹브라우저 뒤로가기를 위해 hash tag를 작성
function createListHash() {	
	// 값은 현재 페이지 + ^ + ..............    
	var str_hash = "";
	str_hash += currPageNum + "^";
	str_hash += listType + "^";
	str_hash += listArrange + "^";
	str_hash += themaValue + "^";
	str_hash += minTerm + "^";
	str_hash += maxTerm + "^";
	str_hash += searchWord + "^";
	
    document.location.hash = "#" + str_hash;
    
//    alert("document.location.hash");
}

function initPageByHash() {
	var str_hash;
	var arr_value;
	str_hash = decodeURI(document.location.hash);
	str_hash = str_hash.replace("#", "");
	arr_value = str_hash.split("^");
	currPageNum = arr_value[0];
	$("#searchSchedule").val(arr_value[1]);
	$("#listSort").val(arr_value[2]);
	$("#searchThema").val(arr_value[3]);
	$("#term1_number").val(arr_value[4]);
	$("#term2_number").val(arr_value[5]);
	$("#term1_range").val(arr_value[4]);
	$("#term2_range").val(arr_value[5]);
	$("#searchWord").val(arr_value[6]);
	
	getScheduleList();
}