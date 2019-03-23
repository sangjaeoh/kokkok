var setCnt = 0;
var tripStart = null;
var tripEnd = null;
var tripType = null;
var tripPersons = null;
var tripThema = null;
var tripDays = 0;
var myTripStart = null;
var preTripDays = 0;
var totalReview = 0;
var selectCont ="", selectBcode=0;
$(document).ready(function() {	
	$("#setSchedule").click(function(){
		setScheduleInfo();
	});
	
	$("#scheduleTitle").click(function(){
		if (setCnt != 0){
			this.readOnly = false;
		} else {
			alert('좌측에서 일정을 만들어주세요.!');
		}
	});
	$("#scheduleMsg").click(function(){
		if (setCnt != 0){
			this.readOnly = false;
		} else {
			alert('좌측에서 일정을 만들어주세요.');
		}
	});
});

function setScheduleInfo(){
	tripType = $("#tripType").val();
	tripStart = $("#checkin_date").val();
	tripEnd = $("#checkout_date").val();
	tripPersons = $("#tripPersons").val();
	tripThema = $("#tripThema").val();
	
	// 여행 일 수 계산
	var startDay = new Date(tripStart);	
	var endDay = new Date(tripEnd);
	tripDays = dateDiff(startDay, endDay);
	
	if (tripStart == "" || tripEnd == "") {
		alert("출발일과 도착일을 선택해주세요.");
	} else if(tripDays < 1) {
		alert("도착일은 출발일 이후 날짜만 가능합니다.\n" + "(당일치기는 출발일과 도착일을 같은 날짜로 지정해주세요.)")
	} else if(tripPersons == "no" || tripThema == "no") {
		alert("여행 인원과 테마를 선택해주세요.");
	} else {
		var setStr = null;
		if(setCnt != 0){
			setStr = tripStart +"-"+ tripEnd +" ("+ tripDays +"일)의\n" +
					tripType +"으로 수정하시겠습니까?\n" 
					+ "(여행일이 수정될 경우 작성된 내용이 지워질 수 있습니다.)";
		} else {
			setStr = tripStart +"-"+ tripEnd +" ("+ tripDays +"일)의\n" +
					tripType + "을(를) 만드시겠습니까?" ;
		}		
		
		var result = confirm(setStr);
		if(result){
			
			if(preTripDays == 0){	// 처음 세팅
				setDays(tripDays);
			} else if(preTripDays < tripDays){		// 여행일수 늘어나면  3 > 5
				addDays(preTripDays,tripDays);
			} else if(preTripDays > tripDays){		// 여행일수 줄어들면 5 > 3
				removeDays(preTripDays,tripDays);
			} else {	// 여행일수 같으면 3 > 3
				//변화 x
			}
			
			setCnt = 1;
			preTripDays = tripDays;
						
			var setStr = tripStart +"-"+ tripEnd +" ("+ tripDays +"일)"  
					+"  ,  "+ tripType  +"  ,  "+ tripPersons +"  ,  "+ tripThema ;
			$("#scheduleSetting").text(setStr);
			
			// hidden setting
			var tripTypeNum = 0;
			if(tripType == "여행 계획"){
				tripTypeNum = 1;
			} else {
				tripTypeNum = 2;
			}			
			$('#sbcode').val(tripTypeNum);
			$('#startdate').val(tripStart);
			$('#enddate').val(tripEnd);
			$('#persons').val(tripPersons);
			$('#thema').val(tripThema);
			
		} 
	}
}

// 여행 일수 계산 함수
function dateDiff(start, end){
	var diff = end - start;
	var day = 1000 * 60 * 60 * 24;	//밀리세컨초 * 초 * 분 * 시간
	
	var days = parseInt(diff/day) + 1;
	
	return days;
}

function getFormatDate(date){
	var year = date.getFullYear();                   //yyyy
	var month = (1 + date.getMonth());              //M
	month = month >= 10 ? month : '0' + month;     // month 두자리로 저장
	var day = date.getDate();                       //d
	day = day >= 10 ? day : '0' + day;             //day 두자리로 저장
	return  year + '/' + month + '/' + day;
	
}

function selectChange(){
	mapRemove();
	mapView(positions_2);
}


/*-------- 여행일수 변경 --------*/
function addTag(num){
	myTripStart = new Date(myTripStart);
	
	var contents = 
		"<div class='sl-oneDay' id='sl_oneDay_"+num+"'>" + 
		"<div class='sl-day' id='sl_day_"+num+"'>" +
		"<label class='seul1' onclick='dayTogg("+num+")'>"+num+"일차<span>"+
		getFormatDate(myTripStart)+
		"</span></label>" +
		"<input type='button' id='' value='+일정 추가' class='btn btn-primary scheduleAdd' data-toggle='modal' data-target='#scheduleWriteModal' onclick='modalSetDay("+num+");'/>" +
		"<hr>" +
		"</div>" +
		"<div class='seul1_Item"+num+"' id='itemBoxWrap_"+num+"'></div>" +
		"</div>" ;
	
	myTripStart = myTripStart.setDate(myTripStart.getDate()+1);
	return contents;
}

function setDays(tripDays){
	myTripStart = tripStart;
	for(var i=1; i<tripDays+1; i++){
		$(addTag(i)).appendTo("#daysAdd");
		sortCall(i);
		$('#mapDay').append("<option value='day_"+i+"'>"+i+"일차</option>");
	}
}
function addDays(preTripDays,tripDays){
	// 여행일수 늘어나면  3 > 5
	for(var i=preTripDays+1; i<tripDays+1; i++){
		$(addTag(i)).appendTo("#daysAdd");
		sortCall(i);
		$('#mapDay').append("<option value='day_"+i+"'>"+i+"일차</option>");
	}
}
function removeDays(preTripDays,tripDays){
	// 여행일수 줄어들면 4 > 2
	for(var i=preTripDays; i>tripDays; i--){
		$("#itemBoxWrap_"+i+"").parent().remove();
		$("select[name='mapDay'] option[value='day_"+i+"']").remove();	
	}
}

/*-----------------------------*/
var modalDay = 0;
var tmp = 1;
function modalSetDay(day){
	modalDay = day;
}
function modalWrite(){
	var type = $("#reviewType").val();
	var title = document.getElementById("localTitle").value;
	var cont = $("#summernote").summernote("code"); // 내용 가져오는거
	selectCont = cont;
	
	var icon = null;
	if (type == "meeting") {
		icon = "meeting-point";
		selectBcode = 3;
	} else if(type == "fork") {
		icon = "fork";
		selectBcode = 5;
	} else {
		icon = "hotel";
		selectBcode = 4;
	}
		
	createItem(modalDay);
	$("#itemTitle"+modalDay+"_"+tmp).html("<i class='flaticon-"+icon+"'></i> "+title);
	$("#itemCont"+modalDay+"_"+tmp).html(cont);	
	$("div > p > img").css('widht','100%');
	totalReview = totalReview + 1;
	//alert("modalWrite():" + selectLoc +  "," +selectLat);
	//position_day[step] = selectLat,selectLng;
	//createPosition(selectLat,selectLng);
}

/*-------- 여행지 추가삭제 --------*/
/** 아이템 체크 */
function sortCall(numm){
	$("#itemBoxWrap_"+numm).sortable({
        placeholder:"itemBoxHighlight",		// 드래그 중인 아이템이 놓일 자리를 표시할 스타일 지정
        start: function(event, ui) {		// 드래그 시작 시 호출되는 이벤트 핸들러
            ui.item.data('start_pos', ui.item.index());		// 아이템에 키(start_pos), 값(ui.item.index()) 저장
        },
        stop: function(event, ui) {		// 드랍하면 호출되는 이벤트 핸들러
            var spos = ui.item.data('start_pos');
            var epos = ui.item.index();		// 드래그 하는 아이템의 위치를 가져옴. 0부터 시작
			      reorder(numm);	// 순서가 변경되면 모든 itemBox 내의 itemNum(입력필드 앞의 숫자)의 번호를 순서대로 다시 붙임
        }
    });
} 

/** 아이템 순서 조정 */
function reorder(numm) {
    $(".itemBox"+numm).each(function(i, box) {
    	$(box).attr("id","itemBox"+numm+"_"+(i + 1));
        $(box).find(".itemNum"+numm).html(i + 1);
        $(box).find(".itemTitle"+numm).attr("id","itemTitle"+numm+"_"+(i + 1));
        $(box).find(".itemCont"+numm).attr("id","itemCont"+numm+"_"+(i + 1));
        
        $(box).find(".step").attr("value",(i+1));
        
        tmp=(i + 1);
    });
}

function listReorder(numm){
	$(".sl-loc").each(function(i, box){
		$(box).find(".bcode").attr("id","list["+i+"].bcode").attr("name","list["+i+"].bcode");
		$(box).find(".subject").attr("id","list["+i+"].subject").attr("name","list["+i+"].subject");
		$(box).find(".content").attr("id","list["+i+"].content").attr("name","list["+i+"].content");
		$(box).find(".location").attr("id","list["+i+"].location").attr("name","list["+i+"].location");
		$(box).find(".lat").attr("id","list["+i+"].lat").attr("name","list["+i+"].lat");
		$(box).find(".lng").attr("id","list["+i+"].lng").attr("name","list["+i+"].lng");
		$(box).find(".address").attr("id","list["+i+"].address").attr("name","list["+i+"].address");
		$(box).find(".simpleaddr").attr("id","list["+i+"].simpleaddr").attr("name","list["+i+"].simpleaddr");
		$(box).find(".tripday").attr("id","list["+i+"].tripday").attr("name","list["+i+"].tripday");
		$(box).find(".step").attr("id","list["+i+"].step").attr("name","list["+i+"].step");
	});
}

/** 아이템 추가 */
function createItem(numm){
	$(createBox(numm))
    .appendTo("#itemBoxWrap_"+ numm) // createBox 함수 호출하여 아이템을 구성할 태그 반환 받아 jQuery 객체로 생성. 
    .hover( 	// 아이템에 마우스 오버와 아웃시에 동작 지정
        function() {	// 오버시 배경색 바꾸고 삭제 버튼 보여줌
            $(this).css('backgroundColor', '#ffecec');
            $(this).find('.modifyBox').show();
            $(this).find('.deleteBox').show();
        },
        function() {	// 아웃시 배경 원래대로 돌리고 삭제버튼 숨김
            $(this).css('background', 'none');
            $(this).find('.modifyBox').hide();
            $(this).find('.deleteBox').hide();
        }
    )
	.append("<label class='modifyBox' data-toggle='modal' data-target='#scheduleReviewWriteModifyModal' onclick=''>수정</label>")		// 아이템에 삭제 버튼 추가
	.append("<label class='deleteBox'>삭제</label>")		// 아이템에 삭제 버튼 추가
	.append("<div class='sl-loc-cont itemCont"+numm+"'>" +
			"<p><u>신기하다 신기해</u></p>" +
			"</div>")
			
	 // subject, content, //location, lat, lng, address, simpleaddr // tripday, step
	.append("<input type='hidden' class='bcode' value='"+selectBcode+"'>")
	.append("<input type='hidden' class='subject' value='"+selectLoc+"'>")
	.append("<input type='hidden' class='content' value='"+selectCont+"'>")
	.append("<input type='hidden' class='location' value='"+selectLoc+"'>")
	.append("<input type='hidden' class='lat' value='"+selectLat+"'>")
	.append("<input type='hidden' class='lng' value='"+selectLng+"'>")
	.append("<input type='hidden' class='address' value='"+selectAddr+"'>")
	.append("<input type='hidden' class='simpleaddr' value='"+selectAddr+"'>")
	.append("<input type='hidden' class='tripday' value='"+numm+"'>")
	.append("<input type='hidden' class='step' value=''>")
			
	.find(".deleteBox").click(function() {		// 삭제 버튼을 클릭했을 때 동작 지정. 아이템에 포함된 입력 필드에 값이 있으면 정말 삭제할지 물어봄
		var delCheck = confirm('삭제하시겠습니까?');
		if (delCheck == true){
			$(this).parent().remove();
	        reorder(numm);
	        totalReview = totalReview - 1;
		}
	});
// 숫자를 다시 붙인다.
reorder(numm);
listReorder();
}

/** 아이템 박스 작성8 */
// itemBox 내에 번호를 표시할 itemNum과 입력필드
function createBox(day) {
    var contents = "<div class='itemBox"+day+" sl-loc loc-updown'>"
                 + "<span class='itemNum"+day+"'></span> "
                 + "<label class='seul2 itemTitle"+day+"' name='item"+day+"'><i class='flaticon-fork'></i> 식당맛집식도락</label>"
                 + "</div>";
    return contents;
}
/*----------------------------------*/

/*-------- 대표사진 업로드 --------*/
//대표사진을 클릭하면 input type="file"을 클릭하는 메소드
function uploadFile(){  		  		
	  	document.getElementById("uploadFile").click();
}

//파일을 업로드가 됬는지 on change로 알아냄
$(function() {
    $("#uploadFile").on('change', function(){
        readURL(this);
    });
})
	
	//파일을 읽어서 대표사진태그에 이미지 URL 바꿔주는 메소드
function readURL(input) {  		 
    if (input.files && input.files[0]) {
        var reader = new FileReader();  	 
        reader.onload = function (e) {
            $('#mainImg').attr('style',"background-image: url('"+e.target.result+"');");  	         	         
        }  	 
        reader.readAsDataURL(input.files[0]);
    }
}  	
/*--------------------*/

/*-------- 토글 --------*/
// 일차 토글 메소드
function dayTogg(num){	
	$(".seul1_Item"+num).toggle('slow');	
}

$(document).on("click", ".seul2", function() {		
	 $("#"+this.id).siblings("div").toggle('fast');
	 
}); 

// 
/*-------------------*/
	
	
	