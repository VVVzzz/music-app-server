
var express = require('express');
var router = express.Router();
var User=require("../mongo/user");
var ListCollectionInfo=require("../mongo/listCollection")
var SongCollectionInfo=require("../mongo/songCollection")

//写一个接口：能够接收页面通过ajax 提交过来的数据；然后把数据存储到数据库中；
//vue 通过ajax 来访问接口； vue会把数据放在访问的对象req中；
//把数据处理完后，给ajax返回结果。
//用户注册
router.post("/register",function(req,res,next){
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
              message:"注册成功"
            })
          }
        })
      })
    } else {
      res.json({
        message:"注册失败"
      })
    }
  });
});

//修改密码
router.post("/edit",function(req,res,next){
  var userinfo = new User({
    username:req.body["username"],
    userpwd:req.body["newpwd"],
    userpwdConfirm:req.body["userpwdConfirm"]
  });
  console.log(req.body["newpwd"]);
  User.updateOne({username: userinfo.username}, {$set:{
      userpwd:userinfo.userpwd,
      userpwdConfirm:userinfo.userpwdConfirm
    }},function (err, data) {
    if (data.ok) {
      res.json({
        message:"修改密码成功"
      })
    } else {
      res.json({
        message:"修改密码失败"
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
              message:"收藏歌单成功"
            })
          }
        })
      })
    } else {
      res.json({
        message:"收藏歌单失败"
      })
    }
  });
});

router.get("/getListCollection",function(req,res,next){
  ListCollectionInfo.find({},function(err,result){
    if(err){
      res.json({issuccess:false,message:"mongon查询出错"});
    }else{
      res.json({
        message:"查询成功",
        data:result
      })
    }
  })
});

router.post("/deleteListCollection",function(req,res,next){
  var listCollectionInfo = new ListCollectionInfo({
    username:req.body["username"],
    listid:req.body["listid"]
  });
  ListCollectionInfo.deleteOne({username: listCollectionInfo.username,listid:listCollectionInfo.listid},function (err, data) {
    if (data) {
      res.json({
        message:"取消收藏成功"
      })
    } else {
      res.json({
        message:"取消收藏失败"
      })
    }
  });
});


router.post("/addSongCollection",function(req,res,next){
  var songCollectionInfo = new SongCollectionInfo({
    username:req.body["username"],
    songid:req.body["songid"]
  });
  SongCollectionInfo.findOne({songid:songCollectionInfo.songid}, function (err, data) {
    if (!data) {
      SongCollectionInfo.create(songCollectionInfo, function (err, data) {
        songCollectionInfo.save(function (err,result) {
          if(err){
            console.log(err);
          }else{
            res.json({
              message:"收藏歌曲成功"
            })
          }
        })
      })
    } else {
      res.json({
        message:"收藏歌曲失败"
      })
    }
  });
});

router.get("/getSongCollection",function(req,res,next){
  SongCollectionInfo.find({},function(err,result){
    if(err){
      res.json({issuccess:false,message:"mongon查询出错"});
    }else{
      res.json({
        message:"查询成功",
        data:result
      })
    }
  })
});

router.post("/deleteSongCollection",function(req,res,next){
  var songCollectionInfo = new SongCollectionInfo({
    username:req.body["username"],
    songid:req.body["songid"]
  });
  SongCollectionInfo.deleteOne({username: songCollectionInfo.username,songid:songCollectionInfo.songid},function (err, data) {
    if (data) {
      res.json({
        message:"取消收藏成功"
      })
    } else {
      res.json({
        message:"取消收藏失败"
      })
    }
  });
});

module.exports=router;
