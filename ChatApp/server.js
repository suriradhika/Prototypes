var express = require('express')
const { message } = require('statuses')
const notificationapi = require('notificationapi-node-server-sdk').default
var bodyParser = require('body-parser')
// var http = require('http').server(app)
const port = process.env.PORT || '3000'
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
notificationapi.init('xxx', 'xxxx');
var messages = [
    // {name: "Radhika", message: " Hi"},
    // {name: "Prateek", message: " Hello"}

] 

app.get('/messages', (req, res) => {
    res.send(messages)
})


app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
    notificationapi.send({
        notificationId: 'new_comment_notification',
        user: {
          id: 'TEST_USER_ID',
          // email: 'TEST@TEST.COM', // required for email notifications
          // number: '+15005550006' // required for SMS
        },
        mergeTags: req.body
        
    })
})
var server = app.listen(port, () => {
    console.log("The server is listening on port", server.address().port)
})
// init


//send
// notificationapi.send({
//   notificationId: 'new_comment_notification',
//   user: {
//     id: 'TEST_USER_ID',
//     // email: 'TEST@TEST.COM', // required for email notifications
//     // number: '+15005550006' // required for SMS
//   }
// });
