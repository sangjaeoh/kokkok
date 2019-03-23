
 $(document).ready(function(){ 
 // 일단 버튼을 숨긴다
 $("#back-top").hide(); 
 // 스크롤이 되면 버튼이 나타난다. 
 $(function () { 
    $(window).scroll(function () { 
         if ($(this).scrollTop() > 400) { //버튼 나타나는 위치px
               $('#back-top').fadeIn(); 
          } else { 
               $('#back-top').fadeOut(); 
          } 
 }); 
 // 버튼 클릭하면, 맨 위로 이동!! 
 $('#back-top').click(function () { 
         $('body,html').animate({ 
               scrollTop: 0 
          }, 500); //올라가는 속도 낮을수록 빠름
          return false; 
         }); 
 }); 
 });
 