import axios from "axios";
import config from "@/config/config";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const category = searchParams.get("category") || "";

    const response = await axios.get(config.GAMES_BASE_URL, {
      params: {
        limit,
        offset,
        category,
      },
      timeout: 10000,
      headers: {
        Accept: "application/json",
      },
    });

    return Response.json({ data: response.data });
  } catch (error) {
    console.error("Games api error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return new Response(JSON.stringify({ error: "Failed to fetch games" }), {
      status: 502,
    });
  }
}
