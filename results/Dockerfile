FROM golang:1.17.2-alpine3.14 AS build

RUN apk add --no-cache git

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o app

FROM alpine:3.14

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/app .

CMD ["./app"]
