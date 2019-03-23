<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css" rel="stylesheet">
    <link rel="stylesheet" href="${root}/resources/css/schedule_write_modal.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js"></script>

<style>
.modal-content{
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    padding-top: 15px;
}
</style>
<div class="modal fade" id="reviewModifyModal" role="dialog" data-backdrop="static">
	<div class="modal-dialog" style="max-width: 1200px; width: 1000px;">
	

		<!-- Modal content-->
		<div class="modal-content">
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
				<script src="${root}/resources/js/review_write_modal.js"></script>
				
				<form name ="reviewModifyForm" id="reviewModifyForm" method="post" action="">				
				<input type="hidden" name="bcode" id="bcode" value="">
				<input type="hidden" name="ccode" id="ccode" value="2">
				<input type="hidden" name="subject" id="subject" value="">		
				<input type="hidden" name="content" id="content" value="">
				<input type="hidden" name="seq" id="seq" value="">
				
				
				 <div class="form-group">
				 	<div class="row col-md-12">
				 		<div class="col-md-2">
							 <select id="reviewType" class="form-control">
		                    	<option value="3">장소</option>
		                    	<option value="4">숙박</option>
		                    	<option value="5">맛집</option>
		                  	 </select>
				 		</div>
				 		<div class="col-md-10">
						 <input type="text" id="localTitle" class="form-control" placeholder="리뷰장소" readonly="readonly" value="">
				 		</div>
				 	</div>
				</div>
				
				<div id="summernote"></div>
				
				<div class="form-group" align="right" style="float: left; width: 50%; padding:10px;">
					<input type="button" value="수정" class="btn btn-primary py-2 px-3" onclick="modifyBtn();" data-dismiss="modal"/>
				</div>
				
				<div class="form-group" align="left" style="float: left; width: 50%; padding:10px;">			
						<input type="button" data-dismiss="modal" value="취소" class="btn btn-primary py-2 px-3">	
				</div>
				</form>
			</div>
		</div>

	</div>
</div>
 <script type="text/javascript">

 function searchClick(){
 	searchMap();
 }
 
$("#reviewModifyModal").on("shown.bs.modal", function(){//모달 켜질때
		searchMap();
		$("#localTitle").val('${article.subject}');	
		var setArticleContent = '${article.content}';
	    $('#summernote').summernote('code', setArticleContent);
	});

$("body").on("hidden.bs.modal", ".modal", function () {//모달 꺼질때
	 document.getElementById("localTitle").value = null;
	 $("#summernote").summernote("reset");
	 selectedMarker = null;
	 document.getElementById("keyword").value = "인천 맛집";	
 });
 
function modifyBtn(){	
	if(document.getElementById("localTitle").value == ""){
		alert('장소를 지정해주세요.');
	}else if ($('#summernote').summernote('isEmpty')) {
		  alert('내용을 입력해 주세요.');	 
	}else {
		var markup = $("#summernote").summernote("code"); // 내용 가져오는거
		$('#subject').val($('#localTitle').val());		
		$('#content').val(markup);
		$('#bcode').val($('#reviewType').val());
		$('#seq').val('${article.seq}');
		$("#reviewModifyForm").attr("action","${root}/review/update.kok").submit();
	}
}

</script>
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
