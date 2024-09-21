FROM mongo:latest

WORKDIR /app

SHELL ["/bin/bash", "-c"]

COPY package.json /app/
COPY bun.lockb /app/
COPY . /app/


RUN apt-get update && apt-get install -y curl

ENV BASH_ENV=~/.bashrc
ENV VOLTA_HOME=/root/.volta
ENV PATH=$VOLTA_HOME/bin:$PATH

RUN curl -fsSL https://get.volta.sh | bash
RUN volta install node
RUN volta install bun
RUN bun install


VOLUME [ "/data/db" ]

EXPOSE 27017

