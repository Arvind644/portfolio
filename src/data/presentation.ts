type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  mail: "hello@arvind.app",
  title: "Hi, I’m Arvind 👋",
  // profile: "/profile.webp",
  description:
    "I specialise in 3 things: Full stack development, DevOps & AI Prototyping",
  socials: [
    {
      label: "X",
      link: "https://x.com/ai_arvind",
    },
    // {
    //   label: "Bento",
    //   link: "https://bento.me/m-wolff",
    // },
    {
      label: "Github",
      link: "https://github.com/Arvind644",
    },
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/arvind-singharpuria",
      },
  ],
};

export default presentation;
