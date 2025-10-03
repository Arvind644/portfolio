type Company = {
  name: string;
  logo: string;
  darkLogo?: string;
  website?: string;
  description?: string;
  categories?: string[];
};

const companies: Company[] = [
  {
    name: "Fountane",
    logo: "/img/companies/fountane.png",
    website: "https://www.fountane.com/",
    description: "Software Engineer",
    categories: ["fullstack", "devops"]
  },
  {
    name: "Ortelius",
    logo: "/img/companies/ortelius-logo.svg",
    website: "https://ortelius.io/",
    description: "Full Stack Developer",
    categories: ["fullstack", "devops"]
  },
  {
    name: "Build Club",
    logo: "/img/companies/build-club.png",
    website: "https://www.buildclub.ai/",
    description: "Frontend Developer",
    categories: ["ai", "fullstack"]
  },
  {
    name: "rechat",
    logo: "/img/companies/rechat.png",
    website: "https://www.rechat.vc/",
    description: "React Developer",
    categories: ["ai", "fullstack","devops"]
  },
  {
    name: "OpenSSF",
    logo: "/img/companies/openssf.avif",
    darkLogo: "/img/companies/openssf-light.svg",
    website: "https://openssf.org/",
    description: "Open Source Developer",
    categories: ["devops"]
  },
  {
    name: "Cd Foundation",
    logo: "/img/companies/cdf.svg",
    darkLogo: "/img/companies/cdf-white.svg",
    website: "https://cd.foundation/",
    description: "Open Source Developer",
    categories: ["devops"]
  },
  {
    name: "Linux Foundation",
    logo: "/img/companies/linux-foundation.png",
    darkLogo: "/img/companies/linux-foundation-light.png",
    website: "https://www.linuxfoundation.org/",
    description: "Open Source Developer",
    categories: ["devops"]
  },
  {
    name: "ComplyIQ",
    logo: "/img/companies/complyiq.webp",
    darkLogo: "/img/companies/complyiq-light.png",
    website: "https://www.complyiq.io/",
    description: "DevOps Engineer",
    categories: ["devops"]
  },
  {
    name: "ASI",
    logo: "/img/companies/asi.png",
    website: "https://anandsystems.com/",
    description: "Automation Engineer",
    categories: ["devops","fullstack"]
  },
  {
    name: "PMC",
    logo: "/img/companies/pmc.jpg",
    darkLogo: "/img/companies/pmc.webp",
    website: "https://parkingmgt.com/",
    description: "Automation Engineer",
    categories: ["fullstack"]
  },
  {
    name: "Profilkep",
    logo: "/img/companies/profilkep.png",
    darkLogo: "/img/companies/profilkep-light.png",
    website: "https://profilkep.hu/",
    description: "Full Stack Developer",
    categories: ["fullstack","ai"]
  },
  {
    name: "ViralPost",
    logo: "/img/companies/viralpost.png",
    description: "Full Stack Developer",
    categories: ["fullstack", "ai"]
  }
];

export default companies;
