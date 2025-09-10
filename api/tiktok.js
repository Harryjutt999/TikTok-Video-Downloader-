export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "TikTok URL required" });
  }

  try {
    const apiUrl = `https://tiktok-down.apis-bj-devs.workers.dev/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API RESPONSE:", data); // Debugging ke liye

    // ✅ Different possible keys
    const videoUrl =
      data.video ||
      data.play ||
      data.nowatermark ||
      data.url ||
      (data.data && (data.data.video || data.data.play));

    if (videoUrl) {
      res.status(200).json({ video: videoUrl });
    } else {
      res.status(500).json({ error: "Video link not found", raw: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video", details: error.message });
  }
}
