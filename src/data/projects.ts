export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
  description?: string;
  screenshot?: string;
  hoverText?: string;
};

const projects: Project[] = [
    {
    title: "AI SaaS - Shotly AI (300+ users)",
    techs: ["Next JS", "Tailwind CSS", "Supabase", "Drizzle", "fal AI"],
    link: "https://shotlyai.com/",
    description: "A SaaS platform to turn your selfie into a professional photoshoot, in seconds.",
    screenshot: "/img/projects/shotly-landing-page.png",
    hoverText: "AI Headshot Generator",
  },
  {
    title: "AI SaaS - Rechat",
    techs: ["Next JS", "Tailwind CSS", "Shadcn UI", "Clerk", "Prisma", "Postgresql", "OpenAI"],
    link: "https://rechat.vc/",
    description: "A SaaS platform to manage networking from all social media platforms in one place and get daily networking tasks to grow your network.",
    screenshot: "/img/projects/rechat-landing-page.png",
    hoverText: "AI-powered networking platform with social media integration",
  },
  {
    title: "AI SaaS - profilkep",
    techs: ["Next JS", "Tailwind CSS", "Shadcn UI", "Clerk", "Prisma", "Supabase"],
    link: "https://profilkep.hu/",
    description: "Full-stack platform for generating professional profile pictures with credit system and payment integration.",
    screenshot: "/img/projects/profilkep-landing-page.png",
    hoverText: "Full-stack platform for generating professional profile pictures",
  },
  {
    title: "AI Jewelry Stylist Kiosk (Won $500 USD and 2nd place in Hackathon)",
    techs: ["Next JS", "Tailwind CSS", "PostgreSQL", "Prisma", "NodeMailer"],
    link: "https://hackathon-beryl-iota.vercel.app/",
    description: "An AI-powered jewelry recommendation system that analyzes user photos and generates personalized jewelry suggestions using advanced computer vision and celebrity style matching.",
    screenshot: "/img/projects/evol-jewels.png",
    hoverText: " Responsive virtual try-on web app for Evol Jewels that lets users try jewelry using only sliders and clicks.",
  },
  {
    title: "Ortelius (Open Source)",
    techs: ["docker", "kubernetes", "Golang", "github actions"],
    link: "https://github.com/pulls?q=is%3Apr+author%3AArvind644+archived%3Afalse+is%3Aclosed+user%3Aortelius",
    screenshot: "/img/projects/ortelius.png",
    hoverText: "Open source contributions to microservice cataloging and management tools",
  },
];

export default projects;
