import React from 'react';
import logo from "../assets/logop.png"


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#4c4a4a] text-white selection:bg-appwritePink selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-appwritePink/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-appwritePink/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0f0f10]/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-white rounded-full">
              <img src={logo}/>
            </div>

          </div>

          <div className="hidden md:flex gap-6 text-sm backdrop-blur-sm text-gray-400 rounded-full shadow-black">
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">Community</a>
            <a href="#" className="hover:text-white transition">Blog</a>
            <a href="#" className="hover:text-white transition">Changelog</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1 text-sm text-gray-400 border border-white/10 px-3 py-1 rounded-full cursor-pointer">
            <span>See Viral #Hashtags</span>
            <span className="text-white font-mono ">40k+</span>
          </div>
          <button className="bg-appwritePink hover:bg-blue-600 text-white px-5 py-2 border-gray-600 hover:shadow hover:scale-98 border-1 rounded-2xl text-sm font-medium transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          {/* New Badge */}
          <div className="inline-flex items-center cursor-pointer gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs mb-8">
            <span className="bg-black rounded-full pt-1 w-[50px] h-[25px]">⭐New</span>
            <span className="text-gray-300">Introducing New Updates On SPHERE! →</span>
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-6">
            Build Endless<br />
            <span className="text-gray-200 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-purple-400 "> Connections!</span>
          </h1>
        </div>

        <div className="max-w-md">
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Build your entire backend within minutes and scale effortlessly using
            <span className="bg-[#1f2937] text-[#4ade80] px-1 rounded ml-1">Appwrite's open-source platform.</span>
            Add Authentication, Databases, Functions, Storage, and Messaging to your projects.
          </p>
          <button className="bg-[blue] hover:scale-105 transition-transform text-white px-8 py-3 rounded-xl font-semibold">
            Create Account now!
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;