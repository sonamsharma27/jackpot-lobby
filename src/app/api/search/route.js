import axios from "axios";
import config from "@/config/config";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing query parameter" }),
        { status: 400 }
      );
    }

    const url = config.PROXY_SEARCH_URL;

    const response = await axios.get(url, {
      params: { query },
      headers: {
        Accept: "application/json",
      },
    });

    return Response.json({ data: response.data });
  } catch (error) {
    console.error("Search api error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return new Response(
      JSON.stringify({ error: "Failed to fetch search results" }),
      { status: 502 }
    );
  }
}
