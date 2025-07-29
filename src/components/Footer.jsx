import React from 'react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/inkFusionLabs/OmniFusionMusic'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/omnifusion'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/OmniFusionMusic'
    }
  ];

  return (
    <footer className="mt-12 opacity-70 text-sm">
      <p className="text-center mb-4">
        Made with ❤️ by the OmniFusion Music Team
      </p>
      <div className="flex gap-4 justify-center">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer; 