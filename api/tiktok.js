export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing TikTok URL" });
  }

  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.data) {
      return res.status(200).json({
        video_no_watermark: data.data.play,
        video_watermark: data.data.wmplay
      });
    } else {
      return res.status(404).json({ error: "Video link not found in API response", raw: data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch video", details: err.message });
  }
}
