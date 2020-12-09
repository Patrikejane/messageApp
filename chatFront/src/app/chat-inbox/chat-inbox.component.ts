import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../socket-service.service';
import { over, Message } from 'stompjs';

import { RxStompService } from '@stomp/ng2-stompjs';

import { webSocket } from 'rxjs/webSocket';
import * as uuid from 'uuid';


import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {

  message: string;
  public stompClient;
  public  msg = [];

  public myId: string;


  constructor(private messageService: SocketServiceService) {
    this.initializeWebSocketConnection();
  }
  ngOnInit(): void {
    this.myId = uuid.v4();
    console.log(this.myId);
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    console.log(this.myId);
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/message', (message) => {
        if (message.body) {
          const messageBody = JSON. parse(message.body).content;
          const reciverId = JSON. parse(message.body).senderId;
          console.log(JSON. parse(message.body).content);
          that.msg.push(message.body);
          if(that.myId !== reciverId){
          if (messageBody) {
            const element = document.createElement('li');
            element.innerHTML = messageBody;
            element.style.background = 'white';
            element.style.padding =  '15px 30px';
            element.style.margin = '10px';
            document.getElementById('message-list').appendChild(element);
            }
          }


        }
      });
    });
  }

  onSendMessage(){
    if (this.message) {
      this.sendMessage(this.message);
      const element = document.createElement('li');
      element.innerHTML = this.message;
      element.style.background = 'white';
      element.style.padding =  '15px 30px';
      element.style.margin = '10px';
      element.style.textAlign = 'right';
      document.getElementById('message-list').appendChild(element);
      this.message = '';
    }
  }


  sendMessage(message) {
    console.log(this.myId);
    this.stompClient.send('/app/api' , {},  JSON.stringify({
      name : message,
      uid : this.myId
    }));
  }
}
