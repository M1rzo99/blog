import BlogCard from "@/components/cards/blog";
import BgArrow from "@/components/shared/bg-arrow";
import { getBlogs } from "@/services/blog.service";
import React from "react";

async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl  text-center max-w-2xl font-creteRound">
          Taking control of daily life is easy when you know how to!
        </h1>
        <BgArrow />
      </div>
      <h2 className="text-center text-4xl section-title font-creteRound">
        <span>Recent Posts</span>
      </h2>
      <div className="flex flex-col space-y-24 mt-24">
        {blogs.map((blog) => (
          <BlogCard key={blog.title} {...blog} />
        ))}
      </div>
    </div>
  );
}

export default Home;
