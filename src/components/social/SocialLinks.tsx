import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

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
      href: "https://www.facebook.com/profile.php?id=61573480496787",
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
      label: "Facebook"
    },
    {
      href: "https://www.instagram.com/edu__horizon/",
      icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
      label: "Instagram"
    },
    {
      href: "https://www.linkedin.com/company/105347584/admin/dashboard/",
      icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
      label: "LinkedIn"
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