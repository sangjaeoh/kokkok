// TourAPI 3.0 service key
var serviceKey = "0zAzf%2BGAdBrV1fO%2FpVDQLGfnTgpOC9OKxvQpqS7NtWBLDf06y1iIFk70Qg%2Bf5pBWhggl2%2F7lQTxABewTAmXPcw%3D%3D";
var contentTypeId = "";
var contentId = "";
var primaryImage = "";

// 페이지가 생성되면서 실행되는 함수
$(document).ready(function() {
	// 관광정보타입ID
	contentTypeId = urlParam('contentTypeId');
	// 관광정보ID
	contentId = urlParam('contentId');
	
	// 관광정보 목록에서 선택한 바로 그 관광정보를 출력
	getInfoDetail();
});

// jquery를 이용해서 request parameter를 가져오기 위한 함수 코드
function urlParam(name){	
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results == null) {
		return null;
    } else {
    	return results[1] || 0;
	}	
}

//관광정보 목록에서 선택한 바로 그 관광정보를 출력
function getInfoDetail() {	
	
	// Get DetailCommon	
	getDetailCommon();
	// Get DetailIntro
	getDetailIntro();
	//Get DetailInfo
	getDetailInfo();
	//Get DetailImage
	getDetailImage();
}

// Get DetailCommon
function getDetailCommon() {
	// 타입별 공통정보(제목, 연락처, 주소, 좌표, 개요정보 등)를 조회
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&contentId=" + contentId +
				"&MobileOS=ETC&MobileApp=KokKok&defaultYN=Y&firstImageYN=Y&areacodeYN=Y" +
				"&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y";
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
	    	// 공통정보를 HTML로 작성
	    	makeDetailCommonHtml(xml);
	    },
		error : function() {
			alert("fail");
		}
	});
}

//공통정보를 HTML로 작성
function makeDetailCommonHtml(xml){
	// 정보는 item 태그 안에 존재
	var xmlData = $(xml).find("item");    		        
    var contentStr = "";
    
    // 공통정보가 존재하는지 먼저 확인
    if (xmlData != null) {
    	// 공통정보 제목 작성
    	$("#detailViewTitle").html($(xml).find("title").text());
    	
    	// 이미지 유무에 따른 처리
    	if ($(xml).find("firstimage").text() != null && $(xml).find("firstimage").text() != "") {
    		primaryImage = $(xml).find("firstimage").text();
    		$("#primaryImage").attr("src", primaryImage);
    	} else {
    		$("#primaryImage").attr("src", contextPath + "/resources/images/noimg.gif");
    	}
    	
    	// 좌표가 있다면 맵에 표시
    	if ($(xml).find("mapx").text() != null && $(xml).find("mapy").text() != null &&
    		$(xml).find("mapx").text() != "" && $(xml).find("mapy").text() != "" ) {
	    	var mapContainer = document.getElementById('daumMap'), // 지도를 표시할 div 
			mapOption = { 
			    center: new daum.maps.LatLng($(xml).find("mapy").text(), $(xml).find("mapx").text()), // 지도의 중심좌표	
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
    	}
    	
		// 개요 작성    			
		if ($(xml).find("overview").text() != null && $(xml).find("overview").text() != "") {
			contentStr += "<div>";
			contentStr += "<h2 class='mb-4'>개요</h2>";
			contentStr += "<p>" + $(xml).find("overview").text() + "</p>";
			contentStr += "</div>";
		}
		
		// 주소
		if ($(xml).find("addr1").text() != null && $(xml).find("addr1").text() != "") {
			contentStr += "<div>";			
			contentStr += "<p>주소 : " + $(xml).find("addr1").text() + "</p>";
			contentStr += "</div>";
		}
						
		// 홈페이지
		if ($(xml).find("homepage").text() != null && $(xml).find("homepage").text() != "") {
			contentStr += "<div>";
			contentStr += "<p>홈페이지 : " + $(xml).find("homepage").text() + "</p>";
//			contentStr += "<p>홈페이지 : <a href='" + $(xml).find("homepage").text() + "'>" + $(xml).find("homepage").text() + "</a></p>";
			contentStr += "</div>";
		}		
		
		// 일단 목록을 지우고 채움
	    $("#detailCommon").children().remove();
	    $("#detailCommon").append(contentStr);
    } else {	// 공통정보가 존재하지 않을리는 없지만 공통정보가 없다면 탭을 삭제
    	$("#detailCommon-tab").remove();
    	$("detailCommon").remove();
    }        
}

//Get DetailIntro
function getDetailIntro() {
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&contentId=" + contentId +
				"&MobileOS=ETC&MobileApp=KokKok&introYN=Y";
//	console.log(url);
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
	    	makeDetailIntroHtml(xml);
	    },
		error : function() {
			alert("fail");
		}
	});
}

function makeDetailIntroHtml(xml){
	var xmlData = $(xml).find("item");    		        
    var contentStr = "";
    
//    alert(xmlData.length);
    
    if (xmlData != null) {    			    		
		contentStr += "<div>";
		contentStr += "<h2 class='mb-4'>행사</h2>";
		if ($(xml).find("playtime").text() != null) {
			contentStr += "<p>" + $(xml).find("playtime").text() + "</p>";
		}
		if ($(xml).find("eventplace").text() != null) {
			contentStr += "<p>" + $(xml).find("eventplace").text() + "</p>";
		}
		if ($(xml).find("usetimefestival").text() != null) {
			contentStr += "<p>" + $(xml).find("usetimefestival").text() + "</p>";
		}
		contentStr += "</div>";
    }
    // 일단 목록을 지우고 채움
    $("#detailIntro").children().remove();
    $("#detailIntro").append(contentStr);    
}

//Get DetailInfo
function getDetailInfo() {
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&contentId=" + contentId +
				"&MobileOS=ETC&MobileApp=KokKok&listYN=Y";
//	console.log(url);
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
	    	makeDetailInfoHtml(xml);
	    },
		error : function() {
			alert("fail");
		}
	});
}

function makeDetailInfoHtml(xml){
	var xmlData = $(xml).find("item");    		        
    var contentStr = "";
    
//    alert(xmlData.length);
    
    if (xmlData != null) {
    	$(xmlData).each(function(){
			contentStr += "<div>";
			if ($(this).find("infoname").text() != null) {
				contentStr += "<h2 class='mb-4'>" + $(this).find("infoname").text() + "</h2>";
			}
			if ($(this).find("infotext").text() != null) {
				contentStr += "<p>" + $(this).find("infotext").text() + "</p>";
			}
			contentStr += "</div>";
    	});
    }
    // 일단 목록을 지우고 채움
    $("#detailInfo").children().remove();
    $("#detailInfo").append(contentStr);    
}

//Get DetailImage
function getDetailImage() {
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage?" +
				"ServiceKey=" + serviceKey +
				"&contentTypeId=" + contentTypeId +
				"&contentId=" + contentId +
				"&MobileOS=ETC&MobileApp=KokKok&imageYN=Y";
//	console.log(url);
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){
	    	makeDetailImageHtml(xml);
	    },
		error : function() {
			alert("fail");
		}
	});
}

function makeDetailImageHtml(xml){
	var xmlData = $(xml).find("item");
    var contentStr = "";
    
//    alert(xmlData.length);
    
    if (xmlData != null) {
    	contentStr += "<div id='imageColumns' class='imageColumns'>";    	
    	$(xmlData).each(function(){
    		contentStr += "<figure>";
			if ($(this).find("originimgurl").text() != null) {
				contentStr += "<img src='" + $(this).find("originimgurl").text() + "' alt='' class='infoImage'>";
			}
			contentStr += "</figure>";
    	});
    	contentStr += "</div>";
    }
    // 일단 목록을 지우고 채움
    $("#detailImage").children().remove();
    $("#detailImage").append(contentStr);
}

// 대표이미지를 클릭하면 대표이미지를 다시 표시
$(document).on("click", "#primaryImage", function() {
	if (primaryImage != "") {
		$("#primaryImage").attr("src", primaryImage);
	}
});

// 다른 이미지를 클릭하면 대표이미지 자리에 표시 
$(document).on("click", ".infoImage", function() {
	$("#primaryImage").attr("src", $(this).attr("src"));	
});





