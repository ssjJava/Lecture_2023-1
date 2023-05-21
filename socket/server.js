// ws라이브러리를 불러옴
const WebSocket = require('ws');

// WebSocket Server 생성
const wss = new WebSocket.Server({port:8000});

// 콘솔에서 입력을 받기 위한 라이브러리
const readline = require('readline');

// 클라이언트 연결 시 실행되는 이벤트 핸들러
wss.on('connection', function connection(ws) {
  
  
  const re = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
  })

  re.question('질문 입력: ', function (answer) {
    ws.send(answer);
  });

    // 클라이언트로부터 메시지 수신 시 실행되는 이벤트 핸들러
    ws.on('message', function incoming(message) {
      console.log('\n클라이언트로부터 수신한 메시지:', message.toString('utf-8') + '\n');

      re.question('질문 입력: ', function (answer) {
        ws.send(answer);    // 질문 전송
    });
});

// 클라이언트로부터 연결이 종료되었을 때 실행되는 이벤트 핸들러
ws.on('close', function close() {
    console.log('클라이언트로부터 연결이 종료되었습니다.');
    re.close(); // 연결 종료
    });
});

wss.on('error', function error() {
  console.error('WebSocket 에러:', error);
});