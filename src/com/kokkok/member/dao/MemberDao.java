package com.kokkok.member.dao;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.MemberDto;
import com.kokkok.dto.ReviewDto;
import com.kokkok.dto.ScheduleListDto;



public interface MemberDao {
	int register(MemberDto memberDto);
	MemberDto login(Map<String, String> map);
	MemberDto reLogin(Map<String, String> map);
	int idCheck(String id);
	MemberDto findPw(Map<String, String> map);
	int updatePw(MemberDto memberDto);
	int memberModify(Map<String, String> map);
	int memberdelete(Map<String, String> map);
	
	int getMyWishReviewTotalCount(Map<String, String> map);
	List<ReviewDto> getMyWishReview(Map<String, String> map);
	
	int getMyWishScheduleTotalCount(Map<String, String> map);
	List<ScheduleListDto> getMyWishSchedule(Map<String, String> map);
	
	int getMyWriteScheduleTotalCount(Map<String, String> map);
	List<ScheduleListDto> getMyWriteSchedule(Map<String, String> map);




	

	
	MemberDto getMember(String id);
	int modify(MemberDto memberDto); 
	int delete(String id); 
	
	
	// MemberDto login(String id,String pass); 
	
	List<MemberDto> memberList(Map<String,String> map);
}
