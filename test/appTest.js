let th = require("./testFrame/testHelper.js");
let app = require("../app.js");
let request = require("./testFrame/requestSimulator.js");
const chai = require('chai');
const assert = chai.assert;
describe('app', () => {
    describe('GET /bad',()=>{
        it('responds with 404',done=>{
          request(app,{method:'GET',url:'/bad'},(res)=>{
            assert.equal(res.statusCode,404);
            done();
          })
        })
      })
      describe('GET /',()=>{
        it('redirects to home',done=>{
          request(app,{method:'GET',url:'/'},(res)=>{
            th.should_be_redirected_to(res,'/home');
            assert.equal(res.body,"");
            done();
          })
        })
      })
      describe('GET /index.html',()=>{
        it('gives the index page',done=>{
          request(app,{method:'GET',url:'/index.html'},res=>{
            th.status_is_ok(res);
            th.content_type_is(res,'text/html');
            th.body_contains(res,'home');
        })
        done();
        })
      })
      describe('GET /login.html',()=>{
        it('serves the login page',done=>{
          request(app,{method:'GET',url:'/login.html'},res=>{
            th.status_is_ok(res);
            th.body_contains(res,'userName:');
            th.body_does_not_contain(res,'login failed');
        })
        done();
        })
        it('serves the login page with message for a failed login',done=>{
          request(app,{method:'GET',url:'/login.html',headers:{'cookie':'message=login failed'}},res=>{
            th.status_is_ok(res);
            th.body_contains(res,'User Name:');
            th.body_contains(res,'login failed');
            th.should_not_have_cookie(res,'message');
        })
        done();
        })
      })
    
});