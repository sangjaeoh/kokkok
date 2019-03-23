package com.kokkok.tips.service;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.TipsDto;

public interface TipsService {
	public int tipsWrite(Map<String, Object> map);
	public TipsDto tipsView(String seq);
	public List<TipsDto> tipsList(Map<String, Object> map);

	public int tipsUpdate(Map<String, Object> map);
	public int tipsDelete(Map<String, Object> map);
	
	public int getTipsListTotalCount(Map<String, Object> map);
}


