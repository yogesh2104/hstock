"use client"

import * as React from "react"

export default function SoftwareStructure() {

  return (
    <div className="">
      <section className=" container mx-auto py-5">
        <div className="relative z-10 container mx-auto px-4 py-5">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Software
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Structure
              </span>
            </h1>
            
          </div>
        </div>

        <div className="mx-auto">
            <img
                src={'/Pannel.jpg'}
                className="image h-full w-full object-cover object-center z-30"
            />
        </div>
      </section> 
    </div>
  )
}
