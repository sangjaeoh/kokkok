package com.kokkok.review.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.dto.MemberDto;
import com.kokkok.dto.ReviewDto;
import com.kokkok.main.service.MainService;
import com.kokkok.review.service.ReviewService;


@Controller
@SessionAttributes(value="userInfo")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	@Autowired
	private MainService mainService;
	
	@RequestMapping(value="/review/list.kok", method=RequestMethod.GET)
	public ModelAndView reviewList (HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.addObject("request",request);
		mav.setViewName("review/list");
		return mav;	
	}
	
	@RequestMapping(value="/review/setList.kok",method=RequestMethod.POST ,headers= {"Content-type=application/json"})	
	public @ResponseBody Map<String,Object> reviewList(@RequestBody Map<String,Object> map) {		
		List<ReviewDto> reviewDtoList = reviewService.reviewList(map);
		map.put("reviewList", reviewDtoList);
		return map; 
	}


	@RequestMapping(value="/review/write.kok",method=RequestMethod.POST)
	public ModelAndView reviewWrite(@RequestParam Map<String, Object> map, HttpSession session) {
		
		MemberDto memberDto = (MemberDto) session.getAttribute("userInfo");
		map.put("userid", memberDto.getUserid());
		//map.put("userid", "sangjaeoh");
		
		int seq = mainService.getNextSeq();			
		map.put("seq",seq);
		
		int cnt = reviewService.reviewWrite(map);
		String path = "";		
		ModelAndView mav = new ModelAndView();	
		if(cnt != 0) {
			ReviewDto reviewDto = reviewService.reviewView(seq+"");	
			mav.addObject("article",reviewDto);			
			path = "redirect:view.kok?seq="+seq;
		}		
		mav.setViewName(path);
		return mav;
	}
	
	
	@RequestMapping(value="/review/view.kok",method=RequestMethod.GET)
	public ModelAndView reviewView(@RequestParam String seq, HttpServletRequest request, HttpServletResponse response) {

        //새로고침 조회수 증가 방지를 위한 쿠키사용 
        Cookie[] cookies = request.getCookies();        
        // 비교하기 위해 새로운 쿠키
        Cookie viewCookie = null; 
        // 쿠키가 있을 경우 
        if (cookies != null && cookies.length > 0){
            for (int i = 0; i < cookies.length; i++){
                // Cookie의 name이 cookie + seq와 일치하는 쿠키를 viewCookie에 넣어줌 
                if (cookies[i].getName().equals("cookie"+seq)) {                 
                    viewCookie = cookies[i];
                }
            }
        }
        // 만일 viewCookie가 null일 경우 쿠키를 생성해서 조회수 증가 로직을 처리함.
        if (viewCookie == null) { 
            // 쿠키 생성(이름, 값)
            Cookie newCookie = new Cookie("cookie"+seq, "|" + seq + "|");                                
            // 쿠키 추가
            response.addCookie(newCookie); 
            // 쿠키를 추가 시키고 조회수 증가시킴
            int result = mainService.updateHit(seq);                
        }  // viewCookie가 null이 아닐경우 쿠키가 있으므로 조회수 증가 로직을 처리하지 않음.  
        
        
		ReviewDto reviewDto = reviewService.reviewView(seq);
		ModelAndView mav = new ModelAndView();	
        if (reviewDto != null) {
            mav.addObject("article",reviewDto);
            mav.setViewName("review/view");
            return mav;
        } 
        else {
            // 에러 페이지 설정
        	mav.setViewName("redirect:list.kok");
            return mav;
        }
		
		
//			ReviewDto reviewDto = reviewService.reviewView(seq);
//			ModelAndView mav = new ModelAndView();	                     
//	   
//	        if(reviewDto!=null) {
//	        	int result = mainService.updateHit(seq); 
//	            mav.addObject("article",reviewDto);
//	            mav.setViewName("review/view");
//	            return mav;
//	        } 
//	        else {
//	        	mav.setViewName("redirect:list.kok");
//	            return mav;
//	        }
	}
		
	@RequestMapping(value="/review/update.kok",method=RequestMethod.POST)
	public ModelAndView reviewUpdate(@RequestParam Map<String, Object> map) {
		
		int cnt = reviewService.reviewUpdate(map);	
		String seq = (String)map.get("seq");		
		String path = "redirect:list.kok";
		ModelAndView mav = new ModelAndView();	
		if(cnt != 0) {	
			ReviewDto reviewDto = reviewService.reviewView(seq);			
			mav.addObject("article",reviewDto);			
			path = "redirect:view.kok?seq="+seq;
		}
		mav.setViewName(path);
		return mav;
	}
	
	@RequestMapping(value="/review/delete.kok",method=RequestMethod.POST)
	public ModelAndView reviewDelete(@RequestParam Map<String, Object> map) {
		
		int cnt = reviewService.reviewDelete(map);
		ModelAndView mav = new ModelAndView();	
		
		String path = "";
		if(cnt != 0) {//삭제완료
			path = "redirect:list.kok"; 
			List<ReviewDto> reviewDtoList = reviewService.reviewList(map);			
			mav.addObject("reviewList",reviewDtoList);
		}else {//삭제실패
			String seq = (String)map.get("seq");
			ReviewDto reviewDto = reviewService.reviewView(seq);			
			mav.addObject("article",reviewDto);
			path = "redirect:view.kok?seq="+seq; 
		}		
		mav.setViewName(path);
		return mav;
	}
	
	
	
	
}
