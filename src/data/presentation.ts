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
  mail: "arvind.020606@gmail.com",
  title: "Hi, I’m Arvind 👋",
  // profile: "/profile.webp",
  description:
    "Hello, I'm a *software developer* with over *2 years* of experience. I love building *SaaS and AI applications*. I build products from 0 to 1 and do both frontend, backend and devops. Outside of work I enjoy contributing to *open source* projects and doing twitch streaming. \n\n If you need any assistance or have any questions, feel free to reach. me.",
  socials: [
    {
      label: "X",
      link: "https://twitter.com/Arvind_0602",
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
        link: "https://www.linkedin.com/in/arvind-singharpuria-a88686202/",
      },
  ],
};

export default presentation;
