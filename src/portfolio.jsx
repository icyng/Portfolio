import { useState, useEffect } from 'react';
import { MdNightsStay } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { SiWantedly } from "react-icons/si";
import { FaGithub } from 'react-icons/fa';
import { LuMail } from "react-icons/lu";
import classNames from 'classnames';

import content from './content';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 wf-mplus1p">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 left-4 p-2 z-50">
        <div
          onClick={() => setDarkMode(prev => !prev)}
          className={classNames(
            'flex w-20 h-10 rounded-full p-1 cursor-pointer',
            { 'bg-gray-700': !darkMode, 'bg-gray-300': darkMode }
          )}
        >
          <span
            className={classNames(
              'flex h-8 w-8 bg-white dark:bg-black rounded-full transition-all duration-500 text-2xl items-center justify-center',
              { 'ml-10': darkMode, 'ml-0': !darkMode }
            )}
          >{darkMode ? <MdNightsStay /> : <IoSunny />}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center h-screen px-6 text-center"
      >
        <h1 className="text-6xl font-bold mb-8 font-orbitron">
          {content.hero.name}
        </h1>
        <p className="text-xl max-w-xl">
          {content.hero.tagline}
        </p>
      </section>

      {/* Intro Card */}
      <section
        id="intro"
        className="py-20 px-6 bg-gray-100 dark:bg-gray-800 mb-20"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={content.intro.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-8"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-2">{content.intro.name}</h2>
            <p className="text-lg leading-relaxed">{content.intro.description}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center border-b dark:border-gray-600 border-gray-300 pb-4">
            Skills
          </h2>
          <div className="mb-12">
            <h3 className="text-2xl font-medium mb-6">Owned</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.ownedSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-7xl mb-2">{skill.icon}</div>
                  <p className="text-lg font-medium">{skill.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-6">Learning</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.learningSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                >
                  <div className="text-7xl mb-2">{skill.icon}</div>
                  <p className="text-lg font-medium">{skill.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        id="career"
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto relative py-20 px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center border-b dark:border-gray-600 border-gray-300 pb-4">
            Education
          </h2>
          <div
            className="absolute left-15 w-1 bg-gray-500"
            style={{
              top: '10rem',
              bottom: '5rem'
            }}
          ></div>
          <ul className="space-y-10 pl-8">
            {content.career.map((item, idx) => (
              <li
                key={idx}
                className="relative flex items-start"
              >
                <div
                  className="absolute h-5 w-5 rounded-full bg-gray-700 border-2 border-gray-300"
                  style={{
                    top: '1.25rem',
                    left: '0.4rem',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                <div className="bg-gray-800/20 dark:bg-gray-200/20 backdrop-blur-sm p-4 rounded-lg w-full mx-10">
                  <div className="inline-block px-3 py-1 bg-gray-700 text-white dark:bg-gray-300 dark:text-black rounded-full text-sm mb-2">
                    {item.period}
                  </div>
                  <h3 className="text-x mb-1 text-lg font-semibold">
                    {item.institution}
                  </h3>
                  <p className="italic text-x text-gray-600 dark:text-gray-400">{item.degree}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center border-b dark:border-gray-600 border-gray-300 pb-4">
            Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {content.projects.map((proj, idx) => (
              <div
                key={idx}
                whileHover={{ translateY: -5 }}
                className="p-6 border dark:border-gray-600 border-gray-300 rounded-lg"
              >
                {proj.period && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {proj.period}
                  </div>
                )}
                <h3 className="text-2xl font-medium mb-2">{proj.title}</h3>
                <p className="leading-relaxed mb-4">{proj.description}</p>
                <a href={proj.link} className="underline">
                  View Details →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 border-b dark:border-gray-600 border-gray-300 pb-4">
            Get In Touch
          </h2>
          <p className="mb-8">{content.contact.prompt}</p>
          <div className="flex justify-center flex-wrap gap-6">
            {/* Email */}
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center px-5 py-3 bg-black/20 dark:bg-white/20 text-black dark:text-white border border-black/40 dark:border-white/40 backdrop-blur-sm rounded-full hover:bg-black/30 dark:hover:bg-white/30 transition duration-300"
            >
              <LuMail className="mr-2 text-xl" />
              Email
            </a>
            {/* Wantedly */}
            <a
              href={content.contact.wantedly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-3 bg-black/20 dark:bg-white/20 text-black dark:text-white border border-black/40 dark:border-white/40 backdrop-blur-sm rounded-full hover:bg-black/30 dark:hover:bg-white/30 transition duration-300"
            >
              <SiWantedly className="mr-2 text-xl" />
              Wantedly
            </a>
            {/* GitHub */}
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-3 bg-black/20 dark:bg-white/20 text-black dark:text-white border border-black/40 dark:border-white/40 backdrop-blur-sm rounded-full hover:bg-black/30 dark:hover:bg-white/30 transition duration-300"
            >
              <FaGithub className="mr-2 text-xl" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {content.hero.name}. All rights reserved.
      </footer>
    </div>
  );
}
