package com.kokkok.info.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.info.dao.InfoDao;

@Component
public class InfoServiceImpl implements InfoService {

	@Autowired
	private InfoDao infodao;

	@Override
	public void infoList(ModelAndView mav) {		
		mav.setViewName("/information/list");				
	}

	@Override
	public void infoView(ModelAndView mav) {
		mav.setViewName("/information/view");		
	}

}
