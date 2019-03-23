package com.kokkok.review.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kokkok.dto.ReviewDto;
import com.kokkok.review.dao.ReviewDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public int reviewWrite(Map<String, Object> map) {
		ReviewDao reviewDao = sqlSessionTemplate.getMapper(ReviewDao.class);		
		return reviewDao.reviewWrite(map);
	}

	@Override
	public ReviewDto reviewView(String seq) {
		ReviewDao reviewDao = sqlSessionTemplate.getMapper(ReviewDao.class);
		return reviewDao.reviewView(seq);
	}
	
	
	@Override
	public List<ReviewDto> reviewList(Map<String, Object> map) {
		ReviewDao reviewDao = sqlSessionTemplate.getMapper(ReviewDao.class);		
		return  reviewDao.reviewList(map);
	}
	

	@Override
	public int reviewUpdate(Map<String, Object> map) {
		ReviewDao reviewDao = sqlSessionTemplate.getMapper(ReviewDao.class);		
		return reviewDao.reviewUpdate(map);
	}

	@Override
	public int reviewDelete(Map<String, Object> map) {
		ReviewDao reviewDao = sqlSessionTemplate.getMapper(ReviewDao.class);		
		return reviewDao.reviewDelete(map);
	}

}
