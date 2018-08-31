[![Build Status](https://travis-ci.org/akpante3/stackoverflow-lite.svg?branch=master)](https://travis-ci.org/akpante3/stackoverflow-lite)

[![Coverage Status](https://coveralls.io/repos/github/akpante3/stackoverflow-lite/badge.svg)](https://coveralls.io/github/akpante3/stackoverflow-lite)

# Stackoverflow-lite REST API
its an API used for questions and answers
You can try our API in [console](cd server n6pm start) (https://api-database-stackoverflow.herokuapp.com)


## Endpoints

- **[<code>GET</code>/questions]
- **[<code>GET</code> photos/:id]
- **[<code>POST</code>/questions]
- **[<code>POST</code>/auth/login]
- **[<code>POST</code>/auth/signup]
- **[<code>POST</code>/questions/:id/answers]
- **[<code>PUT</code>/questions/:id/answers/:id]


## FAQ
### What do I need to know before I start using the API?
its is efficient and can be consumed for questions and answers

### How do I connect to the this API?
The API is only available to authenticated clients. Clients should authenticate users using [OAuth][]. Once authenticated, you need to request a resource from one of the endpoints using HTTPS. Generally, reading any data is done through a request with GET method. If you want our server to create, update or delete a given resource, POST or PUT methods are required.

### What return formats do you support?
Stackover-lite API currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
Applications must identify themselves to access any resource.
If your application only needs read-only access and does not authenticate the user, **consumer_key** containing a valid Consumer Key parameter should be specified in the query string.

### Is there a request rate limit?
N/A



