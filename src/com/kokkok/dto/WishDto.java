package com.kokkok.dto;

//찜 
public class WishDto {

 // 찜번호 
 private int wseq;

 // 글번호 
 private int seq;

 // 아이디 
 private String userid;

 public WishDto() {}

public WishDto(int wseq, int seq, String userid) {
	this.wseq = wseq;
	this.seq = seq;
	this.userid = userid;
}

public int getWseq() {
	return wseq;
}

public void setWseq(int wseq) {
	this.wseq = wseq;
}

public int getSeq() {
	return seq;
}

public void setSeq(int seq) {
	this.seq = seq;
}

public String getUserid() {
	return userid;
}

public void setUserid(String userid) {
	this.userid = userid;
}

@Override
public String toString() {
	return "WishDto [wseq=" + wseq + ", seq=" + seq + ", userid=" + userid + "]";
}
 
 

}