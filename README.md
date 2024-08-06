# Nestjs redis를 활용한 websocket chatApp 구축

## WebSocket?
* WebSocet은 HTTP 환경을 기반으로 하여 TCP/IP 연결을 통해 통신 채널을 제공하는 컴퓨터 통신 프로토콜이다. WebSocket 접속 과정은 TCP/IP 접속, 웹 소켓을 열기 위한 HandShake 과정으로 나눌 수 있다.
![image](https://github.com/user-attachments/assets/49bf1595-2acd-4d51-a28d-faae6c8c856d)


## Pub/Sub 방식과 Message Broker

![image](https://github.com/user-attachments/assets/f2605cef-3338-4c76-821e-b498aba124f1)

* pub/sub는 메시지를 공급하는 객체와 소비하는 객체로 분리해 제공하는 비동기식 메시징 방법이다.
* publisher가 특정 topic에 메시지를 보내면 해당 topic을 구독해놓은 모든 subscriber에게 메시지가 전송되는 방식이다. ㅇ
* 간단하게 유튜브 채널이나 구독을 생각하면 된다.
* 이전에 진행했던 MSA또한 이러한 pub/sub 방식을 통해 구현했으며, 중간다리(미들웨어)를 통해 통신을 원활하게 구현할 수 있다. 

![image](https://github.com/user-attachments/assets/de83db17-c08a-44af-bf78-d38eab045991)

## reference
Github: https://velog.io/@ohjinseo/WebSocket-Spring-Boot-stomp-Redis-PubSub-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84
