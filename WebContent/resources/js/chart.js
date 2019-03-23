
//통계 데이터 담을 배열 생성
var locationLabels = new Array(); //선호 지역
var locationData =  new Array();  //선호 지역 수
var monthLabels = new Array(); //선호 월
var monthData =  new Array();  //선호 월 수


//통계데이터 호출
function getLocationStatisticsData(){	
	$.ajax({
		  url: contextPath+"/getStatistics.kok",
		  type: "POST",
		  contentType : 'application/json;charset=UTF-8',
		  dataType: "json",
		  success: function(response){
			  setLocationLabels(response);
		  }
	});
}

//받은 통계 데이터를 배열로 생성
function setLocationLabels(response){	
	var locationLists = response.locationList;
	var monthLists = response.monthList;
	for(var i=0; i<locationLists.length; i++){		
		locationLabels.push(locationLists[i].location);
		locationData.push(locationLists[i].locationCount);
	}

	for(var i=0; i<monthLists.length; i++){
		monthLabels.push(monthLists[i].month+"월");
		monthData.push(monthLists[i].monthCount);
	}	
	setLocationStatistics(); //차트 생성 메소드 호출
}

//통계차트 생성 메소드
function setLocationStatistics(){
	//Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
//선호 지역
var ctx = document.getElementById("locationPieChart");
var myPieChart = new Chart(ctx, {
type: 'doughnut',
data: {
labels: locationLabels,
datasets: [{
data: locationData,
backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#e04c4c','#f28a68','#dd7b2a','#e5b230','#abd639','#44d666','#3da6d3','#3264d1','#4439dd','#a149d8'],
hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf','#c64141','#ba7159','#bc6923','#ba9128','#86a82b','#309949','#2f85aa','#2950a5','#2f288c','#713696'],
hoverBorderColor: "rgba(234, 236, 244, 1)",
}],
},
});


//선호 월
var ctx2 = document.getElementById("monthPieChart");
var myPieChart2 = new Chart(ctx2, {
type: 'doughnut',
data: {
		labels: monthLabels,
		 datasets: [{
		      data: monthData,
		      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#e04c4c','#f28a68','#dd7b2a','#e5b230','#abd639','#44d666','#3da6d3','#3264d1','#4439dd','#a149d8'],
		      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf','#c64141','#ba7159','#bc6923','#ba9128','#86a82b','#309949','#2f85aa','#2950a5','#2f288c','#713696'],
		      hoverBorderColor: "rgba(234, 236, 244, 1)",
		    }],
},
});
}

$(document).ready(function() {
	getLocationStatisticsData();//통계	
});