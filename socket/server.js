// ws라이브러리를 불러옴 (웹 소켓 프로토콜을 사용하여 웹 소켓 서버를 구현하기 위한 모듈)
const WebSocket = require('ws');

// WebSocket Server 생성
const wss = new WebSocket.Server({port:8000});

// 콘솔에서 입력을 받기 위한 라이브러리
const readline = require('readline');


// 사용자로부터 입력을 받기 위한 인터페이스 생성
const re = readline.createInterface({
  input:  process.stdin,  // Node JS의 표준 입력
  output: process.stdout  // Node JS의 표준 출력
});


// 클라이언트 연결 시 실행되는 이벤트 핸들러
wss.on('connection', function connection(ws) {

  re.question('질문 입력: ', function (que) {
    ws.send(que);
  });

  // 클라이언트로부터 메시지 수신 시 실행되는 이벤트 핸들러
  ws.on('message', function incoming(message) {
    console.log('\n클라이언트로부터 수신한 메시지:', message.toString('utf-8') + '\n');

    re.question('질문 입력: ', function (que) {
      ws.send(que);    // 질문 전송
  });
});


// 클라이언트로부터 연결이 종료 시 실행되는 이벤트 핸들러
ws.on('close', function close() {
    console.log('클라이언트로부터 연결이 종료되었습니다.\n');
    re.close(); // 연결 종료
    });
});


// 에러가 발생한 경우 실행되는 이벤트 핸들러
wss.on('error', function error() {
  console.error('WebSocket 에러:', error);
});