connect = require 'connect'
http = require 'http'
app = connect()
logger = require 'morgan'
serveStatic = require 'serve-static'
cookieParser = require 'cookie-parser'
cookieSession = require 'cookie-session'
isAuth = require './is_auth'
basicAuth = require 'basic-auth-connect'

app
compression = require 'compression'
app
.use basicAuth('1', '2')
.use compression()
.use logger()
.use serveStatic(__dirname)
.use cookieParser()
.use cookieSession 
    key: 'my_key'
    secret: 'sekret'
    maxAge: 60*60*24
.use isAuth()
.use '/auth', (req,res,next)->
    console.log 'get requset from auth'
    next()
.use (req,res,next)->
    console.log req.session
    next()
.use '/sess', (req,res,next)->
    req.session.foo = 'Hello'
    res.end 'done'
.use '/sessd', (req,res,next)->
    delete req.session.foo
    res.end 'done del'
.use (req,res,next)->
    res.write JSON.stringify {x: 10, y: 40}
    res.end() 
    
http.createServer(app).listen(8080)
