package com.kokkok.tips.controller;

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
import com.kokkok.dto.TipsDto;
import com.kokkok.main.service.MainService;

import com.kokkok.tips.service.TipsService;


@Controller
@SessionAttributes(value="userInfo")
public class TipsController {
	
	@Autowired
	private TipsService tipsService;
	@Autowired
	private MainService mainService;
	
	@RequestMapping(value="/tips/list.kok", method=RequestMethod.GET)
	public String tipsList() {
		return "tips/list";
	}
	
	@RequestMapping(value="/tips/setList.kok",method=RequestMethod.POST ,headers= {"Content-type=application/json"})	
	public @ResponseBody Map<String,Object> tipsList(@RequestBody Map<String,Object> map) {	

		List<TipsDto> tipsDtoList = tipsService.tipsList(map);
		map.put("tipsList", tipsDtoList);
		
		int getTipsListTotalCount = tipsService.getTipsListTotalCount(map);
		map.put("totCount", getTipsListTotalCount);
//				System.out.println(getTipsListTotalCount);
		return map; 
		
	}

	@RequestMapping(value="/tips/write.kok", method=RequestMethod.GET)
	public String tipsWrite () {
		return "tips/write";
	}
	
	@RequestMapping(value="/tips/write.kok",method=RequestMethod.POST)
	public ModelAndView tipsWrite(@RequestParam Map<String, Object> map, HttpSession session) {
		
		MemberDto memberDto = (MemberDto) session.getAttribute("userInfo");
		map.put("userid", memberDto.getUserid());
		/*map.put("userid", "lee");*/
		
		int seq = mainService.getNextSeq();			
		map.put("seq",seq);
		
		int cnt = tipsService.tipsWrite(map);
		String path = "";		
		ModelAndView mav = new ModelAndView();	
		if(cnt != 0) {
			
			TipsDto tipsDto = tipsService.tipsView(seq+"");	
			mav.addObject("article",tipsDto);			
			path = "redirect:view.kok?seq="+seq;
		}		
		mav.setViewName(path);
		return mav;
	}
	
		
	@RequestMapping(value="/tips/view.kok",method=RequestMethod.GET)
	public ModelAndView tipsView(@RequestParam String seq, HttpServletRequest request, HttpServletResponse response) {
		
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
        
			
		/*System.out.println("tipsView : " + seq);*/
        TipsDto tipsDto = tipsService.tipsView(seq);
        ModelAndView mav = new ModelAndView();	
        if (tipsDto != null) {
            mav.addObject("article",tipsDto);
            mav.setViewName("tips/view");
            return mav;
        } 
        else {
            // 에러 페이지 설정
        	mav.setViewName("redirect:list.kok");
            return mav;
        }
	}
	@RequestMapping(value="/tips/modify.kok", method=RequestMethod.POST)
	public ModelAndView tipsModify(@RequestParam String seq) {
		/* System.out.println("tipsModify : " + seq); */
		TipsDto tipsDto = tipsService.tipsView(seq);
		/* System.out.println("글번호찍히나" + tipsDto.getSeq()); */
		ModelAndView mav = new ModelAndView();			
		mav.addObject("article",tipsDto);
		mav.setViewName("tips/modify");
		return mav;
	}
	
	@RequestMapping(value="/tips/update.kok",method=RequestMethod.POST)
	public ModelAndView tipsUpdate(@RequestParam Map<String, Object> map) {
		/* System.out.println("tipsUpdate : " + seq); */
		int cnt = tipsService.tipsUpdate(map);	
		String seq = (String)map.get("seq");		
		String path = "redirect:list.kok";
		ModelAndView mav = new ModelAndView();	
		if(cnt != 0) {	
			TipsDto tipsDto = tipsService.tipsView(seq);			
			mav.addObject("article",tipsDto);			
			path = "redirect:view.kok?seq="+seq;
		}
		mav.setViewName(path);
		return mav;
	}
	
	@RequestMapping(value="/tips/delete.kok",method=RequestMethod.POST)
	public ModelAndView tipsDelete(@RequestParam Map<String, Object> map) {
		
		int cnt = tipsService.tipsDelete(map);
		ModelAndView mav = new ModelAndView();	
		
		if(cnt != 0) {//삭제완료		
			/*System.out.println("asdfasdfa");*/		
			mav.setViewName("tips/list");
		
		}else {//삭제실패	
			mav.setViewName("tips/list");
		}
		
		return mav;
		
	}

}



