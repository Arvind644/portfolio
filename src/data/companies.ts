type Company = {
  name: string;
  logo: string;
  website?: string;
  description?: string;
};

const companies: Company[] = [
  {
    name: "Fountane",
    logo: "/img/companies/fountane-logo.png",
    website: "https://www.fountane.com/",
    description: "Software Engineer"
  },
  {
    name: "Ortelius",
    logo: "/img/companies/ortelius-logo.svg",
    website: "https://ortelius.io/",
    description: "Full Stack Developer"
  },
  {
    name: "Build Club",
    logo: "/img/companies/build-club.png",
    website: "https://www.buildclub.ai/",
    description: "Frontend Developer"
  },
  {
    name: "rechat",
    logo: "/img/companies/rechat.png",
    website: "https://www.rechat.vc/",
    description: "React Developer"
  },
//   {
//     name: "Netflix",
//     logo: "/img/companies/netflix.svg",
//     website: "https://netflix.com",
//     description: "UI/UX Developer"
//   },
//   {
//     name: "Apple",
//     logo: "/img/companies/apple.svg",
//     website: "https://apple.com",
//     description: "iOS Developer"
//   }
];

export default companies;
