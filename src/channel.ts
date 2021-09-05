import { Socket } from "socket.io-client";
import { EventEmitter } from "stream";

export declare interface MessagingChannel {
	on(event: "subscribe_error", listener: (err: string) => void): this;
	on(event: "subscribed", listener: (channels: string[]) => void): this;
	on(event: "message", listener: (cdata: any) => void): this;
}

export class MessagingChannel extends EventEmitter {
	name: string;

	constructor(
		private socket: Socket,
		private appId: string,
		channel: string
	) {
		super();
		this.name = channel;
		setImmediate(() => {
			this.socket.on(`${appId}/${channel}`, (data) =>
				this.emit("message", data)
			);
			this.socket.emit("subscribe", `${appId}/${channel}`);
		});
	}

	publish(...args: any[]) {
		this.socket.emit("publish", `${this.appId}/${this.name}`, args);
	}
}
