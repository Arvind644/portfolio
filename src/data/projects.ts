export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
  description?: string;
};

const projects: Project[] = [
    {
    title: "AI project - Fitness Assistant",
    techs: ["Python", "OpenAI", "Docker", "Flask", "Postgresql", "Grafana"],
    link: "https://github.com/Arvind644/QA-Chatbot",
    description: "Staying consistent with fitness routines is challenging, especially for beginners. Gyms can be intimidating, and personal trainers aren't always available. \nThe Fitness Assistant provides a conversational AI that helps users choose exercises and find alternatives, making fitness more manageable.",
  },
  {
    title: "SaaS - lms-platform",
    techs: ["Next JS", "Tailwind CSS", "Shadcn UI", "Clerk", "Prisma", "MYSQL"],
    link: "https://github.com/Arvind644/lms-platform",
    description: "It is a LMS platform allowing Creators to create their courses with chapters and video streaming, and allowing students to access the course after purchase the course using Stripe.",
  },
  {
    title: "AI project - QA Chatbot",
    techs: ["Streamlit", "OpenAI", "Langchain", "ChromaDB", "Python"],
    link: "https://github.com/Arvind644/QA-Chatbot",
    description: "This is a QA chatbot, that answers question related to a fictional company named Red30 Shoes. It also stores context with chat history in the memory. You can access the application using UI and as a CLI app.",
  },
  {
    title: "AI project - Chat with PDF RAG",
    techs: ["Chainlit", "OpenAI", "Langchain", "ChromaDB", "Python"],
    link: "https://github.com/Arvind644/chainlit-llm-app",
    description: "This is a Chat with PDF RAG application, that take pdf as input and you can query your questions and the application will give answer based on context available in the pdf.",
  },
  {
    title: "Ortelius (Open Source)",
    techs: ["docker", "kubernetes", "Golang", "github actions"],
    link: "https://github.com/pulls?q=is%3Apr+author%3AArvind644+archived%3Afalse+is%3Aclosed+user%3Aortelius",
  },
];

export default projects;
