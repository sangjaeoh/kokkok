package com.kokkok.schedule.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.dto.ScheduleBoardDto;
import com.kokkok.dto.ScheduleReviewDto;
import com.kokkok.dto.ScheduleViewDto;
import com.kokkok.main.dao.MainDao;
import com.kokkok.schedule.dao.ScheduleDao;

@Component
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	
	@Override
	public void scheduleList(ModelAndView mav) {
		mav.setViewName("/schedule/list");
	}

	@Override
	public int scheduleWrite(Map<String, Object> map) {
		int seq = sqlSessionTemplate.getMapper(MainDao.class).getNextSeq();		
		map.put("seq", seq);		
		
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleWrite(map);
	}

	@Override
	public int scheduleReviewWrite(Map<String, Object> map) {
		int seq = sqlSessionTemplate.getMapper(MainDao.class).getNextSeq();		
		map.put("seq", seq);
		int sseq = sqlSessionTemplate.getMapper(ScheduleDao.class).getNextSseq();
		map.put("sseq", sseq);
		
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleReviewWrite(map);
	}
	
	@Override
	public String selectSseq() {
		int sseq = sqlSessionTemplate.getMapper(ScheduleDao.class).getNextSseq();
		return Integer.toString(sseq);
	}
	
	@Override
	public ScheduleViewDto scheduleView(String sseq) {
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleView(sseq);
	}

	@Override
	public List<ScheduleReviewDto> scheduleReviewView(String sseq) {
		List<ScheduleBoardDto> list = sqlSessionTemplate.getMapper(ScheduleDao.class).selectReview(sseq);
		
		List<ScheduleReviewDto> reviewList = new ArrayList<>();
		for(int i=0; i<list.size(); i++) {
			String seq = Integer.toString(list.get(i).getSeq());		
			reviewList.add(sqlSessionTemplate.getMapper(ScheduleDao.class).scheduleReviewView(seq));
		}
		
		return reviewList;
	}
	
	@Override
	public Set<String> scheduleReviewLoc(String sseq) {
		List<ScheduleBoardDto> list = sqlSessionTemplate.getMapper(ScheduleDao.class).selectReview(sseq);
		
		Set<String> reviewLocList = new HashSet<>();
		
		for(int i=0; i<list.size(); i++) {
			String seq = Integer.toString(list.get(i).getSeq());		
			reviewLocList.add(sqlSessionTemplate.getMapper(ScheduleDao.class).scheduleReviewLoc(seq));
		}
		return reviewLocList;
	}
	
	@Override
	public int scheduleReviewDelete(String sseq) {
		int resultCnt = 0;
		List<ScheduleBoardDto> list = sqlSessionTemplate.getMapper(ScheduleDao.class).selectReview(sseq);
		
		
		for(int i=0; i<list.size(); i++) {
			String seq = Integer.toString(list.get(i).getSeq());	
			resultCnt += sqlSessionTemplate.getMapper(ScheduleDao.class).scheduleReviewDelete(seq);
		}
		
		return resultCnt;
	}

	@Override
	public int scheduleDelete(String seq) {
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleDelete(seq);
	}

	@Override
	public int scheduleReviewModiDelete(String seq) {
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleReviewDelete(seq);
	}
	
	@Override
	public int scheduleUpdate(Map<String, Object> map) {
		ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
		return scheduleDao.scheduleUpdate(map);
	}

	@Override
	public int scheduleReviewUpdate(Map<String, Object> map) {
		String seq = Integer.toString((int) map.get("seq"));
		int result = 0;
		result = sqlSessionTemplate.getMapper(ScheduleDao.class).countReview(seq);
		System.out.println(result);
		
		if (result != 0) {
			// update
			System.out.println("update중..");
			ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
			return scheduleDao.scheduleReviewUpdate(map);
		} else {
			// insert
			System.out.println("insert중..");
			int newSeq = sqlSessionTemplate.getMapper(MainDao.class).getNextSeq();		
			map.put("seq", newSeq);		
			
			ScheduleDao scheduleDao = sqlSessionTemplate.getMapper(ScheduleDao.class);
			return scheduleDao.scheduleReviewWrite(map);
		}
	}


}
