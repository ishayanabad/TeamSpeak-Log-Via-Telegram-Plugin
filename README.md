# TeamSpeak Log Via Telegram Plugin

## Overview

The "TeamSpeak Log Via Telegram" plugin is an efficient tool for TeamSpeak server administrators, providing real-time notifications about server events through Telegram. This enables administrators to stay informed about critical activities, enhancing server management and response capabilities.

## Features

- **Event Notifications**: Receives alerts for various TeamSpeak server events, including:
  - Client movements between channels.
  - Clients being kicked or banned from the server.
  - Changes in server groups.
  - Creation and deletion of channels.
  - Changes in client nicknames.

- **Customizable Messages**: Allows administrators to define custom messages for each event type using placeholders for dynamic content.

- **Efficient Performance**: Utilizes asynchronous HTTP requests to communicate with the Telegram API, ensuring minimal impact on server performance.

## Installation

1. **Download the Plugin**:
   - Clone this repository or download the plugin files.
   - Install the plugin by placing the files in the appropriate directory on your TeamSpeak server.

2. **Setup Your Telegram Bot**:
   - Create a Telegram bot via [BotFather](https://core.telegram.org/bots#6-botfather) and obtain the bot token.
   - Set up a Telegram channel and add your bot as an admin to acquire the channel ID.

3. **Configure the Plugin**:
   - Open the configuration file of the plugin and set the following:
     - `token`: Your Telegram bot token.
     - `channel_id`: Your Telegram channel ID.
     - Customize messages for each event as necessary.

## Configuration Variables

Here are the variables you can configure in the plugin:

- `token`: *(string)* Your Telegram Bot Token (e.g., `123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ`).
- `channel_id`: *(string)* Your Telegram Channel ID (e.g., `-123456789`).
  
Below are the placeholders for the message templates you can customize for each event type:

- `MoveMSG`, `KFC`, `KFS`, `BanMSG`, `serverGroupAdded_MSG`, `serverGroupRemoved_MSG`, `channelCreate_MSG`, `channelDelete_MSG`, `ChangeNick_MSG`

Example usage of placeholders in custom messages:

- `%a` - Client's name
- `%b` - Invoker's name
- `%c` - Channel name
- `%i` - IP address
- `%pi` - Ping
- `%pc` - Packet loss
- `%co` - Country
- `%u` - Unique ID
- `%d` - Database ID
- `%bm` - Ban message
- `%t` - Time

Example message for `MoveMSG`:
```
User %a moved to channel %c. IP: %i, Ping: %pi, Packet Loss: %pc, Country: %co, UID: %u, Database ID: %d
```

## Usage

Once configured, the plugin will monitor specified events and automatically send notifications to the configured Telegram channel, providing real-time updates on your TeamSpeak server's activities.

## Contribution

Contributions are welcome! If you have any suggestions or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
