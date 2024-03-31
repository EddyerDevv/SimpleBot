import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { ApplicationCommandType, Message } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Reply with the bot's ping.",
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand({
      name: this.name,
      description: this.description,
    });
    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.Message,
    });

    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.User,
    });
  }

  public override async messageRun(message: Message) {
    return this.sendPing(message);
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    return this.sendPing(interaction);
  }

  public override async contextMenuRun(
    interaction: Command.ContextMenuCommandInteraction
  ) {
    return this.sendPing(interaction);
  }

  private async sendPing(
    interactionOrMessage:
      | Message
      | Command.ChatInputCommandInteraction
      | Command.ContextMenuCommandInteraction
  ) {
    const pingMessage =
      interactionOrMessage instanceof Message
        ? await interactionOrMessage.channel.send({ content: "Ping?" })
        : await interactionOrMessage.reply({
            content: "Ping?",
            fetchReply: true,
          });

    const content = `Pong! Bot Latency ${Math.round(
      this.container.client.ws.ping
    )}ms. API Latency ${
      pingMessage.createdTimestamp - interactionOrMessage.createdTimestamp
    }ms.`;

    if (interactionOrMessage instanceof Message) {
      return pingMessage.edit({ content });
    }

    return interactionOrMessage.editReply({
      content,
    });
  }
}
