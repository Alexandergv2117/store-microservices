FROM golang:latest as builder

RUN apt-get update && \
    apt-get upgrade -y

RUN go install github.com/air-verse/air@latest

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /srv

EXPOSE 5000

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /srv

EXPOSE 5000
# COPY go.mod .
# RUN go mod download
# COPY . .
# RUN go install

# FROM scratch
# COPY --from=builder /go/bin/app .
# ENTRYPOINT ["./main"]
