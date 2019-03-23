package com.kokkok.schedule.dao;

import java.util.List;
import java.util.Map;

import com.kokkok.dto.ScheduleListDto;

public interface ScheduleListDao {
	int getScheduleListTotalCount(Map<String, String> map);
	List<ScheduleListDto> getScheduleList(Map<String, String> map);	
}
