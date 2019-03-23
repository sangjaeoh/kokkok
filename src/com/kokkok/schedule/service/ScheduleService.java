package com.kokkok.schedule.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.web.servlet.ModelAndView;

import com.kokkok.dto.ScheduleReviewDto;
import com.kokkok.dto.ScheduleViewDto;

public interface ScheduleService {
	public void scheduleList(ModelAndView mav);
	
	public int scheduleWrite(Map<String, Object> map);
	public int scheduleReviewWrite(Map<String, Object> map);
	
	public String selectSseq();
	public ScheduleViewDto scheduleView(String sseq);
	public List<ScheduleReviewDto> scheduleReviewView(String sseq);
	public Set<String> scheduleReviewLoc(String sseq);
	
	//삭제
	public int scheduleReviewDelete(String sseq);
	public int scheduleDelete(String seq);
	
	//수정
	public int scheduleReviewModiDelete(String seq);
	public int scheduleUpdate(Map<String, Object> map);
	public int scheduleReviewUpdate(Map<String, Object> map);
}