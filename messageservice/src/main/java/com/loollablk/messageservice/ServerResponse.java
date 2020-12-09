package com.loollablk.messageservice;

public class ServerResponse {

	private String content;
	private String senderId;

	public ServerResponse() {
	}

	public ServerResponse(String content, String uuid) {
		this.content = content;
		this.senderId = uuid;
	}

	public String getContent() {
		return content;
	}

	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
}
