import React, { useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <footer
      className="
        /* INVERTED THEME */
        bg-[#2C1810] dark:bg-[#F5E6D3]
        text-[#F5E6D3] dark:text-[#1a1a1a]
        border-t-4 border-[#F5E6D3] dark:border-[#1a1a1a]
        px-6 py-16 font-mono transition-colors duration-300
      "
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-widest">
          &lt; CALL OF CODE /&gt;
        </h1>
        <p className="text-xs sm:text-sm opacity-80 mt-2">
          A platform where coders unite to learn, build, and collaborate.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
        {/* About Us */}
        <div
          className="
            relative p-6 rounded-md border-4 transition-all duration-300
            /* CARD (INVERTED) */
            bg-[#3B2418] text-[#F5E6D3] border-[#F5E6D3] shadow-[14px_14px_0_#F5E6D3]
            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0_#F5E6D3]
            dark:bg-[#FFF9F3] dark:text-[#3B2418] dark:border-[#3B2418]
            dark:shadow-[14px_14px_0_#3B2418] dark:hover:shadow-[8px_8px_0_#3B2418]
          "
        >
          <h2 className="text-lg sm:text-xl font-black mb-3">About Us</h2>
          <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
            Call Of Code is your go-to platform for coding tutorials,
            <br />
            challenges, and resources. Join us to explore the world
            <br />
            of programming and technology.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div
          className="
            relative p-6 rounded-md border-4 transition-all duration-300
            bg-[#3B2418] text-[#F5E6D3] border-[#F5E6D3] shadow-[14px_14px_0_#F5E6D3]
            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0_#F5E6D3]
            dark:bg-[#FFF9F3] dark:text-[#3B2418] dark:border-[#3B2418]
            dark:shadow-[14px_14px_0_#3B2418] dark:hover:shadow-[8px_8px_0_#3B2418]
          "
        >
          <h2 className="text-lg sm:text-xl font-black mb-3">Quick Links</h2>
          <ul className="space-y-2 text-[10px] sm:text-xs md:text-sm">
            {[
              { href: "#about", text: "About Us" },
              { href: "/interviews", text: "Interviews" },
              { href: "/dsa", text: "DSA" },
              {
                href:
                  "https://mail.google.com/mail/?view=cm&fs=1&to=callofcode07@gmail.com",
                text: "Contact",
              },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="
                    font-bold hover:underline
                    text-[#F5E6D3] dark:text-[#1a1a1a]
                  "
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* FOLLOW US */}
        <div
          className="
            relative p-6 rounded-md border-4 transition-all duration-300
            bg-[#3B2418] text-[#F5E6D3] border-[#F5E6D3] shadow-[14px_14px_0_#F5E6D3]
            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0_#F5E6D3]
            dark:bg-[#FFF9F3] dark:text-[#3B2418] dark:border-[#3B2418]
            dark:shadow-[14px_14px_0_#3B2418] dark:hover:shadow-[8px_8px_0_#3B2418]
          "
        >
          <h2 className="text-lg sm:text-xl font-black mb-3">Follow Us</h2>

          <div className="grid grid-cols-2 gap-5 place-items-center mt-2">
            {[
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/pvpitprogrammingclub",
              },
              { Icon: FaGithub, href: "https://github.com/call-0f-code" },
              {
                Icon: FaLinkedin,
                href: "https://www.linkedin.com/company/callofcode/",
              },
              { Icon: FaTwitter, href: "https://x.com/call_0f_code" },
            ].map(({ Icon, href }, index) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`
                  relative p-3 text-2xl sm:text-3xl border-4 rounded-md transition-all duration-300
                  /* ICON BOX (INVERTED) */
                  bg-[#F5E6D3] text-[#2C1810] border-[#F5E6D3] shadow-[8px_8px_0px_0px_rgba(193,80,46,1)]
                  dark:bg-[#3B2418] dark:text-[#F5E6D3] dark:border-[#3B2418]
                  ${
                    hoverIndex === index
                      ? "translate-x-[4px] translate-y-[4px] shadow-[6px_6px_0_#F5E6D3] dark:shadow-[6px_6px_0_#1a1a1a]"
                      : ""
                  }
                `}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-16">
        <p className="font-black text-sm sm:text-base">
          © 2025 CALL OF CODE • CRAFTED WITH 💛 AND ☕
        </p>
      </div>
    </footer>

          );
        }