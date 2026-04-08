import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-500 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default function SocialLinks() {
  const socialLinks = [
    {
      href: "",
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
      label: "Facebook"
    },
    {
      href: "",
      icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
      label: "Twitter"
    },
    {
      href: "",
      icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
      label: "Instagram"
    },
    {
      href: "",
      icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
      label: "LinkedIn"
    },
    {
      href: "",
      icon: <Youtube className="h-5 w-5" aria-hidden="true" />,
      label: "YouTube"
    }
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </div>
  );
}