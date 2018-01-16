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
          request(app,{method:'GET',url:'/'},res=>{
            th.should_be_redirected_to(res,'/home');
        })
        done();
        })
      })
      describe('GET /login.html',()=>{
        it('serves the login page',done=>{
          request(app,{method:'GET',url:'/login.html'},res=>{
            th.should_be_redirected_to(res,'/home');
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
      describe('POST /login',()=>{
        it('redirects to home for valid user',done=>{
          request(app,{method:'POST',url:'/login',body:'userName=ashishm'},res=>{
            th.should_be_redirected_to(res,'/home');
            th.should_not_have_cookie(res,'message');
        })
        done();
        })
        it('redirects to login.html with message for invalid user',done=>{
          request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
            th.should_be_redirected_to(res,'/login');
            th.should_have_expiring_cookie(res,'message','login failed');
        })
        done();
        })
      })
      describe('GET /logout',()=>{
        it('serves the home page and login link',done=>{
          request(app,{method:'GET',url:'/home'},res=>{
            th.status_is_ok(res);
            th.body_contains(res,`href="login">login to add todo`);
            th.body_does_not_contain(res,'login failed');
        })
        done();
        })
    })
    describe('GET /home', () => {
      it('should serve the home page for logged in user', (done) => {
        process.env.DUMMY = 100;
        let headers ={cookie:"sessionid=100"}
        request(app,{method:"GET",url:"/home",headers:headers},res=>{
          th.status_is_ok(res);
          th.body_contains(res,"Logout");
          done();
        })
      });
    });
});
