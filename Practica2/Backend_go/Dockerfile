FROM golang:1.19-alpine3.17

WORKDIR /appgo

COPY .env ./
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
RUN go build -o /backendgo

CMD ["/backendgo"]