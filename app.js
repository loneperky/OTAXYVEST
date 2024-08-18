// const express = require('express')
// const pg = require('pg')
// const app = express()
// const path = require('path')
// const ejs = require('ejs')
// const bcryptjs = require('bcryptjs')

// app.set('view engine', 'ejs')
// const db = new pg.Client({
//   user:'postgres',
//   host:'localhost',
//   database:'Otaxyvest',
//   password:'IYARE2468',
//   port:5433
// })
// db.connect()

// app.use(express.urlencoded({extended:true}))
// const saltRound = 10

// app.post('/register',async(req,res)=>{
//   const fname = req.body.fname
//   const lname = req.body.lname
//   const email = req.body.email
//   const phone_no = req.body.phone_no
//   const passport = req.body.password
//   const promo_code = req.body.promo_code

// const checkedResult = await db.query('SELECT * FROM user_info WHERE email_address = $1',[email])
// if(checkedResult.rows.length >0){
//   res.send('user already register try logging in')
 
// }else{
// bcryptjs.hash(passport, saltRound,async(err,hash)=>{
// if(err){
//   console.log(err)
// }else{
//   const result = await db.query('INSERT INTO user_info(first_name,last_name,email_address,phone_number,promo_code)')
// }
// })
// }

// })