const WebSocket = require('ws');

// WebSocket 서버에 연결
const socket = new WebSocket('ws://localhost:8000');

// 콘솔에서 입력을 받기 위한 라이브러리
const readline = require('readline');

// 연결 완료 시 실행되는 이벤트 핸들러
socket.on('open', function open() {
  console.log('WebSocket 연결 완료');
});

// 서버로부터 메시지 수신 시 실행되는 이벤트 핸들러
socket.on('message', function incoming(message) {

  console.log('\n서버로부터 수신한 메시지: ', message.toString('utf-8') + '\n');
  
  const re = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
  })

  re.question('답변 입력: ', function (answer) {
    socket.send(answer);    // 답변 전송
});
});

// 서버로부터 연결 종료 시 실행되는 이벤트 핸들러
socket.on('close', function close() {
    console.log('WebSocket 연결 종료');
    re.close(); // 연결 종료
});

// 에러가 발생한 경우 실행되는 이벤트 핸들러
socket.on('error', function error() {
  console.error('WebSocket 에러:', error);
});