require("dotenv").config();

const { readOrders, saveOrders } = require("./fileService");
const { getWeather } = require("./weatherService");
const { generateApology } = require("./aiService");

const delayedWeather = ["Rain", "Snow", "Extreme"];

async function processOrders() {
    try {
        const orders = await readOrders();

        console.log("=================================");
        console.log("Processing Orders...");
        console.log("=================================\n");

        await Promise.all(
            orders.map(async (order) => {
                const weatherData = await getWeather(order.city);

                // Skip invalid cities
                if (!weatherData.success) {
                    console.log(`❌ ${order.city} - Invalid City`);

                    order.status = "Pending";
                    order.message = "Weather information could not be retrieved.";

                    return;
                }

                console.log(`📍 ${order.city} -> ${weatherData.weather}`);

                if (delayedWeather.includes(weatherData.weather)) {
                    order.status = "Delayed";

                    order.message = await generateApology(
                        order.customer,
                        order.city,
                        weatherData.description
                    );
                } else {
                    order.status = "Pending";
                    order.message = "Your order is on schedule and will be delivered on time.";
                }
            })
        );

        await saveOrders(orders);

        console.log("\n=================================");
        console.log("All orders processed successfully.");
        console.log("Updated orders.json");
        console.log("=================================");
    } catch (error) {
        console.error("Unexpected Error:", error.message);
    }
}

processOrders();