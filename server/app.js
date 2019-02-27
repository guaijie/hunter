const httpError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');//日志记录
const multer=require('multer');//处理文件上传

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes/index.js');

const NODE_ENV=process.env.NODE_ENV;

const app = express();

app.use(NODE_ENV==='production'?logger('combined'):logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));//设定前端静态资源路径
app.use(express.urlencoded({ extended: true }));
// app.use(multer().any());
app.use(cookieParser(['guai','jie']));

// view engine setup
app.set('views', path.join(__dirname, 'dist/views'));//设定视图的目录
app.engine('html',require('ejs').renderFile);

/*路由*/
app.use('/', indexRouter);//匹配路由路径
app.use('/user', userRouter);//匹配路由路径
app.use('/try',function(req,res,next){
  res.cookie('name','jie',{signed:true})
  // res.end(req.signedCookies.name);
  res.set({
    'Cache-control':'max-age='+10000
  });
  let type=req.get('Content-Type')
  res.status(200).send(type)
})

// 统一捕获错误
app.use(function(req, res, next) {
  let err=new httpError.NotFound()
  next(err);
});


// 统一 error handler
app.use(function(err, req, res, next) {//错误处理
  // render the error page
  res.status(err || 500);
  if(err.code>=400&&err.code<500){
    res.redirect('/')
  }else{
    res.sendStatus(500)
  }
});

module.exports = app;
