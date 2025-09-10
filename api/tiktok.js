export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "TikTok URL required" });
  }

  try {
    const apiUrl = `https://tiktok-down.apis-bj-devs.workers.dev/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.video) {
      res.status(200).json({ video: data.video });
    } else {
      res.status(500).json({ error: "Video link not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video", details: error.message });
  }
}
