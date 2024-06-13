# TeamSpeak Log Via Telegram Plugin

## Overview

The "TeamSpeak Log Via Telegram" plugin is designed for TeamSpeak servers to provide real-time notifications of various events via Telegram. This plugin helps administrators stay informed about important activities on their TeamSpeak server by sending configurable messages for different events directly to a specified Telegram channel.

## Features

- **Event Notifications**: Sends notifications for various TeamSpeak events, including:
  - Client moves between channels
  - Client kicked from a channel or server
  - Client banned from the server
  - Server group additions and removals
  - Channel creation and deletion
  - Client nickname changes
- **Customizable Messages**: Allows administrators to define custom messages for each event type using placeholders for dynamic content.
- **Async HTTP Requests**: Uses asynchronous HTTP POST requests to communicate with the Telegram API, ensuring minimal impact on server performance.

## Installation

1. **Download and Configure the Plugin**:
   - Clone this repository or download the plugin files.
   - Place the plugin file in the appropriate directory for your TeamSpeak server.

2. **Setting Up Telegram Bot**:
   - Create a new Telegram bot using [BotFather](https://core.telegram.org/bots#6-botfather) and obtain the bot token.
   - Create a Telegram channel and add the bot as an admin to this channel to obtain the channel ID.

3. **Configure the Plugin**:
   - Open the plugin configuration file and set the following variables:
     - `token`: Your Telegram bot token.
     - `channel_id`: Your Telegram channel ID.
     - Custom messages for each event type as required.

## Configuration Variables

- `token`: **(string)** Telegram Bot Token (e.g., `123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ`).
- `channel_id`: **(string)** Telegram Channel ID (e.g., `-123456789`).
- `MoveMSG`: **(multiline)** Message template for client moves.
- `KFC`: **(multiline)** Message template for when a client is kicked from a channel.
- `KFS`: **(multiline)** Message template for when a client is kicked from the server.
- `BanMSG`: **(multiline)** Message template for when a client is banned.
- `serverGroupAdded_MSG`: **(multiline)** Message template for server group additions.
- `serverGroupRemoved_MSG`: **(multiline)** Message template for server group removals.
- `channelCreate_MSG`: **(multiline)** Message template for channel creation.
- `channelDelete_MSG`: **(multiline)** Message template for channel deletion.
- `ChangeNick_MSG`: **(multiline)** Message template for nickname changes.

## Example of Custom Messages

You can use placeholders in your messages to include dynamic content:
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

Example message template for `MoveMSG`:
```
User %a moved to channel %c. IP: %i, Ping: %pi, Packet Loss: %pc, Country: %co, UID: %u, Database ID: %d
```

## Usage

Once configured, the plugin will automatically start monitoring the specified events and send the corresponding messages to your Telegram channel. You'll get real-time updates about the activities happening on your TeamSpeak server, facilitating better management and response.

## Contribution

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize further as per your project requirements. This description provides a clear and detailed overview of what the plugin does and how to use it.
