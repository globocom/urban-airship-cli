## Urban Airship CLI [![Build Status](https://travis-ci.org/arthursz/urban-airship-cli.svg?branch=master)](https://travis-ci.org/arthursz/urban-airship-cli)

> It's a command line interface to send push notification using [Urban Airship API](https://www.urbanairship.com/).

#### Install:
Available on npm:
`npm install urban-airship-cli --global`

#### Usage:
To use this tool you have to pass the application key an master secret by options or use two environment variables **URBAN_AIRSHIP_KEY** and **URBAN_AIRSHIP_MASTER_SECRET**. Available platforms to send notification: ios, android, amazon, wns, mpns and blackberry.

`usage: [options] [command]`

#### Examples:
- `urban-arship-cli broadcast "Message"`;
- `urban-arship-cli broadcast "Message" -P "<platform-name>, <platform-name>"`;
- `urban-arship-cli broadcast "Message" -A "<segment=segment-id>"`;
- `urban-arship-cli broadcast "Message" -P "<platform-name>" -A "segment=<segment-id>"`;

#### Commands:
- `broadcast <message>`: ***send push notification to all application devices***
	- **message** : push notification message;
	- **-A, --audience** (optional) - audience from urban airship to send notification, default: "all";
	- **-P, --platforms** (optional) - specify platforms to send notification, default: "ios, android";
- `action-url <message> <url>`:  ***send notification action to open a url***
	- **message** : push notification message
	- **url** : url to be opened 
	- **-A, --audience** (optional) - audience from urban airship to send notification, default: "all";
	- **-P, --platforms** (optional) - specify platforms to send notification, default: "ios, android";

#### Options:
- `-h`, `--help`        output usage information
- `-V`, `--version`     output the version number
- `-s <value>`, `--secret <value>`  application master secret from urban airship
- `-k <value>`, `--key <value>`     application key from urban airship

---
