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

$(document).ready(function() {
	// Initialize Information Buttons
	$("div.infoitems").hide();
	$("div.infoKeyword").show();
	$("h3.infoItemsTitle").text("통합 검색");
	
	// Initialize Area and Sigungu
	getAreaCodeList();
	getSigunguCodeList();
	
	// First Information List
	getInfoKeywordList(1);
	
	// Set Date Format
	$(".datepicker").datepicker({
		format: "yyyymmdd",
		autoclose: true
	});
	
	// Change State When Buttons Click
	$("#infoKeyword").click(function(){		 
		$("div.infoitems").hide();
		$("div.infoKeyword").show();
		$("h3.infoItemsTitle").text("통합 검색");
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoKeyword";
	});
	$("#infoArea").click(function(){
		$("div.infoitems").hide();
		$("div.infoArea").show();
		$("h3.infoItemsTitle").text("장소 리뷰");
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoArea";
	});
	$("#infoStay").click(function(){
		$("div.infoitems").hide();
		$("div.infoStay").show();
		$("h3.infoItemsTitle").text("숙박 리뷰");
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoStay";
	});
	$("#infoFood").click(function(){
		$("div.infoitems").hide();
		$("div.infoFood").show();
		$("h3.infoItemsTitle").text("맛집 리뷰");
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoFood";
	});
	$("#infoFestival").click(function(){
		$("div.infoitems").hide();
		$("div.infoFestival").show();
		$("h3.infoItemsTitle").text("문화 리뷰");
		initInformationButtonColor();
		$(this).attr("style", "background-color: #f8f9fa; color: #dc3545");
		infoTypeId = "infoFestival";
	});
	
	// Input-Range Synchronize with Input-number  
	$("#location_range").on("input", function() {
		$("#location_number").val($("#location_range").val());
	});
	
	// AreaCodeList Change Event
	$("#areaCodeList").change(function() {
		getSigunguCodeList();
	});
	
	// Search Button Click Event
	$("#getInfoList").click(function() {
		infoListCurrPageNum = 1;
		
		getInfoList(infoListCurrPageNum);
		
	});	
	
	$("#infoMapModal").on("shown.bs.modal", function(){
		var mapContainer = document.getElementById('daumMap'), // 지도를 표시할 div 
		mapOption = { 
		    center: new daum.maps.LatLng($("#mapY").val(), $("#mapX").val()), // 지도의 중심좌표
//		    center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		    level: 3 // 지도의 확대 레벨
		};
		
		var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		var imageSrc = 'https://phinf.pstatic.net/memo/20190225_65/sseul878_1551068626698VMnPU_PNG/marker_red2.png?type=w740', // 마커이미지의 주소입니다    
		imageSize = new daum.maps.Size(40, 42), // 마커이미지의 크기입니다
		imageOption = {offset: new daum.maps.Point(13, 37)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

		//마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
		var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
		markerPosition = new daum.maps.LatLng($("#mapY").val(), $("#mapX").val()); // 마커가 표시될 위치입니다

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
		
		$("#mapX").val(parseFloat(lon).toFixed(6));
		$("#mapY").val(parseFloat(lat).toFixed(6));		

		var message = '위도: ' + parseFloat(lat).toFixed(6) + '  ';
		message += '경도: ' + parseFloat(lon).toFixed(6) + '';

		var resultDiv = document.getElementById('clickLatlng'); 
		resultDiv.innerHTML = message;

		});
	});	
	
});

function getInfoList(pageNum) {
	if (infoTypeId == "infoArea") {
		getInfoAreaList(pageNum);
	} else if (infoTypeId == "infoKeyword") {
		getInfoKeywordList(pageNum);
	} else if (infoTypeId == "infoFestival") {
		getInfoFestivalList(pageNum);
	} else if (infoTypeId == "infoStay") {
		getInfoStayList(pageNum);
	} else if (infoTypeId == "infoFood") {
		getInfoSFoodList(pageNum);
	}
}

// 정보 버튼들의 색을 원상태로 복원
function initInformationButtonColor() {
	$("#infoArea").attr("style", "");
	$("#infoKeyword").attr("style", "");
	$("#infoFestival").attr("style", "");
	$("#infoStay").attr("style", "");
	$("#infoFood").attr("style", "");
	
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
	    		contentStr += "<a href='" + contextPath + "/information?act=mvview";
	    		contentStr += "&contentTypeId=" + $(this).find("contenttypeid").text(); 
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
	    		contentStr += "<h3><a href='" + contextPath + "/information?act=mvview"
	    		contentStr += "&contentTypeId=" + $(this).find("contenttypeid").text(); 
	    		contentStr += "&contentId=" + $(this).find("contentid").text();
	    		contentStr += "'>" + $(this).find("title").text() + "</a></h3>";
	    		contentStr += "<div align='right'>";
	    		// 행사가 아닌 경우 date 정보가 없음
	    		if ($(this).find("eventstartdate").text() != null && $(this).find("eventenddate").text() != null) {
	    			contentStr += "<span class='listing'>"+ $(this).find("eventstartdate").text() +" ~ "+ $(this).find("eventenddate").text() +"</span>";
	    		}
	    		contentStr += "</div></div></div></div>";
	    		
    		}
    	});
    }
    // 일단 목록을 지우고 채움
    $(".informationItem").remove();
    $(".informationItemList").append(contentStr);
    // 관광 정보의 총 갯수
    infoTotalCount = $(xml).find("totalCount").text();
    // 네비게이터를 만듬
    makeNavigator();
}

// 검색 조건에 맞는 결과를 출력
function getInfoAreaList(pageNum) {
	var contentTypeId = $("#contentTypeIdList").val();
	if ($("#areaCodeList").val() != null) {
		areaCode = $("#areaCodeList").val();
	}
	if ($("#sigunguCodeList").val() != null) {
		sigunguCode = $("#sigunguCodeList").val();
	}
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
//	console.log(url);
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
	var contentTypeId = $("#contentTypeIdList").val();
	var mapX = $("#mapX").val();
	var mapY = $("#mapY").val();
	var radius = $("#location_number").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&mapX=" + mapX +
				"&mapY=" + mapY +
				"&radius=" + radius +
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
	var keyword = $("#keyword").val();
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
	var eventStartDate = $("#eventStartDate").val();
	var eventEndDate = $("#eventEndDate").val();
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?" +
					"ServiceKey=" + serviceKey +
					"&eventStartDate=" + eventStartDate +
					"&eventEndDate=" + eventEndDate +
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
	var eventStartDate = $("#eventStartDate").val();
	var eventEndDate = $("#eventEndDate").val();
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











