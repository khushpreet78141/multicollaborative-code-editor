import React from "react";

import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CodeSync</h2>
          <p className="text-gray-400 text-sm">
            Real-time collaborative code editor for developers, students,
            and teams. Code together, anytime.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Docs</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Social + CTA */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>

          <div className="flex gap-4 mb-4">
            <IoLogoGithub className="cursor-pointer hover:text-purple-400" />
            <FaLinkedin  className="cursor-pointer hover:text-purple-400" />
            <FaTwitter className="cursor-pointer hover:text-purple-400" />
          </div>

          <p className="text-gray-400 text-sm">
            Start collaborating now 
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CodeSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
