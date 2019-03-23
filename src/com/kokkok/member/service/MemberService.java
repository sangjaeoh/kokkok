package com.kokkok.member.service;

import java.util.Map;


import com.kokkok.dto.MemberDto;

public interface MemberService {
	int register(MemberDto memberDto);
	int idCheck(String id);
	MemberDto login(Map<String, String> map);
	MemberDto reLogin(Map<String, String> map);
	MemberDto findPw(Map<String, String> map);
	int updatePw(MemberDto memberDto);
	int memberModify(Map<String, String> map);
	int memberdelete(Map<String, String> map);
	String getMyWishReview(int pg, int listNumOfRows, String id);
	String getMyWishSchedule(int pg, int listNumOfRows, String id);
	String getMyWriteSchedule(int pg, int listNumOfRows, String id);



}
