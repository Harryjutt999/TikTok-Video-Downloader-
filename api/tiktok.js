export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "❌ Please provide TikTok video URL" });
  }

  try {
    const apiUrl = `https://tiktok-down.apis-bj-devs.workers.dev/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ CORS fix
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch from API", details: err.message });
  }
}
