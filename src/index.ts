// Import required packages
import * as restify from "restify";

// This bot's adapter
import adapter from "./adapter";


// This bot's main dialog.
import app from "./app/app";

import MyBot from "./bot/bot";

const bot = new MyBot();

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

// Listen for incoming server requests.
server.post("/api/messages", async (req, res) => {
  // Route received a request to adapter for processing
  await adapter.process(req, res as any, async (context) => {
    // Dispatch to application for routing
    // console.log('res is', res)
    console.log('context is', context);
    await bot.run(context);
    await app.run(context);
  });
});

//Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

