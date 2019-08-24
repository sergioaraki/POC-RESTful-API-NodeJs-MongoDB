FROM balenalib/rpi-raspbian
ENTRYPOINT []

# Process binaries
ADD mongodb_stretch_3_0_14_core.tar.gz /usr/bin/
ADD mongodb_stretch_3_0_14_tools.tar.gz /usr/bin/

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb
RUN mkdir -p \
    /data/db \
    /data/configdb \
    /var/log/mongodb \
&& chown -R mongodb:mongodb \
    /usr/bin/mongo* \
    /data/db \
    /data/configdb \
    /var/log/mongodb

# Define mountable directories
VOLUME /data/db /data/configdb

RUN apt-get update && \
    apt-get -qy install curl \
                build-essential python \
                ca-certificates 

WORKDIR /root/

COPY ./package.json ./package.json

RUN curl -O -k \
https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-armv7l.tar.xz

RUN tar -xvf node-*.tar.xz -C /usr/local \
  --strip-components=1

RUN npm i

COPY ./app ./app

EXPOSE 3000

COPY startupscript.sh startupscript.sh
RUN ["chmod", "+x", "startupscript.sh"]

CMD ./startupscript.sh