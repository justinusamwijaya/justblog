// const app = require('../app.js');
const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert;
chai.use(chaiHttp)

describe('HTTP signup',function(){
    let newUser = {
        username: 'johnie888',
        email:'lol@lulul.com',
        password:'haha289011',
    }
    it('username', function(){
        function checklength(number){
            return number>5
        }
        assert.notEqual(newUser.username, undefined, "username cannot be undefined")
        assert.notEqual(newUser.username.trim().length, 0, "username should not be null")
        assert.equal(checklength(newUser.username.length), true, "username must be at least 6 characters")
    })
    it('email', function(){
        function checkvalidity(email){
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(email)
        }
        assert.notEqual(newUser.email, undefined, "email cannot be undefined")
        assert.notEqual(newUser.email.trim().length, 0,  "email should not be null")
        assert.equal(checkvalidity(newUser.email), true, "email needs to be valid")
    })
    it('password', function(){
        function checklength(number){
            return number > 8
        }
        function mustIncludeNumber(password){
            return /[0-9]/.test(password)
        }
        assert.notEqual(newUser.password, undefined, "password cannot be undefined")
        assert.notEqual(newUser.password.trim().length, 0, "password should not be null")
        assert.equal(checklength(newUser.password.length), true, "password must be at least 9 characters")
        assert.equal(mustIncludeNumber(newUser.password), true, "password must include at least one number")
    })
    it('can send signup request',function(done){
        chai.request('http://localhost:3000')
        .post('/signup')
        .send(newUser)
        .then(() => {
            done()
        })
        .catch(error=>{
            done(error)
        })
    })
})

describe('HTTP login',function(){
    let loginUser = {
        username:'johnie888',
        password:'haha289011',
    }
    it('can send login request',function(done){
        chai.request('http://localhost:3000')
        .post('/login')
        .send(loginUser)
        .then(()=>{
            done()
        })
        .catch(error=>{
            done(error)
        })
    })
    it('can detect if user is not registered',function(done){
        chai.request('http://localhost:3000')
        .post('/login')
        .send({username:'aldiufshladsiufhliahdsfilaf', password:'kdufgkadfghukadshflahslh'})
        .then(result=>{
            assert.equal(result.status === 400, true, "user should not be found")
            assert.equal(result.body.msg === 'data tidak ditemukan!', true, "it doesn't send the right message")
            done()
        })
        .catch((error)=>{
            done(error)
        })
    })
})

describe('blogs',function(){
    let blogObj = {title:'wow',content:'huwat?adfafdaf'}
    let updateObj = {title:'wow',content:'huwat?adafafadfasdfaaaaa'}
    it('can send an add request', function(done){
        chai.request('http://localhost:3000/blogs')
        .post('/')
        .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBjNjY4ZGE5NDk3MTBjNGE2ZmExZiIsInVzZXJuYW1lIjoiam9obmllODg4IiwiaWF0IjoxNTI5OTM2OTc0fQ.uZcmimBWrK7T5EdEr9yNb8Y1hRaEBdgYEXwLffZzwB0')
        .send(blogObj)
        .then(result=>{
            assert.equal(result.status, 200, "salah status respon")
            assert.equal(blogObj.title.length > 0, true, "title harus minimal 1 karakter")
            assert.equal(blogObj.content.length > 9, true, "content minimal 10 karakter")
            done()
        })
        .catch(error=>{
            done(error)
        })
    })
    it('can send a get request', function(done){
        chai.request('http://localhost:3000/blogs')
        .get('/')
        .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBjNjY4ZGE5NDk3MTBjNGE2ZmExZiIsInVzZXJuYW1lIjoiam9obmllODg4IiwiaWF0IjoxNTI5OTM2OTc0fQ.uZcmimBWrK7T5EdEr9yNb8Y1hRaEBdgYEXwLffZzwB0')
        .then(getAll=>{
            assert.equal(getAll.status, 200, "salah status respon")
            chai.request('http://localhost:3000/blogs')
            .get('/5b310654520c7e17c29d76c2')
            .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBjNjY4ZGE5NDk3MTBjNGE2ZmExZiIsInVzZXJuYW1lIjoiam9obmllODg4IiwiaWF0IjoxNTI5OTM2OTc0fQ.uZcmimBWrK7T5EdEr9yNb8Y1hRaEBdgYEXwLffZzwB0')
            .then(getOne=>{
                assert.equal(getOne.status, 200, "salah status respon")
                done()
            })
            .catch(error=>{
                done(error)
            })

        })
        .catch(error=>{
            done(error)
        })
    })
    it('can send update request', function(done){
        chai.request('http://localhost:3000/blogs')
        .put('/5b31083199df19181380c9d5')
        .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBjNjY4ZGE5NDk3MTBjNGE2ZmExZiIsInVzZXJuYW1lIjoiam9obmllODg4IiwiaWF0IjoxNTI5OTM2OTc0fQ.uZcmimBWrK7T5EdEr9yNb8Y1hRaEBdgYEXwLffZzwB0')
        .send(updateObj)
        .then(result=>{
            assert.equal(result.status, 200, "salah status respon")
            assert.equal(updateObj.title.length > 0, true, "title harus minimal 1 karakter")
            assert.equal(updateObj.content.length > 9, true, "content minimal 10 karakter")
            done()
        })
        .catch(error=>{
            done(error)
        })
    })
    it('can send delete request', function(done){
        chai.request('http://localhost:3000/blogs')
        .delete('/5b31081e793d59180655d3ec')
        .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBjNjY4ZGE5NDk3MTBjNGE2ZmExZiIsInVzZXJuYW1lIjoiam9obmllODg4IiwiaWF0IjoxNTI5OTM2OTc0fQ.uZcmimBWrK7T5EdEr9yNb8Y1hRaEBdgYEXwLffZzwB0')
        .send({title:'wow',content:'huwat?',userId:'okay!'})
        .then(result=>{
            assert.equal(result.status, 200, "salah status respon")
            done()
        })
        .catch(error=>{
            done(error)
        })
    })
})
