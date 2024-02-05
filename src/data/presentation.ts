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
    "Hello, I'm a *software developer* with over *1.5 years* of experience. I mostly do *devops and backend*. I am currently working with *Node JS and Golang* for development and documenting my devops R&D stuff in my Github. Outside of work I do twitch streaming and learning Frontend.",
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
  ],
};

export default presentation;
