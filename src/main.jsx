import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const GITHUB = 'https://github.com/Aisaaif'
const LINKEDIN = 'https://www.linkedin.com/in/mohammedsaifali18'
const EMAIL = 'reachsaif18@gmail.com'
const RESUME = '/Mohammed-Saif-Ali-Resume.pdf'

const navItems = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['stack', 'Stack'],
  ['projects', 'Projects'],
  ['achievements', 'Achievements'],
  ['credentials', 'Credentials'],
  ['notes', 'Notes'],
  ['contact', 'Contact'],
]

const skills = {
  Cloud: ['AWS', 'EC2', 'S3', 'VPC', 'RDS', 'EBS', 'EFS', 'IAM', 'ELB', 'ECS', 'ASG', 'Route 53', 'Lambda', 'EventBridge', 'DynamoDB', 'Redshift', 'CloudWatch', 'CloudFront', 'CloudFormation', 'Elastic Beanstalk'],
  DevOps: ['Git', 'GitHub', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Maven', 'SonarQube', 'Nexus', 'Nginx', 'Trivy', 'OWASP', 'Tomcat'],
  Systems: ['Linux', 'Windows', 'Bash Scripting', 'Python', 'Prometheus', 'Grafana'],
  'AI / ML': ['Machine Learning', 'Deep Learning', 'YOLO', 'NLP', 'Data Visualization', 'Computer Vision'],
}

const experience = [
  {
    date: 'AUG 21 2025 — PRESENT',
    role: 'AWS & DevOps Mentor',
    company: 'Full Stack Academy · Hyderabad, India',
    current: true,
    points: [
      'Full-time mentor delivering practical AWS and DevOps training across 10 batches and 200+ students.',
      'Lead live classes, hands-on labs, AWS/DevOps projects and mock interview preparation.',
      'Break down cloud architecture, CI/CD, containers, Linux and infrastructure concepts into practical workflows.',
      'Guide learners from command-level understanding to project-level implementation and troubleshooting.',
    ],
  },
  {
    date: 'JUN 2025 — SEP 2025',
    role: 'Artificial Intelligence & Machine Learning Intern',
    company: 'InLighnX Global',
    points: [
      'Developed predictive models using real-world datasets and machine learning algorithms.',
      'Contributed to AI-driven solution development with mentors and cross-functional team members.',
      'Used Git/GitHub for version control and collaborative development.',
    ],
  },
  {
    date: 'MAY 2024 — JUN 2024',
    role: 'Data Analyst Intern',
    company: 'Unified Mentor',
    points: [
      'Analyzed a dataset of the top 500 companies in India using market capitalization and quarterly sales.',
      'Applied Python, Pandas, NumPy and Matplotlib to identify relationships and business insights.',
    ],
  },
]

const projects = [
  {
    no: '01',
    type: 'DEVOPS / CI-CD',
    title: '3-Tier Java CI/CD Pipeline',
    desc: 'A delivery pipeline for a 3-tier Java application covering source, build, static analysis, artifact management, containerization and Kubernetes deployment.',
    flow: 'Git → Build → SonarQube → Nexus → Docker → Kubernetes',
    stack: ['Jenkins', 'SonarQube', 'Nexus', 'Docker', 'Kubernetes', 'Slack'],
  },
  {
    no: '02',
    type: 'AWS / DEVOPS',
    title: 'AWS-Jenkins CI/CD for React',
    desc: 'Automated React application delivery with Jenkins, Node/npm builds, S3 artifact storage, PM2, Nginx and Docker on AWS infrastructure.',
    flow: 'Git → Jenkins → npm build → S3 → Docker / Nginx → AWS',
    stack: ['AWS', 'Jenkins', 'S3', 'Docker', 'Nginx', 'PM2'],
  },
  {
    no: '03',
    type: 'AWS / INFRASTRUCTURE',
    title: 'Scalable AWS VPC Architecture',
    desc: 'Designed a VPC foundation with subnets, NAT, security groups, Route 53, Application Load Balancer and S3, including VPC peering and lifecycle-based storage optimization.',
    flow: 'Route 53 → ALB → VPC → Public / Private Subnets → Services',
    stack: ['VPC', 'NAT', 'IGW', 'Route 53', 'ALB', 'S3', 'Glacier'],
  },
  {
    no: '04',
    type: 'AI / COMPUTER VISION',
    title: 'ATSS — Automated Traffic Surveillance System',
    desc: 'AI-driven traffic monitoring using YOLOv8 for vehicle detection and license-plate recognition, with Python, OpenCV and SQL for the supporting workflow.',
    flow: 'Camera Feed → YOLOv8 → Plate Recognition → SQL',
    stack: ['YOLOv8', 'Python', 'OpenCV', 'SQL'],
  },
  {
    no: '05',
    type: 'AI APPLICATION',
    title: 'MATHIFY — AI Math Solutions',
    desc: 'An AI-powered math platform designed to interpret problems and provide quick, step-by-step explanations for students, teachers and professionals.',
    flow: 'Question → AI Interpretation → Reasoning → Step-by-Step Answer',
    stack: ['AI', 'Machine Learning', 'NLP', 'Python'],
  },
]

const credentials = [
  ['AWS & DevOps Certificated', 'Full Stack Academy · 2025'],
  ['Cloud Computing Fundamentals', 'IBM · 2025'],
  ['Docker Essentials', 'IBM · 2025'],
  ['Cloud Essentials', 'IBM · 2025'],
  ['Building Cloud Native & Multicloud Application', 'IBM Cognitive Class · 2025'],
  ['Prompt Engineering for Everyone', 'IBM Cognitive Class · 2025'],
  ['Getting Started with Artificial Intelligence', 'IBM SkillBuild · 2024'],
  ['Artificial Intelligence Fundamentals', 'IBM SkillBuild · 2024'],
  ['100 Days of Code: Python Pro Bootcamp', 'Udemy · 2021'],
]

const sports = [
  ['02×', 'National Champion', 'Mass Wrestling & Belt Wrestling', '2023 + 2024'],
  ['GOLD', 'National Gold Medalist', 'Mass Wrestling · Belt Wrestling · Khap Sagai · Pankration', '2023 + 2024'],
  ['RU', 'University Runner-Up', 'Weightlifting · Osmania University', 'Dec 2022'],
  ['RU', 'University Runner-Up', 'Powerlifting · Osmania University', 'Jan 2023'],
  ['RU', 'University Runner-Up', 'Weightlifting · Osmania University', 'Nov 2023'],
  ['NAT', 'National Championship', 'AITWPF Traditional Wrestling & Pankration Championship', 'Feb 2023'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }
function TerminalDots() { return <div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState('Cloud')
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [scrolled, setScrolled] = useState(false)
  const revealRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const activeSkills = useMemo(() => skills[activeSkill], [activeSkill])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <button className="brand" onClick={() => go('top')} aria-label="Go to top">
          <span className="brand-mark">SA</span>
          <span>MOHAMMED SAIF ALI</span>
        </button>
        <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="primary-nav" aria-label="Toggle navigation">
          <span /> <span /> <span />
        </button>
        <nav id="primary-nav" className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}
          <a className="nav-resume" href={RESUME} target="_blank" rel="noreferrer">Resume <Arrow /></a>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero section-pad">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="pulse-dot" /> AVAILABLE FOR CLOUD / DEVOPS OPPORTUNITIES</div>
              <div className="command"><span>$</span> whoami</div>
              <h1>AI/ML graduate.<br /><em>AWS &amp; DevOps.</em><br />Mentor.</h1>
              <p className="hero-lede">The AWS/DevOps guy who can actually explain complex cloud concepts.</p>
              <p className="hero-body">I build practical cloud and DevOps solutions, then turn the architecture behind them into hands-on learning that engineers can actually use.</p>
              <div className="hero-actions">
                <button className="btn primary" onClick={() => go('projects')}>Explore my work <Arrow /></button>
                <button className="btn ghost" onClick={() => go('contact')}>Let’s connect</button>
              </div>
              <div className="quick-stats" aria-label="Key profile statistics">
                <div><strong>8.54</strong><span>CGPA / 10</span></div>
                <div><strong>3rd</strong><span>Class rank</span></div>
                <div><strong>10</strong><span>Batches</span></div>
                <div><strong>200+</strong><span>Students</span></div>
              </div>
            </div>

            <div className="hero-visual reveal reveal-delay">
              <div className="grid-glow" aria-hidden="true" />
              <div className="orbit orbit-one" aria-hidden="true" />
              <div className="orbit orbit-two" aria-hidden="true" />
              <div className="photo-frame">
                <div className="photo-corner c1" /><div className="photo-corner c2" />
                <img src="/saif-photo.jpg" alt="Mohammed Saif Ali wearing a formal suit" width="394" height="1467" fetchPriority="high" />
                <div className="photo-tag">AWS · DEVOPS · AI/ML</div>
              </div>
              <div className="terminal-card">
                <div className="terminal-top"><TerminalDots /><span>saif@cloud:~</span><b>bash</b></div>
                <div className="terminal-body">
                  <div><span className="dim">$</span> aws <span className="green">sts get-caller-identity</span></div>
                  <div className="dim">{`{ "focus": "AWS + DevOps",`}</div>
                  <div className="dim">{`  "mindset": "learn → build → explain" }`}</div>
                  <div><span className="dim">$</span> kubectl get <span className="green">skills</span></div>
                  <div className="success">● cloud &nbsp; ● ci/cd &nbsp; ● containers</div>
                  <div className="cursor-line"><span className="dim">$</span> <span className="cursor" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
        </section>

        <section id="about" className="section section-pad">
          <div className="section-kicker">01 / ABOUT</div>
          <div className="two-col about-grid reveal">
            <div><h2>Engineer by education.<br /><span>Mentor by practice.</span></h2></div>
            <div className="prose">
              <p>I’m <strong>Mohammed Saif Ali</strong>, an Artificial Intelligence &amp; Machine Learning graduate with a B.E. in AI &amp; ML, an 8.54/10 CGPA and a 3rd-place class rank.</p>
              <p>My technical foundation spans machine learning, deep learning, computer vision, NLP and data analytics, with practical depth across AWS, Linux, Docker, Kubernetes, Jenkins, Terraform and Ansible.</p>
              <p>Today, I work full-time as an <strong>AWS &amp; DevOps Mentor at Full Stack Academy</strong>, helping learners move from “I know the command” to “I understand the system.”</p>
            </div>
          </div>
          <div className="principles reveal">
            <article><span>01</span><h3>Explain, don’t complicate.</h3><p>Technical depth is more useful when people can understand and apply it.</p></article>
            <article><span>02</span><h3>Build to learn.</h3><p>Cloud skills become real when architecture, automation and troubleshooting meet.</p></article>
            <article><span>03</span><h3>Keep improving.</h3><p>AI, cloud and DevOps evolve fast. I treat learning as part of the job.</p></article>
          </div>
        </section>

        <section id="experience" className="section section-dark section-pad">
          <div className="section-kicker">02 / EXPERIENCE</div>
          <div className="section-head reveal"><h2>Where I’ve <span>been.</span></h2><p>From AI/ML and analytics internships to full-time AWS &amp; DevOps mentoring.</p></div>
          <div className="timeline">
            {experience.map((item, i) => (
              <article className="timeline-item reveal" key={item.role}>
                <div className="timeline-marker">{String(i + 1).padStart(2, '0')}</div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-content">
                  <div className="role-line"><h3>{item.role}</h3>{item.current && <span className="live">CURRENT</span>}</div>
                  <p className="company">{item.company}</p>
                  <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section section-pad">
          <div className="section-kicker">03 / STACK</div>
          <div className="section-head reveal"><h2>My technical <span>toolbox.</span></h2><p>Tools I use, teach and build with across cloud, DevOps, systems and AI/ML.</p></div>
          <div className="stack-tabs" role="tablist" aria-label="Technical skill categories">
            {Object.keys(skills).map(key => <button key={key} role="tab" aria-selected={activeSkill === key} className={activeSkill === key ? 'active' : ''} onClick={() => setActiveSkill(key)}>{key}</button>)}
          </div>
          <div className="skill-cloud reveal" key={activeSkill}>
            {activeSkills.map((skill, i) => <div className="skill-chip" key={skill}><span>{String(i + 1).padStart(2, '0')}</span>{skill}</div>)}
          </div>
          <div className="stack-marquee" aria-hidden="true"><span>AWS · LINUX · DOCKER · KUBERNETES · JENKINS · TERRAFORM · ANSIBLE · PYTHON · GIT · CLOUD · </span><span>AWS · LINUX · DOCKER · KUBERNETES · JENKINS · TERRAFORM · ANSIBLE · PYTHON · GIT · CLOUD · </span></div>
        </section>

        <section id="projects" className="section section-dark section-pad">
          <div className="section-kicker">04 / PROJECTS</div>
          <div className="section-head reveal"><h2>Things I’ve <span>built.</span></h2><p>Hands-on work connecting application delivery, infrastructure, automation and AI.</p></div>
          <div className="project-list">
            {projects.map(project => (
              <article className="project-card reveal" key={project.no}>
                <div className="project-num">{project.no}</div>
                <div className="project-main">
                  <div className="project-label">{project.type}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-flow"><span>FLOW</span>{project.flow}</div>
                  <div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="project-arrow" aria-hidden="true"><Arrow /></div>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section section-pad">
          <div className="section-kicker">05 / RECOGNITION</div>
          <div className="two-col achievement-top reveal">
            <div><h2>Discipline that<br /><span>transfers.</span></h2></div>
            <div className="prose"><p>Technology is one part of my story. Competitive sport taught me consistency, resilience, preparation and how to perform when the pressure is real.</p><p>I’m a <strong>two-time national champion</strong> in Mass Wrestling and Belt Wrestling, with 8 national-level medals and inter-university achievements across wrestling, weightlifting and powerlifting.</p></div>
          </div>
          <div className="sports-grid">
            {sports.map(([badge, title, detail, date]) => <article className="sport-card reveal" key={title + detail}><span className="sport-year">{date}</span><div className="sport-icon">{badge}</div><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className="athlete-banner reveal"><span>ATHLETE → ENGINEER</span><strong>Discipline. Adaptability. Leadership. Continuous growth.</strong></div>
        </section>

        <section id="credentials" className="section section-dark section-pad">
          <div className="section-kicker">06 / CREDENTIALS</div>
          <div className="section-head reveal"><h2>Courses &amp; <span>certifications.</span></h2><p>Cloud, AI and developer foundations from Full Stack Academy, IBM, Cognitive Class, SkillBuild and Udemy.</p></div>
          <div className="cert-grid">
            {credentials.map(([name, issuer], i) => <article className="cert-card reveal" key={name}><span>{String(i + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{issuer}</p></article>)}
          </div>
        </section>

        <section id="notes" className="section section-pad">
          <div className="section-kicker">07 / NOTES</div>
          <div className="section-head reveal"><h2>What I’m <span>learning.</span></h2><p>A technical-notes space for the concepts I teach, break down and revisit.</p></div>
          <div className="notes-grid">
            {[
              ['AWS', 'Understanding public vs private subnets, NAT and internet routing without the confusion.'],
              ['DEVOPS', 'CI/CD from source code to production: build, test, scan, artifact, container and deploy.'],
              ['LINUX', 'The commands, permissions, processes and networking concepts every DevOps engineer should know.'],
            ].map(([tag, title], i) => <article className="note-card reveal" key={tag}><span>NOTE 0{i + 1} · {tag}</span><h3>{title}</h3><div>COMING SOON <b>→</b></div></article>)}
          </div>
        </section>

        <section id="contact" className="contact section-dark section-pad">
          <div className="section-kicker">08 / CONTACT</div>
          <div className="contact-grid reveal">
            <div><div className="contact-terminal">$ echo <span>"let’s build something reliable"</span></div><h2>Let’s build something<br /><span>reliable.</span></h2><p>Looking for a cloud/DevOps engineer, technical mentor, or someone who can translate complex infrastructure into simple language? Let’s connect.</p></div>
            <div className="contact-card">
              <button className="contact-row email-copy" onClick={copyEmail}><span>EMAIL</span><strong>{EMAIL}</strong><small>{copied ? 'Copied to clipboard ✓' : 'Click to copy'}</small></button>
              <a className="contact-row" href={LINKEDIN} target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>linkedin.com/in/mohammedsaifali18</strong><small>Open profile <Arrow /></small></a>
              <a className="contact-row" href={GITHUB} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>github.com/Aisaaif</strong><small>View repositories <Arrow /></small></a>
              <a className="contact-row resume-row" href={RESUME} target="_blank" rel="noreferrer"><span>RESUME</span><strong>Download my CV</strong><small>PDF <Arrow /></small></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-pad">
        <div>© {new Date().getFullYear()} Mohammed Saif Ali</div>
        <div>Built with React · AWS mindset · DevOps discipline</div>
        <button onClick={() => go('top')}>Back to top ↑</button>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
