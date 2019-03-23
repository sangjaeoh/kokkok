<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

  <head>
    <title>회원목록</title>
    <%@ include file="/WEB-INF/views/include/link.jsp"%>
    <%@ include file="/WEB-INF/views/include/loader.jsp"%> 
    <link rel="stylesheet" type="text/css" href="${root}/resources/css/memberListTable.css">
    <script type="text/javascript">
	var contextPath='<%=request.getContextPath()%>';
	</script>  
  </head>
  <body>
  	<%@ include file="/WEB-INF/views/include/nav.jsp"%>    
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '50%' }">  
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '50%', opacity: 1.6 }">회원목록</h1>
          </div>
        </div>
      </div>
    </div>
    
    <section class="ftco-section bg-light">   
    <div class="row">
		<div class="container-table100">
			<div class="wrap-table100">			
					 <!-- 검색  -->				
			    		 
					<div class="row d-flex justify-content-end mb-3">
					<div class="p-2 mr-auto" id="viewTotalMember"></div>				
					<div class="p-2"><input type="text" id="searchWord" class="form-control" placeholder="검색">&nbsp;</div>
					<div class="p-2"><input type="button" value="검색" onclick="javascript:getMemberList();" class="btn btn-primary py-3 px-4"></div>			   			
			   		</div>   
			   					
				<div class="table100">				
					<table>
						<thead>
							<tr class="table100-head" align="center">
								<th class="column1">ID</th>
								<th class="column2">Name</th>
								<th class="tdcolumn3">Email</th>
								<th class="column6">JoinDate</th>
							</tr>
						</thead>
						<tbody id="makeMemberList">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>            
         
         <!-- 하단 페이징 -->
         <div class="row">
          <div class="col text-center">          
            <div class="block-27" >   
            	<ul id="navigator"></ul>  
            </div>
          </div>
        </div>
         
         
    </section>
	<%@ include file="/WEB-INF/views/include/footer.jsp"%>	   
	<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
	<script type="text/javascript">
	
	
	// 목록의 현재 페이지
	var currPageNum = 1;
	// 목록의 총 갯수
	var listTotalCount = 0;
	// 한 화면에 보여지는 네비개이션의 페이지 갯수
	var navigation_size = 10;
	// 한 페이지의 결과 수
	var listNumOfRows = 15;
	
	
	
	function getMemberList(){		
		//컨트롤러경로
		var urlStr = contextPath + '/getMemberList.kok';
		// 검색어
		var word = $("#searchWord").val();
		
		var param = {"pg": currPageNum,  "listNumOfRows": listNumOfRows, "word": word};
		
		$.ajax({		
			url : urlStr,
			type : 'GET',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			data: param,
			success : function(response) {				
				makeMemberList(response);
				makeMemberTotalCount(response);
			},
			error : function() {
				alert("error : function()");			
			}
			
		});
	}
	
	
	

	function makeMemberList(response) {
		var memberList = response.memberList;
		var makeMemberList = "";
		for (var i = 0; i < memberList.length; i++) {
			makeMemberList += '<tr>';
			makeMemberList += '<td class="tdcolumn1">'+memberList[i].userid+'</td>';
			makeMemberList += '<td class="">'+memberList[i].username+'</td>';
			makeMemberList += '<td class="">'+memberList[i].useremail+'</td>';
			makeMemberList += '<td class="column6">'+memberList[i].joindate+'</td>';
			makeMemberList += '</tr>';
		}		
		// 일단 싹 지우고 리스트 추가
		$("#makeMemberList").empty();
		$("#makeMemberList").append(makeMemberList);
		
		listTotalCount = response.searchTotalCount;
	    // 네비게이터를 만듬
	    makeNavigator();
	}	
	
	function makeMemberTotalCount(response){
		// 총 회원수
		var makeMemberList = '<h5>회원수 : '+response.memberTotalCount+'명</h5>';
		$("#viewTotalMember").empty();
		$("#viewTotalMember").append(makeMemberList);
	}
	

	function makeNavigator() {
		// 전체 페이지 갯수
		var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
		// 목록을 몇 페이지 단위로 보게 할 것인가
		var naviSize = navigation_size;
		// 현재 페이지
		var pageNum = currPageNum;
		// 이전 페이지 그룹의 마지막 페이지
		var preLastPage = parseInt((pageNum - 1) / naviSize)  * naviSize;	
		// 시작 페이지
		var startPage = preLastPage + 1;	
		// 마지막 페이지
		var endPage = preLastPage + naviSize;
		// 다음 페이지 그룹의 시작 페이지
		var nextStartPage = startPage + naviSize;
		// html 코드
		var contentStr = "";
		
		// 마지막 페이지가 전체 페이지보다 클 수는 없음
		if (endPage > totalPageCount) {
			endPage = totalPageCount;
		}
		
		// 현재 페이지가 1이 아닌 경우
		if (pageNum != 1) {
			contentStr+= "<li id='firstPage' class=''><span>&lt;&lt;</span></li>";
		} else {
			contentStr+= "<li id=''><span>&lt;&lt;</span></li>";
		}
		
		// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
		if (preLastPage > 0) {
			contentStr+= "<li id='prevPageGroup' class=''><span>&lt;</span></li>";
		} else {
			contentStr+= "<li id=''><span>&lt;</span></li>";
		}	
		
		// 반복문을 돌며 네비게이터 코드를 작성
		for (var i = startPage; i <= endPage; i ++) {
			if (i != currPageNum) {
				contentStr+= "<li id='' class='naviNum'><span>" + i + "</span></li>";
			} else {
				contentStr+= "<li id='' class='active'><span>" + i + "</span></li>";
			}
					
		}
		
		// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
		if (nextStartPage <= totalPageCount) {
			contentStr+= "<li id='nextPageGroup' class=''><span>&gt;</span></li>";
		} else {
			contentStr+= "<li id=''><span>&gt;</span></li>";
		}
		
		// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
		if (pageNum != totalPageCount) {
			contentStr+= "<li id='lastPage' class=''><span>&gt;&gt;</span></li>";
		} else {
			contentStr+= "<li id=''><span>&gt;&gt;</span></li>";
		}	
		
		$("#navigator").empty();
	    $("#navigator").append(contentStr);
	    
	    // 웹브라우저의 뒤로가기 버튼을 위한 해쉬태그를 만듬
//	    createListHash();
	    
	}
	
	
	$(document).on("click", "#lastPage", function() {
		// 전체 페이지 갯수
		var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);	
		
		// 현재 페이지가 마지막 페이지가 아닌 경우에만 마지막 페이지로
		if (currPageNum != totalPageCount) {
			currPageNum = totalPageCount;		
			getMemberList();
			makeNavigator();
		}	
	});

	$(document).on("click", "#firstPage", function() {
		// 현재 페이지가 1이 아닌 경우에만 첫 페이지로
		if (currPageNum != 1) {
			currPageNum = 1;
			getMemberList();
			makeNavigator();
		}	
	});

	$(document).on("click", "#nextPageGroup", function() {
		// 전체 페이지 갯수
		var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
		// 목록을 몇 페이지 단위로 보게 할 것인가
		var naviSize = navigation_size;
		// 이전 페이지 그룹의 마지막 페이지
		var preLastPage = parseInt((currPageNum - 1) / naviSize)  * naviSize;
		// 시작 페이지
		var startPage = preLastPage + 1;
		// 다음 페이지 그룹의 시작 페이지
		var nextStartPage = startPage + naviSize;
			
		// 다음 페이지 그룹의 시작 페이지는 전체 페이지 수보다 작거나 같아야 함
		if (nextStartPage <= totalPageCount) {
			currPageNum = nextStartPage;
			getMemberList();
			makeNavigator();
		}	
	});

	$(document).on("click", "#prevPageGroup", function() {
		// 전체 페이지 갯수
		var totalPageCount = parseInt((listTotalCount - 1) / listNumOfRows + 1);
		// 목록을 몇 페이지 단위로 보게 할 것인가
		var naviSize = navigation_size;
		// 이전 페이지 그룹의 마지막 페이지
		var preLastPage = parseInt((currPageNum - 1) / naviSize)  * naviSize;	
			
		// 다음 페이지 그룹의 마지막 페이지는 0보다 커야 함
		if (preLastPage > 0) {
			currPageNum = preLastPage;
			getMemberList();
			makeNavigator();
		}	
	});

	$(document).on("click", ".naviNum", function() {	
		currPageNum = $(this).text();
		getMemberList();
		makeNavigator();	
	});
	
	
	$(document).ready(function() {
		getMemberList();
	})
	
	
	</script>    
  </body>
</html>