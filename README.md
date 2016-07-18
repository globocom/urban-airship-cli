## Urban Airship CLI [![Build Status](https://travis-ci.org/globocom/urban-airship-cli.svg?branch=master)](https://travis-ci.org/arthursz/urban-airship-cli)

> It's a command line interface for [Urban Airship API](https://www.urbanairship.com/).

#### Install:
Available on npm:
`npm install urban-airship-cli --global`

#### Usage:
To use this tool you have to pass the application key an master secret by options or use two environment variables **URBAN_AIRSHIP_KEY** and **URBAN_AIRSHIP_MASTER_SECRET**. Available platforms to send notification: ios, android, amazon, wns, mpns and blackberry. Available audiences options: segment, android_channel, ios_channel and named_user.

`usage: [options] [command]`

#### Examples:
- `urban-airship-cli push broadcast "Message"`;
- `urban-airship-cli push broadcast "Message" -A "segment=<segment-id>"`;
- `urban-airship-cli push broadcast "Message" -A "android_channel=<channel-id>"`;
- `urban-airship-cli push broadcast "Message" -A "ios_channel=<channel-id>"`;
- `urban-airship-cli push broadcast "Message" -A "named_user=<named-user-id>"`;
- `urban-airship-cli push broadcast "Message" -P "<platform-name>, <platform-name>"`;
- `urban-airship-cli push broadcast "Message" -P "<platform-name>" -A "segment=<segment-id>"`;
- `urban-airship-cli push action_url "Message" https://www.urbanairship.com/`;
- `urban-airship-cli list channels`;
- `urban-airship-cli list segments`;
- `urban-airship-cli list named_users`;

#### Commands:
- `push <type> <message> [url]`: ***send push notification***
	- **type** : push notification type: broadcast or action_url;
	- **message** : push notification message;
	- **url** : url to be opened, must be passed when type action_url is used;
	- **-A, --audience** (optional) - audience from urban airship to send notification, default: "all";
	- **-P, --platforms** (optional) - specify platforms to send notification, default: "ios, android";
- `list <type>`: ***list all application: channels, segments or named_users***
	- **type** : type of the list: channels, segments or named_users

#### Options:
- `-h`, `--help`        output usage information
- `-V`, `--version`     output the version number
- `-s <value>`, `--secret <value>`  application master secret from urban airship
- `-k <value>`, `--key <value>`     application key from urban airship

---
