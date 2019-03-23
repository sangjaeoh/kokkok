package com.kokkok.dto;

//테그 
public class TagDto {

 // 테그번호 
 private int tseq;

 // 테그이름 
 private String tname;

 // 테그내용 
 private String tcontent;

 // 글번호 
 private int seq;

 
 public TagDto() {}
 
 public TagDto(int tseq, String tname, String tcontent, int seq) {
	this.tseq = tseq;
	this.tname = tname;
	this.tcontent = tcontent;
	this.seq = seq;
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

 public int getSeq() {
     return seq;
 }

 public void setSeq(int seq) {
     this.seq = seq;
 }

@Override
public String toString() {
	return "TagDto [tseq=" + tseq + ", tname=" + tname + ", tcontent=" + tcontent + ", seq=" + seq + "]";
}
 
 


}