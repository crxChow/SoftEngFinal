import { mockAwsInstance } from "./Mock/aws"

// There are three API calls to be mocked. Note: because of game play, you can't
// actually get to the 'finish' because mock is not going to work
// "result":[{"email":"johnwick@gmail.com","DID":"something"}],"user":"designer","status":200}
 mockAwsInstance.onPost('/login').reply(200, { email: "johnwick@gmail.com", DID:"something", user:"designer" })

 // This mocks the repeated behavior on 'guess' with a sequence of calls. The fact
 // that this actually works is a bit astounding
 /*mockAwsInstance.onPost('/guess')
     .replyOnce(200, { correct: [ {index:1}], guess: 'e'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [ ], guess: 'x'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [{index:2}], guess: 's'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [{index:0}, {index:3}], guess: 't'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [{index:6}], guess: 'g'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [{index:4}], guess: 'i'} )
     .onPost('/guess')
     .replyOnce(200, { correct: [{index:5}], guess: 'n'} )
     .onPost('/guess')
     .reply(200, { correct: [], guess: 'z'} )

// deal with finish
mockAwsInstance.onPost('/finish').reply(200 )
*/
// this means we are DONE with the mock. Only uncomment out once back-end is ready
//mockAwsInstance.restore()
