cors-it
=======

Add CORS to anything!

cors-it is a [Node](http://nodejs.org/) app which acts as a proxy for arbitrary URLs,
adding [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)-compliant headers:

```
access-control-allow-origin: *
access-control-allow-headers: Content-Type, api_key, Authorization
access-control-allow-methods: GET, POST, DELETE, PUT, PATCH, OPTIONS
```
to the response.

# Running cors-it

After cloning this repo, run

```
$ cd cors-it
$ npm install
```
to resolve the dependencies. (See
[How to install npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) if you are new
to Node and npm.)

Set the `PORT` environment variable to an available port (for example, 9009; the default is 3000), and run cors-it with

```
$ PORT=9009 node index.js
```

Set the `URLPARAM` environment variable to change the `url` query parameter to another one (for example, `__target`; the default is `url`), and run cors-it with
```
$ URLPARAM=__target PORT=9009 node index.js
```

### Build using Docker

To build cors-it using a docker container:

```
docker build -t cors-it .
docker run -p 8081:3000 cors-it
```

This will start cors-it at `http://localhost:8081`.

# Using cors-it

Pass a URL as the `url` query parameter

`http://localhost:9009/?url=http://petstore.swagger.io/v2/swagger.json`

and cors-it will return that resource and its headers and add CORS headers.

You can test your cors-it proxy with [curl(1)](http://curl.haxx.se/docs/manpage.html):

```
curl -D - 'http://localhost:9009/?url=http://petstore.swagger.io/v2/swagger.json'
HTTP/1.1 200 OK
X-Powered-By: Express
access-control-allow-origin: *
access-control-allow-headers: Content-Type, api_key, Authorization
date: Tue, 02 Dec 2014 20:01:43 GMT
access-control-allow-methods: GET, POST, DELETE, PUT, PATCH, OPTIONS
content-type: application/json; charset=utf-8
x-cache: MISS from inetgw47
transfer-encoding: chunked
via: 1.1 inetgw47 (squid)
connection: keep-alive

{"apiVersion":"1.0.0","swaggerVersion":"1.2","apis":[], ... }
```

If you are using [swagger-editor](https://github.com/swagger-api/swagger-editor),
you can configure the editor to use your cors-it proxy
in [app/config/defaults.js](https://github.com/swagger-api/swagger-editor/blob/master/app/config/defaults.json#L30) ;
just change the value of importProxyUrl to your host/port, such as

```
 importProxyUrl: 'http://localhost:9009/?url='
```
Start cors-it as described above, then start swagger-editor.
You should now be able to import a URL into swagger-editor from arbitrary URLs.
