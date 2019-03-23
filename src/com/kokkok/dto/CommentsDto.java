package com.kokkok.dto;

import java.util.Date;

public class CommentsDto {

	    // 댓글번호 
	    private int cseq;

	    // 글번호 
	    private int seq;

	    // 작성자아이디 
	    private String userid;

	    // 댓글내용 
	    private String ccontent;

	    // 댓글작성일 
	    private String clogtime;
	    
	    
	    public CommentsDto() {}


		public CommentsDto(int cseq, int seq, String userid, String ccontent, String clogtime) {
			this.cseq = cseq;
			this.seq = seq;
			this.userid = userid;
			this.ccontent = ccontent;
			this.clogtime = clogtime;
		}


		public int getCseq() {
			return cseq;
		}


		public void setCseq(int cseq) {
			this.cseq = cseq;
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


		public String getCcontent() {
			return ccontent;
		}


		public void setCcontent(String ccontent) {
			this.ccontent = ccontent;
		}


		public String getClogtime() {
			return clogtime;
		}


		public void setClogtime(String clogtime) {
			this.clogtime = clogtime;
		}


		@Override
		public String toString() {
			return "CommentsDto [cseq=" + cseq + ", seq=" + seq + ", userid=" + userid + ", ccontent=" + ccontent
					+ ", clogtime=" + clogtime + "]";
		}
	    
		
	    
	    

	}