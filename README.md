# Minecraft Discord Bot (JavaScript)

This repo includes a minimal JavaScript example of a Discord bot that can start and stop a Minecraft bot using [mineflayer](https://github.com/PrismarineJS/mineflayer). It also answers the question: **What is JavaScript?**

## What is JavaScript?
JavaScript is a programming language used to build interactive websites, servers, and tools. It runs in browsers and on servers (via Node.js). In this project, JavaScript powers the Discord bot and the Minecraft bot it controls.

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
3. Fill in the values in `.env` (Discord token, server info, etc.).
4. Start the bot:
   ```bash
   npm start
   ```

## Discord commands
- `!mc start` — connect the Minecraft bot.
- `!mc stop` — disconnect the Minecraft bot.
- `!mc say <message>` — send a chat message as the Minecraft bot.

## Notes
- This example uses a **self-hosted** Minecraft bot. Make sure you follow Mojang/Microsoft and Discord rules for botting.
- For online-mode servers, you need a valid Minecraft account and authentication setup.

## Files
- `src/index.js` — main bot logic.
- `.env.example` — environment variables template.
- `package.json` — dependencies and scripts.
