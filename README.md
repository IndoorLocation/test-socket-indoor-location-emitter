# test-socket-indoor-location-emitter
Node.js test server to emulate an Indoor Location Emitter

## Install

Node.js is required

- Clone repo
- run `cd path/to/project/test-socket-indoor-location-emitter`
- run `npm install`
- run `node app.js`

## Use

Configure port with `PORT` node env. Default is `3003`

Send user id at socket connection start with `userId` query params.   
To simulate not existing user id, leave it blank or set it to `notExist`. In this case, `error` event will be sended and connection will be closed    
