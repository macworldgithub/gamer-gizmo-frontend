"use client";

import Link from "next/link";
import Image from "next/image";

export default function UsBlogs() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Recent blog posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Link href="/blogs/ux-review-presentations">
            <Image
              src="/images/UX.png"
              alt="Office setup"
              width={800}
              height={400}
              className="w-full object-cover cursor-pointer"
            />
          </Link>
          <div>
            <p className="text-sm text-purple-600 font-semibold">
              Olivia Rhye • 1 Jan 2023
            </p>
            <Link href="/blogs/ux-review-presentations">
              <h3 className="text-2xl font-bold mt-1 hover:underline cursor-pointer max-md:text-sm dark:text-white">
                UX review presentations
              </h3>
            </Link>
            <p className="text-gray-600 mt-2 dark:text-white">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>
            <div className="flex space-x-2 mt-3">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                Design
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                Research
              </span>
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                Presentation
              </span>
            </div>
          </div>
        </div>

        {/* Post 2 */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Image
              src="/images/leon.png"
              alt="Team working"
              width={200}
              height={120}
              className="w-full md:w-60 h-48 object-cover "
            />
            <div>
              <p className="text-xs text-purple-600 font-semibold">
                Phoenix Baker • 1 Jan 2023
              </p>
              <Link href="/blogs/migrating-to-linear-101">
                <h3 className="text-sm font-bold mt-1 hover:underline cursor-pointer dark:text-white">
                  Migrating to Linear 101
                </h3>
              </Link>
              {/* <h3 className="text-sm font-bold mt-1 hover:underline cursor-pointer dark:text-white">
                Migrating to Linear 101
              </h3> */}
              <p className="text-gray-600 mt-2 text-sm line-clamp-4 dark:text-white">
                Linear helps streamline software projects, sprints, tasks, and
                bug tracking. Here’s how to get...
              </p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                  Design
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                  Research
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Image
              src="/images/lana.png"
              alt="Workspace"
              width={200}
              height={120}
              className="w-full md:w-60 h-48 object-cover"
            />
            <div>
              <p className="text-xs text-purple-600 font-semibold">
                Lana Steiner • 1 Jan 2023
              </p>
              <Link href="/blogs/building-your-api-stack">
                <h3 className="text-sm font-bold mt-1 hover:underline cursor-pointer dark:text-white">
                  Building your API Stack
                </h3>
              </Link>
              {/* <h3 className="text-sm font-bold mt-1 hover:underline cursor-pointer dark:text-white">
                Building your API Stack
              </h3> */}
              <p className="text-gray-600 mt-2 text-sm line-clamp-4 dark:text-white">
                The rise of RESTful APIs has been met by a rise in tools for
                creating, testing, and managing APIs efficiently...
              </p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                  Design
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                  Research
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <Link href="/blogs/grid-system-for-better-ui">
              <Image
                src="/images/climate.png"
                alt="Climate Change"
                width={800}
                height={400}
                className="w-full h-full object-cover cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex flex-col justify-center space-y-3 lg:w-1/2">
            <p className="text-sm text-purple-600 font-semibold">
              Olivia Rhye • 1 Jan 2023
            </p>
            <Link href="/blogs/grid-system-for-better-ui">
              <h3 className="text-2xl font-bold hover:underline cursor-pointer max-md:text-sm dark:text-white">
                Grid system for better Design User Interface
              </h3>
            </Link>
            <p className="text-gray-600 md:w-xl dark:text-white">
              A grid system is a design tool used to arrange content on a
              webpage. It is a series of vertical and horizontal lines that
              create a matrix of intersecting points, which can be used to align
              and organize page elements. Grid systems are used to create a
              consistent look and feel across a website, and can help to make
              the layout more visually appealing and easier to navigate.
            </p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                Design
              </span>
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                Interface
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
