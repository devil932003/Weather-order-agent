<div align="center">

# 🌦️ Weather Order Agent

**AI-powered logistics assistant that watches the sky so your orders don't get caught in the rain.**

Fetches live weather for every order's delivery location, lets an AI model reason about the risk, and logs the verdict — automatically.

[![Node.js](https://img.shields.io/badge/Node.js-v16%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## What it does

Bad weather ruins temperature-sensitive shipments and delays deliveries — usually you find out too late. **Weather Order Agent** closes that gap:

1. 📦 Reads your active orders and their destinations
2. 🌤️ Pulls real-time weather for each location
3. 🤖 Asks an AI model to assess the delivery risk (storms, extreme heat/cold, etc.)
4. 📝 Logs the reasoning and verdict for every order — no manual checking required

## Features

| | |
|---|---|
| 📦 **Order tracking** | Simple JSON-backed store (`orders.json`) — no database setup needed |
| 🌤️ **Live weather** | Real-time conditions and forecasts per delivery location |
| 🤖 **AI risk analysis** | Natural-language reasoning about weather impact, not just raw thresholds |
| 🧾 **Audit trail** | Every AI decision is logged to `ai-log.md` for later review |
| 🛠️ **Modular design** | Weather, AI, and file I/O are separate, swappable services |

## Project structure

```text
weather-order-agent/
├── app.js              # Entry point — orchestrates the whole flow
├── weatherService.js   # Talks to the weather API
├── aiService.js        # Prompts the AI model and logs its analysis
├── fileService.js      # Reads/writes local data & logs
├── orders.json          # Your order data
├── ai-log.md            # History of AI decisions
├── package.json
└── .env                 # API keys & config (not committed)
```

## Getting started

**Requirements:** Node.js v16+ and npm

```bash
# 1. Clone
git clone https://github.com/devil932003/Weather-order-agent.git
cd Weather-order-agent

# 2. Install
npm install

# 3. Configure
cp .env.example .env   # then fill in your keys
```

`.env`
```env
WEATHER_API_KEY=your_weather_api_key
AI_API_KEY=your_ai_provider_api_key
PORT=3000
NODE_ENV=development
```

**Run it:**
```bash
npm start
# or
node app.js
```

## Example order

```json
{
  "orderId": "ORD-1001",
  "customer": "Acme Corp",
  "location": "Chicago, IL",
  "status": "In Transit",
  "itemType": "Temperature Sensitive"
}
```

Add entries like this to `orders.json` and the agent picks them up on its next run.


## Contributing

Contributions are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request. 🙌

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">
Made with ☁️ + 🤖 by <a href="https://github.com/devil932003">Devansh Mishra</a>
</div>
