var mapContainer = document.getElementById('writeMap'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var markerArr = [];
var polyline = null;

//지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

//마커를 표시할 위치와 title 객체 배열입니다 
var positions_1 = [
    {
        title: '카카오', 
        latlng: new daum.maps.LatLng(33.450705, 126.570677)
    },
    {
        title: '생태연못', 
        latlng: new daum.maps.LatLng(33.450936, 126.569477)
    },
    {
        title: '근린공원',
        latlng: new daum.maps.LatLng(33.451393, 126.570738)
    }
];

var positions_2 = [
	{
		title: '1', 
		latlng: new daum.maps.LatLng(33.452549906318, 126.57091023598191)
	},
	{
		title: '2', 
		latlng: new daum.maps.LatLng(33.45357693235454, 126.57067930612291)
	},
	{
		title: '3',
		latlng: new daum.maps.LatLng(33.45384441323185, 126.572420432074 )
	}
];

var positions_4 = [
	{
		title: '1', 
		latlng: new daum.maps.LatLng(37.4493769515909, 126.597799845781)
	},
	{
		title: '2', 
		latlng: new daum.maps.LatLng(37.70468482116549, 126.39106820252701)
	},
	{
		title: '3',
		latlng: new daum.maps.LatLng(37.5015472952354, 126.76955494751202 )
	}
	];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
 
mapView(positions_1);

function mapView(positions){
	var linePath = [];
	
	for (var i = 0; i < positions.length; i ++) {
	    // 마커 이미지의 이미지 크기 입니다
	    var imageSize = new daum.maps.Size(24, 35); 
	    
	    // 마커 이미지를 생성합니다    
	    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
	    
	    // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        map: map, // 마커를 표시할 지도
	        position: positions[i].latlng, // 마커를 표시할 위치
	        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
	        image : markerImage // 마커 이미지 
	    });
	    
	    markerArr.push(marker);
	    
	    linePath.push(new daum.maps.LatLng(positions[i].latlng.getLat(), 
	    									positions[i].latlng.getLng()));
	}
	var moveLatLon = new daum.maps.LatLng(positions[0].latlng.getLat(), 
			positions[0].latlng.getLng());
	map.setCenter(moveLatLon);
	

	// 지도에 표시할 선을 생성합니다
	polyline = new daum.maps.Polyline({
		endArrow : true, // 화살표 여부
	    path: linePath, // 선을 구성하는 좌표배열 입니다
	    strokeWeight: 4, // 선의 두께 입니다
	    strokeColor: '#f85959', // 선의 색깔입니다
	    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'shortdash' // 선의 스타일입니다
	});

	// 지도에 선을 표시합니다 
	polyline.setMap(map);  
	
}

function mapRemove(){
	polyline.setMap(null);
	//marker.setMap(null);
	for(var i=0; i<markerArr.length; i++){
		markerArr[i].setMap(null);
	}
}




