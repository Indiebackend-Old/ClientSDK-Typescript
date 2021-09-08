import axios from "axios";
import {
	CurrenciesApi,
	StatsApi,
	GroupsApi,
	Configuration,
	ProfilesApi,
	LeaderboardsApi,
	ShopsApi,
	PlayersApi,
	PaymentsApi,
} from "./api";
import { MessagingApi } from "./messaging";

// axios.interceptors.response.use((res) => {
// 	return res.data;
// });

export class IndiebackendApi {
	private token: string;

	profiles: ProfilesApi;
	currencies: CurrenciesApi;
	groups: GroupsApi;
	stats: StatsApi;
	shops: ShopsApi;
	players: PlayersApi;
	payments: PaymentsApi;
	leaderboards: LeaderboardsApi;

	constructor(private appId: string) {
		this.construct();
	}

	useToken(token: string) {
		this.token = token;
		this.construct();
	}

	createMessagingClient(profileToken: string) {
		return new MessagingApi(this.appId, profileToken);
	}

	private construct() {
		const cfg = new Configuration({
			apiKey: this.appId,
			basePath:
				process.env.IDB_API_HOST ||
				"http://clients.api.dev.indiebackend.com",
			accessToken: this.token,
		});

		this.profiles = new ProfilesApi(cfg);
		this.currencies = new CurrenciesApi(cfg);
		this.groups = new GroupsApi(cfg);
		this.stats = new StatsApi(cfg);
		this.shops = new ShopsApi(cfg);
		this.leaderboards = new LeaderboardsApi(cfg);
		this.players = new PlayersApi(cfg);
		this.payments = new PaymentsApi(cfg);
	}
}
