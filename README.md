## Urban Airship CLI [![Build Status](https://travis-ci.org/arthursz/urban-airship-cli.svg?branch=master)](https://travis-ci.org/arthursz/urban-airship-cli)

> It's a command line interface to send push notification using [Urban Airship API](https://www.urbanairship.com/).

#### Install:
Available on npm:
`npm install urban-airship-cli --global`

#### Usage:
To use this tool you have to pass the application key an master secret by options or use two environment variables **URBAN_AIRSHIP_KEY** and **URBAN_AIRSHIP_MASTER_SECRET**.

`usage: [options] [command]`

#### Commands:
- `broadcast <message>`         ***send push notification to all application devices***
- `action-url <message> <url>`  ***send notification action to open a url***

#### Options:
- `-h`, `--help`        output usage information
- `-s <value>`, `--secret <value>`  application master secret from urban airship
- `-k <value>`, `--key <value>`     application key from urban airship

---
