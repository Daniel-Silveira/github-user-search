export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

export interface User {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  email: string;
  location: string;
  bio: string;
  repos_url: string;
  repositories?: Repository[];
}
