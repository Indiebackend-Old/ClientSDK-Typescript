import { Socket, io } from "socket.io-client";
import { MessagingChannel } from "./channel";

export class MessagingApi {
	client!: Socket;
	channels: Record<string, MessagingChannel>;

	constructor(private appSecret: string, private appId: string) {
		this.channels = {};
	}

	async initialize() {
		console.log("Initialize ws");
		this.client = io(
			process.env.IDB_MESSAGING_HOST ||
				"ws://messaging.api.dev.indiebackend.com",
			{
				extraHeaders: {
					AppSecret: this.appSecret,
				},
			}
		).connect();

		this.client.on("connect", () => console.log("Connected"));
		this.client.on("connect_error", (err) =>
			console.error("Connect error", err)
		);
		this.client.on("subscribe_error", (err) => {
			this.channels[err.channel]?.emit("subscribe_error", err.error);
		});

		this.client.on("subscribed", (data) =>
			this.channels[data.newChannel]?.emit("subscribed", data.channels)
		);
		this.client.on("message", (data) =>
			this.channels[data.newChannel]?.emit("subscribed", data.channels)
		);
	}

	getChannel(channel: string) {
		if (!this.channels[this.appId + "/" + channel])
			this.channels[this.appId + "/" + channel] = new MessagingChannel(
				this.client,
				this.appId,
				channel
			);

		return this.channels[this.appId + "/" + channel];
	}
}
