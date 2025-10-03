"use client";
import PageHeader from "@/components/PageHeader";
import BlogDetail from "./BlogDetail";
import MostVisited from "./MostVisited";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  images: string;
  created_at: string;
  tags: string;
  slug: string;
  [key: string]: any;
};

export default function ClientPage({ initialPost }: { initialPost: BlogPost }) {
  return (
    <div className="w-full bg-white dark:bg-black">
      <PageHeader pageName={"Blogs"} title="Blogs Detail" />
      <div className="md:mx-0 lg:mx-8 max-md:mx-0">
        <div className=" mx-auto lg:p-6 md:p-0 max-md:px-0 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <BlogDetail post={initialPost} />
          </div>
          <div className="w-full md:w-1/3 sm:mt-0 max-sm:mt-4 md:mt-5">
            <MostVisited />
          </div>
        </div>
      </div>
    </div>
  );
}
