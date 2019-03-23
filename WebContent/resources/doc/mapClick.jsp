<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>클릭한 위치에 마커 표시하기</title>
    
</head>
<body>
<div id="daumMap" style="width:100%;height:350px;"></div>
<div id="clickLatlng"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca50421e20fdf6befdf1ab193f76de7e&libraries=services"></script>
<script>
var mapContainer = document.getElementById('daumMap'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var imageSrc = 'https://phinf.pstatic.net/memo/20190225_65/sseul878_1551068626698VMnPU_PNG/marker_red2.png?type=w740', // 마커이미지의 주소입니다    
imageSize = new daum.maps.Size(40, 42), // 마커이미지의 크기입니다
imageOption = {offset: new daum.maps.Point(13, 37)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  
//마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
markerPosition = new daum.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new daum.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter() ,
    image: markerImage // 마커이미지 설정 
}); 
// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    var resultDiv = document.getElementById('clickLatlng'); 
    resultDiv.innerHTML = message;
    
});
</script>
</body>
</html>