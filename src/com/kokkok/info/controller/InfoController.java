package com.kokkok.info.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.info.service.InfoService;


@Controller
public class InfoController {
	
	@Autowired
	private InfoService infoService;
	
	@RequestMapping(value="/information/list.kok",method=RequestMethod.GET)
	public ModelAndView infoList(HttpServletRequest request, HttpServletResponse response) {		
		ModelAndView mav = new ModelAndView();
		mav.addObject("request",request);
		infoService.infoList(mav);
		return mav;
		
	}
	
//	@RequestMapping(value="/information/search.kok",method=RequestMethod.GET)
//	public ModelAndView infoSearchList(@RequestParam(value = "searchWord") String word, HttpServletRequest request, HttpServletResponse response) {		
//		System.out.println("infoSearchList searchWord=" + request.getParameter("searchWord"));
//		System.out.println("infoSearchList searchWord=" + word);
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("request",request);
//		infoService.infoList(mav);
//		return mav;
//		
//	}
	
	@RequestMapping(value="/information/list.kok",method=RequestMethod.POST)
	public ModelAndView infoListPost(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.addObject("request",request);
		infoService.infoList(mav);
		return mav;
		
	}
	
	@RequestMapping(value="/information/view.kok",method=RequestMethod.GET)
	public ModelAndView infoView(HttpServletRequest request, HttpServletResponse response) {		
		ModelAndView mav = new ModelAndView();
		mav.addObject("request",request);
		infoService.infoView(mav);
		return mav;
		
	}
}
