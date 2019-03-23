package com.kokkok.dto;

import java.util.Date;

public class MemberListDto {
		// 아이디
		private String userid;

		// 이름
		private String username;

		// 이메일
		private String useremail;

		// 비밀번호
		private String userpass;

		// 회원가입일
		private String joindate;

		// 등급코드
		private int admincode;

		public MemberListDto() {}
		public MemberListDto(String userid, String username, String useremail, String userpass, String joindate,
				int admincode) {
			super();
			this.userid = userid;
			this.username = username;
			this.useremail = useremail;
			this.userpass = userpass;
			this.joindate = joindate;
			this.admincode = admincode;
		}
		public String getUserid() {
			return userid;
		}
		public void setUserid(String userid) {
			this.userid = userid;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getUseremail() {
			return useremail;
		}
		public void setUseremail(String useremail) {
			this.useremail = useremail;
		}
		public String getUserpass() {
			return userpass;
		}
		public void setUserpass(String userpass) {
			this.userpass = userpass;
		}
		public String getJoindate() {
			return joindate;
		}
		public void setJoindate(String joindate) {
			this.joindate = joindate;
		}
		public int getAdmincode() {
			return admincode;
		}
		public void setAdmincode(int admincode) {
			this.admincode = admincode;
		}
		@Override
		public String toString() {
			return "MemberListDto [userid=" + userid + ", username=" + username + ", useremail=" + useremail
					+ ", userpass=" + userpass + ", joindate=" + joindate + ", admincode=" + admincode + "]";
		}	
	
		
		

}
