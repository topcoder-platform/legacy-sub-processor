FROM node:8

ARG SERVERNAME=informix
ARG S3_FILE=informix.tar.gz
ARG S3_BUCKET=tc-informix-dev
ARG S3_KEY=a-key
ARG S3_SECRET=a-secret

USER root
RUN mkdir /app

COPY . /app

RUN echo "sqlexec 2021/tcp" >> /etc/services
RUN adduser --quiet --gecos "" --home /home/app --disabled-login app
RUN chown -R app /app

# copy informix library
RUN ./app/download_s3.sh "${S3_FILE}" "${S3_BUCKET}" "${S3_KEY}" "${S3_SECRET}" | tar -C / -xz -f -

COPY docker/legacy-submission-processor/esql /opt/ibm/informix/bin/
RUN chmod a+rx /opt/ibm/informix/bin/esql
RUN echo "informixoltp_tcp        onsoctcp        $SERVERNAME               sqlexec" \
  > /opt/ibm/informix/etc/sqlhosts.informixoltp_tcp

USER app

ENV INFORMIXDIR /opt/ibm/informix
ENV INFORMIXSERVER informixoltp_tcp
ENV INFORMIXTERM terminfo
ENV CLIENT_LOCALE en_US.utf8
ENV DB_LOCALE en_US.utf8
ENV DBDATE Y4MD-
ENV DBDELIMITER "|"
ENV PATH ${INFORMIXDIR}/bin:${INFORMIXDIR}/lib:${INFORMIXDIR}/lib/esql:${PATH}
ENV LD_LIBRARY_PATH ${INFORMIXDIR}/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/tools
ENV INFORMIXSQLHOSTS /opt/ibm/informix/etc/sqlhosts.informixoltp_tcp
ENV LICENSE accept

WORKDIR /app

RUN npm --unsafe-perm install

CMD npm start
