###
# cors-it - https://github.com/mohsen1/cors-it
#
# Run the cors-it service on port 3000
###

FROM    ubuntu:14.04
MAINTAINER Marcello_deSales@intuit.com

ENV     DEBIAN_FRONTEND noninteractive

RUN     apt-get update && apt-get install -y git npm nodejs
RUN     ln -s /usr/bin/nodejs /usr/local/bin/node

WORKDIR /runtime
ADD     package.json    /runtime/package.json
RUN     npm install

ADD     .   /runtime

# The default port of the application
EXPOSE  3000
CMD     node index.js
