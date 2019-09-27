# DEVELOPERS GUIDE

## Getting Started

- Clone the application with
  `git clone https://github.com/kenigbolo/lossless-string-comparison.git` or use
  ssh `git clone git@github.com:kenigbolo/lossless-string-comparison.git`.

## Dependencies

- Node 8.x and above
- NPM 6.x

## Description

A vannila JavaScript Node API server which performs lossless string compression
and decompression.

## Usage

Navigate into the cloned repository on the host machine (if not already done).
Begin by installing the needed project dependencies. To do this run

```javascript
npm install
```

Afterwards, to start the server you can proceed to via running either of the
following commands from your terminal

```shell
npm start
```

or

```shell
node server.js
```

The server listens on port `9000`.

The API exposes two endpoints `/compress` and `/decompress`. These endpoints
accept file uploads via POST requests or a standard `application/json` request with the body params `data` holding a comma seperated string

Two sample files (`compress.txt` and `decompress.txr`) are provided in root of
the repository. To test out a request via curl, you can run the following

```shell
curl -F "file=@/path/to/this/folder/reverse.txt" localhost:3000/decompress
```

> Do replace /path/to/this/folder with the correct path to this folder on your
> host machine (you can get the path by running the command `pwd` inside this
> folder in your terminal)

## Caveat

- This tool requires a properly formatted text file where each string is on a
  new line.

- NPM versions lower than 6.x should ideally work but I advice to use 6.x

- `application/json` requests should have the key `data` in the body with a comma seperated string value
