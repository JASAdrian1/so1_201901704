FROM golang:1.19-alpine3.17

WORKDIR /backend

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
RUN go build -o /servidor

EXPOSE 8080

CMD ["/servidor"]