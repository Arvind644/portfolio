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
    "Building software is both my *passion* and my *profession*. I am a *Full Stack software crafter* with *3 years of industry experience* specialised in building and scaling *cloud-native web applications*. I have a solid background in producing software with state-of-the-art technologies. I am a big fan of AI tools, with the ultimate goal of creating software that makes customers happy. In addition, I am a contributor and active member of open-source communities. I have demonstrated a strong ability to create developer-focused content that empoweres engineers to write better softawre and grow their careers. \n\n If you need any assistance or have any questions, feel free to reach me.",
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
