package com.kokkok.tips.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kokkok.dto.ScheduleListDto;
import com.kokkok.dto.TipsDto;
import com.kokkok.schedule.dao.ScheduleListDao;
import com.kokkok.tips.dao.TipsDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component
public class TipsServiceImpl implements TipsService {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	@Autowired
	private SqlSession sqlSession;	
	
	@Override
	public int tipsWrite(Map<String, Object> map) {
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);		
		return tipsDao.tipsWrite(map);
	}

	@Override
	public TipsDto tipsView(String seq) {
		/*System.out.println("tipsView : " + seq);*/
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);		
		return tipsDao.tipsView(seq);
	}
	
	@Override
	public List<TipsDto> tipsList(Map<String, Object> map) {
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);	

		String listNumOfRowsStr = map.get("listNumOfRows")+"";
		int listNumOfRows = Integer.parseInt(listNumOfRowsStr);
		
		String pgStr = map.get("pg")+"";
		int pg =  Integer.parseInt(pgStr);
		
		/*System.out.println("listNumOfRowsStr =" + listNumOfRowsStr);
		System.out.println("pgStr =" + pgStr);*/
		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
			
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		return tipsDao.tipsList(map);
	}
	

	@Override
	public int tipsUpdate(Map<String, Object> map) {
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);		
		return tipsDao.tipsUpdate(map);
	}

	@Override
	public int tipsDelete(Map<String, Object> map) {
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);		
		return tipsDao.tipsDelete(map);
	}

	@Override
	public int getTipsListTotalCount(Map<String, Object> map) {
		TipsDao tipsDao = sqlSessionTemplate.getMapper(TipsDao.class);
		int totCount = tipsDao.getTipsListTotalCount(map);
		/*System.out.println("totCount =" + totCount);*/
		map.put("totCount", totCount);
		
		return tipsDao.getTipsListTotalCount(map);
	}



}
