// api/sendToTelegram.js

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userAgent, timestamp, ip } = req.body;

        const botToken = "7578667057:AAHFW35jHtb-WzeRssUgKTy3VFGIYnVyYWo"; // Your bot token
        const chatId = "5172045930"; // Your chat ID
        const message = `New Click:\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const telegramResponse = await fetch(telegramUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });

            const responseData = await telegramResponse.json();

            if (!telegramResponse.ok) {
                console.error("Telegram API Error:", responseData);
                return res.status(500).json({ message: "Failed to send to Telegram", error: responseData });
            }

            console.log("Data sent to Telegram successfully:", responseData);
            res.status(200).json({ message: "Data sent to Telegram" });
        } catch (error) {
            console.error("Error in API call to Telegram:", error);
            res.status(500).json({ message: "Error sending to Telegram", error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
