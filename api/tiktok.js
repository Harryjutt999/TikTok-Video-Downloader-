export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing TikTok URL" });
  }

  try {
    const apiUrl = `https://tiktok-down.apis-bj-devs.workers.dev/?url=${encodeURIComponent(
      url
    )}`;
    const response = await fetch(apiUrl);

    const text = await response.text();

    // ✅ Try JSON parse
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      // ❌ Not JSON → must be HTML error page
      return res.status(502).json({
        error: "Invalid API response (HTML received)",
        preview: text.slice(0, 200), // show first 200 chars for debugging
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch video", details: err.message });
  }
  }
