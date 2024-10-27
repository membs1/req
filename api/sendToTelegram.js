// api/sendToTelegram.js

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userAgent, timestamp, ip } = req.body;

        const botToken = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your bot token
        const chatId = "YOUR_TELEGRAM_CHAT_ID"; // Replace with your chat ID
        const message = `New Click Detected:\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            await fetch(telegramUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });

            res.status(200).json({ message: "Data sent to Telegram" });
        } catch (error) {
            console.error("Error sending to Telegram:", error);
            res.status(500).json({ message: "Error sending to Telegram" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
