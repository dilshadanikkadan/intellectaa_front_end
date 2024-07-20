import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { JSDOM } from "jsdom";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await axios.get(`https://icodethis.com/blog/${id}`);
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = document.querySelector("h1.text-white")?.textContent?.trim();
    const imageUrl = document
      .querySelector("img.relative.rounded-2xl")
      ?.getAttribute("src");
    const authorName = document
      .querySelector('a[href^="/blog/authors/"]')
      ?.textContent?.trim();
    const authorLink = document
      .querySelector('a[href^="/blog/authors/"]')
      ?.getAttribute("href");

    const contentDiv = document.querySelector("div.text-white.prose");
    const content = contentDiv?.innerHTML.trim();

    const benefitsList = document.querySelector("ul");
    const benefits = benefitsList
      ? Array.from(benefitsList.querySelectorAll("li")).map((li) =>
          li.textContent?.trim()
        )
      : [];

    const blogPost = {
      title,
      imageUrl,
      author: {
        name: authorName,
        link: authorLink ? `https://icodethis.com${authorLink}` : null,
      },
      content,
      benefits,
    };

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post data" },
      { status: 500 }
    );
  }
}
