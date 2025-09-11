type Testimonial = {
  name: string;
  role?: string;
  company: string;
  avatar?: string;
  content: string;
  linkedinUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Tracy Ragan",
    role: "CEO",
    company: "Deployhub, Board Member at Linux Foundation, OpenSSF & CDF",
    avatar: "/img/testimonials/tracy-ragan.jfif",
    content: "Arvind Singharpuria is a rising star in the tech world, bringing fresh energy, innovation, and a deep technical skill set to the Ortelius Open Source Project. As a Full-Stack Developer and AI Engineer, he has quickly made a name for himself by contributing impactful code and leveraging AI to enhance the platform’s capabilities.",
    linkedinUrl: "https://www.linkedin.com/in/tracy-ragan-oms/"
  },
  {
    name: "Daniel Moka",
    role: "Software Craftsman",
    company: "Moka IT Engineering; LinkedIn Influencer",
    avatar: "/img/testimonials/daniel-moka.jfif",
    content: "We’ve been collaborating since 2020, and I can say with confidence: \n\n Arvind is one of the most driven, skilled, and creative developers I’ve ever worked with. \n\n What makes him stand out is his deep expertise across modern web technologies like React, Next.js, Node.js, and cloud platforms such as Azure and Vercel. He also brings strong DevOps experience and has been an active open-source contributor and community builder for years. \n\nI can wholeheartedly recommend Arvind to anyone. It’s truly a pleasure to work with him.",
    linkedinUrl: "https://www.linkedin.com/in/danielmoka/"
  },
  {
    name: "Tony Carrato",
    role: "Board Advisor",
    company: "Ortelius, ex IBM",
    avatar: "/img/testimonials/tony-carrato.jfif",
    content: "I've been working with Arvind in the Ortelius Open Source project for some time. He's been a solid developer and also a very good collaborator. He's articulate, thoughtful and capable. If you're looking for a senior developer, you should talk to him!",
    linkedinUrl: "https://www.linkedin.com/in/tonycarrato/"
  },
  {
    name: "Reaper",
    role: "Software Architect",
    company: "Turbot; ex-Principal Developer Fountane",
    avatar: "/img/testimonials/reaper.jfif",
    content: "Quick note- if you need a developer who builds smart, cares quietly, and just gets things done, ping Arvind Singharpuria. \n\n He learned under me, then surpassed what I expected—and now he’s freelancing full-time. No drama, just brains.. \n\nCouldn’t recommend him more",
    linkedinUrl: "https://www.linkedin.com/in/reaperim/"
  },
  {
    name: "Sergio (Sebastián) Canales Espinoza",
    role: "Principal Architect",
    company: "Red Hat; Ambassador @ CNCF / PlatformEngineering",
    avatar: "/img/testimonials/sergio-canales.jfif",
    content: "First of all Arvind is an amazing person, has the right attitude to be successful, humble, hardworking and dedication to learn very fast, he jump directly into the cloud native world what is very hard by the complexity and many technologies related. Now is a promising professional for modern companies who are looking for future solutions.",
    linkedinUrl: "https://www.linkedin.com/in/sergio-canales-espinoza/"
  },
  {
    name: "Kedar Parve",
    role: "Senior Automation Engineer",
    company: "Fountane Inc.",
    avatar: "/img/testimonials/kedar-parve.jfif",
    content: "I’ve had the chance to work with Arvind Singharpuria, and he stands out as an engineer who brings both precision and creativity to automation testing. He designed and implemented frameworks that caught issues early and made our development process smoother and faster. Arvind’s deep knowledge of CI/CD, test automation tools, and scripting makes him a strong collaborator who builds testing systems that teams can truly rely on.",
    linkedinUrl: "https://www.linkedin.com/in/kedar-parve-569364a0/"
  }
];

export default testimonials;