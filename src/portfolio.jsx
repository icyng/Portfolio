import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MdNightsStay } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { SiWantedly } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import classNames from 'classnames';

import content from './content';

const SECTION_WRAPPER = 'py-20 px-6';
const SECTION_TITLE =
  'text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-mincho';
const CARD_BASE =
  'rounded-2xl bg-white/85 ring-1 ring-slate-900/10 backdrop-blur-md transition-colors dark:bg-slate-900/60 dark:ring-white/10';
const CONTACT_BUTTON =
  'flex items-center gap-3 rounded-full bg-white/85 px-5 py-3 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 font-mincho dark:bg-slate-900/55 dark:text-slate-100 dark:hover:bg-slate-900/70 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950';
const heroNameContainer = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.05, staggerChildren: 0.04 },
  },
};

const heroNameItem = {
  hidden: ({ x, y, rotate, scale }) => ({
    opacity: 0,
    x,
    y,
    rotate,
    scale,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const heroTaglineContainer = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.3, staggerChildren: 0.07 },
  },
};

const heroTaglineItem = {
  hidden: ({ x, y, rotate }) => ({
    opacity: 0,
    x,
    y,
    rotate,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Section = ({
  id,
  title,
  accent = false,
  containerClassName = 'max-w-4xl',
  titleClassName = 'text-center',
  children,
}) => (
  <section
    id={id}
    className={classNames(
      SECTION_WRAPPER,
      accent && 'bg-slate-100/80 dark:bg-slate-900/35'
    )}
  >
    <div className={classNames('mx-auto w-full', containerClassName)}>
      {title ? (
        <>
          <h2 className={classNames(SECTION_TITLE, titleClassName)}>
            {title}
          </h2>
          <div className="mt-12">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  </section>
);

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  const skillGroups = [
    { title: 'Owned', items: content.ownedSkills },
    { title: 'Learning', items: content.learningSkills },
  ];

  const contactActions = [
    { label: 'Email', href: `mailto:${content.contact.email}`, icon: LuMail },
    {
      label: 'Wantedly',
      href: content.contact.wantedly,
      icon: SiWantedly,
      external: true,
    },
    {
      label: 'GitHub',
      href: content.contact.github,
      icon: FaGithub,
      external: true,
    },
  ];

  const heroNameChars = Array.from(content.hero.name);
  const heroTaglineWords = content.hero.tagline.split(' ').filter(Boolean);
  const heroNameOffsets = useMemo(
    () =>
      heroNameChars.map(() => ({
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 120,
        rotate: (Math.random() - 0.5) * 50,
        scale: 0.6 + Math.random() * 0.5,
      })),
    [content.hero.name]
  );
  const heroTaglineOffsets = useMemo(
    () =>
      heroTaglineWords.map(() => ({
        x: (Math.random() - 0.5) * 140,
        y: (Math.random() - 0.5) * 80,
        rotate: (Math.random() - 0.5) * 30,
      })),
    [content.hero.tagline]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-950 transition-colors duration-500 dark:from-black dark:via-gray-950 dark:to-gray-900 dark:text-slate-100 wf-mplus1p">
      <div className="fixed left-4 top-4 z-50">
        <button
          type="button"
          onClick={() => setDarkMode(prev => !prev)}
          className={classNames(
            'flex h-10 w-20 items-center rounded-full p-1 shadow-lg transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
            darkMode ? 'bg-slate-200' : 'bg-slate-800'
          )}
          aria-label="Toggle dark mode"
        >
          <span
            className={classNames(
              'flex h-8 w-8 transform items-center justify-center rounded-full bg-white text-2xl transition duration-500 dark:bg-black',
              darkMode ? 'translate-x-10 text-slate-100' : 'translate-x-0 text-yellow-400'
            )}
          >
            {darkMode ? <MdNightsStay /> : <IoSunny />}
          </span>
        </button>
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-slate-200/70 to-transparent blur-3xl dark:from-slate-700/30"
          aria-hidden="true"
        />
        <motion.h1
          variants={heroNameContainer}
          initial="hidden"
          animate="visible"
          className="font-orbitron text-5xl font-bold drop-shadow-sm md:text-6xl"
        >
          {heroNameChars.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={heroNameItem}
              custom={heroNameOffsets[index]}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          variants={heroTaglineContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-lg leading-relaxed text-slate-600 font-mincho dark:text-slate-300 md:text-xl md:leading-loose"
        >
          {heroTaglineWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={heroTaglineItem}
              custom={heroTaglineOffsets[index]}
              className="inline-block"
            >
              {word}
              {index < heroTaglineWords.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </motion.p>
      </section>

      <Section id="intro" accent>
        <div className={classNames('flex flex-col items-center gap-8 p-10 shadow-xl md:flex-row md:items-start', CARD_BASE)}>
          <img
            src={content.intro.avatar}
            alt="Avatar"
            className="h-48 w-48 rounded-full ring-4 ring-white/80 shadow-xl dark:ring-slate-800/80 sm:h-56 sm:w-56"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 font-mincho dark:text-white">
              {content.intro.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 font-mincho dark:text-slate-300 md:text-lg">
              {content.intro.description}
            </p>
          </div>
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="space-y-12">
          {skillGroups.map(({ title, items }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-600 font-mincho dark:text-slate-300">
                {title}
              </h3>
              <div className="mt-6 grid gap-6 md:grid-cols-4">
                {items.map(({ icon, label }) => (
                  <div
                    key={label}
                    className={classNames(
                      'flex flex-col items-center p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl',
                      CARD_BASE
                    )}
                  >
                    <div className="text-5xl text-slate-700 dark:text-slate-200">
                      {icon}
                    </div>
                    <p className="mt-3 text-base font-medium tracking-tight text-slate-800 font-mincho dark:text-slate-100">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="career"
        title="Career"
        accent
        containerClassName="max-w-5xl"
        titleClassName="text-left sm:text-center"
      >
        <div className="relative pl-4 sm:pl-7">
          <span className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-300/70 dark:bg-slate-700/60 sm:left-2" />
          <ul className="flex flex-col gap-10 sm:gap-12">
            {content.career.map(({ period, institution, degree }) => (
              <li key={institution} className="pl-3 sm:pl-6">
                <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-slate-500 font-mincho dark:text-slate-400 sm:gap-3 sm:text-sm">
                  <span className="h-px w-3 -ml-3 bg-slate-300/60 dark:bg-slate-700/50 sm:w-6 sm:-ml-6" />
                  <span className="tracking-wide font-mincho">{period}</span>
                </div>
                <div className={classNames('mt-4 p-6 shadow-xl sm:mt-6 sm:p-8', CARD_BASE)}>
                  <div className="space-y-2.5 text-left">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900 font-mincho dark:text-white">
                      {institution}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 font-mincho dark:text-slate-400">
                      {degree}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid gap-6 md:grid-cols-2">
          {content.projects.map(({ period, title, description, link }) => (
            <a
              key={title}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames(
                'group block p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl',
                CARD_BASE
              )}
            >
              {period && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {period}
                </div>
              )}
              <h3 className="mt-3 text-2xl font-semibold text-slate-900 transition group-hover:text-slate-600 dark:text-white">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 font-mincho dark:text-slate-300 sm:text-base">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition group-hover:gap-3 dark:text-slate-200">
                View Details →
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        title="Get In Touch"
        accent
        containerClassName="max-w-3xl text-center"
      >
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-slate-600 font-mincho dark:text-slate-300 md:text-lg">
          {content.contact.prompt}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {contactActions.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              className={CONTACT_BUTTON}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon className="text-xl" />
              {label}
            </a>
          ))}
        </div>
      </Section>

      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {content.hero.name}. All rights reserved.
      </footer>
    </div>
  );
}
