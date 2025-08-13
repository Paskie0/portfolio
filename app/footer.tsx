'use client'
import React from 'react'
import { SOCIAL_LINKS } from './data'

function SocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
  logo: React.ReactNode
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="group relative shrink-0 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-500">
          <span>© 2025 Pascal de Wit</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xl">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} link={link.link} logo={link.logo}>
              {link.logo}
            </SocialLink>
          ))}
        </div>
      </div>
    </footer>
  )
}
