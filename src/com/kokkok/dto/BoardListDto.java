package com.kokkok.dto;

//게시판리스트 
public class BoardListDto {

 // 게시판번호 
 private int bcode;

 // 게시판이름 
 private String bname;

 // 카테고리번호 
 private int ccode;

 
 public BoardListDto() {}
 
 public BoardListDto(int bcode, String bname, int ccode) {
	this.bcode = bcode;
	this.bname = bname;
	this.ccode = ccode;
}

public int getBcode() {
     return bcode;
 }

 public void setBcode(int bcode) {
     this.bcode = bcode;
 }

 public String getBname() {
     return bname;
 }

 public void setBname(String bname) {
     this.bname = bname;
 }

 public int getCcode() {
     return ccode;
 }

 public void setCcode(int ccode) {
     this.ccode = ccode;
 }

@Override
public String toString() {
	return "BoardListDto [bcode=" + bcode + ", bname=" + bname + ", ccode=" + ccode + "]";
}
 
 

}