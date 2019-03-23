package com.kokkok.schedule.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.schedule.service.ScheduleListService;

@Controller
public class ScheduleListController {
	
	@Autowired
	private ScheduleListService scheduleListService;
	
	@RequestMapping(value="/schedule/searchScheduleList.kok",method=RequestMethod.GET)
	public ModelAndView searchScheduleList(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.addObject("request",request);
		mav.setViewName("/schedule/list");
		return mav;
	}
	
	// ajax 이용함. 해당 페이지와 정렬순서를 받아서 서비스로직에서 처리한 후 JSON을 리턴
	@RequestMapping(value="/schedule/getlist.kok", produces = "application/text; charset=utf8", method=RequestMethod.GET)
	public @ResponseBody String scheduleListJson(@RequestParam(value="pg") int pg, 
												 @RequestParam(value= "order") int order, 
												 @RequestParam(value= "listNumOfRows") int listNumOfRows, 
												 @RequestParam(value= "listType") int listType, 
												 @RequestParam(value= "thema") String thema,
												 @RequestParam(value= "minTerm") int minTerm, 
												 @RequestParam(value= "maxTerm") int maxTerm, 
												 @RequestParam(value= "searchWord") String searchWord) {
//		System.out.println("scheduleListJson()");		
		String schedulelist = scheduleListService.getScheduleListJson(pg, order, listNumOfRows, listType, thema, minTerm, maxTerm, searchWord);
//		System.out.println("controller: " + schedulelist);
		return schedulelist;
	}
	
	// ajax 이용함. 해당 페이지와 정렬순서를 받아서 서비스로직에서 처리한 후 JSON을 리턴
		@RequestMapping(value="/schedule/getlist.kok", produces = "application/text; charset=utf8", method=RequestMethod.POST)
		public @ResponseBody String scheduleListJsonPost(@RequestBody Map vo) {
//			System.out.println("scheduleListJsonPost()");		
//			System.out.println(vo.get("pg"));
			int pg = (Integer)vo.get("pg");
			int order = (Integer)vo.get("order");
			int listNumOfRows = (Integer)vo.get("listNumOfRows");
			int listType = (Integer)vo.get("listType");
			String thema = (String)vo.get("thema");
			int minTerm = (Integer)vo.get("minTerm");
			int maxTerm = (Integer)vo.get("maxTerm");
			String searchWord = (String)vo.get("searchWord");
			
//			String schedulelist = "";
			String schedulelist = scheduleListService.getScheduleListJson(pg, order, listNumOfRows, listType, thema, minTerm, maxTerm, searchWord);
//			System.out.println("controller: " + schedulelist);
			return schedulelist;
		}

}
