
const readline = require('readline');

// 사용자로부터 입력을 받기 위한 인터페이스 생성
const ife = readline.createInterface({
  input: process.stdin, // Node JS의 표준 입력
  output: process.stdout // // Node JS의 표준 출력
}); 


function check(obj){    // 입력값 검사 함수
    return new Promise((resolve, reject) => { 
    // 성공 시(값 반환) resolve,  실패 시(오류), reject

        if (obj.trim() === '') {  // 값이 비어있다면
          reject(new Error('No value.\n'));
        }else { // 값이 입력되었다면
          resolve(obj); // 값 반환
        }
    });
}


// 사용자로부터 인사말을 입력받는 함수
function askGreet() {
  return new Promise((resolve, reject) => {
    ife.question('인사말을 입력하세요: ', (greeting) => {
        check(greeting) // 입력값 검사 함수 호출 후, then or catch로 분기
        .then(resolve)
        .catch((error) => {
            console.error('에러:', error.message);   // No value 에러 메시지 출력
            askGreet().then(resolve).catch(reject);  
            // 함수 다시 호출 후 then or catch로 분기
        });
    });
  });
}


// 사용자로부터 이름을 입력받는 함수
function askName() {
    return new Promise((resolve, reject) => {
      ife.question('이름을 입력하세요: ', (name) => {
        check(name) // 입력값 검사 함수 호출 후, then or catch로 분기
        .then(resolve)
        .catch((error) => {
            console.error('에러:', error.message);  // No value 에러 메시지 출력
            askName().then(resolve).catch(reject);  
            // 함수 다시 호출 후 then or catch로 분기
        });
      });
    });
}


// 사용자로부터 나이를 입력받는 함수
function askAge() {
    return new Promise((resolve, reject) => {
      ife.question('나이를 입력하세요: ', (age) => {

        if(!isNaN(age)){   // 입력한 값이 숫자인 경우 (Not A Number가 아니면)
            check(age)     // 입력값 검사 함수 호출 후, then or catch로 분기
            .then(resolve)
            .catch((error) => {
                console.error('에러:', error.message);   // No value 에러 메시지 출력
                askAge().then(resolve).catch(reject);    
                // 함수 다시 호출 후 then or catch로 분기
            });
        }else{  // 숫자가 아니면
            console.error('에러: Only Input Number.\n'); // Only Input Number 에러 메시지 출력
            askAge().then(resolve).catch(reject);        
            // 함수 다시 호출 후 then or catch로 분기
        }
      });
    });
  }

  
// 사용자로부터 직업을 입력받는 함수
function askJob() {
  return new Promise((resolve, reject) => {
    ife.question('직업을 입력하세요: ', (job) => {
        check(job) // 입력값 검사 함수 호출 후, then or catch로 분기
        .then(resolve)
        .catch((error) => {
            console.error('에러:', error.message);   // No value 에러 메시지 출력
            askGreet().then(resolve).catch(reject);  
            // 함수 다시 호출 후 then or catch로 분기
        });
    });
  });
}


// 사용자로부터 등급(1 ~ 5등급)을 입력받는 함수
function askGrade() {
    return new Promise((resolve, reject) => {
      ife.question('등급을 입력하세요: ', (grade) => {
        
        if(!isNaN(grade)){    // 입력한 값이 숫자인 경우 (Not A Number가 아니면)
            check(grade)      // 입력값 검사 함수 호출 후, then or catch로 분기
            .then(resolve)
            .catch((error) => {
                console.error('에러:', error.message);  // No value 에러 메시지 출력
                askGrade().then(resolve).catch(reject); 
                // 함수 다시 호출 후 then or catch로 분기
            });
        }else{
            console.error('에러: Only Input Number.\n'); // Only Input Number 에러 메시지 출력
            askGrade().then(resolve).catch(reject);      
            // 함수 다시 호출 후 then or catch로 분기
        }
      });
    });
  }

  
// CLI 프로그램 시작 함수
async function startProgram() { // 비동기 함수(실행 흐름에 방해받지 않고 실행)

  // await: Promise 객체가 반환되는 비동기 작업을 동기적으로 처리

  try {
    const greet = await askGreet();  // 인사말 입력 받기
    const name = await askName();  // 이름 입력 받기
    const age = await askAge();  // 나이 입력 받기
    const job = await askJob();  // 직업 입력 받기
    const grade = await askGrade();  // 등급 입력 받기


    console.log(`\n${greet}, ${name}님의 나이는 ${age}, 직업은 ${job}, 등급은 ${grade}입니다.`);
    console.log('이용해주셔서 감사합니다. \n');

    } catch (error) { // 예외 처리
      console.error('에러:', error.message);
    } finally{
        ife.close();  // 인터페이스 자원 반환
    }
}


startProgram(); // 시작 함수 호출