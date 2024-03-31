process.env.NODE_ENV ??= "development";

import {
  ApplicationCommandRegistries,
  RegisterBehavior,
} from "@sapphire/framework";
import "@sapphire/plugin-logger/register";
import * as colorette from "colorette";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite
);

colorette.createColors({ useColor: true });
