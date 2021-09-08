import { config } from "dotenv";
config();

import { IndiebackendApi } from "../src";

async function test() {
	try {
		const client = new IndiebackendApi("exampleapp-rl98e");

		const data = await client.players.loginPlayerEmail({
			email: "",
			password: "",
		});
		// client.useToken(data.token);

		const player = await client.players.getPlayer();
		console.log(player);
	} catch (error) {
		console.error((error as any).response.data);
	}
}

test();
