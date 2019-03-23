package com.kokkok.review.dao;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.BoardDto;
import com.kokkok.dto.ReviewDto;
import com.kokkok.dto.TagDto;

public interface ReviewDao {

	public int reviewWrite(Map<String, Object> map);
	public ReviewDto reviewView(String seq);	
	public List<ReviewDto> reviewList(Map<String, Object> map);
	public int reviewUpdate(Map<String, Object> map);
	public int reviewDelete(Map<String, Object> map);
}
