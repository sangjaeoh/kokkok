package com.kokkok.dto;

import java.util.Date;

// ScheduleDto + BoardDto
public class ScheduleViewDto {
	// ScheduleDto
	private int sseq; // 여행일정게시판번호
	private int seq; // 글번호
	private String startdate; // 시작날짜 (2019/03/07)
	private String enddate; // 끝날짜
	private String originpicture; // 원래사진
	private String savefolder; // 저장폴더
	private String savepicture; // 저장사진
	private String persons; // 여행인원
	private String thema; // 여행테마
	
    // 여행기간
    private int period;

	// BoardDto
	// private int seq; // 글번호
	private int bcode; // 게시판번호
	private String userid; // 작성자아이디
	private String subject; // 제목
	private String content; // 내용
	private String logtime; // 작성일자
	private String updatetime; // 수정일자
	private int recommcount; // 추천수
	private int wishcount; // 찜갯수
	private int hit; // 조회수

	public ScheduleViewDto() {
	}

	public ScheduleViewDto(int sseq, int seq, String startdate, String enddate, String originpicture, String savefolder,
			int period, String savepicture, String persons, String thema, int bcode, String userid, String subject, String content,
			String logtime, String updatetime, int recommcount, int wishcount, int hit) {
		super();
		this.sseq = sseq;
		this.seq = seq;
		this.period = period;
		this.startdate = startdate;
		this.enddate = enddate;
		this.originpicture = originpicture;
		this.savefolder = savefolder;
		this.savepicture = savepicture;
		this.persons = persons;
		this.thema = thema;
		this.bcode = bcode;
		this.userid = userid;
		this.subject = subject;
		this.content = content;
		this.logtime = logtime;
		this.updatetime = updatetime;
		this.recommcount = recommcount;
		this.wishcount = wishcount;
		this.hit = hit;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}
	public int getSseq() {
		return sseq;
	}

	public void setSseq(int sseq) {
		this.sseq = sseq;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
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

	@Override
	public String toString() {
		return "ScheduleViewDto [sseq=" + sseq + ", seq=" + seq + ", startdate=" + startdate + ", enddate=" + enddate
				+ ", originpicture=" + originpicture + ", savefolder=" + savefolder + ", savepicture=" + savepicture
				+ ", persons=" + persons + ", thema=" + thema + ", bcode=" + bcode + ", userid=" + userid + ", subject="
				+ subject + ", content=" + content + ", logtime=" + logtime + ", updatetime=" + updatetime
				+ ", recommcount=" + recommcount + ", wishcount=" + wishcount + ", hit=" + hit + "]";
	}

}
