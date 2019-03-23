package com.kokkok.member.controller;

import java.io.IOException;

import java.util.Map;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.comm.LogCheck;
import com.kokkok.dto.MemberDto;
import com.kokkok.member.service.MemberService;


@Controller
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="/member/register.kok",method=RequestMethod.GET)
	public String register() {
		return "member/join/register";
	}
	
	@RequestMapping(value="/member/register.kok",method=RequestMethod.POST)
	public ModelAndView register(MemberDto memberDto) {
		int cnt = memberService.register(memberDto);
		String path = "member/join/registerfail";
		ModelAndView mav = new ModelAndView();
		if(cnt != 0) {
			mav.addObject("memberInfo", memberDto);
			LogCheck.logger.info(LogCheck.logMsg + memberDto.toString());
			path = "redirect:/member/registerok.kok";
		}
		mav.setViewName(path);
		return mav;
	}
	
	@RequestMapping(value="/member/registerok.kok",method=RequestMethod.GET)
	public String registerOk() {
		return "member/join/registerok";
	}
	
	@RequestMapping(value="/member/idcheck.kok",method=RequestMethod.GET)
	public String idCheck() {
		return "member/join/idcheck";
	}
	
	@RequestMapping(value="/member/idsearch.kok",method=RequestMethod.POST)
	public ModelAndView idCheck(@RequestParam("checkid") String id, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		int cnt = memberService.idCheck(id);
		request.setAttribute("checkid", id);
		request.setAttribute("idCnt", cnt);
		mav.addObject("checkid", id);
		mav.addObject("idcnt", cnt);
		mav.setViewName("member/join/idcheck");
		return mav;
	}
	
	@RequestMapping(value="/member/myInfo.kok",method=RequestMethod.GET)
	public String myInfo() {
		return "member/myMenu/myInfo/view";
	}
	
	@RequestMapping(value="/member/modify.kok",method=RequestMethod.GET)
	public String memberModify() {
		return "member/myMenu/myInfo/modify";
	}
	
	@RequestMapping(value="/member/modify.kok",method=RequestMethod.POST)
	public ModelAndView memberModify(@RequestParam Map<String, String> map,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		int check = memberService.memberModify(map);
		LogCheck.logger.info(LogCheck.logMsg + check);
		if(check != 0) {
			MemberDto memberDto = memberService.reLogin(map);
			session.setAttribute("userInfo", memberDto);
			LogCheck.logger.info(LogCheck.logMsg + memberDto.toString());
			mav.setViewName("member/myMenu/myInfo/modifyok");
		} else {
			mav.setViewName("member/myMenu/myInfo/modifyfail");			
		}
		return mav;
	}
	
	@RequestMapping(value="/member/delete.kok",method=RequestMethod.GET)
	public String memberDelete() {
		return "member/myMenu/myInfo/delete";
	}
	
	@RequestMapping(value="/member/delete.kok",method=RequestMethod.POST)
	public ModelAndView memberDelete(@RequestParam Map<String, String> map,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		int check = memberService.memberdelete(map);
		LogCheck.logger.info(LogCheck.logMsg + check);
		if(check != 0) {
			session.invalidate();
			mav.setViewName("member/myMenu/myInfo/deleteok");
		} else {
			mav.setViewName("member/myMenu/myInfo/deletefail");
		}
		return mav;
	}
	

	@RequestMapping(value="/login.kok",method=RequestMethod.POST)
	public ModelAndView login(@RequestParam Map<String, String> map,HttpSession session, HttpServletRequest request) throws IOException {
		ModelAndView mav = new ModelAndView();
		String path = request.getHeader("referer");
		String projectName = request.getContextPath(); 
		LogCheck.logger.info(LogCheck.logMsg +"이전 페이지경로:"+ path);
		LogCheck.logger.info(LogCheck.logMsg +"프로젝트 이름:"+ projectName);
		LogCheck.logger.info(LogCheck.logMsg +"프로젝트 길이:"+projectName.length());
		MemberDto memberDto = memberService.login(map);
		if(memberDto != null) {
			LogCheck.logger.info(LogCheck.logMsg + memberDto.toString());
			session.setAttribute("userInfo", memberDto);
			path = path.substring(path.lastIndexOf(projectName) + projectName.length()+1, path.length());
			LogCheck.logger.info(LogCheck.logMsg +"이동할 경로:"+ path);
			
			if("index.jsp".equals(path) || "member/register.kok".equals(path) || "member/registerok.kok".equals(path)) {
				mav.setViewName("redirect:index.jsp");
				return mav;
			}
		} else {
			mav.setViewName("member/login/loginfail");
			return mav;
		}
		
		mav.setViewName("redirect:"+path);
		return mav;
	}
	
	@RequestMapping(value="/logout.kok",method=RequestMethod.GET)
	public String logout(HttpSession session, HttpServletRequest request) {
		session.invalidate();
		return "redirect:index.jsp";
	}

	@RequestMapping(value="/member/findpass.kok",method=RequestMethod.GET)
	public String findPass() {
		return "member/login/findpassword";
	}

	@RequestMapping(value="/member/findpass.kok",method=RequestMethod.POST)
	public ModelAndView findpass(@RequestParam Map<String, String> map) {
		ModelAndView mav = new ModelAndView();
		MemberDto memberDto = memberService.findPw(map);
		if(memberDto != null) {
			String pw = "";
			for (int i = 0; i < 8; i++) {
				pw += (char) ((Math.random() * 26) + 97);
			}
			memberDto.setUserpass(pw);
			memberService.updatePw(memberDto);
		    try {
		    	String htmlContent = "";
		    	htmlContent += memberDto.getUsername()+"님 반갑습니다.<br>";
		    	htmlContent += "임시비밀번호가 발급외었습니다.<br>";
		    	htmlContent += "<font style=\"font-size: 20px; \">임시비밀번호:</font>";
		    	htmlContent += "<font color=\"red\" style=\"font-size: 25px; font-weight: bold;\">"+memberDto.getUserpass().toString()+"</font><br>";
		    	htmlContent += "로그인후 비밀번호를 변경해주세요.<br>";
		    	htmlContent += "감사합니다.";
			    MimeMessage message = mailSender.createMimeMessage();

			    message.setFrom(new InternetAddress("kokkokbangbang@gmail.com","Kokkok"));  // 보내는사람 이메일
			    message.addRecipient(RecipientType.TO, new InternetAddress(memberDto.getUseremail())); // 받는사람 이메일
			    message.setSubject("방방콕콕 임시비밀번호입니다."); // 제목
			    message.setText(htmlContent, "UTF-8", "html");  // 내용
			     
			    mailSender.send(message);
				mav.addObject("memberDto",memberDto);
			    mav.setViewName("member/login/sendmailok");
			    } catch(Exception e){
			      System.out.println(e);
			    }
		} else {
			mav.setViewName("member/login/sendmailfail");
		}
		return mav;

	}
	
	
	
	@RequestMapping(value="/member/mywishschedule.kok",method=RequestMethod.GET)
	public String myScheduleWish() {
		return "member/myMenu/myWish/myschedulelist";
	}
	
	@RequestMapping(value="/member/getwishschedule.kok",produces = "application/text; charset=utf8", method=RequestMethod.GET)
	public @ResponseBody String getScheduleWish(@RequestParam(value="userid") String userid,
		  										@RequestParam(value="pg") int pg,	
		  										@RequestParam(value="listNumOfRows") int listNumOfRows) {
		String myScheduleDtoList = memberService.getMyWishSchedule(pg, listNumOfRows, userid);
		return myScheduleDtoList;
	}
	
	
	
	
	
	@RequestMapping(value="/member/mywishreview.kok",method=RequestMethod.GET)
	public  String myWishReview() {
		return "member/myMenu/myWish/myreviewlist";
	}
	
	@RequestMapping(value="/member/getmywishreview.kok", produces = "application/text; charset=utf8", method=RequestMethod.GET)	
	public @ResponseBody String getMyWishReview(@RequestParam(value="userid") String userid,
											  	@RequestParam(value="pg") int pg,	
											  	@RequestParam(value="listNumOfRows") int listNumOfRows) {	
		String myReviewDtoList = memberService.getMyWishReview(pg, listNumOfRows, userid);
		return myReviewDtoList; 
	}
	
	
	
	
	
	@RequestMapping(value="/member/mywritelist.kok",method=RequestMethod.GET)
	public String myWriteList() {
		return "/member/myMenu/myWrite/list";
	}
	
	@RequestMapping(value="/member/getMyWriteschedule.kok", produces = "application/text; charset=utf8", method=RequestMethod.GET)	
	public @ResponseBody String getMyWriteschedule(@RequestParam(value="userid") String userid,
											  	   @RequestParam(value="pg") int pg,	
											  	   @RequestParam(value="listNumOfRows") int listNumOfRows) {
		String myScheduleDtoList = memberService.getMyWriteSchedule(pg, listNumOfRows, userid);
		return myScheduleDtoList; 
	}
	
	
	

	
	@RequestMapping(value="/admin/memberlist.kok",method=RequestMethod.GET)
	public String memberList() {
		return "admin/members/list";
	}
	
}
