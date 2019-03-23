package com.kokkok.dto;

public class RecommendDto {

	    // 추천번호 
	    private int rseq;

	    // 글번호 
	    private int seq;

	    // 아이디 
	    private String userid;

	    
	    public RecommendDto() {}


		public RecommendDto(int rseq, int seq, String userid) {
			this.rseq = rseq;
			this.seq = seq;
			this.userid = userid;
		}


		public int getRseq() {
			return rseq;
		}


		public void setRseq(int rseq) {
			this.rseq = rseq;
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
			return "RecommendDto [rseq=" + rseq + ", seq=" + seq + ", userid=" + userid + "]";
		}
	    
	    
	    
	    

	}