<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css" rel="stylesheet">
    <link rel="stylesheet" href="${root}/resources/css/schedule_write_Rmodal.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js"></script>
 <script type="text/javascript">
function msearchClick(){
	msearchMap();
}

$("body").on("hidden.bs.modal", ".modal", function () {
	//reviewType 세팅
    document.getElementById("MRlocalTitle").value = null;
	$("#MRsummernote").summernote("reset");
    selectedMarker = null;
    document.getElementById("MRkeyword").value = "인천 맛집";
 });

function writeReviewMBtn(){ // 삭제 버튼을 클릭했을 때 동작 지정. 아이템에 포함된 입력 필드에 값이 있으면 정말 삭제할지 물어봄
	// 제목 선택 안한거 예외처리 추가하기
	if(document.getElementById("MRlocalTitle").value == ""){
		$("#writeReviewMBtn").attr("data-dismiss","");
		alert('장소를 지정해주세요.');
	} else if ($('#MRsummernote').summernote('isEmpty')) {
		$("#writeReviewMBtn").attr("data-dismiss","");
		  alert('내용을 입력해 주세요.');	 
	} else {
		$("#writeReviewMBtn").attr("data-dismiss","modal");
		if(mselectedMarker != null){
			var tempSubject = document.getElementById("MRlocalTitle").value;
			var tempContent = $("#MRsummernote").summernote("code");
			$("."+clickParentClass).children(".subject").val(document.getElementById("MRlocalTitle").value); 
			$("."+clickParentClass).children(".location").val(document.getElementById("MRlocalTitle").value); 
			$("."+clickParentClass).children(".content").val($("#MRsummernote").summernote("code")); 
			$("."+clickParentClass).children(".lat").val(mselectedMarker.getPosition().getLat()); 
			$("."+clickParentClass).children(".lng").val(mselectedMarker.getPosition().getLng()); 
			
			var type = $("#MRreviewType").val();
			var icon = null;
			var selectBcode = 0;
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
			$("."+clickParentClass).children(".bcode").val(selectBcode);
			$("."+clickParentClass).children(".seul2").html("<i class='flaticon-"+icon+"'></i> "+tempSubject);
			$("."+clickParentClass).children(".sl-loc-cont").html(tempContent);
			
		} else {
			var tempContent = $("#MRsummernote").summernote("code");
			$("."+clickParentClass).children(".content").val($("#MRsummernote").summernote("code"));
			$("."+clickParentClass).children(".sl-loc-cont").html(tempContent);
		}
		
		//modalWrite();
	}
};

//리뷰 수정버튼 클릭시 가져와야할 것들
var premodalDay = 0;
var tmp = 1;
function premodalSetDay(clickday){
	premodalDay = clickday;
	// day랑 step을 가져와야 하나? 어떻게 찾아서 수정?
	// seq를 가져와서 .seq 값이 seq인것의 값들을 수정해야하나?
}

</script>

<div class="modal fade" id="scheduleReviewWriteModifyModal" role="dialog" data-backdrop="static">
	<div class="modal-dialog" style="max-width: 1200px; width: 1000px;">
	

		<!-- Modal content-->
		<div class="modal-content" style="padding: 15px 15px 15px 15px;">
			<div>
				<div align="center">
					<h3>리뷰 작성</h3>
				</div>
				<hr>
				
				<div class="smap_wrap">
				    <div id="MRsearchMap" style="width:100%;height:300px;position:relative;overflow:hidden;"></div>
				    <div id="MRmenu_wrap" class="bg_white">
				        <div class="option">
				            <div>
				                <div onclick="searchPlaces(); return false;">
				                    키워드 : <input type="text" value="인천 맛집" id="MRkeyword" size="15"> 
				                    <button type="button" id="MRsearchBtn" onclick="javascript:msearchClick();">검색하기</button> 
				                </div>
				            </div>
				        </div>
				        <hr>
				        <ul id="MRsplacesList"></ul>
				        <div id="MRpagination"></div>
				    </div>
				</div>
				<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
				<script src="${root}/resources/js/schedule_write_reviewmodal.js"></script>
				
				 <div class="form-group">
				 	<div class="row col-md-12">
				 		<div class="col-md-2">
							 <select id="MRreviewType" class="form-control">
		                    	<option value="meeting">장소</option>
		                    	<option value="fork">맛집</option>
		                    	<option value="hotel">숙박</option>
		                  	 </select>
				 		</div>
				 		<div class="col-md-10">
						 <input type="text" id="MRlocalTitle" class="form-control" placeholder="리뷰장소" readonly="readonly">
				 		</div>
				 	</div>
				</div>
				
				<div id="MRsummernote"></div>
				
				<div class="form-group" align="right" style="float: left; width: 50%; padding:10px;">
<!-- 					<input type="button" value="등록" class="btn btn-primary py-2 px-3" onclick="save()"/>	-->
					<input type="button" value="등록" class="btn btn-primary py-2 px-3" id="writeReviewMBtn" onclick="javascript:writeReviewMBtn()" data-dismiss="modal"/>
				</div>
				
				<div class="form-group" align="left" style="float: left; width: 50%; padding:10px;">
			
						<input type="button" data-dismiss="modal" value="취소" class="btn btn-primary py-2 px-3">
	
				</div>
			</div>
		</div>

	</div>
</div>
<script>
$('#MRsummernote').summernote({
	  placeholder: '내용을 적어주세요...',
	  dialogsInBody: true,
	  tabsize: 2,
	  height: 200,
	  lang: 'ko-KR',
	  toolbar : [
		  ['Font Style', ['fontname']],
		  ['style', ['bold', 'italic', 'underline']],
		  ['font', ['strikethrough']],
		  ['fontsize', ['fontsize']],
		  ['color', ['color']],
		  ['para', ['paragraph']],
		  ['Insert', ['picture','link','hr']]
	  ]
});

</script>
