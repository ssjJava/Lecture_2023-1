//  express 웹 프레임워크: api를 단순화하고, 유용한 기능을 추가해 쉽게 서버를 구축할 수 있게 해줌.
const express = require('express');    

//  express객체 생성
const app = express();  


//  Express Server 설정 (포트번호 3001로 요청을 기다림)
app.listen(3030,()=>{
    console.log('Start Server : localhost:3030');
})
//  API Key 생성을 위한 uuid-apikey 라이브러리
const uAPIKey = require('uuid-apikey');

// uuid-apikey로 생성한 key와 uuid
const key = {
    apiKey: 'HRQMKR2-AT8MBMP-H2ZZ0MS-E8A2C9T', uuid: '8e2f49e0-5691-45d2-88bf-f05372142627'
};  


// 전체 데이터 셋
let data = [
    { name: "서성준", city: "흑석동", sex: "남자" ,job:"developer"},
    { name: "구유경", city: "서산", sex: "여자",job:"singer" },
    { name: "이예진", city: "노원", sex: "여자" ,job:"accountant"}
];

// express 프레임워크에 body parser를 적용시킴
app.use(express.json());    
// express 프레임워크에서 urlencoded 바디를 파싱하도록 설정
app.use(express.urlencoded({extended: true}));


app.get('/api/member/:apikey/', async (req, res) => {  // 전체 data 조회
    let {
        apikey
    } = req.params;

    if (!uAPIKey.check(apikey, key.uuid)) { // uuid-apikey를 통해 생성한 API키가 맞는지 확인
        res.send('Message: 해당 API키가 존재하지 않습니다.');
    } else{
        res.send(data);
    }
});

app.get('/api/member/:apikey/:name',async (req,res) =>{ // 특정 data 조회
    let {
        apikey,
        name
    } = req.params;
    if (!uAPIKey.check(apikey, key.uuid)) { 
        res.send('Message: 해당 API키가 존재하지 않습니다.');
    }else{
        const check = data.find(i => i.name == name);
        check ? res.send(check) : res.send('Message: 해당 회원이 존재하지 않습니다.');
    }
});

app.post('/api/member/:apikey', async (req,res) =>{ // 특정 data 추가
    let {
        apikey,
    } = req.params;
    if (!uAPIKey.check(apikey, key.uuid)) { // uuid-apikey를 통해 생성한 API키가 맞는지 확인
        res.send('Message: 해당 API키가 존재하지 않습니다.');
    }
    else{
        try{
            const d = req.body;
            data.push(d);
            let result = [{Message: "데이터 추가 성공"}];
            result.push(d);
            res.send(result);
        }catch(error){
            res.send('Message: 데이터 추가 실패');
        }
    }
});

app.put('/api/member/:apikey/:name', async (req,res) =>{    // 특정 데이터 수정

    let {
        apikey,
        name
    } = req.params;
    if (!uAPIKey.check(apikey, key.uuid)) { // uuid-apikey를 통해 생성한 API키가 맞는지 확인
        res.send('Message: 해당 API키가 존재하지 않음');
    }
    try{
        const d = req.body;
        const index = data.findIndex(i=>i.name == d.name);
        if(index>-1){ 
            data[index] = d;
            let result = [{Message: "데이터 수정 성공"}];
            result.push(data[index]);
            res.send(result);
        }else{
            res.send('Message: 해당 회원이 존재하지 않음');   
        }
    }catch(error){
        res.send('Message: 데이터 수정 실패');
    }
});

app.delete('/api/member/:apikey/:name',async(req,res) => {  // 특정 데이터 삭제
    let {
        apikey,
        name
    } = req.params;

    try{
        const index = data.findIndex(i=>i.name==name);
        if(index>-1){
            data.splice(index,1);
            res.send('Message: 데이터 삭제 성공');
        }else{
            res.send('Message: 해당 회원이 존재하지 않음');
        }
    }catch(error){
        res.send('Message: 데이터 삭제 실패');
    }
});
