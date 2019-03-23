package com.kokkok.dto;

public class StatisticsDto {

	// 지역
	private String location;
	// 지역 count
	private int locationCount;

	// 월
	private String month;
	// 월 count
	private int monthCount;

	public StatisticsDto() {
	}

	public StatisticsDto(String location, int locationCount, String month, int monthCount) {
		super();
		this.location = location;
		this.locationCount = locationCount;
		this.month = month;
		this.monthCount = monthCount;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public int getLocationCount() {
		return locationCount;
	}

	public void setLocationCount(int locationCount) {
		this.locationCount = locationCount;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public int getMonthCount() {
		return monthCount;
	}

	public void setMonthCount(int monthCount) {
		this.monthCount = monthCount;
	}

	@Override
	public String toString() {
		return "StatisticsDto [location=" + location + ", locationCount=" + locationCount + ", month=" + month
				+ ", monthCount=" + monthCount + "]";
	}

}
