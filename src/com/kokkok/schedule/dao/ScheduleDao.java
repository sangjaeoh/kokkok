package com.kokkok.schedule.dao;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.ScheduleBoardDto;
import com.kokkok.dto.ScheduleReviewDto;
import com.kokkok.dto.ScheduleViewDto;

public interface ScheduleDao {
	public int scheduleWrite(Map<String, Object> map);
	public int getNextSseq();
	public int scheduleReviewWrite(Map<String, Object> map);
	
	public int countReview(String seq);
	
	public ScheduleViewDto scheduleView(String sseq);
	public List<ScheduleBoardDto> selectReview(String sseq);
	public ScheduleReviewDto scheduleReviewView(String seq);
	public String scheduleReviewLoc(String seq);
	
	public int scheduleReviewDelete(String seq);
	public int scheduleDelete(String seq);
	
	public int scheduleUpdate(Map<String, Object> map);
	public int scheduleReviewUpdate(Map<String, Object> map);
}
