import React from "react";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Team", href: "#team" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#help" },
      { name: "Support", href: "#support" },
      { name: "Documentation", href: "#docs" },
      { name: "Privacy", href: "#privacy" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#terms" },
  { name: "Privacy Policy", href: "#privacy" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/kairo-logo.png",
    alt: "Kairo Logo",
    title: "Kairo",
  },
  sections = defaultSections,
  description = "AI that converts conversations into workflows. Automate your tasks, meetings, and emails with intelligent AI assistance.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Kairo. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}) => {
  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          {/* Logo and Description Section */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 lg:justify-start">
              <a href={logo.url} className="flex items-center gap-3 group">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8 w-8 transition-transform group-hover:scale-110"
                />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                  {logo.title}
                </h2>
              </a>
            </div>
            
            {/* Description */}
            <p className="text-sm text-dark-textSecondary leading-relaxed">
              {description}
            </p>
            
            {/* Social Links */}
            <ul className="flex items-center gap-4 text-dark-textSecondary">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="transition-all hover:text-teal-400 hover:scale-110">
                  <a 
                    href={social.href} 
                    aria-label={social.label}
                    className="block p-2 rounded-lg hover:bg-dark-card transition-colors"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Links Grid */}
          <div className="grid w-full gap-8 md:grid-cols-3 lg:gap-12 xl:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-dark-text text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-dark-textSecondary">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="transition-colors hover:text-teal-400"
                    >
                      <a 
                        href={link.href}
                        className="inline-block hover:translate-x-1 transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar - Copyright and Legal */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-dark-border pt-8 text-xs text-dark-textSecondary md:flex-row md:items-center">
          <p className="order-2 lg:order-1">
            {copyright}
          </p>
          <ul className="order-1 flex flex-col gap-4 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-teal-400 transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
