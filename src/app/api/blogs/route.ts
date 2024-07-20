import axios from "axios";
import { JSDOM } from "jsdom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    const response = await axios.get("https://icodethis.com/blog");
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const blogPosts = document.querySelectorAll(".grid.grid-cols-1 > a");

    const blogs = Array.from(blogPosts).map((post) => {
      const title = post.querySelector("h3")?.textContent?.trim();
      const imageUrl = post
        .querySelector("img[alt^='Cover image']")
        ?.getAttribute("src");
      const author = post.querySelector("b")?.textContent?.trim();
      const authorImage = post
        .querySelector("img[alt^='" + author + "']")
        ?.getAttribute("src");
      const link = post.getAttribute("href");

      return {
        title,
        imageUrl,
        author,
        authorImage,
        link: `https://icodethis.com${link}`,
      };
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedBlogs = blogs.slice(start, end);

    return NextResponse.json({
      blogs: paginatedBlogs,
      nextPage: end < blogs.length ? page + 1 : null,
    });
  } catch (error) {
    console.error("Error scraping blog:", error);
    return NextResponse.json(
      { error: "Failed to scrape blog data" },
      { status: 500 }
    );
  }
}