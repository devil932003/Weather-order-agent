const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateApology(customer, city, weather) {
    try {
        const prompt = `
You are a customer support executive.

Write ONLY the apology message.

Rules:
- Do NOT use quotation marks.
- Do NOT use markdown.
- Do NOT use code blocks.
- Keep it under 40 words.
- Mention the delay due to the weather.
- Be friendly and professional.

Customer: ${customer}
City: ${city}
Weather: ${weather}
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.5,
            max_tokens: 80,
        });

        let message = response.choices[0].message.content.trim();

        // Remove surrounding quotes if AI adds them
        message = message.replace(/^["']|["']$/g, "");

        return message;
    } catch (error) {
        console.error("AI Error:", error.message);

        return `Hi ${customer}, your order to ${city} has been delayed due to ${weather}. We sincerely apologize for the inconvenience and appreciate your patience.`;
    }
}

module.exports = {
    generateApology,
};