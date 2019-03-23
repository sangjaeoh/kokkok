<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>회원상세정보</title>
    <%@ include file="/WEB-INF/views/include/link.jsp"%>
    <%@ include file="/WEB-INF/views/include/loader.jsp"%>  
  </head>
  <body>
  	<%@ include file="/WEB-INF/views/include/nav.jsp"%>    
    <div class="hero-wrap js-fullheight" style="background-image: url('${root}/resources/images/bg_5.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">  
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">회원상세정보</h1>
          </div>
        </div>
      </div>
    </div>
    <section class="ftco-section bg-light">
    
    
    <div class="container">
    <hr>    
    <div class="row"> 	
	     <table class="table table-borderless">
		    <tbody>
		      <tr>
		        <td>ID</td>
		        <td>010101010010</td>	      
		      </tr>	      	
		      <tr>
		        <td>Email</td>
		        <td>Email@gmail.com</td>		        
		      </tr>
		      <tr>
		        <td>가입일</td>
		        <td>2019.02.10</td>	      
		      </tr>
		      <tr>
		        <td>마지막 방문일</td>
		        <td>2019.02.10</td>	      
		      </tr>
		    </tbody>
	  		</table>	  	
	</div>
	<hr>	  	
	</div>
	
	
			<div class="d-flex justify-content-center mb-3">
			    <div class="p-2"><input type="submit" value="뒤로가기" class="btn btn-primary py-3 px-4"></div>			    
			</div>
		
         
    </section>
	<%@ include file="/WEB-INF/views/include/footer.jsp"%>
	<%@ include file="/WEB-INF/views/include/arrowup.jsp"%> 
  </body>
</html>