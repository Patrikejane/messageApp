package com.loollablk.messageservice;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ServerResponseController {


	@MessageMapping("/api")
	@SendTo("/topic/message")
	public ServerResponse greeting(RequestData message) throws Exception {
		Thread.sleep(1000); // simulated delay
		return new ServerResponse(message.getName() , message.getUid() );
	}

}
