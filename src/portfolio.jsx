import { createElement } from 'react';
import useTheme from './hooks/useTheme';
import { FiArrowUpRight, FiMoon, FiSun } from 'react-icons/fi';
import { FaCuttlefish, FaDocker, FaGithub, FaPython, FaReact } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import { SiGo, SiNumpy, SiPytorch, SiRuby, SiTensorflow } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import content from './data/portfolio';
import Life from './life';

const SKILL_ICONS = {
  c: FaCuttlefish, docker: FaDocker, github: FaGithub, go: SiGo,
  numpy: SiNumpy, python: FaPython, pytorch: SiPytorch,
  react: FaReact, ruby: SiRuby, sql: TbSql, tensorflow: SiTensorflow,
};
const SKILL_COLORS = {
  c: '#536eb3', python: '#3776ab', ruby: '#b83c48', react: '#2586a4',
  github: '#606977', docker: '#2578bd', numpy: '#4b71a7', pytorch: '#cc573f',
  tensorflow: '#bb701d', go: '#258b9d', sql: '#8672b1',
};
const ACTION_ICONS = { github: FaGithub, mail: LuMail };
const SkillIcons = () => (
  <ul id="skills" className="skill-icons" aria-label="Skills">
    {content.skillGroups.flatMap(({ id, items }) => items.map(({ id: skillId, icon, label }) => (
      <li key={skillId} className="skill-icon" style={{ '--skill-color': SKILL_COLORS[icon] }} tabIndex={0} aria-label={`${label}${id === 'learning' ? '（学習中）' : ''}`}>
        {createElement(SKILL_ICONS[icon], { 'aria-hidden': true })}
        <span className="skill-tooltip" aria-hidden="true">{label}{id === 'learning' ? ' · Learning' : ''}</span>
      </li>
    )))}
  </ul>
);

const ContactLinks = () => (
  <div className="contact-links" aria-label="Contact">
    {content.contact.actions.map(({ id, label, href, icon, external }) => (
      <a key={id} href={href} aria-label={label} title={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {createElement(ACTION_ICONS[icon], { 'aria-hidden': true })}
      </a>
    ))}
  </div>
);

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-profile">
        <div className="hero-identity">
          <div className="hero-name">
            <img className="hero-avatar" src={content.intro.avatar} alt={`${content.intro.name}のアバター`} width="88" height="104" />
            <h1 id="hero-title">{content.site.name}</h1>
          </div>
        </div>
        <div id="intro" className="hero-about" aria-label="About">
          <dl className="about-details">
            {content.intro.highlights.map(item => {
              const [label, ...rest] = item.split('：');
              const description = rest.join('：');
              const [institution, ...lab] = description.split(' ');
              return <div key={item}>
                <dt>{label}</dt>
                <dd>
                  {label === '所属' ? <><span>{institution.replace('大学', '大学 ')}</span><span className="about-secondary">{lab.join(' ')}</span></> : <p>{description}</p>}
                </dd>
              </div>;
            })}
          </dl>
          <SkillIcons />
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">本文へスキップ</a>

      <main id="main" className="page-width">
        <Hero />

        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <div className="section-heading"><h2 id="projects-title" className="section-title">Projects</h2></div>
          <div className="project-grid">
            {content.projects.map(project => {
              const Tag = project.href ? 'a' : 'article';
              return <Tag key={project.id} className="project-card"
                {...(project.href ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <p className="project-period">{project.period}</p>
                <div className="project-body">
                  <h3>{project.title}{project.href && <FiArrowUpRight aria-hidden="true" />}</h3>
                  <p>{project.description}</p>
                  {project.status === 'coming-soon' && <span className="project-status">Coming soon</span>}
                </div>
              </Tag>;
            })}
          </div>
        </section>

        <section id="career" className="content-section" aria-labelledby="career-title">
          <div className="section-heading"><h2 id="career-title" className="section-title">Career</h2></div>
          <ol className="career-list">
            {content.career.map(({ id, period, institution, degree }) => (
              <li key={id} className="career-item"><p className="career-period">{period}</p>
                <div><h3>{institution}</h3><p className="career-degree">{degree}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <Life />
      </main>
      <footer className="site-footer page-width">
        <span>© {new Date().getFullYear()} {content.site.name}</span>
        <div className="footer-actions">
          <ContactLinks />
          <button className="theme-toggle" type="button" onClick={toggleTheme}
            aria-label={darkMode ? 'ライトモードに切り替える' : 'ダークモードに切り替える'} aria-pressed={darkMode}>
            {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
