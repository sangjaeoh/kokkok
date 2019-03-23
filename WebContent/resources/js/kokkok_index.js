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
var infoListArrange = "R";
// 한 화면에 보여지는 관광 목록의 페이지 갯수
var navigation_size = 10;
// 관광 목록 한 페이지의 결과 수
var infoListNumOfRows = 12;
// 현재 관광 정보
var infoTypeId = "infoArea";



$(document).ready(function() {
	
	// First Information List
	getInfoFestivalList();
	
	getCommentList();
	
	getScheduleList();
	
	
	// Search Button Click Event
	$("#btnMainSearch").click(function() {
		var mainSearchKey = $("#mainSearchKey").val();
		var mainSearchWord = $("#mainSearchWord").val();
		
		if(mainSearchWord == "") {
			alert("검색할 글자가 없습니다.");
			return;
		} else {
			$("#searchWord").val(mainSearchWord);
//			alert(mainSearchWord);
			if (mainSearchKey == 1) {
				$("#formSearchKeyword").attr("action", contextPath + "/information/list.kok").submit();
			} else if (mainSearchKey == 2) {				
				$("#formSearchKeyword").attr("action", contextPath + "/schedule/searchScheduleList.kok").submit();
			} else if (mainSearchKey == 3) {
				$("#formSearchKeyword").attr("action", contextPath + "/review/list.kok").submit();
			} else if (mainSearchKey == 4) {
				$("#formSearchKeyword").attr("action", contextPath + "/tips/list.kok").submit();
			}
		}		
		
	});
	
});

function getInfoFestivalList() {
	var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?" +
					"ServiceKey=" + serviceKey +
					"&eventStartDate=" +
					"&eventEndDate=" +
					"&areaCode=" +
					"&sigunguCode=" +
					"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=KokKok" +
					"&arrange=" + infoListArrange + 
					"&numOfRows=" + infoListNumOfRows + 
					"&pageNo=1";		
	$.ajax({
	    url : url,
	    type : "GET",
	    success : function(xml){		    
	    	makeInfoListToHtml(xml);	        
	    },
		error : function() {
//			alert("fail");
		}	    
	});
}	

function makeInfoListToHtml(xml){
	var xmlData = $(xml).find("item");
    var listLength = xmlData.length;		        
    var contentStr = "";    
    if (listLength > 0) {
    	$(xmlData).each(function(index,item){   
    		var siLocation = $(this).find("addr1").text().split(' ');
    		var eventStartDate = $(this).find("eventstartdate").text() + "";
    		var eventEndDate = $(this).find("eventenddate").text() + "";
    		var formatEventStartDate = eventStartDate.slice(0,4) + "/" + eventStartDate.slice(4, 6) + "/" + eventStartDate.slice(6);
    		var formatEventEndDate = eventEndDate.slice(0,4) + "/" + eventEndDate.slice(4, 6) + "/" + eventEndDate.slice(6);
    		contentStr += "<div class='destination blog-entry'>";
    		contentStr += "<a href='" + contextPath + "/information/view.kok";
    		contentStr += "?contentTypeId=" + $(this).find("contenttypeid").text(); 
    		contentStr += "&contentId=" + $(this).find("contentid").text();
    		contentStr += "' class='img d-flex justify-content-center align-items-center' style='background-image: url(" + $(this).find("firstimage").text() + ");'>";
    		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";
    		contentStr += "<span class='icon-search2'></span></div></a>";
    		contentStr += "<div class='text p-3'>";
    		contentStr += "<span class='tag'>"+ siLocation[0] +"</span>";
    		contentStr += "<h3><a href='" + contextPath + "/information/view.kok"
    		contentStr += "?contentTypeId=" + $(this).find("contenttypeid").text(); 
    		contentStr += "&contentId=" + $(this).find("contentid").text();
    		contentStr += "'>" + $(this).find("title").text() + "</a></h3>";
    		contentStr += "<div align='right'>";
    		contentStr += "<span class='listing'>"+ formatEventStartDate +" ~ "+ formatEventEndDate +"</span>";	    		
    		contentStr += "</div></div></div>";    		
    		$(".informationItemList"+index).append(contentStr);	    		
    		contentStr = "";
    	});
    }
}

function getCommentList() {
	var urlStr = contextPath + '/schedule/getlist.kok';
	// 일정 타입(0=모든 일정, 1=여행 계획, 2=여행 후기)
	var listType = 2;
	// 페이지의 정렬(1=인기순, 2=최신순)
	var listArrange = 1;
	// 테마
	var thema = "테마 전체";
	// 여행기간
	var minTerm = 1;
	var maxTerm = 60;
	// 검색어
	var searchWord = "";
	var currPageNum = 1;
	var listNumOfRows = 10;
	
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
			makeCommentListHtml(response);
		},
		error : function() {
			alert("error : function()");			
		}
		
	});
}

function makeCommentListHtml(json) {
//	alert("makeCommentListHtml(json) start");
	var listCnt = json.schedulelist.length;
	var contentStr = "";
	var btypeNm = ["계획", "후기"];
	// listCnt가 4개 보다 적다면 그 수를 출력하고 더 많아도 4개만 출력
	if (listCnt > 4) listCnt = 4;
	for (var i = 0; i < listCnt; i++) {
		var schedule = json.schedulelist[i];
		contentStr += "<div class='col-md-3 ftco-animate  fadeInUp ftco-animated destination'>";		
		contentStr += "<a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq + "&seq= "+schedule.seq+"' class='img img-2 d-flex justify-content-center align-items-center' ";		
		//contentStr += "style='background-image: url(" + contextPath + "/" + schedule.savefolder + "/" + schedule.savepicture + ");'>";	// sseul 주석
		contentStr += "style='background-image: url("+rootPt+"/resources/"+schedule.savefolder+"/"+ schedule.savepicture +");'>";	// sseul 추가
		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";		
		contentStr += "<span class='icon-search2'></span>";		
		contentStr += "</div>";		
		contentStr += "</a>";		
		contentStr += "<div class='text p-3'>";		
		contentStr += "<div class='d-flex'>";		
		contentStr += "<h3><a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq + "&seq= "+schedule.seq+"'>" + schedule.subject + "</a></h3>";		
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
		contentStr += "<br>#" + schedule.persons;
		contentStr += "<br>#" + schedule.thema;
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
	$("#commentList").children("div").remove();
	$("#commentList").append(contentStr);	
}

function getScheduleList() {
	var urlStr = contextPath + '/schedule/getlist.kok';
	// 일정 타입(0=모든 일정, 1=여행 계획, 2=여행 후기)
	var listType = 1;
	// 페이지의 정렬(1=인기순, 2=최신순)
	var listArrange = 1;
	// 테마
	var thema = "테마 전체";
	// 여행기간
	var minTerm = 1;
	var maxTerm = 60;
	// 검색어
	var searchWord = "";
	var currPageNum = 1;
	var listNumOfRows = 10;
	
	var param = JSON.stringify({"pg": currPageNum, "order": listArrange, "listNumOfRows": listNumOfRows, "listType": listType,
				 "thema": thema, "minTerm": minTerm, "maxTerm": maxTerm, "searchWord": searchWord});
//	var param = {"pg": currPageNum, "order": listArrange, "listNumOfRows": listNumOfRows, "listType": listType,
//			"thema": thema, "minTerm": minTerm, "maxTerm": maxTerm, "searchWord": searchWord};
	
	$.ajax({		
		url : urlStr,
//		type : 'GET',
		type : 'POST',
		contentType : 'application/json;charset=UTF-8',
		dataType : 'json',
		data: param,
		success : function(response) {
//			alert("success : function(schedulelist)");
			makeScheduleListHtml(response);
		},
		error : function() {
			alert("error : function()");			
		}
		
	});
}

function makeScheduleListHtml(json) {
//	alert("makeCommentListHtml(json) start");
	var listCnt = json.schedulelist.length;
	var contentStr = "";
	var btypeNm = ["계획", "후기"];
	// listCnt가 4개 보다 적다면 그 수를 출력하고 더 많아도 4개만 출력
	if (listCnt > 4) listCnt = 4;
	for (var i = 0; i < listCnt; i++) {
		var schedule = json.schedulelist[i];
		contentStr += "<div class='col-md-3 ftco-animate  fadeInUp ftco-animated destination'>";		
		contentStr += "<a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq +"&seq= "+schedule.seq+"' class='img img-2 d-flex justify-content-center align-items-center' ";		
		//contentStr += "style='background-image: url(" + contextPath + "/" + schedule.savefolder + "/" + schedule.savepicture + ");'>";	// sseul 주석
		contentStr += "style='background-image: url("+rootPt+"/resources/"+schedule.savefolder+"/"+ schedule.savepicture +");'>";	// sseul 추가
		contentStr += "<div class='icon d-flex justify-content-center align-items-center'>";		
		contentStr += "<span class='icon-search2'></span>";		
		contentStr += "</div>";		
		contentStr += "</a>";		
		contentStr += "<div class='text p-3'>";		
		contentStr += "<div class='d-flex'>";		
		contentStr += "<h3><a href='" + contextPath + "/schedule/view.kok?sseq=" + schedule.sseq +"&seq= "+schedule.seq+"'>" + schedule.subject + "</a></h3>";		
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
}
