---
title: Enable public URL during development
showMetadata: true
editable: true
showToc: true
---

# Make your local development can be accessed with a public URL

## Install ngrok
- Download ngrok
```sh
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
```
- Then run:
```sh
 unzip ngrok-stable-linux-amd64.zip
```
- Connect to your account.
```sh
./ngrok authtoken your-authentication-token
```
- Get `your-authentication-token` from `https://dashboard.ngrok.com/`
- This will add your authentication token to `~/.ngrok2/ngrok.yml`, a default configuration file.

## Configure ngrok region
- Open ~/.ngrok2/ngrok.yml.
```sh
vi ~/.ngrok2/ngrok.yml
```
- Add `region` key and a valid region [us, eu, au, ap, sa, jp, in] (default: us).
- To use Asia Pacific region, use the following configuration.
```yml
authtoken: your-authentication-token
region: ap
```
- Save a configuration and quit (:wq).

## Start ngrok to serve a public URL
- Use the following command to start ngrok and forward a public URL to localhost port 8000.
```
./ngrok http 8000
```
- You will logging messages like this:
```sh
ngrok by @inconshreveable

Session Status                online
Account                       your-email-address (Plan: Free)
Version                       2.3.40
Region                        Asia Pacific (ap)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://7bf181875b76.ap.ngrok.io -> http://localhost:8000
Forwarding                    https://7bf181875b76.ap.ngrok.io -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
- Press `ctrl+c` to exit the process.

# Configure ngrok to serve multiple ports
- Open ~/.ngrok2/ngrok.yml
```sh
vi ~/.ngrok2/ngrok.yml
```
- Add the following contents:
```yaml
authtoken: your-authentication-token
region: ap
tunnels:
  ui:
    addr: 3000
    proto: http
  api:
    addr: 3001
    proto: http
```
- Save a configuration (:wq) and start ngrok with a command:
```shell
./ngrok start --all
```

# Credit
- More info https://stackoverflow.com/a/38645042/1872200
- https://stackoverflow.com/a/36018377/1872200
