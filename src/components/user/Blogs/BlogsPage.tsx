"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { PiSpinnerBold } from "react-icons/pi";
import { useIntersection } from "@mantine/hooks";

interface Blog {
  title: string;
  imageUrl: string;
  author: string;
  authorImage: string;
  link: string;
}

interface BlogResponse {
  blogs: Blog[];
  nextPage: number | null;
}

const fetchBlogs = async ({ pageParam = 1 }): Promise<BlogResponse> => {
  const res = await axios.get<BlogResponse>(
    `http://localhost:3000/api/blogs?page=${pageParam}&limit=4`
  );
  return res.data;
};

const BlogsPage = () => {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["blogs"],
      queryFn: fetchBlogs,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const lastBlogRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastBlogRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return (
      <div className="text-center mt-10 flex items-center justify-center w-[80%] mx-auto">
        <PiSpinnerBold className="text-xl ml-2 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error fetching blogs</div>;
  }

  return (
    <div className="w-[80%] mx-auto mt-5">
      <h3 className="text-2xl font-semibold mb-7">Blogs</h3>
      <div className="wrapper flex gap-5 flex-wrap">
        {data?.pages.flatMap((page) =>
          page.blogs?.map((blog: Blog, i: number) => {
            const isLastBlog = i === page.blogs.length - 1;
            return (
              <Card
                key={i}
                ref={isLastBlog ? ref : null}
                onClick={() =>
                  router.push(`/blogs/${blog.link.split("/").at(-1)}`)
                }
                className="w-[100%] md:w-[48%] py-2"
              >
                <div className="wrapper w-[90%] mx-auto">
                  <CardHeader className="h-20">
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/bgBlog1.avif"
                      className="h-40 rounded-md w-full object-cover"
                      alt=""
                    />
                  </CardContent>
                  <div className="user flex gap-3 mt-5 border-b border-gray-300 pb-3">
                    <img
                      src={blog.authorImage}
                      className="w-16 h-16 object-cover rounded-full"
                      alt="User Avatar"
                    />
                    <p className="text-lg font-semibold">{blog.author}</p>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
      {isFetchingNextPage && (
        <div className="text-center mt-10 flex items-center justify-center w-[80%] mx-auto">
          <PiSpinnerBold className="text-xl ml-2 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
