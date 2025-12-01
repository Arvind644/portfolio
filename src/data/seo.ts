// SEO Configuration for the portfolio site
// Update these values with your actual information

export const SEO_CONFIG = {
  // Site Information
  siteName: "Arvind Singharpuria",
  siteUrl: "https://www.arvind.app",
  
  // Default Meta
  defaultTitle: "Arvind Singharpuria | Full Stack Developer, DevOps & AI Expert",
  defaultDescription: "I'm Arvind Singharpuria, a full stack developer specializing in DevOps, AI prototyping, and building high-quality MVPs. Let's bring your ideas to life.",
  
  // Author Information
  author: {
    name: "Arvind Singharpuria",
    email: "hello@arvind.app",
    url: "https://arvind.app",
    twitter: "@ai_arvind",
    github: "Arvind644",
    linkedin: "arvind-singharpuria",
  },
  
  // Social Media
  social: {
    twitter: "@ai_arvind",
    twitterSite: "@ai_arvind",
  },
  
  // Default Open Graph
  defaultOg: {
    type: "website",
    image: "/opengraph-image.jpg",
    imageAlt: "Arvind Singharpuria - Full Stack Developer & DevOps Engineer",
    imageWidth: 1200,
    imageHeight: 630,
  },
  
  // Keywords
  defaultKeywords: [
    "Full Stack Developer",
    "DevOps Engineer",
    "AI Prototyping",
    "MVP Development",
    "Web Development",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "Cloud Architecture",
    "Arvind Singharpuria",
  ],
  
  // Language & Locale
  locale: "en_US",
  language: "en",
} as const;

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Arvind Singharpuria | Full Stack Developer, DevOps & AI Expert",
    description: "I'm Arvind Singharpuria, specializing in full stack development, DevOps, and AI prototyping. Building fast, beautiful, and high-quality software solutions.",
    keywords: ["portfolio", "full stack developer", "devops", "AI", "software engineer"],
  },
  projects: {
    title: "Projects | Arvind Singharpuria",
    description: "Explore my portfolio of projects including web applications, MVPs, and open-source contributions. See real examples of my full stack development and DevOps work.",
    keywords: ["projects", "portfolio", "web applications", "MVP development", "open source"],
  },
  speaking: {
    title: "Speaking & Talks | Arvind Singharpuria",
    description: "Conference talks and presentations on DevOps, cloud architecture, and software development. Book me for your next event or meetup.",
    keywords: ["conference talks", "tech speaker", "presentations", "DevOps talks", "developer advocate"],
  },
  tutorials: {
    title: "Tutorials & Blog | Arvind Singharpuria",
    description: "Technical tutorials and blog posts on DevOps, cloud computing, containerization, and modern software development practices.",
    keywords: ["tutorials", "blog", "DevOps tutorials", "cloud computing", "technical articles"],
  },
  mvp: {
    title: "MVP Development Services | Fast, Beautiful, High-Quality",
    description: "We build fast, beautiful, and high-quality MVPs. Turn your vision into reality with expert full stack development, modern UI/UX, and reliable deployment.",
    keywords: ["MVP development", "startup development", "product development", "SaaS development", "web app development"],
  },
} as const;

// JSON-LD Schemas
export function getPersonSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SEO_CONFIG.author.name,
    url: siteUrl,
    email: SEO_CONFIG.author.email,
    jobTitle: "Full Stack Developer & DevOps Engineer",
    description: SEO_CONFIG.defaultDescription,
    sameAs: [
      `https://twitter.com/${SEO_CONFIG.author.twitter.replace("@", "")}`,
      `https://github.com/${SEO_CONFIG.author.github}`,
      `https://linkedin.com/in/${SEO_CONFIG.author.linkedin}`,
    ],
    knowsAbout: [
      "Full Stack Development",
      "DevOps",
      "Cloud Architecture",
      "AI/ML",
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
    ],
  };
}

export function getWebsiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: siteUrl,
    description: SEO_CONFIG.defaultDescription,
    author: {
      "@type": "Person",
      name: SEO_CONFIG.author.name,
    },
  };
}

export function getArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  modifiedAt?: Date;
  image?: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.publishedAt.toISOString(),
    dateModified: (options.modifiedAt || options.publishedAt).toISOString(),
    image: options.image || `${options.siteUrl}/opengraph-image.jpg`,
    author: {
      "@type": "Person",
      name: SEO_CONFIG.author.name,
      url: options.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: SEO_CONFIG.author.name,
    },
  };
}

export function getServiceSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MVP Development Services by Arvind Singharpuria",
    description: "We build fast, beautiful, and high-quality MVPs. Expert full stack development with modern UI/UX and reliable deployment.",
    url: `${siteUrl}/mvp`,
    provider: {
      "@type": "Person",
      name: SEO_CONFIG.author.name,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "MVP Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Development",
            description: "Responsive design with modern UI/UX, contact forms, SEO optimization, and deployment included.",
          },
          price: "1000",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MVP Development",
            description: "3-5 core features, custom UI/UX design, payment integration, user authentication, and CI/CD deployment.",
          },
          price: "5000",
          priceCurrency: "USD",
        },
      ],
    },
  };
}

