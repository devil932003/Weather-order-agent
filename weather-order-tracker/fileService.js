const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "orders.json");

// Read orders from orders.json
async function readOrders() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading orders.json:", error.message);
        return [];
    }
}

// Save updated orders to orders.json
async function saveOrders(orders) {
    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(orders, null, 2),
            "utf-8"
        );
        console.log("orders.json updated successfully.");
    } catch (error) {
        console.error("Error saving orders.json:", error.message);
    }
}

module.exports = {
    readOrders,
    saveOrders
};