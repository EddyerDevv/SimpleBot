import { LogLevel, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import "../lib/setup";
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
      logger: {
        level: LogLevel.Debug,
      },
      allowedMentions: {
        parse: ["users"],
        repliedUser: true,
      },
      defaultPrefix: "sp!",
      caseInsensitiveCommands: true,
      loadMessageCommandListeners: true,
    });
  }

  async start() {
    if (!process.env.DISCORD_BOT_TOKEN) throw new Error("No token found");

    try {
      this.logger.info("Logging in");
      await this.login(process.env.DISCORD_BOT_TOKEN);
      this.logger.info("logged in");
    } catch (error) {
      this.logger.fatal(error);
      await this.destroy();
      process.exit(1);
    }
  }
}
