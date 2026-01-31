const { Client, GatewayIntentBits } = require("discord.js");
const mineflayer = require("mineflayer");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

let mcBot = null;

function createMinecraftBot() {
  const host = process.env.MC_HOST;
  const port = Number(process.env.MC_PORT || 25565);
  const username = process.env.MC_USERNAME;
  const version = process.env.MC_VERSION;

  if (!host || !username) {
    throw new Error("MC_HOST and MC_USERNAME must be set in .env");
  }

  mcBot = mineflayer.createBot({
    host,
    port,
    username,
    version: version || undefined,
  });

  mcBot.on("login", () => {
    console.log("Minecraft bot logged in.");
  });

  mcBot.on("end", () => {
    console.log("Minecraft bot disconnected.");
    mcBot = null;
  });

  mcBot.on("error", (err) => {
    console.error("Minecraft bot error:", err);
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith("!mc")) {
    return;
  }

  const args = message.content.split(" ").slice(1);
  const command = (args.shift() || "").toLowerCase();

  if (command === "start") {
    if (mcBot) {
      await message.reply("Minecraft bot is already running.");
      return;
    }

    try {
      createMinecraftBot();
      await message.reply("Starting Minecraft bot...");
    } catch (error) {
      await message.reply(`Failed to start Minecraft bot: ${error.message}`);
    }

    return;
  }

  if (command === "stop") {
    if (!mcBot) {
      await message.reply("Minecraft bot is not running.");
      return;
    }

    mcBot.quit();
    await message.reply("Stopping Minecraft bot...");
    return;
  }

  if (command === "say") {
    if (!mcBot) {
      await message.reply("Minecraft bot is not running.");
      return;
    }

    const text = args.join(" ");
    if (!text) {
      await message.reply("Usage: !mc say <message>");
      return;
    }

    mcBot.chat(text);
    await message.reply("Message sent.");
    return;
  }

  await message.reply("Unknown command. Try !mc start, !mc stop, or !mc say <message>.");
});

if (!process.env.DISCORD_TOKEN) {
  throw new Error("DISCORD_TOKEN must be set in .env");
}

client.login(process.env.DISCORD_TOKEN);
