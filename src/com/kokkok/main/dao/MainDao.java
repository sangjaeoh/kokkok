package com.kokkok.main.dao;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.CommentsDto;
import com.kokkok.dto.MemberDto;
import com.kokkok.dto.StatisticsDto;

public interface MainDao {

	//찜
	public int checkWish(Map<String, Object> map);
	public int registerWish(Map<String, Object> map);
	public int deleteWish(Map<String, Object> map);
	public int countWish(Map<String, Object> map);
	public int addWish(Map<String, Object> map);
	public int minusWish(Map<String, Object> map);	
	
	//추천
	public int checkRecommend(Map<String, Object> map);
	public int registerRecommend(Map<String, Object> map);
	public int deleteRecommend(Map<String, Object> map);
	public int countRecommend(Map<String, Object> map);
	public int addRecommend(Map<String, Object> map);
	public int minusRecommend(Map<String, Object> map);
	
	//다음글번호
	public int getNextSeq();
	//조회수증가
	public int updateHit(String seq);
	
	
	//댓글
	public int writeComments(CommentsDto commentsDto);
	public List<CommentsDto> commentsList(String seq);
	public int commentsDelete(String cseq);
	public int commentsUpdate(Map<String, Object> map);
		
	//회원목록
	public List<MemberDto> getMemberList(Map<String, Object> map);
	public int getMemberTotalCount(Map<String, Object> map);
	public int getSearchMemberTotalCount(Map<String, Object> map);
	//통계
	public List<StatisticsDto> getLocationStatistics();
	public List<StatisticsDto> getMonthStatistics();
}
