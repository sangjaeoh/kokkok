package com.kokkok.dto;

public class LocationDto {

	// 글번호
	private int seq;

	// 장소
	private String location;

	// 위도
	private String lat;

	// 경도
	private String lng;

	// 주소
	private String address;
	
	// 간단주소
	private String simpleaddr;

	public LocationDto() {
	}

	public LocationDto(int seq, String location, String lat, String lng, String address, String simpleaddr) {
		super();
		this.seq = seq;
		this.location = location;
		this.lat = lat;
		this.lng = lng;
		this.address = address;
		this.simpleaddr = simpleaddr;
	}

	public int getSeq() {
		return seq;
	}


	public void setSeq(int seq) {
		this.seq = seq;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getLat() {
		return lat;
	}


	public void setLay(String lat) {
		this.lat = lat;
	}


	public String getLng() {
		return lng;
	}


	public void setLng(String lng) {
		this.lng = lng;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getSimpleaddr() {
		return simpleaddr;
	}


	public void setSimpleaddr(String simpleaddr) {
		this.simpleaddr = simpleaddr;
	}

	@Override
	public String toString() {
		return "LocationDto [seq=" + seq + ", location=" + location + ", lat=" + lat + ", lng=" + lng + ", address="
				+ address + ", simpleaddr=" + simpleaddr + "]";
	}

}