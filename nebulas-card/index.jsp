<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><!DOCTYPE html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui"><title>星云名片</title><link rel="shortcut icon" href=favicon.ico type=image/x-icon><link href=/static/css/main.44bc2d1dbc188e48e33f449f05b90e1c.css rel=stylesheet></head><style>body{
      background: url("http://bpic.588ku.com/back_pic/04/53/85/36586242983bc03.jpg!r650/fw/800");
      background-repeat: no-repeat;
      background-position: center;
      background-attachment: fixed;
      background-size: cover;
      -webkit-background-size: cover;
    }</style><body><script src=http://crawler-img-test.oss-cn-beijing.aliyuncs.com/nebPay.js></script><script src=http://crawler-img-test.oss-cn-beijing.aliyuncs.com/nebulas-main.js></script><script>var NebPay;


//      var dappAddress = "n22EbF2sCUDGA9GJBEc3KYcVUySwUYs3X1L"; // 测试网
      var dappAddress = "n1i7bowXym3csdUJ9biH7uhS8pSY11wBtL6";// 主网
//      0d9e5ba944f5b3931d8088492755a0e389d2c7935be1ab05b05db2a9277986e7 主网合约地址
      var HttpRequest = require("nebulas").HttpRequest;
      var Neb = require("nebulas").Neb;
      var Account = require("nebulas").Account;
      var Transaction = require("nebulas").Transaction;
      var Unit = require("nebulas").Unit;
      var neb = new Neb();
      neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));
      document.addEventListener('DOMContentLoaded',function () {
          setTimeout(()=>{
              try{
                  NebPay = require('nebpay');
                  console.log('页面 require nebpay 成功');
              }catch(e){
                  console.log('页面require nebpay 失败');
              }
          },0)
      })</script><div id=app></div><script type=text/javascript src=/static/js/manifest-710496f5ab61be18308a.js></script><script type=text/javascript src=/static/js/vendor-249b19168f02a29e874d.js></script><script type=text/javascript src=/static/js/main-4dd3d2a2ae6babf50927.js></script></body></html>