package com.kokkok.dto;

//카테고리 
public class CategoryDto {

 // 카테고리번호 
 private int ccode;

 // 카테고리이름 
 private String cname;

 
 public CategoryDto() {}
 
 public CategoryDto(int ccode, String cname) {
	this.ccode = ccode;
	this.cname = cname;
}

public int getCcode() {
     return ccode;
 }

 public void setCcode(int ccode) {
     this.ccode = ccode;
 }

 public String getCname() {
     return cname;
 }

 public void setCname(String cname) {
     this.cname = cname;
 }

@Override
public String toString() {
	return "CategoryDto [ccode=" + ccode + ", cname=" + cname + "]";
}

 
 
}