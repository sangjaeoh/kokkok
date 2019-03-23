package com.kokkok.dto;

import java.util.Date;

public class ScheduleListDto extends BoardDto {

	// 여행일정게시판번호 
    private int sseq;

    // 시작날짜 
    private Date startdate;

    // 끝날짜 
    private Date enddate;
    
    // 여행기간
    private int period;

    // 원래사진 
    private String originpicture;

    // 저장폴더 
    private String savefolder;

    // 저장사진 
    private String savepicture;

    // 여행인원 
    private String persons;

    // 여행테마 
    private String thema;
    
    // 지역
    private String location;
    
    // 위도
    private String lat;
    
    // 경도
    private String lng;
    
    // 주소
    private String address;
    
    // 간단 주소
    private String simpleaddr;
    
    public ScheduleListDto() {}

	public ScheduleListDto(int sseq, Date startdate, Date enddate, int period, String originpicture, String savefolder,
			String savepicture, String persons, String thema, String location, String lat, String lng, String address,
			String simpleaddr) {
		super();
		this.sseq = sseq;
		this.startdate = startdate;
		this.enddate = enddate;
		this.period = period;
		this.originpicture = originpicture;
		this.savefolder = savefolder;
		this.savepicture = savepicture;
		this.persons = persons;
		this.thema = thema;
		this.location = location;
		this.lat = lat;
		this.lng = lng;
		this.address = address;
		this.simpleaddr = simpleaddr;
	}

	public int getSseq() {
		return sseq;
	}

	public void setSseq(int sseq) {
		this.sseq = sseq;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	public String getOriginpicture() {
		return originpicture;
	}

	public void setOriginpicture(String originpicture) {
		this.originpicture = originpicture;
	}

	public String getSavefolder() {
		return savefolder;
	}

	public void setSavefolder(String savefolder) {
		this.savefolder = savefolder;
	}

	public String getSavepicture() {
		return savepicture;
	}

	public void setSavepicture(String savepicture) {
		this.savepicture = savepicture;
	}

	public String getPersons() {
		return persons;
	}

	public void setPersons(String persons) {
		this.persons = persons;
	}

	public String getThema() {
		return thema;
	}

	public void setThema(String thema) {
		this.thema = thema;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getSimpleaddr() {
		return simpleaddr;
	}

	public void setSimpleaddr(String simpleaddr) {
		this.simpleaddr = simpleaddr;
	}

	@Override
	public String toString() {
		return "ScheduleListDto [sseq=" + sseq + ", startdate=" + startdate + ", enddate=" + enddate + ", period="
				+ period + ", originpicture=" + originpicture + ", savefolder=" + savefolder + ", savepicture="
				+ savepicture + ", persons=" + persons + ", thema=" + thema + ", location=" + location + ", lat=" + lat
				+ ", lng=" + lng + ", address=" + address + ", simpleaddr=" + simpleaddr + "]";
	}
    
}
