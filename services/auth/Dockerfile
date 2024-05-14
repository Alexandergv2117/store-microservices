FROM golang:1.22-alpine3.19 as builder

WORKDIR /go/src/auth
COPY . .
RUN go build -o /go/bin/auth main.go

FROM scratch
COPY --from=builder /go/bin/auth /go/bin/auth
ENTRYPOINT ["/go/bin/auth"]