// 목록의 현재 페이지
var currPageNum = 1;
// 목록의 총 갯수
var listTotalCount = 0;
// 한 화면에 보여지는 네비개이션의 페이지 갯수
var navigation_size = 10;
// 관광 목록 한 페이지의 결과 수
var listNumOfRows = 10;

var i=0, maxnum=4 , reviewnum=0; //페이징처리 변수

var tipsBcode = "";

var searchWord = "";

var searchKey = "";

var tipsAjaxData ="";

var username = "";

//일정 타입(0=모든 일정, 1=여행 계획, 2=여행 일정)

//view화면 이동
$(document).on("click", ".tipsListSeq", function() {
	/* alert($(this).attr("tipsListSeq")); */
	$('#seq').val($(this).attr("tipsListSeq"));
	/* alert($('#seq').val()); */
	$("#tipsListForm").attr("action",contextPath+"/tips/view.kok").submit();
});

/* var key="";
var word =""; */


function tipsSearch(){
	if($("#searchWord").val().trim() == ""){
		alert("검색어를 입력해 주세요.");
	}else{
	i=0;
	maxnum=4;
	
	searchKey = $("#searchKey").val();
	searchWord = $("#searchWord").val();
	$('#makeTipsList').empty();
	reviewAjaxData = JSON.stringify({'username' : 'username', 'bcode' : '6', 'pg' : currPageNum, 'searchKey' : searchKey, "searchWord": searchWord, "listNumOfRows": listNumOfRows});
    $.ajax({
        url: contextPath+"/tips/setList.kok",
        type: "POST",
        contentType : 'application/json;charset=UTF-8',
        dataType: "json",
		 	data: reviewAjaxData,
        success: function(response) {
        	$('#makeTipsList').empty();
        	makeTipsList(response);
        }
    });
	}
}

function getTipsList(){ //pg, bcode, key, word

	
	tipsAjaxData = JSON.stringify({'bcode' : '6', 'pg' : currPageNum, 'searchKey' : searchKey, "searchWord": searchWord, "listNumOfRows": listNumOfRows});
	/*alert(tipsAjaxData);*/
	$.ajax({
		  url: contextPath+"/tips/setList.kok",
		  type: "POST",
		  contentType : 'application/json;charset=UTF-8',
		  dataType: "json",
		  data: tipsAjaxData,
		  success: function(response){
			  	makeTipsList(response);			  
		  }
	}); 
	
}

function makeTipsList(response){
	
	var tipsList = response.tipsList;
	var tipsViewlist = "";
	  for(var i=0;i<tipsList.length;i++) { 
		  
			tipsViewlist += '<tr>';
			tipsViewlist += '<td align="center" class="column1a">'+tipsList[i].seq+'</td>';
			tipsViewlist += '<td style="word-break: break-all;" class="column2a tipsListSeq" tipsListSeq="'+tipsList[i].seq+'">'+tipsList[i].subject+'</td>';
			tipsViewlist += '<td style="word-break: break-all;" class="column3a">'+tipsList[i].userid+'</td>';
			tipsViewlist += '<td align="center" class="column4a">'+tipsList[i].logtime+'</td>';
			tipsViewlist += '<td align="center" class="column5a">'+tipsList[i].hit+'</td>';
			tipsViewlist += '<td align="center" class="column6a">'+tipsList[i].recommcount+'</td>';
			tipsViewlist += '</tr>';
			
	} 
	$("#makeTipsList").children("tr").remove()
	$('#makeTipsList').append(tipsViewlist);

	listTotalCount =response. totCount;
    // 네비게이터를 만듬
	/*alert(listTotalCount);*/

    makeNavigator();
}



$(document).ready(function() {
	if (urlParam("searchWord") != null && urlParam("searchWord") != "") {		
		$("#searchWord").val(urlParam("searchWord"));		
		tipsSearch();	
	}	
	getTipsList();
	
	// Search Button Click Event
	$("#getTipsList").click(function() {
			
			tipsSearch()
		});
		
});
	

//비 로그인시 리뷰등록 클릭
$(document).on("click", "#impossibleAlert", function() {
	alert("로그인 후 이용 가능합니다.");
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

	var tipsViewlist = "";
	
	// 마지막 페이지가 전체 페이지보다 클 수는 없음
	if (endPage > totalPageCount) {
		endPage = totalPageCount;
	}
	
	// 현재 페이지가 1이 아닌 경우
	if (pageNum != 1) {
		tipsViewlist+= "<li id='firstPage' class=''><span>&lt;&lt;</span></li>";
	} else {
		tipsViewlist+= "<li id=''><span>&lt;&lt;</span></li>";
	}
	
	// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
	if (preLastPage > 0) {
		tipsViewlist+= "<li id='prevPageGroup' class=''><span>&lt;</span></li>";
	} else {
		tipsViewlist+= "<li id=''><span>&lt;</span></li>";
	}	
	
	// 반복문을 돌며 네비게이터 코드를 작성
	for (var i = startPage; i <= endPage; i ++) {
		if (i != currPageNum) {
			tipsViewlist+= "<li id='' class='naviNum'><span>" + i + "</span></li>";
		} else {
			tipsViewlist+= "<li id='' class='active'><span>" + i + "</span></li>";
		}
				
	}
	
	// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
	if (nextStartPage <= totalPageCount) {
		tipsViewlist+= "<li id='nextPageGroup' class=''><span>&gt;</span></li>";
	} else {
		tipsViewlist+= "<li id=''><span>&gt;</span></li>";
	}
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (pageNum != totalPageCount) {
		tipsViewlist+= "<li id='lastPage' class=''><span>&gt;&gt;</span></li>";
	} else {
		tipsViewlist+= "<li id=''><span>&gt;&gt;</span></li>";
	}	
	
	$("#navigator").children("li").remove();
    $("#navigator").append(tipsViewlist);
    
    // 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//    createListHash();
    
}

$(document).on("click", "#lastPage", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);	
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (currPageNum != totalPageCount) {
		currPageNum = totalPageCount;		
		getTipsList();
		makeNavigator();
	}	
});

$(document).on("click", "#firstPage", function() {
	// 현재 페이지가 1이 아닌 경우에만 첫 페이지로
	if (currPageNum != 1) {
		currPageNum = 1;
		getTipsList();
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
		getTipsList();
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
		getTipsList();
		makeNavigator();
	}	
});

$(document).on("click", ".naviNum", function() {	
	currPageNum = $(this).text().trim();
	getTipsList();
	makeNavigator();	
});