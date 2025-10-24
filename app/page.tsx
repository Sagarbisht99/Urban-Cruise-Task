"use client";

import { MacbookScrollDemo } from "@/components/MacbookScrollDemo";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col items-center justify-center text-center p-4">
        {/* Background Image/Gradient - you might want to use a proper image here */}
        <div className="absolute inset-0  opacity-90 -z-10"></div>
        {/* You can add a background pattern or image like in the Dribbble shot */}
        {/* <div className="absolute inset-0 -z-20">
          <Image src="/path/to/your/background-pattern.png" layout="fill" objectFit="cover" alt="Background pattern" />
        </div> */}

        <p className="text-violet-400 text-lg md:text-xl font-semibold mb-2">---- Just Rent it</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Drive Your Dreams: <br /> Rent the Perfect Car Today!
        </h1>
        <div className="max-w-xl mx-auto mb-8">
          <h6 className="text-gray-400 text-sm md:text-base">
            Don't deny yourself the pleasure of driving best Premium cars from and around the world.
          </h6>
        </div>
        <Link href={"https://urbancruise.in/"} target="_blank">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Reserve Now
        </Button>
        </Link>
      </section>


      <MacbookScrollDemo/>
  <Footer/>
      {/* You can add more sections below this */}
    </div>
  );
}