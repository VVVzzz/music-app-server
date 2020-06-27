console.log("3")
var express = require('express');
var router = express.Router();
var User=require("../mongo/user");
var ListCollectionInfo=require("../mongo/listCollection")

//写一个接口：能够接收页面通过ajax 提交过来的数据；然后把数据存储到数据库中；
//vue 通过ajax 来访问接口； vue会把数据放在访问的对象req中；
//把数据处理完后，给ajax返回结果。
//用户注册
router.post("/register",function(req,res,next){
  //第二步：把数据放到mongodb中；
  var userinfo = new User({
    username:req.body["username"],
    userpwd:req.body["userpwd"],
    userpwdConfirm:req.body["userpwdConfirm"]
  });

  User.findOne({username: userinfo.username}, function (err, data) {
    if (!data) {
      User.create(userinfo, function (err, data) {
        userinfo.save(function (err,result) {
          if(err){
            console.log(err);
          }else{
            res.json({
              issuccess:false,
              message:"注册成功"
            })
          }
        })
      })
    } else {
      res.json({
        issuccess:false,
        message:"注册失败"
      })
    }
  });
});

//用户登录
router.get("/login",function(req,res,next){
  //从mongodb中获取数据，并返回给客户端
  User.find({},function(err,result){
    if(err){
      res.json({issuccess:false,message:"mongon查询出错"});
    }else{
      res.json({
        issuccess:true,
        message:"查询成功",
        data:result
      })
      console.log(result);
    }
  })

});

//添加收藏歌单
router.post("/addListCollection",function(req,res,next){
  var listCollectionInfo = new ListCollectionInfo({
    username:req.body["username"],
    listid:req.body["listid"]
  });

  ListCollectionInfo.findOne({listid: listCollectionInfo.listid}, function (err, data) {
    if (!data) {
      ListCollectionInfo.create(listCollectionInfo, function (err, data) {
        listCollectionInfo.save(function (err,result) {
          if(err){
            console.log(err);
          }else{
            res.json({
              issuccess:false,
              message:"收藏歌单成功"
            })
          }
        })
      })
    } else {
      res.json({
        issuccess:false,
        message:"收藏歌单失败"
      })
    }
  });
});

module.exports=router;
