package com.kokkok.member.service;


import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.dto.MemberDto;
import com.kokkok.dto.ReviewDto;
import com.kokkok.dto.ScheduleListDto;
import com.kokkok.member.dao.MemberDao;
import com.kokkok.schedule.dao.ScheduleListDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
 	private SqlSessionTemplate sqlSessionTemplate;
	

	@Override
	public MemberDto login(Map<String, String> map) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.login(map);
	}

	@Override
	public int register(MemberDto memberDto) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.register(memberDto);
	}

	@Override
	public int idCheck(String id) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.idCheck(id);
	}

	@Override
	public MemberDto findPw(Map<String, String> map) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.findPw(map);
	}

	@Override
	public int updatePw(MemberDto memberDto) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.updatePw(memberDto);
	}

	@Override
	public int memberModify(Map<String, String> map) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.memberModify(map);
	}

	@Override
	public MemberDto reLogin(Map<String, String> map) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.reLogin(map);
	}

	@Override
	public int memberdelete(Map<String, String> map) {
		MemberDao memberDao = sqlSessionTemplate.getMapper(MemberDao.class);
		return memberDao.memberdelete(map);
	}

	@Override
	public String getMyWishReview(int pg, int listNumOfRows, String id) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", id);
		int totCount = sqlSessionTemplate.selectOne("getMyWishReviewTotalCount", map);

		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
		
		map.put("startNum", startNum + "");
		map.put("endNum", endNum + "");
		
		List<ReviewDto> list = sqlSessionTemplate.getMapper(MemberDao.class).getMyWishReview(map);
		JSONObject json = new JSONObject();
		JSONArray jarray = new JSONArray();
		for(ReviewDto reviewDto : list) {
			JSONObject myReviewList = new JSONObject();
			myReviewList.put("seq", reviewDto.getSeq());
			myReviewList.put("bcode", reviewDto.getBcode());
			myReviewList.put("userid", reviewDto.getUserid());
			myReviewList.put("subject", reviewDto.getSubject());
			myReviewList.put("content", reviewDto.getContent());
			myReviewList.put("logtime", reviewDto.getLogtime());
			myReviewList.put("updatetime", reviewDto.getUpdatetime());
			myReviewList.put("recommcount", reviewDto.getRecommcount());
			myReviewList.put("wishcount", reviewDto.getWishcount());
			myReviewList.put("hit", reviewDto.getHit());
			myReviewList.put("cname", reviewDto.getCname());
			myReviewList.put("ccode", reviewDto.getCcode());
			myReviewList.put("bname", reviewDto.getBname());
			myReviewList.put("tseq", reviewDto.getTseq());
			myReviewList.put("tname", reviewDto.getTname());
			myReviewList.put("tcontent", reviewDto.getTcontent());
			jarray.add(myReviewList);

		}
		json.put("totCount", totCount);
		
		json.put("myReviewList", jarray);
		return json.toString();
	}

	@Override
	public String getMyWishSchedule(int pg, int listNumOfRows, String id) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", id);
		int totCount = sqlSessionTemplate.selectOne("getMyWishScheduleTotalCount", map);

		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
		
		map.put("startNum", startNum + "");
		map.put("endNum", endNum + "");
		
		List<ScheduleListDto> list = sqlSessionTemplate.getMapper(MemberDao.class).getMyWishSchedule(map);
		JSONObject json = new JSONObject();
		JSONArray jarray = new JSONArray();
		for(ScheduleListDto scheduleListDto : list) {
			
			JSONObject mySchedule = new JSONObject();
			mySchedule.put("sseq", scheduleListDto.getSseq());
			mySchedule.put("seq", scheduleListDto.getSeq());
			mySchedule.put("bcode", scheduleListDto.getBcode());
			mySchedule.put("userid", scheduleListDto.getUserid());
			mySchedule.put("subject", scheduleListDto.getSubject());
			mySchedule.put("content", scheduleListDto.getContent());
			mySchedule.put("logtime", scheduleListDto.getLogtime());
			mySchedule.put("updatetime", scheduleListDto.getUpdatetime());
			mySchedule.put("recommcount", scheduleListDto.getRecommcount());
			mySchedule.put("wishcount", scheduleListDto.getWishcount());
			mySchedule.put("hit", scheduleListDto.getHit());
			mySchedule.put("startdate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getStartdate()));
			mySchedule.put("enddate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getEnddate()));
			mySchedule.put("period", scheduleListDto.getPeriod());
			mySchedule.put("originpicture", scheduleListDto.getOriginpicture());
			mySchedule.put("savefolder", scheduleListDto.getSavefolder());
			mySchedule.put("savepicture", scheduleListDto.getSavepicture());
			mySchedule.put("persons", scheduleListDto.getPersons());
			mySchedule.put("thema", scheduleListDto.getThema());
			mySchedule.put("location", scheduleListDto.getLocation());
			mySchedule.put("lat", scheduleListDto.getLat());
			mySchedule.put("lng", scheduleListDto.getLng());
			mySchedule.put("address", scheduleListDto.getAddress());
			mySchedule.put("simpleaddr", scheduleListDto.getSimpleaddr());
			
			jarray.add(mySchedule);
		}
		
		json.put("totCount", totCount);
		
		json.put("myScheduleList", jarray);
//		System.out.println(json.toString());
		return json.toString();
	}

	@Override
	public String getMyWriteSchedule(int pg, int listNumOfRows, String id) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", id);
		int totCount = sqlSessionTemplate.selectOne("getMyWriteScheduleTotalCount", map);

		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
		
		map.put("startNum", startNum + "");
		map.put("endNum", endNum + "");
		
		List<ScheduleListDto> list = sqlSessionTemplate.getMapper(MemberDao.class).getMyWriteSchedule(map);
		JSONObject json = new JSONObject();
		JSONArray jarray = new JSONArray();
		for(ScheduleListDto scheduleListDto : list) {
			
			JSONObject myWriteSchedule = new JSONObject();
			myWriteSchedule.put("sseq", scheduleListDto.getSseq());
			myWriteSchedule.put("seq", scheduleListDto.getSeq());
			myWriteSchedule.put("bcode", scheduleListDto.getBcode());
			myWriteSchedule.put("userid", scheduleListDto.getUserid());
			myWriteSchedule.put("subject", scheduleListDto.getSubject());
			myWriteSchedule.put("content", scheduleListDto.getContent());
			myWriteSchedule.put("logtime", scheduleListDto.getLogtime());
			myWriteSchedule.put("updatetime", scheduleListDto.getUpdatetime());
			myWriteSchedule.put("recommcount", scheduleListDto.getRecommcount());
			myWriteSchedule.put("wishcount", scheduleListDto.getWishcount());
			myWriteSchedule.put("hit", scheduleListDto.getHit());
			myWriteSchedule.put("startdate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getStartdate()));
			myWriteSchedule.put("enddate", new SimpleDateFormat("yyyy/MM/dd").format(scheduleListDto.getEnddate()));
			myWriteSchedule.put("period", scheduleListDto.getPeriod());
			myWriteSchedule.put("originpicture", scheduleListDto.getOriginpicture());
			myWriteSchedule.put("savefolder", scheduleListDto.getSavefolder());
			myWriteSchedule.put("savepicture", scheduleListDto.getSavepicture());
			myWriteSchedule.put("persons", scheduleListDto.getPersons());
			myWriteSchedule.put("thema", scheduleListDto.getThema());
			myWriteSchedule.put("location", scheduleListDto.getLocation());
			myWriteSchedule.put("lat", scheduleListDto.getLat());
			myWriteSchedule.put("lng", scheduleListDto.getLng());
			myWriteSchedule.put("address", scheduleListDto.getAddress());
			myWriteSchedule.put("simpleaddr", scheduleListDto.getSimpleaddr());
			
			jarray.add(myWriteSchedule);
		}
		
		json.put("totCount", totCount);
		
		json.put("myWriteScheduleList", jarray);
//		System.out.println(json.toString());
		return json.toString();
	}



}
