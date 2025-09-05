"use client";

import { siteConfig } from "@/config/site-config";

const SocialMedia=()=>{
    return(
        <div className="fixed left-0 bottom-3 md:top-1/4 transform -translate-y-1 md:-translate-y-1 flex flex-col space-y-4 z-50">
            <a
                href={siteConfig?.socialLink?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.993H7.898v-2.883h2.54V9.797c0-2.507 1.492-3.897 3.774-3.897 1.094 0 2.238.194 2.238.194v2.459h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.883h-2.33v6.993C18.343 21.128 22 16.991 22 12z" />
                </svg>
            </a>

            <a
                href={siteConfig?.socialLink?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 transition"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                >
                <path d="M22.46 6.011c-.77.344-1.594.574-2.46.675a4.29 4.29 0 001.88-2.366 8.59 8.59 0 01-2.72 1.038 4.28 4.28 0 00-7.292 3.898 12.138 12.138 0 01-8.794-4.463 4.28 4.28 0 001.324 5.722 4.27 4.27 0 01-1.938-.536v.054a4.28 4.28 0 003.432 4.195 4.28 4.28 0 01-1.935.074 4.28 4.28 0 004 2.972A8.57 8.57 0 012 19.546a12.1 12.1 0 006.56 1.926c7.875 0 12.193-6.523 12.193-12.193 0-.185-.004-.37-.012-.554A8.68 8.68 0 0024 5.526a8.52 8.52 0 01-2.54.695z" />
                </svg>
            </a>

            <a
                href={siteConfig?.socialLink?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                >
                <path d="M7.75 2h8.5C20.072 2 22 3.928 22 7.75v8.5C22 20.072 20.072 22 16.25 22h-8.5C3.928 22 2 20.072 2 16.25v-8.5C2 3.928 3.928 2 7.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.375-2.375a.875.875 0 110 1.75.875.875 0 010-1.75z" />
                </svg>
            </a>
        </div>

    )
}

export default SocialMedia