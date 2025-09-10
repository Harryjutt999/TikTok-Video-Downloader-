import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing TikTok URL" });
  }

  try {
    const apiUrl = `https://tiktok-down.apis-bj-devs.workers.dev/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API Raw Response:", data); // Debugging

    // Check multiple possible fields
    const videoUrl =
      data.video ||
      data.play ||
      (data.result && data.result.nowm) ||
      (data.data && data.data.video);

    if (!videoUrl) {
      return res.status(500).json({ error: "Video link not found in API response", raw: data });
    }

    res.status(200).json({ video: videoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch video" });
  }
        }
