<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/views/include/link.jsp"%> 
<%@ include file="/WEB-INF/views/include/loader.jsp"%>   
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<link rel="stylesheet" type="text/css" href="${root}/resources/css/table.css">  
<link rel="stylesheet" href="${root}/resources/css/community.css">
<script src="${root}/resources/js/tips_list.js"></script> 
 <style>
	#lastPage,#firstPage,#nextPageGroup,#prevPageGroup,.naviNum {
		cursor: Pointer;
	}	
	</style>

</head>

<body>
<%@ include file="/WEB-INF/views/include/nav.jsp"%>  
<div class="hero-wrap js-fullheight3" style="background-image: url('${root}/resources/images/bg_5.jpg')">
	<div class="overlay"></div>
	<div class="container">
		<div class="row no-gutters slider-text js-fullheight3 align-items-center justify-content-center" data-scrollax-parent="true">
			<div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">  
				<h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 꿀팁</h1>
			</div>
		</div>
	</div>
</div>
  
<section class="ftco-section bg-light" style="padding-top: 10px;">    
	<div class="row">
		
	
			<div class="container-table100">
				<div class="wrap-table100" style="height: 1000px;">
				<form action="" id="tipsListForm" name="tipsListForm" method="get">
				<input type="hidden" name="seq" id="seq" value=""/>
					<table>
						<thead>
						<tr class="table100-head" align="center">
						<th class="column1a">글번호</th>
						<th class="column2a">제목</th>
						<th class="column3a">작성자</th>
						<th class="column4a">작성일</th>
						<th class="column5a">조회수</th>
						<th class="column5a">추천수</th>
						</tr>
						</thead>
						
						<tbody id="makeTipsList">
					
						</tbody>
					</table>
				
				</form>
					  
					 	<div class="row mt-5">
							<div class="col text-center">
								<div class="block-27">
									<ul id="navigator">
								
								
									</ul>
								</div>
							</div>
							
							
						</div>
						
						
							
								<div class="row" style="text-align: center; margin-top: 20px;">
								   <div style="width: 80px; margin-right:10px; margin-left: 425px;">
							        
										<select name="searchKey" id="searchKey" style="height: 54px; width: 70px;">
											<option value="subject">글제목
											<option value="name">글쓴이
											<option value="content">글내용
										</select>
										
									</div>
								
									<input type="text" id="searchWord" class="form-control" placeholder="검색어를 입력하세요" style="width: 180px;"> &nbsp;&nbsp;
								
									<input type="button" id="getTipsList" value="검색" class="btn btn-primary py-2 px-4">
									
									
									
	            				
									
								</div>
								<div style="text-align: right;">
									<c:if test="${userInfo == null}">
										<input id="impossibleAlert" type="button" value="글쓰기" class="btn btn-primary py-2 px-4">
									</c:if>
									
									<c:if test="${userInfo != null}">
										<input type="button" value="글쓰기" class="btn btn-primary py-2 px-4" onclick="location.href='${root}/tips/write.kok'">
									</c:if>
							 		</div>
								
						
						
				
				</div>
		    </div>
	
	
    </div>
    
					
				
				
	              		
				 
				   
	

</section>

<%@ include file="/WEB-INF/views/include/footer.jsp"%>
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
    
</body>
</html>