import React from 'react'

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
)

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

type Project = {
  name: string
  description: string
  link: string
  thumbnail: string
  id: string
}

type Experience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
  logo: React.ReactNode
}

export const PROJECTS: Project[] = [
  {
    name: 'NoteForge',
    description: 'Full-Stack note-taking app',
    link: 'https://noteforge.paskie.dev',
    thumbnail: '/noteforge.png',
    id: 'project1',
  },
  {
    name: 'Forward Sports Redesign',
    description: 'Redesigned homepage for Forward Sports',
    link: 'https://forward-sports-redesign.vercel.app',
    thumbnail: '/forward-sports-redesign.png',
    id: 'project2',
  },
  {
    name: 'Dierentuin',
    description: 'C# full-stack zoo management application',
    link: 'https://github.com/Djimairo7/Dierentuin',
    thumbnail: '/dierentuin.png',
    id: 'project3',
  },
  {
    name: 'F1 Registration',
    description: 'F1 tracking app with leaderboard & social capabilities',
    link: 'https://github.com/TiemcoM/F1Registration',
    thumbnail: 'f1.png',
    id: 'project4',
  },
]

export const EXPERIENCE: Experience[] = [
  {
    company: 'Jaspers Media',
    title: 'Software Developer Intern',
    start: '2024',
    end: '2025',
    link: 'https://www.jaspersmedia.com/',
    id: 'work1',
  },
  {
    company: 'Forward Football',
    title: 'Front-end & WordPress Intern',
    start: '2022',
    end: '2023',
    link: 'https://forward.football/',
    id: 'work2',
  },
  {
    company: 'Bit Academy',
    title: 'Software Developer Intern',
    start: '2021',
    end: '2021',
    link: 'https://www.bit-academy.nl/',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = []

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    link: 'mailto:pascaldewit@outlook.com',
    logo: <MailIcon />,
  },
  {
    label: 'Github',
    link: 'https://github.com/Paskie0',
    logo: <GithubIcon />,
  },
  {
    label: 'X',
    link: 'https://x.com/Paskie02',
    logo: '𝕏',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/Paskie',
    logo: <LinkedInIcon />,
  },
]
