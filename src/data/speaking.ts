type Talk = {
  title: string;
  event: string;
  date: Date;
  location: string;
  description: string;
  videoUrl?: string;
  slidesUrl?: string;
  tags?: string[];
  screenshot?: string;
  hoverText?: string;
};

const talks: Talk[] = [
  {
    title: "Data Science and the Ortelius Platform",
    event: "Ortelius Visionaries Summit 2021",
    date: new Date("2023-12-8"),
    location: "Virtual",
    description: "Ortelius hoards an amazing amount of data. As we move the project forward, Data Science will allow us to leverage this data to pursue machine learning and predictive behavior of microservices shared across teams. Join Arvind, a data science enthusiast and brilliant University student as he shared is thoughts on the road forward to applying data science to the Ortelius project.",
    videoUrl: "https://www.youtube.com/watch?v=nuvxafqMm84",
    screenshot: "/img/speaking/ortelius-talk.png",
    hoverText: "Data Science insights for microservices management and predictive behavior",
    // slidesUrl: "https://example.com/talk-slides",
    // tags: ["Astro", "Web Development", "Performance"]
  },
//   {
//     title: "Introduction to AI Development",
//     event: "Tech Meetup",
//     date: new Date("2023-09-20"),
//     location: "Bangalore, India",
//     description: "An introduction to AI development for beginners. Covered the basics of machine learning, neural networks, and practical applications in software development.",
//     videoUrl: "https://example.com/ai-talk",
//     tags: ["AI", "Machine Learning", "Beginner"]
//   },
  // Add more talks as needed
];

export default talks; 