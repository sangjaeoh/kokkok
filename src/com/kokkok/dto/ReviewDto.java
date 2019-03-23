package com.kokkok.dto;

import java.util.Date;

public class ReviewDto {

	// 글번호
	private int seq;

	// 게시판번호
	private int bcode;

	// 작성자아이디
	private String userid;

	// 제목
	private String subject;

	// 내용
	private String content;

	// 작성일자
	private String logtime;

	// 수정일자
	private String updatetime;

	// 추천수
	private int recommcount;

	// 찜갯수
	private int wishcount;

	// 조회수
	private int hit;
	
	// 카테고리이름 
	private String cname;

	// 카테고리번호 
	private int ccode;
	
	// 게시판이름 
	private String bname;
	
	 // 테그번호 
	 private int tseq;

	 // 테그이름 
	 private String tname;

	 // 테그내용 
	 private String tcontent;

	 
	 
	public ReviewDto() {}	 
	 
	public ReviewDto(int seq, int bcode, String userid, String subject, String content, String logtime, String updatetime,
			int recommcount, int wishcount, int hit, String cname, int ccode, String bname, int tseq, String tname,
			String tcontent) {
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
		this.cname = cname;
		this.ccode = ccode;
		this.bname = bname;
		this.tseq = tseq;
		this.tname = tname;
		this.tcontent = tcontent;
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

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public int getCcode() {
		return ccode;
	}

	public void setCcode(int ccode) {
		this.ccode = ccode;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}

	public int getTseq() {
		return tseq;
	}

	public void setTseq(int tseq) {
		this.tseq = tseq;
	}

	public String getTname() {
		return tname;
	}

	public void setTname(String tname) {
		this.tname = tname;
	}

	public String getTcontent() {
		return tcontent;
	}

	public void setTcontent(String tcontent) {
		this.tcontent = tcontent;
	}

	@Override
	public String toString() {
		return "ReviewDto [seq=" + seq + ", bcode=" + bcode + ", userid=" + userid + ", subject=" + subject
				+ ", content=" + content + ", logtime=" + logtime + ", updatetime=" + updatetime + ", recommcount="
				+ recommcount + ", wishcount=" + wishcount + ", hit=" + hit + ", cname=" + cname + ", ccode=" + ccode
				+ ", bname=" + bname + ", tseq=" + tseq + ", tname=" + tname + ", tcontent=" + tcontent + "]";
	}
	 
	
	
}
