# specify the node base image with your desired version node:<version>
FROM node:8

ARG servername=informix

USER root
RUN mkdir /app

ENV SERVERNAME=$servername

# copy informix library
ADD docker/legacy-submission-processor/informix.tar.gz /

COPY docker/legacy-submission-processor/esql /opt/ibm/informix/bin/
RUN chmod +x /opt/ibm/informix/bin/esql
RUN echo "informixoltp_tcp        onsoctcp        $SERVERNAME               sqlexec" \
  > /opt/ibm/informix/etc/sqlhosts.informixoltp_tcp

ENV INFORMIXDIR /opt/ibm/informix
ENV INFORMIXSERVER informixoltp_tcp
ENV INFORMIXTERM terminfo
ENV CLIENT_LOCALE=en_US.utf8
ENV DB_LOCALE=en_US.utf8
ENV DBDATE Y4MD-
ENV DBDELIMITER "|"
ENV PATH ${INFORMIXDIR}/bin:${INFORMIXDIR}/lib:${INFORMIXDIR}/lib/esql:${PATH}
ENV LD_LIBRARY_PATH ${INFORMIXDIR}/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/tools
ENV INFORMIXSQLHOSTS /opt/ibm/informix/etc/sqlhosts.informixoltp_tcp
ENV USER root
ENV LICENSE accept

COPY . /app
# rm unnecessary files
RUN rm -rf /app/docker

RUN echo "sqlexec 2021/tcp" >> /etc/services
RUN adduser --quiet --gecos "" --home /home/app --disabled-login app
RUN chown -R app /app

USER app
WORKDIR /app

RUN npm --unsafe-perm install

CMD npm run start:docker
