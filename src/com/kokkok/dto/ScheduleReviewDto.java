package com.kokkok.dto;

// BoardDto + LocationDto + ScheduleBoardDto
public class ScheduleReviewDto {
	// BoardDto
	private int seq; // 글번호
	private int bcode; // 게시판번호
	private String userid; // 작성자아이디
	private String subject; // 제목
	private String content; // 내용
	private String logtime; // 작성일자
	private String updatetime; // 수정일자
	private int recommcount; // 추천수
	private int wishcount; // 찜갯수
	private int hit; // 조회수

	// LocationDto
	// private int seq; // 글번호
	private String location; // 장소
	private String lat; // 위도
	private String lng; // 경도
	private String address; // 주소
	private String simpleaddr; // 간단주소

	// ScheduleBoardDto
	private int sseq; // 여행일정게시판번호
	// private int seq; // 글번호
	private int tripday; // 여행일자
	private int step; // 여행일자별스텝

	public ScheduleReviewDto() {
	}

	public ScheduleReviewDto(int seq, int bcode, String userid, String subject, String content, String logtime,
			String updatetime, int recommcount, int wishcount, int hit, String location, String lat, String lng,
			String address, String simpleaddr, int sseq, int tripday, int step) {
		super();
		this.seq = seq;
		this.bcode = bcode;
		this.userid = userid;
		this.subject = subject;
		this.content = content;
		this.logtime = logtime;
		this.updatetime = updatetime;
		this.recommcount = recommcount;
		this.wishcount = wishcount;
		this.hit = hit;
		this.location = location;
		this.lat = lat;
		this.lng = lng;
		this.address = address;
		this.simpleaddr = simpleaddr;
		this.sseq = sseq;
		this.tripday = tripday;
		this.step = step;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public int getBcode() {
		return bcode;
	}

	public void setBcode(int bcode) {
		this.bcode = bcode;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getLogtime() {
		return logtime;
	}

	public void setLogtime(String logtime) {
		this.logtime = logtime;
	}

	public String getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}

	public int getRecommcount() {
		return recommcount;
	}

	public void setRecommcount(int recommcount) {
		this.recommcount = recommcount;
	}

	public int getWishcount() {
		return wishcount;
	}

	public void setWishcount(int wishcount) {
		this.wishcount = wishcount;
	}

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
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

	public int getSseq() {
		return sseq;
	}

	public void setSseq(int sseq) {
		this.sseq = sseq;
	}

	public int getTripday() {
		return tripday;
	}

	public void setTripday(int tripday) {
		this.tripday = tripday;
	}

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}

	@Override
	public String toString() {
		return "ScheduleReviewDto [seq=" + seq + ", bcode=" + bcode + ", userid=" + userid + ", subject=" + subject
				+ ", content=" + content + ", logtime=" + logtime + ", updatetime=" + updatetime + ", recommcount="
				+ recommcount + ", wishcount=" + wishcount + ", hit=" + hit + ", location=" + location + ", lat=" + lat
				+ ", lng=" + lng + ", address=" + address + ", simpleaddr=" + simpleaddr + ", sseq=" + sseq
				+ ", tripday=" + tripday + ", step=" + step + "]";
	}

}
