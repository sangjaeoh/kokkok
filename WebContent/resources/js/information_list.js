// TourAPI 3.0 service key
var serviceKey = "0zAzf%2BGAdBrV1fO%2FpVDQLGfnTgpOC9OKxvQpqS7NtWBLDf06y1iIFk70Qg%2Bf5pBWhggl2%2F7lQTxABewTAmXPcw%3D%3D";
// 지역코드
var areaCode = "";
// 시군구코드
var sigunguCode = "";
// 관광 정보 목록의 현재 페이지
var infoListCurrPageNum = 1;
// 관광 정보의 총 갯수
var infoTotalCount = 0;
// 관광 정보 페이지의 정렬(A=제목순, B=조회순, C=수정일순, D=생성일순)
// 대표이미지가 반드시 있는 정렬(O=제목순, P=조회순, Q=수정일순, R=생성일순)
var infoListArrange = "D";
// 한 화면에 보여지는 관광 목록의 페이지 갯수
var navigation_size = 10;
// 관광 목록 한 페이지의 결과 수
var infoListNumOfRows = 12;
// 현재 관광 정보
var infoTypeId = "infoArea";
// 지도의 위경도
var mapXCoord;
var mapYCoord;
var mapCCoord;
// 뒤로가기 hash를 위해 추가
var contentTypeId = "";
var mapX = 126.981106;
var mapY = 37.568477;
var radius = 1;
var keyword = "";
var sDate = "";
var eDate = "";

$(document).ready(function() {	
	
	//해쉬가 있다면 그에 맞춰 값을 얻어오고 그렇지 않다면 초기화
	if (document.location.hash) {
//		alert("document.location.hash: " + urlParam("searchWord"));
		initPageByHash();		
				
	} else {
//		alert(urlParam("searchWord"));
		// 메인 검색창으로 들어왔다면 통합검색으로 검색함
		if (urlParam("searchWord") != null && urlParam("searchWord") != "") {
//			alert(urlParam("searchWord"));
			infoTypeId = "infoKeyword";
			$("#keyword").val(urlParam("searchWord"));
		}
		
		// Initialize Information Buttons
		setInformationButtons();
		
		// Initialize Area and Sigungu
		getAreaCodeList();
		getSigunguCodeList();
		
		// First Information List
		getInfoList(infoListCurrPageNum);
	}	
	
	// Set Date Format
	$(".datepicker").datepicker({
		format: "yyyymmdd",
		autoclose: true
	});
	
	// Change State When Buttons Click
	$("#infoArea").click(function(){
		infoTypeId = "infoArea";
		setInformationButtons();				
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	$("#infoLocation").click(function(){		
		infoTypeId = "infoLocation";		
		setInformationButtons();
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	$("#infoKeyword").click(function(){
		infoTypeId = "infoKeyword";
		setInformationButtons();
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	$("#infoFestival").click(function(){
		infoTypeId = "infoFestival";
		setInformationButtons();
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	$("#infoStay").click(function(){
		infoTypeId = "infoStay";
		setInformationButtons();
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	
	// Input-Range Synchronize with Input-number  
	$("#location_range").on("input", function() {
		$("#location_number").val($("#location_range").val());
	});
	
	// AreaCodeList Change Event
	$("#areaCodeList").change(function() {
		getSigunguCodeList();
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	
	// SigunguCodeList Change Event
	$("#sigunguCodeList").change(function() {		
		// 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	});
	
	// Search Button Click Event
	$("#getInfoList").click(function() {
		infoListCurrPageNum = 1;		
		getInfoList(infoListCurrPageNum);		
	});
	
	// order type change Event
	$("#orderType").change(function() {
		infoListArrange = $("this").val();
//		infoListCurrPageNum = 1;
		getInfoList(infoListCurrPageNum);		
	});
	
	// Map Modal Click Event
	$("#infoMapModal").on("shown.bs.modal", function(){
		getMapAndExecution();		
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

//Initialize Information Buttons
function setInformationButtons(){
	$("div.infoitems").hide();	
	initInformationButtonColor();
	
	if (infoTypeId == "infoArea") {
		$("div.infoArea").show();
		$("h3.infoItemsTitle").text("지역별 관광정보");
		$("#infoArea").attr("style", "background-color: #f8f9fa; color: #dc3545");
	} else if (infoTypeId == "infoLocation") {
		$("div.infoLocation").show();
		$("h3.infoItemsTitle").text("내주변 관광정보");
		$("#infoLocation").attr("style", "background-color: #f8f9fa; color: #dc3545");
	} else if (infoTypeId == "infoKeyword") {
		$("div.infoKeyword").show();
		$("h3.infoItemsTitle").text("통합 검색");
		$("#infoKeyword").attr("style", "background-color: #f8f9fa; color: #dc3545");
	} else if (infoTypeId == "infoFestival") {
		$("div.infoFestival").show();
		$("h3.infoItemsTitle").text("행사 검색");
		$("#infoFestival").attr("style", "background-color: #f8f9fa; color: #dc3545");
	} else if (infoTypeId == "infoStay") {
		$("div.infoStay").show();
		$("h3.infoItemsTitle").text("숙박 검색");
		$("#infoStay").attr("style", "background-color: #f8f9fa; color: #dc3545");
	}
}

function getInfoList(pageNum) {
	if (infoTypeId == "infoArea") {
		getInfoAreaList(pageNum);
	} else if (infoTypeId == "infoLocation") {
		getInfoLocationList(pageNum);
	} else if (infoTypeId == "infoKeyword") {
		getInfoKeywordList(pageNum);
	} else if (infoTypeId == "infoFestival") {
		getInfoFestivalList(pageNum);
	} else if (infoTypeId == "infoStay") {
		getInfoStayList(pageNum);
	}
}

// 정보 버튼들의 색을 원상태로 복원
function initInformationButtonColor() {
	$("#infoArea").attr("style", "");
	$("#infoLocation").attr("style", "");
	$("#infoKeyword").attr("style", "");
	$("#infoFestival").attr("style", "");
	$("#infoStay").attr("style", "");	
}

function getAreaCodeList() {
	$.ajax({
	    url : "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?" + 
	    		"ServiceKey=" + serviceKey +
	    		"&MobileOS=ETC&MobileApp=KokKok&numOfRows=20",
	    type : "GET",
	    success : function(xml){
	    	var xmlData = $(xml).find("item");
//	        var listLength = xmlData.length;		        
	        var contentStr = "<option value='' class='areaCode'>지역선택</option>";
	        if (xmlData != null) {			        
		    	$(xmlData).each(function(){
		    		contentStr += "<option value='"+ $(this).find("code").text() +"' class='areaCode'>" + $(this).find("name").text() + "</option>";				        
		    	});
	        }
	        $(".areaCode").remove();
	        $("#areaCodeList").append(contentStr);
	        // areaCode 값이 있다면 세팅
	        $("#areaCodeList").val(areaCode);
	    }
	});
}

function getSigunguCodeList() {
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	
	$.ajax({
	    url : "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?" +
	    		"ServiceKey=" + serviceKey +
	    		"&areaCode=" + areaCode + 
	    		"&numOfRows=1000&pageNo=1&MobileOS=ETC&MobileApp=KokKok",
	    type : "GET",
	    success : function(xml){
	    	var contentStr = "<option value='' class='sigunguCode'>시군구선택</option>";	    	
	    	if (areaCode != "") {
		    	var xmlData = $(xml).find("item");
//		        var listLength = xmlData.length;
		        if (xmlData != null) {
			    	$(xmlData).each(function(){
			    		contentStr += "<option value='"+ $(this).find("code").text() +"' class='sigunguCode'>" + $(this).find("name").text() + "</option>";				        
			    	});
		        }
	    	}
	        $(".sigunguCode").remove();
	        $("#sigunguCodeList").append(contentStr);
	        // sigunguCode 값이 있다면 세팅
	        $("#sigunguCodeList").val(sigunguCode);
	    	
	    }
	});
}

function makeListToHtml(xml){
	var xmlData = $(xml).find("item");
//    var listLength = xmlData.length;		        
    var contentStr = "";
    if (xmlData != null) {
    	$(xmlData).each(function(){
    		// 그럴리는 없지만 contentTypeId, contentId가 없으면 목록에 삽입할 수 없음
    		if ($(this).find("contenttypeid").text() != null && $(this).find("contentid").text() != null) {    				
    			// 지역 이름을 얻기 위함
	    		var siLocation = $(this).find("addr1").text().split(' ');
	    		
	    		contentStr += "<div class='col-md-4 ftco-animate informationItem fadeInUp ftco-animated'>";		    		
	    		contentStr += "<div class='destination'>";
	    		contentStr += "<a href='" + contextPath + "/information/view.kok";
	    		contentStr += "?contentTypeId=" + $(this).find("contenttypeid").text(); 
	    		contentStr += "&contentId=" + $(this).find("contentid").text();
	    		contentStr += "' class='img img-2 d-flex justify-content-center align-items-center' "
	    		// 이미지가 없는 경우 이미지 처리
	    		if ($(this).find("firstimage").text() != null && $(this).find("firstimage").text() != "") {
	    			contentStr += "style='background-image: url(" + $(this).find("firstimage").text() + ");'>";
	    		} else {
	    			contentStr += "style='background-image: url(" + contextPath + "/resources/images/noimg.gif);'>";
	    		}
	    		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";
	    		contentStr += "<span class='icon-search2'></span></div></a>";
	    		contentStr += "<div class='text p-3'>";
	    		contentStr += "<span class='tag'>"+ siLocation[0] +"</span>";
	    		contentStr += "<h3><a href='" + contextPath + "/information/view.kok"
	    		contentStr += "?contentTypeId=" + $(this).find("contenttypeid").text(); 
	    		contentStr += "&contentId=" + $(this).find("contentid").text();
	    		contentStr += "'>" + $(this).find("title").text() + "</a></h3>";
	    		contentStr += "<div align='right'>";
	    		// 행사가 아닌 경우 date 정보가 없음
	    		if ($(this).find("eventstartdate").text() != null && $(this).find("eventenddate").text() != null &&
	    			$(this).find("eventstartdate").text() != "" && $(this).find("eventenddate").text() != "") {
	    			contentStr += "<span class='listing'>"+ $(this).find("eventstartdate").text() +" ~ "+ $(this).find("eventenddate").text() +"</span>";
	    		}
	    		contentStr += "</div></div></div></div>";
	    		
    		}
    	});
    }
    // 일단 목록을 지우고 채움
    $(".informationItem").remove();
    $("#informationItemList").append(contentStr);
    // 관광 정보의 총 갯수
    infoTotalCount = $(xml).find("totalCount").text();
    // 네비게이터를 만듬
    makeNavigator();
}

// 검색 조건에 맞는 결과를 출력
function getInfoAreaList(pageNum) {
	contentTypeId = $("#contentTypeIdList").val();
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	if ($("#sigunguCodeList").val() != null) {
		sigunguCode = $("#sigunguCodeList").val();
	}
	infoListArrange = $("#orderType").val();	
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&areaCode=" + areaCode +
				"&sigunguCode=" + sigunguCode +
				"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
				"&arrange=" + infoListArrange + 
				"&numOfRows=" + infoListNumOfRows + 
				"&pageNo=" + pageNum;
//				"&eventStartDate=20190101&eventEndDate=20190302";
//	alert(url);
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
	    	makeListToHtml(xml);
	    },
		error : function() {
			alert("fail");
		}
	});
}

//검색 조건에 맞는 결과를 출력
function getInfoLocationList(pageNum) {
	contentTypeId = $("#contentTypeIdList").val();
	mapX = $("#mapX").val();
	mapY = $("#mapY").val();
	radius = $("#location_number").val();
	infoListArrange = $("#orderType").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&mapX=" + mapX +
				"&mapY=" + mapY +
				"&radius=" + (radius  * 1000) +
				"&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
				"&arrange=" + infoListArrange + 
				"&numOfRows=" + infoListNumOfRows + 
				"&pageNo=" + pageNum;		
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){	    	
	    	makeListToHtml(xml);	        
	    },
		error : function() {
			alert("fail");
		}
	});
}

//검색 조건에 맞는 결과를 출력
function getInfoKeywordList(pageNum) {
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	if ($("#sigunguCodeList").val() != null) {
		sigunguCode = $("#sigunguCodeList").val();
	}
	keyword = $("#keyword").val();
	infoListArrange = $("#orderType").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?" +
					"ServiceKey=" + serviceKey +
					"&keyword=" + encodeURIComponent(keyword) +
					"&areaCode=" + areaCode +
					"&sigunguCode=" + sigunguCode +
					"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
					"&arrange=" + infoListArrange + 
					"&numOfRows=" + infoListNumOfRows + 
					"&pageNo=" + pageNum;		
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
//	    	console.log(url);
	    	makeListToHtml(xml);	        
	    },
		error : function() {
			alert("fail");
		}	    
	});
}

//검색 조건에 맞는 결과를 출력
function getInfoFestivalList(pageNum) {
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	if ($("#sigunguCodeList").val() != null) {
		sigunguCode = $("#sigunguCodeList").val();
	}
	sDate = $("#eventStartDate").val();
	eDate = $("#eventEndDate").val();	
	
	if (eventStartDate > eventEndDate) {
		alert("시작날짜가 끝날짜보다 큽니다.\n" + "다시 입력해주세요.");
		return;
	}
	infoListArrange = $("#orderType").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?" +
					"ServiceKey=" + serviceKey +
					"&eventStartDate=" + sDate +
					"&eventEndDate=" + eDate +
					"&areaCode=" + areaCode +
					"&sigunguCode=" + sigunguCode +
					"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
					"&arrange=" + infoListArrange + 
					"&numOfRows=" + infoListNumOfRows + 
					"&pageNo=" + pageNum;		
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
//	    	console.log(url);
	    	makeListToHtml(xml);	        
	    },
		error : function() {
			alert("fail");
		}	    
	});
}

//검색 조건에 맞는 결과를 출력
function getInfoStayList(pageNum) {
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	if ($("#sigunguCodeList").val() != null) {
		sigunguCode = $("#sigunguCodeList").val();
	}	
	infoListArrange = $("#orderType").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay?" +
					"ServiceKey=" + serviceKey +
					"&areaCode=" + areaCode +
					"&sigunguCode=" + sigunguCode +
					"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
					"&arrange=" + infoListArrange + 
					"&numOfRows=" + infoListNumOfRows + 
					"&pageNo=" + pageNum;		
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
//	    	console.log(url);
	    	makeListToHtml(xml);	        
	    },
		error : function() {
			alert("fail");
		}	    
	});
}

function makeNavigator() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((infoTotalCount - 1) / infoListNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 현재 페이지
	var pageNum = infoListCurrPageNum;
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
		if (i != infoListCurrPageNum) {
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
	var totalPageCount = parseInt((infoTotalCount - 1) / infoListNumOfRows + 1);	
	
	// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
	if (infoListCurrPageNum != totalPageCount) {
		infoListCurrPageNum = totalPageCount;		
		getInfoList(infoListCurrPageNum);
		makeNavigator();
	}	
});

$(document).on("click", "#firstPage", function() {
	// 현재 페이지가 1이 아닌 경우에만 첫 페이지로
	if (infoListCurrPageNum != 1) {
		infoListCurrPageNum = 1;
		getInfoList(infoListCurrPageNum);
		makeNavigator();
	}	
});

$(document).on("click", "#nextPageGroup", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((infoTotalCount - 1) / infoListNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 이전 페이지 그룹의 마지막 페이지
	var preLastPage = parseInt((infoListCurrPageNum - 1) / naviSize)  * naviSize;
	// 시작 페이지
	var startPage = preLastPage + 1;
	// 다음 페이지 그룹의 시작 페이지
	var nextStartPage = startPage + naviSize;
		
	// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
	if (nextStartPage <= totalPageCount) {
		infoListCurrPageNum = nextStartPage;
		getInfoList(infoListCurrPageNum);
		makeNavigator();
	}	
});

$(document).on("click", "#prevPageGroup", function() {
	// 전체 페이지 갯수
	var totalPageCount = parseInt((infoTotalCount - 1) / infoListNumOfRows + 1);
	// 목록을 몇 페이지 단위로 보게 할 것인가
	var naviSize = navigation_size;
	// 이전 페이지 그룹의 마지막 페이지
	var preLastPage = parseInt((infoListCurrPageNum - 1) / naviSize)  * naviSize;	
		
	// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
	if (preLastPage > 0) {
		infoListCurrPageNum = preLastPage;
		getInfoList(infoListCurrPageNum);
		makeNavigator();
	}	
});

$(document).on("click", ".naviNum", function() {	
	infoListCurrPageNum = $(this).text();
	getInfoList(infoListCurrPageNum);
	makeNavigator();	
});

// 웹브라우저 뒤로가기를 위해 hash tag를 작성
function createListHash() {	
	// 값은 관광정보유형 + 구분자(^) + 현재 페이지 + ^ + ..............    
	var str_hash = "";
	str_hash += infoTypeId + "^";
	str_hash += areaCode + "^";
	str_hash += sigunguCode + "^";
	str_hash += infoListCurrPageNum + "^";
	str_hash += contentTypeId + "^";
	str_hash += mapX + "^";
	str_hash += mapY + "^";
	str_hash += radius + "^";
	str_hash += keyword + "^";
	str_hash += sDate + "^";
	str_hash += eDate + "^";
   
    document.location.hash = "#" + str_hash;
    
//    alert("document.location.hash");
}

function initPageByHash() {
	var str_hash;
	var arr_value;
	str_hash = decodeURI(document.location.hash);
	str_hash = str_hash.replace("#", "");
	arr_value = str_hash.split("^");
	infoTypeId = arr_value[0];
	areaCode = arr_value[1];
	sigunguCode = arr_value[2];
	infoListCurrPageNum = arr_value[3];
	$("#contentTypeIdList").val(arr_value[4]);
	$("#mapX").val(arr_value[5]);
	$("#mapY").val(arr_value[6]);
	$("#location_range").val(arr_value[7]);
	$("#location_number").val(arr_value[7]);
	$("#keyword").val(arr_value[8]);
	$("#eventStartDate").val(arr_value[9]);
	$("#eventEndDate").val(arr_value[10]);
	
	// Initialize Information Buttons
	setInformationButtons();
	
	// Initialize Area and Sigungu
	getAreaCodeList();
	getSigunguCodeList();
	
	// First Information List
	getInfoList(infoListCurrPageNum);
}

// 지도에 관한 함수
function getMapAndExecution() {
	var mapContainer = document.getElementById('daumMap'), // 지도를 표시할 div
	mapXCoord = $("#mapX").val();
	mapYCoord = $("#mapY").val();
	mapOption = {
	    center: new daum.maps.LatLng(mapYCoord, mapXCoord), // 지도의 중심좌표
//	    center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	    level: 3 // 지도의 확대 레벨
	};
	
	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	var imageSrc = 'https://phinf.pstatic.net/memo/20190225_65/sseul878_1551068626698VMnPU_PNG/marker_red2.png?type=w740', // 마커이미지의 주소입니다    
	imageSize = new daum.maps.Size(40, 42), // 마커이미지의 크기입니다
	imageOption = {offset: new daum.maps.Point(13, 37)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	//마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
	var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
	markerPosition = new daum.maps.LatLng(mapYCoord, mapXCoord); // 마커가 표시될 위치입니다

	//지도를 클릭한 위치에 표출할 마커입니다
	var marker = new daum.maps.Marker({ 
	// 지도 중심좌표에 마커를 생성합니다 
	position: map.getCenter() ,
	image: markerImage // 마커이미지 설정 
	}); 
	//지도에 마커를 표시합니다
	marker.setMap(map);

	//지도에 클릭 이벤트를 등록합니다
	//지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {        

	// 클릭한 위도, 경도 정보를 가져옵니다 
	var latlng = mouseEvent.latLng; 

	// 마커 위치를 클릭한 위치로 옮깁니다
	marker.setPosition(latlng);
	
	var lon = latlng.getLng();
	var lat = latlng.getLat();				
	
	mapXCoord = parseFloat(lon).toFixed(6);
	mapYCoord = parseFloat(lat).toFixed(6);
	mapCCoord = mapXCoord;

	var message = '위도: ' + mapYCoord + '  ';
	message += '경도: ' + mapXCoord + '';

	var resultDiv = document.getElementById('clickLatlng'); 
	resultDiv.innerHTML = message;

	});
}

$(document).on("click", "#mapApplyBtn", function() {
	$("#mapX").val(mapCCoord);
	$("#mapY").val(mapYCoord);
});





