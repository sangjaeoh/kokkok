<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css" rel="stylesheet">
    <link rel="stylesheet" href="${root}/resources/css/schedule_write_modal.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js"></script>
 <script type="text/javascript">
function searchClick(){
	searchMap();
}
$("body").on("hidden.bs.modal", ".modal", function () {
	//reviewType 세팅
    document.getElementById("localTitle").value = null;
	$("#summernote").summernote("reset");
    selectedMarker = null;
    document.getElementById("keyword").value = "인천 맛집";
 });
 
function reviewBtn(){
	// 제목 선택 안한거 예외처리 추가하기
	if(document.getElementById("localTitle").value == ""){
		$("#writeMBtn").attr("data-dismiss","");
		alert('장소를 지정해주세요.');
	} else if ($('#summernote').summernote('isEmpty')) {
		$("#writeMBtn").attr("data-dismiss","");
		  alert('내용을 입력해 주세요.');	 
	} else {
		$("#writeMBtn").attr("data-dismiss","modal");
		modalWrite();
	}
}
</script>

<div class="modal fade" id="scheduleWriteModal" role="dialog" data-backdrop="static">
	<div class="modal-dialog" style="max-width: 1200px; width: 1000px;">
	

		<!-- Modal content-->
		<div class="modal-content" style="padding: 15px 15px 15px 15px;">
			<div>
				<div align="center">
					<h3>리뷰 작성</h3>
				</div>
				<hr>
				
				<div class="smap_wrap">
				    <div id="searchMap" style="width:100%;height:300px;position:relative;overflow:hidden;"></div>
				    <div id="menu_wrap" class="bg_white">
				        <div class="option">
				            <div>
				                <div onclick="searchPlaces(); return false;">
				                    키워드 : <input type="text" value="인천 맛집" id="keyword" size="15"> 
				                    <button type="button" id="searchBtn" onclick="javascript:searchClick();">검색하기</button> 
				                </div>
				            </div>
				        </div>
				        <hr>
				        <ul id="splacesList"></ul>
				        <div id="pagination"></div>
				    </div>
				</div>
				<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
				<script src="${root}/resources/js/schedule_write_modal.js"></script>
				
				 <div class="form-group">
				 	<div class="row col-md-12">
				 		<div class="col-md-2">
							 <select id="reviewType" class="form-control">
		                    	<option value="meeting">장소</option>
		                    	<option value="fork">맛집</option>
		                    	<option value="hotel">숙박</option>
		                  	 </select>
				 		</div>
				 		<div class="col-md-10">
						 <input type="text" id="localTitle" class="form-control" placeholder="리뷰장소" readonly="readonly">
				 		</div>
				 	</div>
				</div>
				
				<div id="summernote"></div>
				
				<div class="form-group" align="right" style="float: left; width: 50%; padding:10px;">
<!-- 					<input type="button" value="등록" class="btn btn-primary py-2 px-3" onclick="save()"/>	-->
					<input type="button" value="등록" class="btn btn-primary py-2 px-3" id="writeMBtn" onclick="reviewBtn();" data-dismiss="modal"/>
				</div>
				
				<div class="form-group" align="left" style="float: left; width: 50%; padding:10px;">
			
						<input type="button" data-dismiss="modal" value="취소" class="btn btn-primary py-2 px-3">
	
				</div>
			</div>
		</div>

	</div>
</div>
<script>
$('#summernote').summernote({
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
