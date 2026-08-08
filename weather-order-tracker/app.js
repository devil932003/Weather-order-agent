require("dotenv").config();

const { readOrders, saveOrders } = require("./fileService");
const { getWeather } = require("./weatherService");
const { generateApology } = require("./aiService");

const delayedWeather = ["Rain", "Snow", "Extreme"];

async function processOrders() {
    try {
        const orders = await readOrders();

        console.log("\n==============================================");
        console.log("           WEATHER ORDER TRACKER");
        console.log("==============================================");
        console.log("\nProcessing Orders...\n");

        await Promise.all(
            orders.map(async (order) => {
                const weatherData = await getWeather(order.city);

                // Handle invalid city
                if (!weatherData.success) {
                    console.log(`❌ Order ${order.order_id}`);
                    console.log(`   Customer : ${order.customer}`);
                    console.log(`   City     : ${order.city}`);
                    console.log(`   Status   : Pending`);
                    console.log(`   Error    : Weather information unavailable\n`);

                    order.status = "Pending";
                    order.message =
                        "Weather information could not be retrieved.";

                    return;
                }

                console.log(`📍 ${order.city} -> ${weatherData.weather}`);

                // Check whether weather can cause delivery delay
                if (delayedWeather.includes(weatherData.weather)) {
                    order.status = "Delayed";

                    order.message = await generateApology(
                        order.customer,
                        order.city,
                        weatherData.description
                    );

                    console.log(`   Order ID : ${order.order_id}`);
                    console.log(`   Customer : ${order.customer}`);
                    console.log(`   Weather  : ${weatherData.description}`);
                    console.log(`   Status   : 🔴 Delayed`);
                    console.log(`   Message  : ${order.message}\n`);
                } else {
                    order.status = "Pending";

                    order.message =
                        "Your order is on schedule and will be delivered on time.";

                    console.log(`   Order ID : ${order.order_id}`);
                    console.log(`   Customer : ${order.customer}`);
                    console.log(`   Weather  : ${weatherData.description}`);
                    console.log(`   Status   : 🟢 On Schedule\n`);
                }
            })
        );

        await saveOrders(orders);

        // Final summary
        console.log("==============================================");
        console.log("              PROCESSING SUMMARY");
        console.log("==============================================");

        let delayedCount = 0;
        let pendingCount = 0;

        for (const order of orders) {
            if (order.status === "Delayed") {
                delayedCount++;
            } else {
                pendingCount++;
            }
        }

        console.log(`Total Orders : ${orders.length}`);
        console.log(`🟢 On Schedule : ${pendingCount}`);
        console.log(`🔴 Delayed      : ${delayedCount}`);

        console.log("\nOrder Status:");

        for (const order of orders) {
            if (order.status === "Delayed") {
                console.log(
                    `🔴 ${order.order_id} | ${order.customer} | ${order.city} | Delayed`
                );
            } else {
                console.log(
                    `🟢 ${order.order_id} | ${order.customer} | ${order.city} | On Schedule`
                );
            }
        }

        console.log("\n==============================================");
        console.log("All orders processed successfully.");
        console.log("Updated orders.json");
        console.log("==============================================\n");

    } catch (error) {
        console.error("Unexpected Error:", error.message);
    }
}

processOrders();