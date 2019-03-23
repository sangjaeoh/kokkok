package com.kokkok.schedule.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kokkok.dto.ScheduleListDto;
import com.kokkok.schedule.dao.ScheduleDao;
import com.kokkok.schedule.dao.ScheduleListDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
public class ScheduleListServiceImpl implements ScheduleListService {
	
	@Autowired
	private SqlSession sqlSession;	
	
	@Override
	public String getScheduleListJson(int pg, int order, int listNumOfRows, int listType, String thema, int minTerm, int maxTerm, String searchWord) {
		Map<String, String> map = new HashMap<String, String>();
		// 정렬, 게시물유형, 테마, 기간, 검색어를 map에 넣음
		map.put("order", order + "");
		map.put("listType", listType + "");
		map.put("thema", thema);
		map.put("minTerm", minTerm + "");
		map.put("maxTerm", maxTerm + "");
		map.put("searchWord", searchWord);
		// 가져올 목록 전체 갯수
		int totCount = sqlSession.selectOne("getScheduleListTotalCount", map);
//		System.out.println("getScheduleListJson totCount = " + totCount);
//		System.out.println("getScheduleListJson minTerm = " + minTerm + ",maxTerm = " + maxTerm);
		
		// 페이지에 맞춰 목록을 가져와야 하므로 시작과 끝을 정함
		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
		
		map.put("startNum", startNum + "");
		map.put("endNum", endNum + "");
		
		
		List<ScheduleListDto> list = sqlSession.getMapper(ScheduleListDao.class).getScheduleList(map);
		JSONObject json = new JSONObject();
		JSONArray jarray = new JSONArray();
		for(ScheduleListDto scheduleListDto : list) {
			
			JSONObject schedule = new JSONObject();
			schedule.put("sseq", scheduleListDto.getSseq());
			schedule.put("seq", scheduleListDto.getSeq());
			schedule.put("bcode", scheduleListDto.getBcode());
			schedule.put("userid", scheduleListDto.getUserid());
			schedule.put("subject", scheduleListDto.getSubject());
//			schedule.put("content", scheduleListDto.getContent());
			schedule.put("logtime", scheduleListDto.getLogtime());
			schedule.put("updatetime", scheduleListDto.getUpdatetime());
			schedule.put("recommcount", scheduleListDto.getRecommcount());
			schedule.put("wishcount", scheduleListDto.getWishcount());
			schedule.put("hit", scheduleListDto.getHit());
			schedule.put("startdate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getStartdate()));
			schedule.put("enddate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getEnddate()));
			schedule.put("period", scheduleListDto.getPeriod());
			schedule.put("originpicture", scheduleListDto.getOriginpicture());
			schedule.put("savefolder", scheduleListDto.getSavefolder());
			schedule.put("savepicture", scheduleListDto.getSavepicture());
			schedule.put("persons", scheduleListDto.getPersons());
			schedule.put("thema", scheduleListDto.getThema());
//			schedule.put("location", scheduleListDto.getLocation());
//			schedule.put("lat", scheduleListDto.getLat());
//			schedule.put("lng", scheduleListDto.getLng());
//			schedule.put("address", scheduleListDto.getAddress());
//			schedule.put("simpleaddr", scheduleListDto.getSimpleaddr());
			
			jarray.add(schedule);
		}
		
		json.put("totCount", totCount);
		
		json.put("schedulelist", jarray);
//		System.out.println(json.toString());
		return json.toString();
	}

	

}
