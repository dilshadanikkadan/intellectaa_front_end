"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PiSpinnerBold } from "react-icons/pi";
import { TOBE } from "@/types/constants/Tobe";
const SinglePost = () => {
  const [blog, setBlog] = useState<TOBE>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const handleGetBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        if (res.status === 200 || res.status === 201) {
          setBlog(res.data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    handleGetBlogs();
  }, [id]);

  if (!blog)
    return (
      <div className="text-center mt-10 flex items-center justify-center w-[80%] mx-auto">
        {" "}
        <PiSpinnerBold className="text-xl ml-2 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{blog?.title}</h1>

      {blog?.imageUrl && (
        <div className="mb-8">
          {/* <Image 
            src={blog?.imageUrl} 
            alt={blog?.title} 
            width={800} 
            height={400} 
            className="rounded-lg shadow-lg"
          /> */}
        </div>
      )}

      <div className="mb-6 flex items-center">
        {blog?.author?.name && (
          <p className="text-gray-600">
            By <span className="font-semibold">{blog?.author.name}</span>
          </p>
        )}
      </div>

      <div
        className="prose prose-lg max-w-[90%] mx-auto md:mx-0 md:max-w-none space-y-3"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      />

      {blog?.benefits && blog?.benefits.length > 0 && (
        <div className="mt-8 bg-[#F0FAF7] p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-main">
            Key Benefits:
          </h3>
          <ul className="list-disc pl-6  ">
            {blog?.benefits?.map((benefit: string, index: number) => (
              <li key={index} className="text-gray-800 ">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 border-t pt-6">
        <button
          onClick={() => router.push("/blogs")}
          className="bg-[#20B486] text-white px-6 py-2 rounded-lg hover:bg-[#31aa84] transition-colors"
        >
          Back to All Blogs
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
