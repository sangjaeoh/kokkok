<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/include/link.jsp"%>
<%@ include file="/WEB-INF/views/include/loader.jsp"%>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>	
	<script type="text/javascript">
	var contextPath='<%=request.getContextPath()%>';
	</script>
    <script src="${root}/resources/js/information_list.js"></script>        
    <style>
	#lastPage,#firstPage,#nextPageGroup,#prevPageGroup,.naviNum {
		cursor: Pointer;
	}	
	</style>	
</head>
<body>

<%@ include file="/WEB-INF/views/include/nav.jsp"%>	
    
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">여행 정보</h1>
          </div>
        </div>
      </div>
    </div>
    
    <section class="ftco-section ftco-degree-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 sidebar ftco-animate">
					<div class="sidebar-wrap bg-light ftco-animate">
						<h3 class="heading mb-4">관광 정보</h3>
						<div class="form-group row">
							<div class="col-lg-1"></div> 
							<div class="col-lg-2">
								<input type="button" value="지역별 관광정보" class="btn btn-primary" id="infoArea" style="background-color: #f8f9fa; color: #dc3545">
							</div>
							<div class="col-lg-2">
								<input type="button" value="내주변 관광정보" class="btn btn-primary" id="infoLocation">
							</div>
							<div class="col-lg-2">
								<input type="button" value="통합 검색" class="btn btn-primary" id="infoKeyword">
							</div>
							<div class="col-lg-2">
								<input type="button" value="행사 검색" class="btn btn-primary" id="infoFestival">
							</div>
							<div class="col-lg-2">
								<input type="button" value="숙박 검색" class="btn btn-primary" id="infoStay">
							</div>
							<div class="col-lg-1"></div>
						</div>
					</div>
				</div>
			</div>
			
        	<div class="row">
				<div class="col-lg-3 sidebar ftco-animate">
					<div class="sidebar-wrap bg-light ftco-animate">
					<h3 class="heading mb-4 infoItemsTitle">지역별 관광정보</h3>
						<form action="#">
						<div class="fields">							
							<div class="form-group infoitems infoArea infoLocation">
								<div class="select-wrap one-third">
									<div class="icon"><span class="ion-ios-arrow-down"></span></div>
									<select name="" id="contentTypeIdList" class="form-control">
										<option value="">타입선택</option>
										<option value="12">관광지</option>
										<option value="14">문화시설</option>
										<option value="15">축제공연행사</option>
										<option value="25">여행코스</option>
										<option value="28">레포츠</option>
										<option value="32">숙박</option>
										<option value="38">쇼핑</option>
										<option value="39">음식점</option>		
									</select>
								</div>
							</div>
							<div class="form-group infoitems infoArea infoKeyword infoFestival infoStay">
								<div class="select-wrap one-third">
									<div class="icon"><span class="ion-ios-arrow-down"></span></div>
									<select name="" id="areaCodeList" class="form-control">																				
									</select>
								</div>
							</div>
							<div class="form-group infoitems infoArea infoKeyword infoFestival infoStay">
								<div class="select-wrap one-third">
									<div class="icon"><span class="ion-ios-arrow-down"></span></div>
									<select name="" id="sigunguCodeList" class="form-control">																				
									</select>
								</div>
							</div>
							<div class="form-group infoitems infoLocation">
								<input type="text" id="mapX" class="form-control" value="126.981106" readonly="readonly">
							</div>
							<div class="form-group infoitems infoLocation">
								<input type="text" id="mapY" class="form-control" value="37.568477" readonly="readonly">
							</div>
							<div class="form-group infoitems infoLocation">
								<input type="button" value="지 도" class="btn btn-secondary py-3 px-5" data-toggle="modal" data-target="#infoMapModal">
							</div>							
							<div class="form-group infoitems infoLocation">
								<div class="range-slider">
									<span>
										<input type="range" id="location_range" value="1" min="1" max="20" step="1"/>
										거리<input type="number" id="location_number" value="1" min="1" max="20" disabled="disabled"/>km (~20km)
									</span>									
								</div>
							</div>
							<div class="form-group infoitems infoKeyword">
								<input type="text" id="keyword" class="form-control" placeholder="검색어">
							</div>
							<div class="form-group infoitems infoFestival">
								<input type="text" id="eventStartDate" class="form-control datepicker" readonly="readonly" placeholder="시작날짜">
							</div>
							<div class="form-group infoitems infoFestival">
								<input type="text" id="eventEndDate" class="form-control datepicker" readonly="readonly" placeholder="끝날짜">
							</div>
						</div>
						<div class="form-group">
							<input type="button" id="getInfoList" value="검 색" class="btn btn-primary py-3 px-5">
						</div>
						</form>
					</div>					
				</div>
          
				<div class="col-lg-9">
					<div class="form-group" align="right">
						<select name="" id="orderType" class="">
							<option value="D">생성일순</option>
							<option value="B">조회순</option>
							<option value="A">제목순</option>									
							<option value="C">수정일순</option>									
						</select>
					</div>
					<div id="informationItemList" class="row">					
					</div>
					<div class="row mt-5">
						<div class="col text-center">
							<div class="block-27">
								<ul id="navigator">
									<li><span>&lt;</span></li>
									<li><span>1</span></li>
									<li><span>2</span></li>
									<li><span>3</span></li>
									<li><span>4</span></li>
									<li><span>5</span></li>									
									<li class='naviNum' style="bgcolor: black;"><span>&gt;</span></li>									
								</ul>
							</div>
						</div>
					</div>
									 	
				</div> <!-- .col-md-8 -->
				
			</div>
		</div>
    </section> <!-- .section -->
    
    <!-- The Modal -->
	<div class="modal fade" id="infoMapModal">
		<div class="modal-dialog">
			<div class="modal-content">
			
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">위치선택</h4>
				<button type="button" class="close" data-dismiss="modal">×</button>
			</div>
			
			<!-- Modal body -->
			<div class="modal-body">
				<div id="daumMap" style="width:100%;height:350px;"></div>
				<div id="clickLatlng"></div>
			</div>
			
			<!-- Modal footer -->
			<div class="modal-footer">
				<div class="row">
					<button type="button" id="mapApplyBtn" class="btn btn-primary py-2 px-3 mr-3" data-dismiss="modal">적 용</button>
					<button type="button" id="mapCancelBtn" class="btn btn-secandary py-2 px-3" data-dismiss="modal">취 소</button>
				</div>
			</div>
			      
			</div>
		</div>
	</div>

<%@ include file="/WEB-INF/views/include/footer.jsp"%>    
<%@ include file="/WEB-INF/views/include/arrowup.jsp"%>
</body>
</html>