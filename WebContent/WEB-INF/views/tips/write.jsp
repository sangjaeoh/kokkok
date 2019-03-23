<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%> 
<link rel="stylesheet" href="${root}/resources/css/community.css">
<!-- <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script> 
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script>  -->
<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js"></script>

<script type="text/javascript">

function tipsBtn(){	
	if($("#title").val().trim().length == 0){
		alert('제목을 입력해 주세요.');
	}else if ($('#summernote').summernote('isEmpty')) {
		  alert('내용을 입력해 주세요.');	 
	}else {
		var markup = $("#summernote").summernote("code"); // 내용 가져오는거
		$('#subject').val($('#title').val());
		$('#content').val(markup);
		$("#tipsWriteForm").attr("action","${root}/tips/write.kok").submit();
	}
}

</script>

</head>
<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>

<div class="hero-wrap js-fullheight3"
		 style="background-image: url('${root}/resources/images/bg_5.jpg');">
		<div class="overlay"></div>
		<div class="container">
			<div class="row no-gutters slider-text js-fullheight3 align-items-center justify-content-center"
				 data-scrollax-parent="true">
				<div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
					<!-- <p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-2"><a href="index.jsp">Home</a></span> <span>Blog</span></p> -->
					<h1 class="mb-3 bread" 
						data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 꿀팁</h1>
				</div>
			</div>
		</div>
	</div>
	


					

	<section class="ftco-section ftco-degree-bg" style="padding-top: 20px; margin-left: 100px;">
		<div class="container">
			<div class="row">
				<div>
					<h3 style="text-align: center;">글작성</h3> 
					
					<form name ="tipsWriteForm" id="tipsWriteForm" method="post" action="">				
						<input type="hidden" name="bcode" id="bcode" value="6">
						<input type="hidden" name="subject" id="subject" value="">		
						<input type="hidden" name="content" id="content" value="">
						<input type="hidden" name="tname" id="tname" value="">
								           
					<div class="form-group">
						<input type="text" id="title" class="form-control" placeholder="제목">
					</div>
			       	
			      	<div id="summernote"></div>
					
			        <div class="form-group" align="right" style="float: left; width: 50%; padding:10px;">
						<input type="button" value="등록" class="btn btn-primary py-3 px-5" onclick="tipsBtn();"/>
					
					</div>
					<div class="form-group" align="left" style="float: left; width: 50%; padding:10px;">
						<a href="javascript:history.back()">
						<input name="cencel" type="button" value="취소" class="btn btn-primary py-3 px-5">
						</a>
					</div>
					
					</form>
				
				</div>
			</div>
		</div>
	</section>
	
	<!-- .section -->
	
<script>
$(document).ready(function() {
    $('#summernote').summernote({
    	dialogsInBody: true,
    	tabsize: 2,
    	height: 370,
        width: 950,
        placeholder: '내용을 입력해주세요...'
    });
});
</script>	
	
<%@ include file="/WEB-INF/views/include/footer.jsp"%>
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>