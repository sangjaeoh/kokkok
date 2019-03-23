package com.kokkok.dto;

import java.util.Date;

//게시판 
public class BoardDto {

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
	private Date logtime;

	// 수정일자
	private Date updatetime;

	// 추천수
	private int recommcount;

	// 찜갯수
	private int wishcount;

	// 조회수
	private int hit;

	public BoardDto() {
	}

	public BoardDto(int seq, int bcode, String userid, String subject, String content, Date logtime, Date updatetime,
			int recommcount, int wishcount, int hit) {
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

	public Date getLogtime() {
		return logtime;
	}

	public void setLogtime(Date logtime) {
		this.logtime = logtime;
	}

	public Date getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(Date updatetime) {
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
		return "BoardDto [seq=" + seq + ", bcode=" + bcode + ", userid=" + userid + ", subject=" + subject
				+ ", content=" + content + ", logtime=" + logtime + ", updatetime=" + updatetime + ", recommcount="
				+ recommcount + ", wishcount=" + wishcount + ", hit=" + hit + "]";
	}

	
	
	
}
