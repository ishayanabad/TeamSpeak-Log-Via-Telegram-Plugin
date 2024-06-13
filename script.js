registerPlugin(
    {
        name: "Teamspeak Log",
        version: "4.0",
        description: "TeamSpeak Log Via Telegram",
        author: "Shayan Abad - Ali Izadi",
        requiredModules: ["http"],
        vars: [
            {
                name: "token",
                title: "Telegram Bot Token",
                type: "string",
                placeholder: "00000000:ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            },
            {
                name: "channel_id",
                title: "Telegram Channel Id",
                type: "string",
                placeholder: "-000000000",
            },
            {
                name: "MoveMSG",
                title: "Move Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "KFC",
                title: "Kicked From Channel",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "KFS",
                title: "Kicked From Server",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "BanMSG",
                title: "Ban Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "serverGroupAdded_MSG",
                title: "Server Group Added Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "serverGroupRemoved_MSG",
                title: "Server Group Removed Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "channelCreate_MSG",
                title: "Channel Create Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "channelDelete_MSG",
                title: "Channel Delete Message",
                type: "multiline",
                placeholder: "",
            },
            {
                name: "ChangeNick_MSG",
                title: "Change Nickname Message",
                type: "multiline",
                placeholder: "",
            },
        ],
    },

    (sinusbot, config) => {
        const event = require("event");
        const http = require("http");
        const engine = require("engine");
        const { token, channel_id, MoveMSG, KFC, KFS, BanMSG, serverGroupAdded_MSG, serverGroupRemoved_MSG, channelCreate_MSG, channelDelete_MSG, ChangeNick_MSG } = config;
        const BASE_URL = `https://api.telegram.org/bot${token}/`;

        async function Telegram(method, data) {
            http.simpleRequest(
                {
                    method: "POST",
                    url: BASE_URL + method,
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                (error, response) => {
                    if (error) {
                        engine.log("Error: " + error);
                        return;
                    }
                    if (response.statusCode !== 200) {
                        engine.log("HTTP Error: " + response.status);
                    }
                }
            );
        }

        async function sendMessage(msg) {
            Telegram("sendMessage", {
                chat_id: channel_id,
                text: msg,
                parse_mode: "html",
            });
        }

        function handleClientMove(ev) {
            setTimeout(() => {
                ev.client.requestConnectionInfoUpdate();
                let IP = ev.client.getIPAddress();
                const Client_Name = ev.client.name();
                const uid = ev.client.uid();
                const did = ev.client.databaseID();
                const TOChannel_Name = ev.toChannel.name();
                let Packet = ev.client.getPacketLoss();
                const Country = ev.client.country();
                let Ping = ev.client.getPing();

                if (!IP) {
                    setTimeout(() => (IP = ev.client.getIPAddress() || "127.0.0.1"), 2000);
                }
                if (!Ping) {
                    setTimeout(() => (Ping = ev.client.getPing()), 2000);
                }
                if (!Packet) {
                    setTimeout(() => (Packet = ev.client.getPacketLoss()), 2000);
                }

                const msg = MoveMSG.replace("%a", Client_Name)
                                  .replace("%c", TOChannel_Name)
                                  .replace("%i", IP)
                                  .replace("%pi", Ping)
                                  .replace("%pc", Packet)
                                  .replace("%co", Country)
                                  .replace("%u", uid)
                                  .replace("%d", did);
                sendMessage(msg);
            }, 2000);
        }

        function handleClientEvent(ev, template) {
            const Client_Name = ev.client.name();
            const invoker = ev.invoker.name();
            const uid = ev.client.uid();
            const did = ev.client.databaseID();
            const replacementValues = {
                "%a": Client_Name,
                "%b": invoker,
                "%u": uid,
                "%d": did,
                "%c": ev.fromChannel ? ev.fromChannel.name() : "",
                "%bm": ev.message || "No Reason",
                "%t": ev.time === "0" ? "Permanently" : ev.time,
                "%sg": ev.serverGroup ? ev.serverGroup.name() : "",
            };

            const msg = template.replace(/%\w+/g, (key) => replacementValues[key] || key);
            sendMessage(msg);
        }

        if (MoveMSG) event.on("clientMove", handleClientMove);
        if (KFC) event.on("clientKickedFromChannel", (ev) => handleClientEvent(ev, KFC));
        if (KFS) event.on("clientKicked", (ev) => handleClientEvent(ev, KFS));
        if (BanMSG) event.on("clientBanned", (ev) => handleClientEvent(ev, BanMSG));
        if (serverGroupAdded_MSG) event.on("serverGroupAdded", (ev) => handleClientEvent(ev, serverGroupAdded_MSG));
        if (serverGroupRemoved_MSG) event.on("serverGroupRemoved", (ev) => handleClientEvent(ev, serverGroupRemoved_MSG));
        if (channelCreate_MSG) event.on("channelCreate", (channel, invoker) => handleClientEvent({ channel, invoker }, channelCreate_MSG));
        if (channelDelete_MSG) event.on("channelDelete", (channel, invoker) => handleClientEvent({ channel, invoker }, channelDelete_MSG));
        if (ChangeNick_MSG) event.on("clientNick", (client, oldNick) => {
            const msg = ChangeNick_MSG.replace("%o", oldNick).replace("%n", client.name()).replace("%u", client.uid()).replace("%d", client.databaseID());
            sendMessage(msg);
        });
    }
);