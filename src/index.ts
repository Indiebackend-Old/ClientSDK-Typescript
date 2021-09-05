import {
	CurrenciesApi,
	StatsApi,
	GroupsApi,
	Configuration,
	ProfilesApi,
	LeaderboardsApi,
	ShopsApi,
} from "./api";
import { MessagingApi } from "./messaging";

export class Indiebackend {
	profiles: ProfilesApi;
	currencies: CurrenciesApi;
	groups: GroupsApi;
	stats: StatsApi;
	shops: ShopsApi;
	leaderboards: LeaderboardsApi;
	messaging: MessagingApi;

	constructor(appSecret: string, appId: string) {
		const cfg = new Configuration({
			apiKey: appSecret,
			basePath:
				process.env.IDB_API_HOST ||
				"http://clients.api.dev.indiebackend.com",
		});

		this.profiles = new ProfilesApi(cfg);
		this.currencies = new CurrenciesApi(cfg);
		this.groups = new GroupsApi(cfg);
		this.stats = new StatsApi(cfg);
		this.shops = new ShopsApi(cfg);
		this.leaderboards = new LeaderboardsApi(cfg);
		this.messaging = new MessagingApi(appSecret, appId);
	}
}
