import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class SuperClient extends SapphireClient {
  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      allowedMentions: {
        parse: ["users"],
        repliedUser: true,
      },
      loadMessageCommandListeners: true,
      loadApplicationCommandRegistriesStatusListeners: true,
    });
  }

  async start() {
    if (!process.env.DISCORD_BOT_TOKEN) throw new Error("No token found");
    await this.login(process.env.DISCORD_BOT_TOKEN);
  }
}
