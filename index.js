const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = [];
let counter = 1
//path = GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/users',(req, res)=> { 
    res.json(users);
})


//path = POST /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/user',(req, res)=> {
    let user = req.body;
    user.id = counter += 1
    users.push(user);
    res.json({
        message:'Create new user successfully',
        user: user
    });
})
//path: PUT /user/:id ใช้สำหรับแก้ไขข้อมูล user โดยใช้ id 
app.put('/user/:id',(req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;
    //หา users จากไอดี
    let selectedIndex = users.findIndex(user => user.id == id )
    //แก้ไขข้อมูล users 
   
    if (updateUser.firstname){
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname){
        users[selectedIndex].firstname = updateUser.lastname;
    }

   
    res.json({
        message:'Update user successfully',
        data:{
        user: updateUser,
        indexUpdated: selectedIndex
    }
    })
})
//path: DELETE /user/:id ใช้สำหรับลบข้อมูล user โดยใช้ id เป็นตัวระบุ
app.delete('/user/:id',(req,res)=>{
    let id = req.params.id;
    let selectedIndex = users.findIndex(user=>user.id == id)
   //ลบ
    users.splice(selectedIndex,1)
    res.json({
        message:'Delete user successfully',
        indexDeleted: selectedIndex
    })
})


app.listen(port,(req,res) =>{
    console.log('Http Server is running on port'+port)
});



/* const http = require('http'); // import node.js core module

const host = 'localhost'; // localhost
const port = 8000; // port number

//เมื่อเปิดเว็บไปที่ http://localhost:8000/ จะเรียกใช้งาน function requireListener
const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('My first server!');
}

const server = http.createServer(requireListener);
server.listen(port,host,()=>{
    console.log(`Server is running on http://${host}:${port}/`); 
});
*/
