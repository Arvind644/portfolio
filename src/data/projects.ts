export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "docker-mssql-backup-local",
    techs: ["Docker", "bash script"],
    link: "https://github.com/Arvind644/docker-mssql-backup-local",
  },
  {
    title: "Ortelius (Open Source)",
    techs: ["docker", "kubernetes", "Golang", "github actions"],
    link: "https://github.com/pulls?q=is%3Apr+author%3AArvind644+archived%3Afalse+is%3Aclosed+user%3Aortelius",
  },
];

export default projects;
