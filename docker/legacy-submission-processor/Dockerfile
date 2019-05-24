FROM appiriodevops/tc-database-scripts:base

ARG servername=informix

USER root
RUN mkdir /app
WORKDIR /home/informix

RUN sed -i '/jessie-updates/d' /etc/apt/sources.list
RUN apt-get -qq update && apt-get -qq install -y \
    wget gcc g++ make xz-utils python2.7 git

RUN wget -q -O node8.tar.xz https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz \
    && tar xfJ node8.tar.xz && rm -rf node8.tar.xz

ENV SERVERNAME=$servername
ENV INFORMIXDIR /opt/IBM/informix
ENV INFORMIX_HOME /home/informix
ENV INFORMIXSERVER informixoltp_tcp
ENV INFORMIXTERM terminfo
ENV CLIENT_LOCALE=en_US.utf8
ENV DB_LOCALE=en_US.utf8
ENV DBDATE Y4MD-
ENV DBDELIMITER "|"

COPY esql ${INFORMIXDIR}/bin/
RUN chmod +x ${INFORMIXDIR}/bin/esql
# force to use default value informix here if you build docker image with argument servername but no value
RUN echo "informixoltp_tcp        onsoctcp        ${SERVERNAME:-informix}              sqlexec" \
  > ${INFORMIXDIR}/etc/sqlhosts.informixoltp_tcp
RUN echo "sqlexec 2021/tcp" >> /etc/services
RUN rm /usr/bin/python && ln -s /usr/bin/python2.7 /usr/bin/python
ENV PATH /home/informix/node-v8.11.3-linux-x64/bin:${INFORMIXDIR}/bin:${INFORMIXDIR}/lib:${INFORMIXDIR}/lib/esql:${PATH}
ENV LD_LIBRARY_PATH ${INFORMIXDIR}/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/tools:${INFORMIXDIR}/lib/cli
ENV INFORMIXSQLHOSTS ${INFORMIXDIR}/etc/sqlhosts.informixoltp_tcp
ENV USER root
ENV LICENSE accept

WORKDIR /app
ENTRYPOINT [ "npm" ]
