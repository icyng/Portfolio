import { createElement, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';

import content from './content';

const cx = (...classes) => classes.filter(Boolean).join(' ');

const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionSpan = motion.span;

const SECTION_WRAPPER = 'py-20 px-6';
const SECTION_TITLE =
  'font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl';
const CARD_BASE =
  'rounded-lg border border-slate-200/80 bg-white/90 backdrop-blur-md transition dark:border-slate-700 dark:bg-slate-900/70';
const CONTACT_BUTTON =
  'inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white/90 px-5 py-3 font-serif text-sm font-medium text-slate-900 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950';

const contactActions = [
  { label: 'Email', href: `mailto:${content.contact.email}`, icon: LuMail },
  {
    label: 'GitHub',
    href: content.contact.github,
    icon: FaGithub,
    external: true,
  },
];

const heroNameChars = Array.from(content.hero.name);
const heroTaglineWords = content.hero.tagline.split(' ').filter(Boolean);
const heroNameOffsets = heroNameChars.map(() => ({
  x: (Math.random() - 0.5) * 160,
  y: (Math.random() - 0.5) * 120,
  rotate: (Math.random() - 0.5) * 50,
  scale: 0.6 + Math.random() * 0.5,
}));
const heroTaglineOffsets = heroTaglineWords.map(() => ({
  x: (Math.random() - 0.5) * 140,
  y: (Math.random() - 0.5) * 80,
  rotate: (Math.random() - 0.5) * 30,
}));

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
    className={cx(
      SECTION_WRAPPER,
      accent && 'bg-slate-100/80 dark:bg-slate-900/35'
    )}
  >
    <div className={cx('mx-auto w-full', containerClassName)}>
      {title ? (
        <>
          <h2 className={cx(SECTION_TITLE, titleClassName)}>
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

const IntroDescription = ({ description }) => {
  if (Array.isArray(description)) {
    return (
      <ul className="mt-5 space-y-3 text-left font-serif text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
        {description.map(item => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 dark:bg-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-4 font-serif text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
      {description}
    </p>
  );
};

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-950 transition-colors duration-500 dark:bg-slate-900 dark:text-slate-100">
      <img
        src="/back.png"
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-25 dark:opacity-10"
        aria-hidden="true"
      />
      <div className="fixed left-4 top-4 z-50">
        <button
          type="button"
          onClick={() => setDarkMode(prev => !prev)}
          className={cx(
            'flex h-10 w-20 items-center rounded-full border p-1 shadow-lg transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
            darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'
          )}
          aria-label="Toggle dark mode"
        >
          <span
            className={cx(
              'flex h-8 w-8 transform items-center justify-center rounded-full border text-xl shadow-sm transition duration-500',
              darkMode ? 'translate-x-10 border-slate-500 bg-slate-800 text-white' : 'translate-x-0 border-slate-400 bg-slate-100 text-black'
            )}
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </span>
        </button>
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        <MotionH1
          variants={heroNameContainer}
          initial="hidden"
          animate="visible"
          className="text-5xl font-bold tracking-tight drop-shadow-sm md:text-7xl"
        >
          {heroNameChars.map((char, index) => (
            <MotionSpan
              key={`${char}-${index}`}
              variants={heroNameItem}
              custom={heroNameOffsets[index]}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </MotionSpan>
          ))}
        </MotionH1>
        <MotionP
          variants={heroTaglineContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl font-serif text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl md:leading-loose"
        >
          {heroTaglineWords.map((word, index) => (
            <MotionSpan
              key={`${word}-${index}`}
              variants={heroTaglineItem}
              custom={heroTaglineOffsets[index]}
              className="inline-block"
            >
              {word}
              {index < heroTaglineWords.length - 1 ? '\u00A0' : ''}
            </MotionSpan>
          ))}
        </MotionP>
      </section>

      <Section id="intro" accent>
        <div className={cx('flex flex-col items-center gap-8 p-8 md:flex-row md:items-start md:p-10', CARD_BASE)}>
          <img
            src={content.intro.avatar}
            alt="Avatar"
            className="h-44 w-44 rounded-full border-4 border-white object-cover dark:border-slate-800 sm:h-52 sm:w-52"
          />
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {content.intro.name}
            </h2>
            <IntroDescription description={content.intro.description} />
          </div>
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="space-y-12">
          {content.skillGroups.map(({ title, items }) => (
            <div key={title}>
              <h3 className="font-serif text-sm font-semibold text-slate-600 dark:text-slate-300">
                {title}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {items.map(({ icon, label }) => (
                  <div
                    key={label}
                    className={cx(
                      'flex min-h-32 flex-col items-center justify-center p-6 text-center hover:border-teal-200 hover:shadow-lg dark:hover:border-teal-900',
                      CARD_BASE
                    )}
                  >
                    <div className="text-5xl text-slate-700 dark:text-slate-200">
                      {icon}
                    </div>
                    <p className="mt-3 font-serif text-base font-medium tracking-tight text-slate-800 dark:text-slate-100">
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
                <div className="flex items-center gap-2 font-serif text-xs font-medium tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:gap-3 sm:text-sm">
                  <span className="h-px w-3 -ml-3 bg-slate-300/60 dark:bg-slate-700/50 sm:w-6 sm:-ml-6" />
                  <span className="tracking-wide">{period}</span>
                </div>
                <div className={cx('mt-4 p-6 hover:border-teal-200 hover:shadow-lg dark:hover:border-teal-900 sm:mt-6 sm:p-8', CARD_BASE)}>
                  <div className="space-y-2.5 text-left">
                    <h3 className="font-serif text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      {institution}
                    </h3>
                    <p className="font-serif text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
              className={cx(
                'group flex min-h-64 flex-col p-6 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg dark:hover:border-teal-900',
                CARD_BASE
              )}
            >
              {period && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {period}
                </div>
              )}
              <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-900 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-200">
                {title}
              </h3>
              <p className="mt-4 font-serif text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-slate-900 transition group-hover:gap-3 dark:text-slate-200">
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
        <p className="mx-auto mb-12 max-w-2xl font-serif text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
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
              {createElement(Icon, { className: 'text-xl' })}
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
