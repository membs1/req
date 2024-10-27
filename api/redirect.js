// api/redirect.js

export default async function handler(req, res) {
    const { headers } = req;

    // Capture user info
    const userAgent = headers["user-agent"];
    const timestamp = new Date().toISOString();
    const ip = headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Prepare message for Telegram
    const botToken = "7578667057:AAHFW35jHtb-WzeRssUgKTy3VFGIYnVyYWo";
    const chatId = "5172045930";
    const message = `New Click Detected:\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });

    // Redirect to YouTube
    res.writeHead(302, { Location: "https://www.youtube.com" });
    res.end();
}
