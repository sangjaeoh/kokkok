<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <script type="text/javascript">
$("body").on("hidden.bs.modal", ".modal", function () { //모달 꺼질때
	
});
</script>
<div class="modal fade" id="viewRecommModal" role="dialog" >
	<div class="modal-dialog" style="width: 1000px; height: 500px">
		<!-- Modal content-->
		<div class="modal-content">
		 <!-- 댓글달기 -->  
			<div class="pt-5a">	                      
	              <div class="comment-form-wrap">
	              <div class="bg-light commForm">
	                <h5 class="mb-4"><i class="icon-comment"></i> 댓글 수정</h5>
		               	<div class="row commDiv">
		                    <textarea name="" id="ccontentUpdate" cols="30" rows="1" class="form-control commText" placeholder="내용과 무관한 댓글, 악플은 삭제될 수 있습니다."></textarea>
		                   	<div class="center commBtnDiv">
			                   	<input type="button" value="등록" class="btn btn-primary commBtn" id="commentsUpdateBtn" data-dismiss="modal">
		                   	</div>
		                </div>
	              </div>
	              </div>
			</div>
	</div>
</div>
</div>