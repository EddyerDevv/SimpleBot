import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      description: "Pong!",
      aliases: ["pong"],
    });
  }

  public async messageRun(message: Message) {
    const msg = await message.channel.send("Ping?");

    const content = `Bot Latency ${Math.round(
      this.container.client.ws.ping
    )}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`;

    return msg.edit(content);
  }
}
