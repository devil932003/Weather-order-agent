# Weather Order Tracker

A simple Node.js application that processes customer orders based on the current weather.

## Features

- Reads orders from `orders.json`
- Fetches weather data using the OpenWeatherMap API
- Processes all cities concurrently using `Promise.all()`
- Marks orders as `Delayed` if the weather is Rain, Snow, or Extreme
- Generates AI-powered apology messages using Groq
- Handles invalid cities gracefully
- Updates `orders.json` after processing

---

## Installation

Clone the project

```bash
git clone <repository-url>
```

Go to the project folder

```bash
cd weather-order-tracker
```

Install dependencies

```bash
npm install
```

---

## Create .env

```env
OPENWEATHER_API_KEY=your_openweather_api_key
GROQ_API_KEY=your_groq_api_key
```

---

## Run

```bash
npm start
```

or

```bash
node app.js
```

---

## Project Structure

```
weather-order-tracker
│
├── app.js
├── aiService.js
├── weatherService.js
├── fileService.js
├── orders.json
├── package.json
├── .env
├── README.md
└── ai-log.md
```

---

## Sample Output

```
Processing orders...

New York -> Rain
Mumbai -> Clouds
London -> Clear

Could not fetch weather for InvalidCity123

Finished processing all orders.
```

---

## Author

Your Name