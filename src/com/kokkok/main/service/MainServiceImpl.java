package com.kokkok.main.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.kokkok.dto.CommentsDto;
import com.kokkok.dto.MemberDto;
import com.kokkok.dto.ScheduleListDto;
import com.kokkok.dto.StatisticsDto;
import com.kokkok.main.dao.MainDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component
public class MainServiceImpl implements MainService{	
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	//찜 하기
	@Override
	public int registerWish(Map<String, Object> map) {	
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);		
		int cnt = maindao.checkWish(map);
		int check = 0;
		if(cnt > 0) {
			maindao.deleteWish(map);
			maindao.minusWish(map);				
		}else {		
			check = maindao.registerWish(map);
			maindao.addWish(map);
		}						
	return check;
	}
	
	@Override
	public int checkWish(Map<String, Object> map) {	
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);		
		return maindao.checkWish(map);	
	}

	@Override
	public int countWish(Map<String, Object> map) {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.countWish(map);
	}
	
	
	//추천 하기
		@Override
		public int registerRecommend(Map<String, Object> map) {	
			MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);		
			int cnt = maindao.checkRecommend(map);
			int check = 0;
			if(cnt > 0) {
				maindao.deleteRecommend(map);
				maindao.minusRecommend(map);				
			}else {		
				check = maindao.registerRecommend(map);
				maindao.addRecommend(map);
			}						
		return check;
		}
		
		@Override
		public int checkRecommend(Map<String, Object> map) {	
			MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);		
			return maindao.checkRecommend(map);	
		}

		@Override
		public int countRecommend(Map<String, Object> map) {
			MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
			return maindao.countRecommend(map);
		}
	
	
	
	
	
	
	//다음글번호얻기
	@Override
	public int getNextSeq() {	
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.getNextSeq();
	}
	
	//조회수증가
	@Override
	public int updateHit(String seq) {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.updateHit(seq);
	}
	
	
	
	
	//댓글
	@Override
	public int writeComments(CommentsDto commentsDto) {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.writeComments(commentsDto);
	}
	@Override
	public List<CommentsDto> commentsList(String seq) {
		List<CommentsDto> list = sqlSessionTemplate.getMapper(MainDao.class).commentsList(seq);
		for(int i = 0;i<list.size();i++) {
			list.get(i).setCcontent(list.get(i).getCcontent().replaceAll("\n", "<br>"));
		}
		return list;
	}
	@Override
	public int commentsDelete(String cseq) {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.commentsDelete(cseq);
	}
	@Override
	public int commentsUpdate(Map<String, Object> map) {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.commentsUpdate(map);
	}

	
	//회원목록
	@Override
	public List<MemberDto> getMemberList(Map<String, Object> map) {
		
		int totalCount = sqlSessionTemplate.getMapper(MainDao.class).getMemberTotalCount(map);	
		
		int listNumOfRows = Integer.parseInt((String)map.get("listNumOfRows"));
		int pg = Integer.parseInt((String)map.get("pg"));
		
		int startNum = listNumOfRows * pg - (listNumOfRows - 1);
		int endNum = listNumOfRows * pg;
		
		map.put("startNum", startNum + "");
		map.put("endNum", endNum + "");
	
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.getMemberList(map);
	}
	@Override
	public int getSearchMemberTotalCount(Map<String, Object> map) {
		int totalCount = sqlSessionTemplate.getMapper(MainDao.class).getMemberTotalCount(map);
		return totalCount;
	}
	@Override
	public int getMemberTotalCount(Map<String, Object> map) {
		int totalCount = sqlSessionTemplate.getMapper(MainDao.class).getMemberTotalCount(map);
		return totalCount;
	}

	

	
	
	//통계
	@Override
	public List<StatisticsDto> getLocationStatistics() {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.getLocationStatistics();
	}

	@Override
	public List<StatisticsDto> getMonthStatistics() {
		MainDao maindao = sqlSessionTemplate.getMapper(MainDao.class);
		return maindao.getMonthStatistics();
	}


	
	
	
}
