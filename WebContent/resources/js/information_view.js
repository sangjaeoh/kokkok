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
	// 한글을 디코딩하기 위해서 decodeURI 사용
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURI(window.location.href));
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
    	if (xmlData.length) {
    		// 공통정보 제목 작성
        	$("#detailViewTitle").html($(xml).find("title").text());
        	
        	// 이미지 유무에 따른 처리
        	if ($(xml).find("firstimage").text() != null && $(xml).find("firstimage").text() != "") {
        		primaryImage = $(xml).find("firstimage").text();
        		$("#primaryImage").children("figure").children("img").attr("src", primaryImage);
        	} else {
        		$("#primaryImage").children("figure").remove();
//        		$("#primaryImage").children("figure").children("img").attr("src", contextPath + "/resources/images/noimg.gif");
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
//    			contentStr += "<p>홈페이지 : <a href='" + $(xml).find("homepage").text() + "'>" + $(xml).find("homepage").text() + "</a></p>";
    			contentStr += "</div>";
    		}		
    		
    		// 일단 목록을 지우고 채움
    	    $("#detailCommon").children().remove();
    	    $("#detailCommon").append(contentStr);
    	} else { // 공통정보가 존재하지 않을리는 없지만 공통정보가 없다면 탭을 삭제    		
    		$("#detailCommon-tab").remove();
    	}
    	
    } else { // 공통정보가 존재하지 않을리는 없지만 공통정보가 없다면 탭을 삭제
    	$("#detailCommon-tab").remove();
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

// 타입별 소개 정보는 각 타입마다 응답 항목이 다름
function makeDetailIntroHtml(xml){
	var xmlData = $(xml).find("item");    		        
    var contentStr = "";
    
//    alert(xmlData.length);
    
    if (xmlData != null) {
    	if (xmlData.length) {
    		contentStr += "<div>";    		
    		// 관광 타입에 따라 내용이 달라짐
    		if (contentTypeId == 12) { // 관광지
    			contentStr += getDetailIntroHtml12(xml);
    		} else if (contentTypeId == 14) { // 문화시설
    			contentStr += getDetailIntroHtml14(xml);
    		} else if (contentTypeId == 15) { // 축제공연행사
    			contentStr += getDetailIntroHtml15(xml);
    		} else if (contentTypeId == 25) { // 여행코스
    			contentStr += getDetailIntroHtml25(xml);
    		} else if (contentTypeId == 28) { // 레포츠
    			contentStr += getDetailIntroHtml28(xml);
    		} else if (contentTypeId == 32) { // 숙박
    			contentStr += getDetailIntroHtml32(xml);
    		} else if (contentTypeId == 38) { // 쇼핑
    			contentStr += getDetailIntroHtml38(xml);
    		} else if (contentTypeId == 39) { // 음식점
    			contentStr += getDetailIntroHtml39(xml);
    		} else if (contentTypeId == 77) { // 교통
    			contentStr += getDetailIntroHtml77(xml);
    		}    		
    		contentStr += "</div>";
    		
    		// 일단 목록을 지우고 채움
    	    $("#detailIntro").children().remove();
    	    $("#detailIntro").append(contentStr);
    	} else { // 정보가 없으면 탭을 삭제
    		$("#detailIntro-tab").remove();
    	}		
    } else { // 정보가 없으면 탭을 삭제
    	$("#detailIntro-tab").remove();
    }
}

// 관광지 html 만들기
function getDetailIntroHtml12(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>관광지</h2>";
	if ($(xml).find("accomcount").text() != null && $(xml).find("accomcount").text() != "") {
		contentStr += "<p>수용인원: " + $(xml).find("accomcount").text() + "</p>";
	}
	if ($(xml).find("chkbabycarriage").text() != null && $(xml).find("chkbabycarriage").text() != "") {
		contentStr += "<p>유모차 대여 여부: " + $(xml).find("chkbabycarriage").text() + "</p>";
	}
	if ($(xml).find("chkcreditcard").text() != null && $(xml).find("chkcreditcard").text() != "") {
		contentStr += "<p>신용카드 가능 여부: " + $(xml).find("chkcreditcard").text() + "</p>";
	}
	if ($(xml).find("chkpet").text() != null && $(xml).find("chkpet").text() != "") {
		contentStr += "<p>애완동물 가능 여부: " + $(xml).find("chkpet").text() + "</p>";
	}
	if ($(xml).find("expagerange").text() != null && $(xml).find("expagerange").text() != "") {
		contentStr += "<p>체험가능 연령: " + $(xml).find("expagerange").text() + "</p>";
	}
	if ($(xml).find("expguide").text() != null && $(xml).find("expguide").text() != "") {		
		contentStr += "<strong>체험안내</strong>";
		contentStr += "<p>" + $(xml).find("expguide").text() + "</p>";
	}
	if ($(xml).find("infocenter").text() != null && $(xml).find("infocenter").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocenter").text() + "</p>";
	}
	if ($(xml).find("opendate").text() != null && $(xml).find("opendate").text() != "") {		
		contentStr += "<p>개장일: " + $(xml).find("opendate").text() + "</p>";
	}
	if ($(xml).find("parking").text() != null && $(xml).find("parking").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parking").text() + "</p>";
	}
	if ($(xml).find("restdate").text() != null && $(xml).find("restdate").text() != "") {		
		contentStr += "<strong>쉬는날</strong>";
		contentStr += "<p>" + $(xml).find("restdate").text() + "</p>";
	}
	if ($(xml).find("useseason").text() != null && $(xml).find("useseason").text() != "") {		
		contentStr += "<strong>이용시기</strong>";
		contentStr += "<p>" + $(xml).find("useseason").text() + "</p>";
	}
	if ($(xml).find("useseason").text() != null && $(xml).find("useseason").text() != "") {		
		contentStr += "<strong>이용시간</strong>";
		contentStr += "<p>" + $(xml).find("useseason").text() + "</p>";
	}	
	return contentStr;
}

// 문화시설 html 만들기
function getDetailIntroHtml14(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>문화시설</h2>";
	if ($(xml).find("accomcountculture").text() != null && $(xml).find("accomcountculture").text() != "") {
		contentStr += "<p>수용인원: " + $(xml).find("accomcountculture").text() + "</p>";
	}
	if ($(xml).find("chkbabycarriageculture").text() != null && $(xml).find("chkbabycarriageculture").text() != "") {
		contentStr += "<p>유모차 대여 여부: " + $(xml).find("chkbabycarriageculture").text() + "</p>";
	}
	if ($(xml).find("chkcreditcardculture").text() != null && $(xml).find("chkcreditcardculture").text() != "") {
		contentStr += "<p>신용카드 가능 여부: " + $(xml).find("chkcreditcardculture").text() + "</p>";
	}
	if ($(xml).find("chkpetculture").text() != null && $(xml).find("chkpetculture").text() != "") {
		contentStr += "<p>애완동물 가능 여부: " + $(xml).find("chkpetculture").text() + "</p>";
	}
	if ($(xml).find("discountinfo").text() != null && $(xml).find("discountinfo").text() != "") {		
		contentStr += "<strong>할인정보</strong>";
		contentStr += "<p>" + $(xml).find("discountinfo").text() + "</p>";
	}
	if ($(xml).find("infocenterculture").text() != null && $(xml).find("infocenterculture").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocenterculture").text() + "</p>";
	}
	if ($(xml).find("parkingculture").text() != null && $(xml).find("parkingculture").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parkingculture").text() + "</p>";
	}
	if ($(xml).find("parkingfee").text() != null && $(xml).find("parkingfee").text() != "") {		
		contentStr += "<strong>주차요금</strong>";
		contentStr += "<p>" + $(xml).find("parkingfee").text() + "</p>";
	}
	if ($(xml).find("restdateculture").text() != null && $(xml).find("restdateculture").text() != "") {		
		contentStr += "<strong>쉬는날</strong>";
		contentStr += "<p>" + $(xml).find("restdateculture").text() + "</p>";
	}
	if ($(xml).find("usefee").text() != null && $(xml).find("usefee").text() != "") {		
		contentStr += "<strong>이용요금</strong>";
		contentStr += "<p>" + $(xml).find("usefee").text() + "</p>";
	}
	if ($(xml).find("usetimeculture").text() != null && $(xml).find("usetimeculture").text() != "") {		
		contentStr += "<strong>이용시간</strong>";
		contentStr += "<p>" + $(xml).find("usetimeculture").text() + "</p>";
	}
	if ($(xml).find("scale").text() != null && $(xml).find("scale").text() != "") {		
		contentStr += "<strong>규모</strong>";
		contentStr += "<p>" + $(xml).find("scale").text() + "</p>";
	}
	if ($(xml).find("spendtime").text() != null && $(xml).find("spendtime").text() != "") {		
		contentStr += "<strong>관람 소요시간</strong>";
		contentStr += "<p>" + $(xml).find("spendtime").text() + "</p>";
	}
	return contentStr;
}

// 축제공연행사 html 만들기
function getDetailIntroHtml15(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>축제공연행사</h2>";
	if ($(xml).find("agelimit").text() != null && $(xml).find("agelimit").text() != "") {		
		contentStr += "<strong>관람 가능연령</strong>";
		contentStr += "<p>" + $(xml).find("agelimit").text() + "</p>";
	}	
	if ($(xml).find("bookingplace").text() != null && $(xml).find("bookingplace").text() != "") {		
		contentStr += "<strong>예매처</strong>";
		contentStr += "<p>" + $(xml).find("bookingplace").text() + "</p>";
	}	
	if ($(xml).find("discountinfofestival").text() != null && $(xml).find("discountinfofestival").text() != "") {		
		contentStr += "<strong>할인정보</strong>";
		contentStr += "<p>" + $(xml).find("discountinfofestival").text() + "</p>";
	}	
	if ($(xml).find("eventstartdate").text() != null && $(xml).find("eventstartdate").text() != "") {		
		contentStr += "<p>행사 시작일: " + $(xml).find("eventstartdate").text() + "</p>";
	}
	if ($(xml).find("eventenddate").text() != null && $(xml).find("eventenddate").text() != "") {		
		contentStr += "<p>행사 종료일: " + $(xml).find("eventenddate").text() + "</p>";
	}
	if ($(xml).find("eventhomepage").text() != null && $(xml).find("eventhomepage").text() != "") {		
		contentStr += "<strong>행사 홈페이지</strong>";
		contentStr += "<p>" + $(xml).find("eventhomepage").text() + "</p>";
	}
	if ($(xml).find("eventplace").text() != null && $(xml).find("eventplace").text() != "") {		
		contentStr += "<strong>행사 장소</strong>";
		contentStr += "<p>" + $(xml).find("eventplace").text() + "</p>";
	}
	if ($(xml).find("festivalgrade").text() != null && $(xml).find("festivalgrade").text() != "") {		
		contentStr += "<p>축제 등급: " + $(xml).find("festivalgrade").text() + "</p>";
	}
	if ($(xml).find("placeinfo").text() != null && $(xml).find("placeinfo").text() != "") {		
		contentStr += "<strong>행사장 위치안내</strong>";
		contentStr += "<p>" + $(xml).find("placeinfo").text() + "</p>";
	}
	if ($(xml).find("playtime").text() != null && $(xml).find("playtime").text() != "") {		
		contentStr += "<strong>공연시간</strong>";
		contentStr += "<p>" + $(xml).find("playtime").text() + "</p>";
	}
	if ($(xml).find("program").text() != null && $(xml).find("program").text() != "") {		
		contentStr += "<strong>행사 프로그램</strong>";
		contentStr += "<p>" + $(xml).find("program").text() + "</p>";
	}
	if ($(xml).find("spendtimefestival").text() != null && $(xml).find("spendtimefestival").text() != "") {		
		contentStr += "<strong>관람 소요시간</strong>";
		contentStr += "<p>" + $(xml).find("spendtimefestival").text() + "</p>";
	}
	if ($(xml).find("sponsor1").text() != null && $(xml).find("sponsor1").text() != "") {		
		contentStr += "<strong>주최자 정보</strong>";
		contentStr += "<p>" + $(xml).find("sponsor1").text() + "</p>";
	}
	if ($(xml).find("sponsor1tel").text() != null && $(xml).find("sponsor1tel").text() != "") {		
		contentStr += "<strong>주최자 연락처</strong>";
		contentStr += "<p>" + $(xml).find("sponsor1tel").text() + "</p>";
	}
	if ($(xml).find("sponsor2").text() != null && $(xml).find("sponsor2").text() != "") {		
		contentStr += "<strong>주관사 정보</strong>";
		contentStr += "<p>" + $(xml).find("sponsor2").text() + "</p>";
	}
	if ($(xml).find("subevent").text() != null && $(xml).find("subevent").text() != "") {		
		contentStr += "<strong>부대행사</strong>";
		contentStr += "<p>" + $(xml).find("subevent").text() + "</p>";
	}
	if ($(xml).find("usetimefestival").text() != null && $(xml).find("usetimefestival").text() != "") {		
		contentStr += "<strong>이용요금</strong>";
		contentStr += "<p>" + $(xml).find("usetimefestival").text() + "</p>";
	}	
	return contentStr;
}

//여행코스 html 만들기
function getDetailIntroHtml25(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>여행코스</h2>";
	if ($(xml).find("distance").text() != null && $(xml).find("distance").text() != "") {		
		contentStr += "<p>코스 총 거리: " + $(xml).find("distance").text() + "</p>";
	}
	if ($(xml).find("infocentertourcourse").text() != null && $(xml).find("infocentertourcourse").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocentertourcourse").text() + "</p>";
	}
	if ($(xml).find("schedule").text() != null && $(xml).find("schedule").text() != "") {		
		contentStr += "<strong>코스 일정</strong>";
		contentStr += "<p>" + $(xml).find("schedule").text() + "</p>";
	}
	if ($(xml).find("taketime").text() != null && $(xml).find("taketime").text() != "") {		
		contentStr += "<p>코스 총 소요시간: " + $(xml).find("taketime").text() + "</p>";
	}
	if ($(xml).find("theme").text() != null && $(xml).find("theme").text() != "") {		
		contentStr += "<strong>코스 테마</strong>";
		contentStr += "<p>" + $(xml).find("theme").text() + "</p>";
	}
	return contentStr;
}

//레포츠 html 만들기
function getDetailIntroHtml28(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>레포츠</h2>";
	if ($(xml).find("accomcountleports").text() != null && $(xml).find("accomcountleports").text() != "") {
		contentStr += "<p>수용인원: " + $(xml).find("accomcountleports").text() + "</p>";
	}
	if ($(xml).find("chkbabycarriageleports").text() != null && $(xml).find("chkbabycarriageleports").text() != "") {
		contentStr += "<p>유모차 대여 여부: " + $(xml).find("chkbabycarriageleports").text() + "</p>";
	}
	if ($(xml).find("chkcreditcardleports").text() != null && $(xml).find("chkcreditcardleports").text() != "") {
		contentStr += "<p>신용카드 가능 여부: " + $(xml).find("chkcreditcardleports").text() + "</p>";
	}
	if ($(xml).find("chkpetleports").text() != null && $(xml).find("chkpetleports").text() != "") {
		contentStr += "<p>애완동물 가능 여부: " + $(xml).find("chkpetleports").text() + "</p>";
	}
	if ($(xml).find("expagerangeleports").text() != null && $(xml).find("expagerangeleports").text() != "") {		
		contentStr += "<strong>체험 가능연령</strong>";
		contentStr += "<p>" + $(xml).find("expagerangeleports").text() + "</p>";
	}	
	if ($(xml).find("infocenterleports").text() != null && $(xml).find("infocenterleports").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocenterleports").text() + "</p>";
	}	
	if ($(xml).find("openperiod").text() != null && $(xml).find("openperiod").text() != "") {		
		contentStr += "<strong>개장기간</strong>";
		contentStr += "<p>" + $(xml).find("openperiod").text() + "</p>";
	}	
	if ($(xml).find("parkingfeeleports").text() != null && $(xml).find("parkingfeeleports").text() != "") {		
		contentStr += "<strong>주차요금</strong>";
		contentStr += "<p>" + $(xml).find("parkingfeeleports").text() + "</p>";
	}
	if ($(xml).find("parkingleports").text() != null && $(xml).find("parkingleports").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parkingleports").text() + "</p>";
	}
	if ($(xml).find("reservation").text() != null && $(xml).find("reservation").text() != "") {		
		contentStr += "<strong>예약안내</strong>";
		contentStr += "<p>" + $(xml).find("reservation").text() + "</p>";
	}
	if ($(xml).find("restdateleports").text() != null && $(xml).find("restdateleports").text() != "") {		
		contentStr += "<strong>쉬는날</strong>";
		contentStr += "<p>" + $(xml).find("restdateleports").text() + "</p>";
	}
	if ($(xml).find("scaleleports").text() != null && $(xml).find("scaleleports").text() != "") {		
		contentStr += "<strong>규모</strong>";
		contentStr += "<p>" + $(xml).find("scaleleports").text() + "</p>";
	}
	if ($(xml).find("usefeeleports").text() != null && $(xml).find("usefeeleports").text() != "") {		
		contentStr += "<strong>입장료</strong>";
		contentStr += "<p>" + $(xml).find("usefeeleports").text() + "</p>";
	}
	if ($(xml).find("usetimeleports").text() != null && $(xml).find("usetimeleports").text() != "") {		
		contentStr += "<strong>이용시간</strong>";
		contentStr += "<p>" + $(xml).find("usetimeleports").text() + "</p>";
	}
	return contentStr;
}

//숙박 html 만들기
function getDetailIntroHtml32(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>숙박</h2>";
	if ($(xml).find("accomcountlodging").text() != null && $(xml).find("accomcountlodging").text() != "") {
		contentStr += "<strong>수용 가능인원</strong>";
		contentStr += "<p>" + $(xml).find("accomcountlodging").text() + "</p>";
	}
	if ($(xml).find("benikia").text() != null && $(xml).find("benikia").text() != "") {
		contentStr += "<p>베니키아 여부: " + $(xml).find("benikia").text() + "</p>";
	}	
	if ($(xml).find("checkintime").text() != null && $(xml).find("checkintime").text() != "") {		
		contentStr += "<strong>입실 시간</strong>";
		contentStr += "<p>" + $(xml).find("checkintime").text() + "</p>";
	}	
	if ($(xml).find("checkouttime").text() != null && $(xml).find("checkouttime").text() != "") {		
		contentStr += "<strong>퇴실 시간</strong>";
		contentStr += "<p>" + $(xml).find("checkouttime").text() + "</p>";
	}	
	if ($(xml).find("chkcooking").text() != null && $(xml).find("chkcooking").text() != "") {		
		contentStr += "<strong>객실내 취사 여부</strong>";
		contentStr += "<p>" + $(xml).find("chkcooking").text() + "</p>";
	}	
	if ($(xml).find("foodplace").text() != null && $(xml).find("foodplace").text() != "") {		
		contentStr += "<strong>식음료장</strong>";
		contentStr += "<p>" + $(xml).find("foodplace").text() + "</p>";
	}
	if ($(xml).find("goodstay").text() != null && $(xml).find("goodstay").text() != "") {
		contentStr += "<p>굿스테이 여부: " + $(xml).find("goodstay").text() + "</p>";
	}
	if ($(xml).find("hanok").text() != null && $(xml).find("hanok").text() != "") {
		contentStr += "<p>한옥 여부: " + $(xml).find("hanok").text() + "</p>";
	}
	if ($(xml).find("infocenterlodging").text() != null && $(xml).find("infocenterlodging").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocenterlodging").text() + "</p>";
	}
	if ($(xml).find("parkinglodging").text() != null && $(xml).find("parkinglodging").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parkinglodging").text() + "</p>";
	}
	if ($(xml).find("pickup").text() != null && $(xml).find("pickup").text() != "") {		
		contentStr += "<strong>픽업 서비스</strong>";
		contentStr += "<p>" + $(xml).find("pickup").text() + "</p>";
	}
	if ($(xml).find("roomcount").text() != null && $(xml).find("roomcount").text() != "") {		
		contentStr += "<strong>객실수</strong>";
		contentStr += "<p>" + $(xml).find("roomcount").text() + "</p>";
	}
	if ($(xml).find("reservationlodging").text() != null && $(xml).find("reservationlodging").text() != "") {		
		contentStr += "<strong>예약안내</strong>";
		contentStr += "<p>" + $(xml).find("reservationlodging").text() + "</p>";
	}
	if ($(xml).find("reservationurl").text() != null && $(xml).find("reservationurl").text() != "") {		
		contentStr += "<strong>예약안내 홈페이지</strong>";
		contentStr += "<p>" + $(xml).find("reservationurl").text() + "</p>";
	}
	if ($(xml).find("roomtype").text() != null && $(xml).find("roomtype").text() != "") {		
		contentStr += "<strong>객실유형</strong>";
		contentStr += "<p>" + $(xml).find("roomtype").text() + "</p>";
	}
	if ($(xml).find("scalelodging").text() != null && $(xml).find("scalelodging").text() != "") {		
		contentStr += "<strong>규모</strong>";
		contentStr += "<p>" + $(xml).find("scalelodging").text() + "</p>";
	}
	if ($(xml).find("subfacility").text() != null && $(xml).find("subfacility").text() != "") {		
		contentStr += "<strong>부대시설</strong>";
		contentStr += "<p>" + $(xml).find("subfacility").text() + "</p>";
	}
	return contentStr;
}

//쇼핑 html 만들기
function getDetailIntroHtml38(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>쇼핑</h2>";
	if ($(xml).find("chkbabycarriageshopping").text() != null && $(xml).find("chkbabycarriageshopping").text() != "") {
		contentStr += "<p>유모차 대여 여부: " + $(xml).find("chkbabycarriageshopping").text() + "</p>";
	}
	if ($(xml).find("chkcreditcardshopping").text() != null && $(xml).find("chkcreditcardshopping").text() != "") {
		contentStr += "<p>신용카드 가능 여부: " + $(xml).find("chkcreditcardshopping").text() + "</p>";
	}
	if ($(xml).find("chkpetshopping").text() != null && $(xml).find("chkpetshopping").text() != "") {
		contentStr += "<p>애완동물 가능 여부: " + $(xml).find("chkpetshopping").text() + "</p>";
	}
	if ($(xml).find("culturecenter").text() != null && $(xml).find("culturecenter").text() != "") {
		contentStr += "<strong>문화센터 바로가기</strong>";
		contentStr += "<p>" + $(xml).find("culturecenter").text() + "</p>";
	}
	if ($(xml).find("fairday").text() != null && $(xml).find("fairday").text() != "") {
		contentStr += "<p>장서는 날: " + $(xml).find("fairday").text() + "</p>";
	}	
	if ($(xml).find("infocentershopping").text() != null && $(xml).find("infocentershopping").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocentershopping").text() + "</p>";
	}	
	if ($(xml).find("opendateshopping").text() != null && $(xml).find("opendateshopping").text() != "") {		
		contentStr += "<strong>개장일</strong>";
		contentStr += "<p>" + $(xml).find("opendateshopping").text() + "</p>";
	}	
	if ($(xml).find("opentime").text() != null && $(xml).find("opentime").text() != "") {		
		contentStr += "<strong>영업시간</strong>";
		contentStr += "<p>" + $(xml).find("opentime").text() + "</p>";
	}	
	if ($(xml).find("parkingshopping").text() != null && $(xml).find("parkingshopping").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parkingshopping").text() + "</p>";
	}
	if ($(xml).find("restdateshopping").text() != null && $(xml).find("restdateshopping").text() != "") {		
		contentStr += "<strong>쉬는날</strong>";
		contentStr += "<p>" + $(xml).find("restdateshopping").text() + "</p>";
	}
	if ($(xml).find("restroom").text() != null && $(xml).find("restroom").text() != "") {		
		contentStr += "<strong>화장실 설명</strong>";
		contentStr += "<p>" + $(xml).find("restroom").text() + "</p>";
	}
	if ($(xml).find("saleitem").text() != null && $(xml).find("saleitem").text() != "") {		
		contentStr += "<strong>판매 품목</strong>";
		contentStr += "<p>" + $(xml).find("saleitem").text() + "</p>";
	}
	if ($(xml).find("saleitemcost").text() != null && $(xml).find("saleitemcost").text() != "") {		
		contentStr += "<strong>판매 품목별 가격</strong>";
		contentStr += "<p>" + $(xml).find("saleitemcost").text() + "</p>";
	}
	if ($(xml).find("scaleshopping").text() != null && $(xml).find("scaleshopping").text() != "") {		
		contentStr += "<strong>규모</strong>";
		contentStr += "<p>" + $(xml).find("scaleshopping").text() + "</p>";
	}
	if ($(xml).find("shopguide").text() != null && $(xml).find("shopguide").text() != "") {		
		contentStr += "<strong>매장안내</strong>";
		contentStr += "<p>" + $(xml).find("shopguide").text() + "</p>";
	}
	return contentStr;
}

//음식점 html 만들기
function getDetailIntroHtml39(xml){
	var contentStr = "";
	contentStr += "<h2 class='mb-4'>음식점</h2>";
	if ($(xml).find("chkcreditcardfood").text() != null && $(xml).find("chkcreditcardfood").text() != "") {
		contentStr += "<p>신용카드 가능 여부: " + $(xml).find("chkcreditcardfood").text() + "</p>";
	}
	if ($(xml).find("discountinfofood").text() != null && $(xml).find("discountinfofood").text() != "") {
		contentStr += "<strong>할인정보</strong>";
		contentStr += "<p>" + $(xml).find("discountinfofood").text() + "</p>";
	}
	if ($(xml).find("firstmenu").text() != null && $(xml).find("firstmenu").text() != "") {		
		contentStr += "<strong>대표 메뉴</strong>";
		contentStr += "<p>" + $(xml).find("firstmenu").text() + "</p>";
	}	
	if ($(xml).find("infocenterfood").text() != null && $(xml).find("infocenterfood").text() != "") {		
		contentStr += "<strong>문의 및 안내</strong>";
		contentStr += "<p>" + $(xml).find("infocenterfood").text() + "</p>";
	}
	if ($(xml).find("opendatefood").text() != null && $(xml).find("opendatefood").text() != "") {
		contentStr += "<p>개업일: " + $(xml).find("opendatefood").text() + "</p>";
	}
	if ($(xml).find("opentimefood").text() != null && $(xml).find("opentimefood").text() != "") {
		contentStr += "<p>영업시간: " + $(xml).find("opentimefood").text() + "</p>";
	}
	if ($(xml).find("opentime").text() != null && $(xml).find("opentime").text() != "") {		
		contentStr += "<strong>영업시간</strong>";
		contentStr += "<p>" + $(xml).find("opentime").text() + "</p>";
	}	
	if ($(xml).find("parkingfood").text() != null && $(xml).find("parkingfood").text() != "") {		
		contentStr += "<strong>주차시설</strong>";
		contentStr += "<p>" + $(xml).find("parkingfood").text() + "</p>";
	}
	if ($(xml).find("reservationfood").text() != null && $(xml).find("reservationfood").text() != "") {		
		contentStr += "<strong>예약안내</strong>";
		contentStr += "<p>" + $(xml).find("reservationfood").text() + "</p>";
	}
	if ($(xml).find("restdatefood").text() != null && $(xml).find("restdatefood").text() != "") {		
		contentStr += "<strong>쉬는날</strong>";
		contentStr += "<p>" + $(xml).find("restdatefood").text() + "</p>";
	}
	if ($(xml).find("scalefood").text() != null && $(xml).find("scalefood").text() != "") {		
		contentStr += "<strong>규모</strong>";
		contentStr += "<p>" + $(xml).find("scalefood").text() + "</p>";
	}
	if ($(xml).find("seat").text() != null && $(xml).find("seat").text() != "") {		
		contentStr += "<p>좌석수: " + $(xml).find("seat").text() + "</p>";
	}
	if ($(xml).find("smoking").text() != null && $(xml).find("smoking").text() != "") {		
		contentStr += "<p>금연/흡연 여부: " + $(xml).find("smoking").text() + "</p>";
	}
	return contentStr;
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
    var count = 0;
    
    if (xmlData != null) {
    	if (xmlData.length > 0) {
    		// 여행코스, 숙박인 경우에는 정보형태가 바뀜
    		if (contentTypeId == 25) { //여행코스
    			$("#detailInfo-tab").text("코스정보");
    			$(xmlData).each(function(){
    				count = parseInt($(this).find("subnum").text()) + 1;
    				contentStr += "<p>" + count + " 코스 : " + $(this).find("subname").text() + "</p>";
    				contentStr += "<div class='row d-md-flex'>";	
    				contentStr += "<div class='col-md-12'>";
    				contentStr += "<div class=imageColumns>";
    				contentStr += "<figure>";
    				contentStr += "<img src='" + $(this).find("subdetailimg").text() + "' class='infoImage'>";
    				contentStr += "</figure>";
    				contentStr += "</div>";
    				contentStr += "</div>";
    				contentStr += "<div class='col-md-12'>";
    				contentStr += "<strong>-코스개요-</strong>";
    				contentStr += "<p>" + $(this).find("subdetailoverview").text() + "</p>";
    				contentStr += "</div>";
    				contentStr += "</div>";	
    				contentStr += "<hr>";    				
    			});
    		} else if (contentTypeId == 32) { //숙박
    			$("#detailInfo-tab").text("숙박정보");
    			$(xmlData).each(function(){ 
    				contentStr += "<p>" + $(this).find("roomimg1alt").text() + "</p>";
    				contentStr += "<div class='row d-md-flex'>";	
    				contentStr += "<div class='col-md-12'>";
    				contentStr += "<div class=imageColumns>";
    				contentStr += "<figure>";
    				contentStr += "<img src='" + $(this).find("roomimg1").text() + "' class='infoImage'>";
    				contentStr += "</figure>";
    				contentStr += "</div>";
    				contentStr += "</div>";
    				contentStr += "<div class='col-md-12'>";
    				contentStr += "<strong>-객실소개-</strong>";
    				contentStr += "<p>" + $(this).find("roomintro").text() + "</p>";
    				contentStr += "</div>";
    				contentStr += "</div>";	
    				contentStr += "<hr>";    				
    			});    			
    		} else {
    			$("#detailInfo-tab").text("반복정보");
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
    	} else { // 정보가 없으면 탭을 삭제
        	$("#detailInfo-tab").remove();
    	}
    } else { // 정보가 없으면 탭을 삭제    	
    	$("#detailInfo-tab").remove();
    }
    
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
    	if (xmlData.length > 0) {
    		contentStr += "<div id='imageColumns' class='imageColumns'>";    	
        	$(xmlData).each(function(){
        		contentStr += "<figure>";
    			if ($(this).find("originimgurl").text() != null) {
    				contentStr += "<img src='" + $(this).find("originimgurl").text() + "' alt='' class='infoImage'>";
    			}
    			contentStr += "</figure>";
        	});
        	contentStr += "</div>";
        	
        	// 일단 목록을 지우고 채움
            $("#detailImage").children().remove();
            $("#detailImage").append(contentStr);
    	} else { // 정보가 없으면 탭을 삭제
    		$("#detailImage-tab").remove();
    	}
    } else {  // 정보가 없으면 탭을 삭제
    	$("#detailImage-tab").remove();
    }
    
}

// 대표이미지를 클릭하면 대표이미지를 다시 표시
$(document).on("click", "#primaryImage", function() {
	if (primaryImage != "") {
//		$("#primaryImage").attr("src", primaryImage);
		$("#primaryImage").children("figure").children("img").attr("src", primaryImage);
	}
});

// 다른 이미지를 클릭하면 대표이미지 자리에 표시 
$(document).on("click", ".infoImage", function() {
//	$("#primaryImage").attr("src", $(this).attr("src"));
	$("#primaryImage").children("figure").children("img").attr("src", $(this).attr("src"));
});





