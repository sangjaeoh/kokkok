function selectChange(){
	mapRemove();
	
	//alert("${reviewArticle[3]}"); //왜 값은 안들어가고.... 미치것네
		
	mapView(positions_4);
}


/*-------- 토글 --------*/
//일차 토글 메소드
function dayTogg(num){	
	$(".seul1_Item"+num).toggle('slow');	
}

$(document).on("click", ".seul2", function() {		
	 $("#"+this.id).siblings("div").toggle('fast');
	 
}); 
/*-------------------*/
