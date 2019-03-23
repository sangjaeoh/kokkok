package com.kokkok.schedule.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kokkok.dto.MemberDto;
import com.kokkok.dto.ScheduleReviewDto;
import com.kokkok.dto.ScheduleReviewDtoList;
import com.kokkok.dto.ScheduleViewDto;
import com.kokkok.main.service.MainService;
import com.kokkok.schedule.service.ScheduleService;



@Controller
public class ScheduleController {
 
	@Autowired
	private ScheduleService scheduleService;
	@Autowired
	private MainService mainService;
	@Autowired
	ServletContext servletContext; //파일 업로드 추가

	@RequestMapping(value = "/schedule/list.kok", method = RequestMethod.GET)
	public String scheduleList() {
		return "schedule/list";
	}

	@RequestMapping(value = "/schedule/write.kok", method = RequestMethod.GET)
	public String scheduleWrite() {
		return "schedule/write";
	}

	@RequestMapping(value = "/schedule/write.kok", method = RequestMethod.POST)
	public String scheduleWrite(@RequestParam Map<String, Object> map, HttpSession session, RedirectAttributes redirect,
			ScheduleReviewDtoList list, @RequestParam("uploadFile")MultipartFile multipartFile) {
		MemberDto memberDto = (MemberDto) session.getAttribute("userInfo");
		map.put("userid", memberDto.getUserid());
		//map.put("userid", "sseul");
		
		// file upload
		if (multipartFile != null && !multipartFile.isEmpty()) {
			String originalPicture = multipartFile.getOriginalFilename();
			String realPath = servletContext.getRealPath("/resources/");
			
			DateFormat df = new SimpleDateFormat("yyMMdd");
			String saveFolder = "images/" + df.format(new Date()); // 180818
			String realSaveFolder = realPath + saveFolder;
			System.out.println(realPath);
			System.out.println(realSaveFolder);
			File dir = new File(realPath + "images" + File.separator + df.format(new Date()));
			if(!dir.exists()) {
				dir.mkdirs();
			}
			String savePicture = UUID.randomUUID().toString() + originalPicture.substring(originalPicture.lastIndexOf('.'));
			
			File file = new File(realSaveFolder, savePicture);
			try {
				multipartFile.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			map.put("originpicture", originalPicture);
			map.put("savefolder", saveFolder);
			map.put("savepicture", savePicture);
		} else {
			map.put("originpicture", "image_8.jpg");
			map.put("savefolder", "images");
			map.put("savepicture", "image_8.jpg");
		}
		
		// schedule insert
		int scheduleCnt = scheduleService.scheduleWrite(map);
		int reviewCnt = 0;
 
		// review insert
		for (int i = 0; i < list.getList().size(); i++) {
			Map<String, Object> reviewMap = new HashMap<>();
			System.out.println("cont : " + list.getList().get(i).getContent());///////////

			reviewMap.put("userid", memberDto.getUserid()); // id setting!!!!!!!!!!!!!!!!!!!!!!!

			reviewMap.put("bcode", list.getList().get(i).getBcode());
			reviewMap.put("subject", list.getList().get(i).getSubject());
			reviewMap.put("content", list.getList().get(i).getContent());
			reviewMap.put("location", list.getList().get(i).getLocation());
			reviewMap.put("lat", list.getList().get(i).getLat());
			reviewMap.put("lng", list.getList().get(i).getLng());
			reviewMap.put("address", list.getList().get(i).getAddress());
			
			String addrstr = list.getList().get(i).getAddress();
			String[] addrs = addrstr.split(" ");
			String simpaddr = addrs[0] + " " + addrs[1];
			
			reviewMap.put("simpleaddr", simpaddr);
			reviewMap.put("tripday", list.getList().get(i).getTripday());
			reviewMap.put("step", list.getList().get(i).getStep());

			reviewCnt = scheduleService.scheduleReviewWrite(reviewMap);
		} 
		
		String path="";
		if (scheduleCnt != 0 && reviewCnt != 0) {
			// 글번호 가져가기 코딩해야함
			String sseq = scheduleService.selectSseq();
			ScheduleViewDto scheduleViewDto = scheduleService.scheduleView(sseq);
			List<ScheduleReviewDto> scheduleReviewDtoList = scheduleService.scheduleReviewView(sseq);

			if (scheduleViewDto != null) {
				scheduleViewDto.setContent(scheduleViewDto.getContent().replaceAll("\n", "<br>"));
				scheduleViewDto.setStartdate(scheduleViewDto.getStartdate().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setEnddate(scheduleViewDto.getEnddate().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setLogtime(scheduleViewDto.getLogtime().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setUpdatetime(scheduleViewDto.getUpdatetime().substring(0, 11).replaceAll("-", "/"));
			}
			
			redirect.addAttribute("sseq",sseq);
			redirect.addAttribute("seq",scheduleViewDto.getSeq());
			path = "redirect:/schedule/view.kok";		
		} else {
			System.out.println("일정 쓰기 실패");
			path = "redirect:/schedule/list.kok";
		}
		return path;
		/* 리뷰 등록하다 실패시 스케줄 등록 rollback 해야함 */
	}

	@RequestMapping(value = "/schedule/view.kok", method = RequestMethod.GET)
	public ModelAndView scheduleView(@RequestParam String sseq, String seq,HttpSession session,HttpServletRequest request,HttpServletResponse response) {
		
		  	if(request.getCookies() == null) {
		  		System.out.println("쿠키 없음");
		  	} else {
		  		System.out.println("쿠키 있음");
		  	}
			Cookie[] cookies = request.getCookies();        
	        // 비교하기 위해 새로운 쿠키
			System.out.println(cookies + "쿠키 주소값");
	        Cookie viewCookie = null; 
	        // 쿠키가 있을 경우 
	        if (cookies != null && cookies.length > 0){
	        	System.out.println(cookies + "쿠키 널 아니며 쿠키 값이 0 이상");
	            for (int i = 0; i < cookies.length; i++){
	                // Cookie의 name이 cookie + seq와 일치하는 쿠키를 viewCookie에 넣어줌	
	            	System.out.println(cookies[i].getName() + "쿠키 겟네임");
	                if (cookies[i].getName().equals("cookie"+sseq)) {                 
	                    viewCookie = cookies[i];
	                    System.out.println("cookies");
	                }
	            }
	        }
	        // 만일 viewCookie가 null일 경우 쿠키를 생성해서 조회수 증가 로직을 처리함.
	        if (viewCookie == null) { 
	            // 쿠키 생성(이름, 값)
	            Cookie newCookie = new Cookie("cookie"+sseq, "|" + sseq + "|");                                
	            // 쿠키 추가
	            response.addCookie(newCookie); 
	            // 쿠키를 추가 시키고 조회수 증가시킴
	            int result = mainService.updateHit(seq);                
	            System.out.println(result + "  result");
	        }  // viewCookie가 null이 아닐경우 쿠키가 있으므로 조회수 증가 로직을 처리하지 않음.  
	        System.out.println(cookies + "  cookies");
	        System.out.println(viewCookie+  "  viewcookies");
	        
		ScheduleViewDto scheduleViewDto = scheduleService.scheduleView(sseq);
		List<ScheduleReviewDto> scheduleReviewDtoList = scheduleService.scheduleReviewView(sseq);
		 
		//여기에 리뷰들의 simpleaddr을 중복제거하여 arr/map에 담아와서 addObject 해서 가져와보자!!
		Set<String> reviewLocList = scheduleService.scheduleReviewLoc(sseq);
		System.out.println("reviewLocList : "+ reviewLocList); // reviewLocList : [인천 연수구, 인천 부평구, 인천 계양구, 인천 부평구]

		if (scheduleViewDto != null) {
			scheduleViewDto.setContent(scheduleViewDto.getContent().replaceAll("\n", "<br>"));
			scheduleViewDto.setStartdate(scheduleViewDto.getStartdate().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setEnddate(scheduleViewDto.getEnddate().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setLogtime(scheduleViewDto.getLogtime().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setUpdatetime(scheduleViewDto.getUpdatetime().substring(0, 11).replaceAll("-", "/"));
		}

		ModelAndView mav = new ModelAndView();
		mav.addObject("scheduleArticle", scheduleViewDto);
		mav.addObject("reviewArticle", scheduleReviewDtoList);
		
		mav.addObject("locationArticle", reviewLocList); // loc 추가
		
		mav.setViewName("schedule/view");
		return mav;
	}

	@RequestMapping(value = "/schedule/modify.kok", method = RequestMethod.GET)
	public ModelAndView scheduleModify(@RequestParam String sseq, String seq) {
		System.out.println("수정할 일정 sseq: " + sseq + ", seq:" + seq);

		ScheduleViewDto scheduleViewDto = scheduleService.scheduleView(sseq);
		List<ScheduleReviewDto> scheduleReviewDtoList = scheduleService.scheduleReviewView(sseq);
		if (scheduleViewDto != null) {
			scheduleViewDto.setContent(scheduleViewDto.getContent().replaceAll("\n", "<br>"));
			scheduleViewDto.setStartdate(scheduleViewDto.getStartdate().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setEnddate(scheduleViewDto.getEnddate().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setLogtime(scheduleViewDto.getLogtime().substring(0, 11).replaceAll("-", "/"));
			scheduleViewDto.setUpdatetime(scheduleViewDto.getUpdatetime().substring(0, 11).replaceAll("-", "/"));
		}

		ModelAndView mav = new ModelAndView();
		mav.addObject("scheduleArticle", scheduleViewDto);
		mav.addObject("reviewArticle", scheduleReviewDtoList);
		mav.setViewName("schedule/modify");
		return mav;
	}

	@RequestMapping(value = "/schedule/modifyUpdate.kok", method = RequestMethod.POST)
	public ModelAndView scheduleModifyUpdate(@RequestParam Map<String, Object> map, HttpSession session,
			ScheduleReviewDtoList list, @RequestParam("uploadFile")MultipartFile multipartFile) {
		MemberDto memberDto = (MemberDto) session.getAttribute("userInfo");
		map.put("userid", memberDto.getUserid());
		
		// file upload
		if (multipartFile != null && !multipartFile.isEmpty()) {
			String originalPicture = multipartFile.getOriginalFilename();
			String realPath = servletContext.getRealPath("/resources/");
			
			DateFormat df = new SimpleDateFormat("yyMMdd");
			String saveFolder = "images/" + df.format(new Date()); // 180818
			String realSaveFolder = realPath + saveFolder;
			System.out.println(realPath);
			System.out.println(realSaveFolder);
			File dir = new File(realPath + "images" + File.separator + df.format(new Date()));
			if(!dir.exists()) {
				dir.mkdirs();
			}
			String savePicture = UUID.randomUUID().toString() + originalPicture.substring(originalPicture.lastIndexOf('.'));
			
			File file = new File(realSaveFolder, savePicture);
			try {
				multipartFile.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			map.put("originpicture", originalPicture);
			map.put("savefolder", saveFolder);
			map.put("savepicture", savePicture);
		} else {
			map.put("originpicture", "image_8.jpg");
			map.put("savefolder", "images");
			map.put("savepicture", "image_8.jpg");
		}
				
				
		// 일정 수정 
		System.out.println(map.get("hseq"));////////
		int scheduleCnt = scheduleService.scheduleUpdate(map);
		System.out.println("scheduleCnt : " + scheduleCnt);///////
		
		// 삭제된 리뷰들 삭제 (추천,찜,댓글 - location,스케줄보드 - 보드)
		String delArr = (String)map.get("deleteArr");
		int deleteCnt = 0;
		try {
			JSONObject jsonObj;
			JSONParser jsonParser = new JSONParser();
			jsonObj = (JSONObject) jsonParser.parse(delArr);
			JSONArray deleteArray = (JSONArray) jsonObj.get("value");
			if(deleteArray != null) {
				for (int i=0; i<deleteArray.size(); i++) {
					String seq = (String)(deleteArray.get(i));
					System.out.println("seq:"+seq);
					deleteCnt = scheduleService.scheduleReviewModiDelete(seq);
				}
				if(deleteCnt == 0) {
					System.out.println("리뷰 삭제 실패");
				}	
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		System.out.println("deleteCnt : " + deleteCnt);/////////
		
		// 수정,추가 된리뷰들 (if select from board seq=#{seq} = 1 : update / 없으면 : insert) 
		int reviewCnt = 0;
		if(list.getList() != null) {
			for (int i = 0; i < list.getList().size(); i++) {
				Map<String, Object> reviewMap = new HashMap<>();
				
				reviewMap.put("userid", memberDto.getUserid()); // id setting!!!!!!!!!!!!!!!!!!!!!!!
				
				reviewMap.put("sseq", map.get("sseq"));
				reviewMap.put("seq", list.getList().get(i).getSeq());
				reviewMap.put("bcode", list.getList().get(i).getBcode());
				reviewMap.put("subject", list.getList().get(i).getSubject());
				reviewMap.put("content", list.getList().get(i).getContent());
				reviewMap.put("location", list.getList().get(i).getLocation());
				reviewMap.put("lat", list.getList().get(i).getLat());
				reviewMap.put("lng", list.getList().get(i).getLng());
				reviewMap.put("address", list.getList().get(i).getAddress());
				
				String addrstr = list.getList().get(i).getAddress();
				String[] addrs = addrstr.split(" ");
				String simpaddr = addrs[0] + " " + addrs[1];
				
				reviewMap.put("simpleaddr", simpaddr);
				reviewMap.put("tripday", list.getList().get(i).getTripday());
				reviewMap.put("step", list.getList().get(i).getStep());
				
				reviewCnt = scheduleService.scheduleReviewUpdate(reviewMap);
			}
			if (reviewCnt ==0) {
				System.out.println("리뷰 수정,추가 실패");
			}
		}
		
		//여기에 리뷰들의 simpleaddr을 중복제거하여 arr/map에 담아와서 addObject 해서 가져와보자!!
		String sseq = (String)map.get("sseq");
		Set<String> reviewLocList = scheduleService.scheduleReviewLoc(sseq);
		System.out.println("reviewLocList : "+ reviewLocList); // reviewLocList : [인천 연수구, 인천 부평구, 인천 계양구, 인천 부평구]
		// view로 이동
		ModelAndView mav = new ModelAndView();
		if (scheduleCnt != 0) {
			// 글번호 가져가기 코딩해야함
			//String sseq = (String)map.get("sseq"); 
			ScheduleViewDto scheduleViewDto = scheduleService.scheduleView(sseq);
			List<ScheduleReviewDto> scheduleReviewDtoList = scheduleService.scheduleReviewView(sseq);

			if (scheduleViewDto != null) {
				scheduleViewDto.setContent(scheduleViewDto.getContent().replaceAll("\n", "<br>"));
				scheduleViewDto.setStartdate(scheduleViewDto.getStartdate().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setEnddate(scheduleViewDto.getEnddate().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setLogtime(scheduleViewDto.getLogtime().substring(0, 11).replaceAll("-", "/"));
				scheduleViewDto.setUpdatetime(scheduleViewDto.getUpdatetime().substring(0, 11).replaceAll("-", "/"));
			}

			mav.addObject("scheduleArticle", scheduleViewDto);
			mav.addObject("reviewArticle", scheduleReviewDtoList);
			
			mav.addObject("locationArticle", reviewLocList); // loc 추가

			mav.setViewName("schedule/view");// 성공
		} else {
			System.out.println("일정 수정 실패");
			mav.setViewName("schedule/list");// 실패
		}
		return mav;
		/* 리뷰 등록하다 실패시 스케줄 등록 rollback 해야함 */
	}

	@RequestMapping(value = "/schedule/delete.kok", method = RequestMethod.GET)
	public ModelAndView scheduleDelete(@RequestParam String sseq, String seq) {

		scheduleService.scheduleReviewDelete(sseq);
		scheduleService.scheduleDelete(seq);

		System.out.println("삭제한 일정 sseq: " + sseq + ", seq:" + seq);
		ModelAndView mav = new ModelAndView("redirect:/schedule/list.kok");
		return mav;
	}
}
