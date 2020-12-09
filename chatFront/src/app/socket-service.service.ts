import { Injectable } from '@angular/core';

import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor() {
    // this.initializeWebSocketConnection();
  }


  // sendMessage(message) {
  //   this.stompClient.send('/app/hello' , {},  JSON.stringify({name : message}));
  // }
}