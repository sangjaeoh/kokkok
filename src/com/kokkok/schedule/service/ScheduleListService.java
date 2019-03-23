package com.kokkok.schedule.service;

public interface ScheduleListService {
	public String getScheduleListJson(int pg, int order, int listNumOfRows, int listType, String thema, int minTerm, int maxTerm, String searchWord);
}
