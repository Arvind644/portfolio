type Skill = {
  name: string;
  subSkills: string[];
  value: number;
};

const skills: Skill[] = [
  { name: 'Frontend', subSkills: ['React', 'Next JS', 'TypeScript', 'Tailwind'], value: 85 },
  { name: 'Backend', subSkills: ['Node.js', 'Python', 'REST APIs'], value: 90 },
  { name: 'DevOps', subSkills: ['Docker', 'Jenkins', 'Terraform', 'GitHub Actions', 'Bash Scripts', 'Gitlab CI'], value: 88 },
  { name: 'AI', subSkills: ['Vercel AI SDK', 'MCP', 'AI Agents', 'RAG'], value: 75 },
  { name: 'Database', subSkills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'], value: 82 },
  { name: 'Cloud', subSkills: ['AWS', 'Azure', 'Vercel'], value: 85 },
];

export default skills;
