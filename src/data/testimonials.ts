type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Tracy Ragan",
    role: "CEO",
    company: "Deployhub",
    avatar: "/img/testimonials/tracy-ragan.jfif",
    content: "Arvind Singharpuria is a rising star in the tech world, bringing fresh energy, innovation, and a deep technical skill set to the Ortelius Open Source Project. As a Full-Stack Developer and AI Engineer, he has quickly made a name for himself by contributing impactful code and leveraging AI to enhance the platform’s capabilities."
  },
  {
    name: "Tony Carrato",
    role: "Board Advisor",
    company: "Ortelius",
    avatar: "/img/testimonials/tony-carrato.jfif",
    content: "I've been working with Arvind in the Ortelius Open Source project for some time. He's been a solid developer and also a very good collaborator. He's articulate, thoughtful and capable. If you're looking for a senior developer, you should talk to him!"
  },
  {
    name: "Emma Rodriguez",
    role: "Lead Designer",
    company: "Build Club",
    avatar: "/img/testimonials/emma-rodriguez.jpg",
    content: "A true professional who bridges the gap between design and development perfectly. The final product looked exactly like our designs, pixel-perfect."
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    company: "InnovateTech",
    avatar: "/img/testimonials/david-kim.jpg",
    content: "Not only did they deliver amazing code, but they also provided valuable insights that improved our product. Highly recommend for any project."
  },
  {
    name: "Lisa Wang",
    role: "Engineering Manager",
    company: "ScaleUp Inc",
    avatar: "/img/testimonials/lisa-wang.jpg",
    content: "Incredible problem-solving skills and always willing to go the extra mile. They helped us overcome significant technical challenges with innovative solutions."
  }
];

export default testimonials;