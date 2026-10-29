import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import heroPoster from '../assets/hero-showreel.jpg';
import heroVideo from '../assets/hero-showreel.mp4';
import './styles.css';

const previewFiles = import.meta.glob('../assets/work-previews/*.mp4', {
  eager: true,
  import: 'default',
  query: '?url',
});
const posterFiles = import.meta.glob('../assets/work-posters/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
});

const clips = [
  { slug: '0507-1', filename: '0507(1).mp4', portrait: false },
  { slug: '0627', filename: '0627.mp4', portrait: false },
  { slug: '09-030-26-1', filename: '09-030-26(1).mp4', portrait: true },
  { slug: '6', filename: '6.mp4', portrait: true },
  { slug: 'alignment-2', filename: 'ALIGNMENT 2.mp4', portrait: true },
  { slug: 'ccsa-vsl', filename: 'CCSA VSL.mp4', portrait: false },
  {
    slug: 'clipdown-long',
    filename: 'ClipDown.com_AQOhrwweFjrG-f1UQbCJM3mVzZAt36KdHAM2f9DiezJnEoc3eJnu3_nCrc2HE9w9DOJOkUqrG2Ek3r1pQomHyL43A36JtNE9ZDbwZIM.mp4',
    portrait: false,
  },
  {
    slug: 'clipdown-reel',
    filename: 'ClipDown.com_AQO_zGopyRSqPachOz3g9V6WgZHH1igFUMQ5L1UtsrjiqeUPG9rlvr9eLnxlvaT1i9dmljw2htKbuLFnwOxugfXJ9rKiKGp7h9LtV0Q.mp4',
    portrait: true,
  },
  { slug: 'compound-effects-2', filename: 'compound effects 2.mp4', portrait: true },
  { slug: 'compounding-effect-final', filename: 'compounding effect final .mp4', portrait: false },
  { slug: 'drift-ep-3', filename: 'Drift Ep 3.mp4', portrait: true },
  { slug: 'final-short-1', filename: 'final short 1.mp4', portrait: true },
  { slug: 'intro', filename: 'intro.mp4', portrait: false },
  { slug: 'learn-by-falling', filename: 'LEARN BY FALLING.mp4', portrait: true },
  { slug: 'nty-highlights', filename: 'NTY highlights.mp4', portrait: true },
  { slug: 'parents-2', filename: 'Parents!!(2).mp4', portrait: true },
  { slug: 'test-1', filename: 'Test_1.mp4', portrait: true },
  { slug: 'the-survival-trap-3', filename: 'The survival trap 3.mp4', portrait: true },
  { slug: 'there-will-always-be-problems', filename: 'There will always be problems.mp4', portrait: true },
  { slug: 'youtube-1-2', filename: 'YouTube 1 - 2.mp4', portrait: false },
  { slug: 'youtube-1-4', filename: 'YouTube 1 - 4.mp4', portrait: false },
  { slug: 'youtube-1-5', filename: 'YouTube 1 - 5.mp4', portrait: false },
];

function mediaUrl(files, kind, slug) {
  const file = files[`../assets/work-${kind}/${slug}.${kind === 'posters' ? 'jpg' : 'mp4'}`];
  if (!file) throw new Error(`Missing ${kind} asset for ${slug}`);
  return file;
}

function getClient(filename, portrait) {
  if (filename.startsWith('ClipDown')) return { id: 'footfoot', label: 'FOOTFOOT · LUXURY' };
  if (filename.startsWith('YouTube') || filename === 'CCSA VSL.mp4') return { id: 'hausinorder', label: 'HAUSINORDER' };
  if (portrait) return { id: 'shorts', label: 'SHORT-FORM · PROJECT' };
  return { id: 'uptouch', label: 'UPTOUCH STUDIOS' };
}

const categoryOrder = ['footfoot', 'hausinorder', 'uptouch', 'shorts'];
const categoryLabels = {
  footfoot: 'Footfoot · Luxury',
  hausinorder: 'HAUSINORDER',
  uptouch: 'Uptouch Studios',
  shorts: 'Short-form',
};

const projects = clips.map((clip) => {
  const client = getClient(clip.filename, clip.portrait);
  return {
    ...clip,
    category: clip.portrait ? 'shorts' : client.id,
    client,
    preview: mediaUrl(previewFiles, 'previews', clip.slug),
    poster: mediaUrl(posterFiles, 'posters', clip.slug),
  };
}).sort((first, second) => {
  const categoryDifference = categoryOrder.indexOf(first.category) - categoryOrder.indexOf(second.category);
  return categoryDifference || first.filename.localeCompare(second.filename, undefined, { sensitivity: 'base' });
}).map((project, index) => ({ ...project, index: index + 1 }));

const filters = [
  { id: 'all', label: 'All 22 videos' },
  { id: 'shorts', label: 'Short-form' },
  { id: 'footfoot', label: 'Footfoot luxury' },
  { id: 'hausinorder', label: 'HAUSINORDER' },
  { id: 'uptouch', label: 'Uptouch Studios' },
];

const publishedCollections = [
  {
    title: 'Full YouTube videos',
    client: 'HAUSINORDER',
    links: [
      { label: 'Video 01', url: 'https://www.youtube.com/watch?v=rPyK2GM0wpc' },
      { label: 'Video 02', url: 'https://www.youtube.com/watch?v=as3rgIL68Vk' },
    ],
  },
  {
    title: 'Footwear reels',
    client: 'FOOTFOOT',
    links: [
      { label: 'Reel 01', url: 'https://www.instagram.com/footfoot_household/reel/DZF0zV4IGXl/' },
      { label: 'Reel 02', url: 'https://www.instagram.com/footfoot_household/reel/DRSZE2RiNny/' },
    ],
  },
  {
    title: 'Long-form to shorts',
    client: 'PUBLISHED CUTDOWNS',
    links: [
      { label: 'Short 01', url: 'https://www.youtube.com/shorts/0EHwF_TaA_I' },
      { label: 'Short 02', url: 'https://www.youtube.com/shorts/bOeXt3hrSgs' },
      { label: 'Short 03', url: 'https://www.youtube.com/shorts/Zfy4stQZp3I' },
      { label: 'Short 04', url: 'https://www.youtube.com/shorts/-nYfzDEW2ak' },
    ],
  },
  {
    title: 'Brand shorts',
    client: 'UPTOUCH MEDIA LAB',
    links: [
      { label: 'Short 01', url: 'https://www.youtube.com/shorts/18_YLyZQLwo' },
      { label: 'Short 02', url: 'https://www.youtube.com/shorts/qrqfJDUpats' },
      { label: 'Short 03', url: 'https://www.youtube.com/shorts/tBOSmDrMbj4' },
      { label: 'Short 04', url: 'https://www.youtube.com/shorts/sUz_Wz9nMjw' },
    ],
  },
  {
    title: 'Live teaching sessions',
    client: 'DESTINY AJAKAIYE TALKS',
    links: [
      { label: 'Session 01', url: 'https://www.youtube.com/watch?v=GSv3F_SzF8o' },
      { label: 'Session 02', url: 'https://www.youtube.com/watch?v=h7T-xfG9FPk' },
      { label: 'Session 03', url: 'https://www.youtube.com/watch?v=qXqnXo5v1zU' },
    ],
  },
  {
    title: 'Creator reels',
    client: 'DESTINY AJAX',
    links: [
      { label: 'Reel 01', url: 'https://www.instagram.com/reel/Da22AStNOI6/' },
      { label: 'Reel 02', url: 'https://www.instagram.com/destinyajax/reel/DadFr7DIvJx/' },
      { label: 'Reel 03', url: 'https://www.instagram.com/destinyajax/reel/DZe7A5JoqHY/' },
      { label: 'Reel 04', url: 'https://www.instagram.com/destinyajax/reel/DXZJJMbCFXj/' },
    ],
  },
];

function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-index"><span>{number}</span><span>{eyebrow}</span><span>FD / 26</span></div>
      <div className="section-heading-main">
        <h2>{title}</h2>
        {children && <div className="section-heading-note">{children}</div>}
      </div>
    </div>
  );
}

function ProjectCard({ project, onPlay }) {
  const videoRef = useRef(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true));
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <article
      className={`project-card${project.portrait ? ' project-card-portrait' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${(project.index % 4) * 75}ms` }}
    >
      <div className="project-preview" style={{ '--preview-poster': `url("${project.poster}")` }}>
        <video ref={videoRef} className="project-video" src={project.preview} poster={project.poster} muted loop playsInline preload="none" aria-label={`Project ${String(project.index).padStart(2, '0')} silent preview`} />
        <div className="project-preview-shade" aria-hidden="true" />
        <div className="project-preview-top"><span>{project.client.label}</span><span>{String(project.index).padStart(2, '0')}</span></div>
        <div className="project-preview-bottom">
          <button type="button" onClick={() => onPlay(project)} aria-label={`Play project ${String(project.index).padStart(2, '0')} with sound`}>↗</button>
        </div>
        {autoplayBlocked && <button className="preview-fallback" type="button" onClick={() => onPlay(project)}>PLAY VIDEO ↗</button>}
      </div>
    </article>
  );
}

function PreviewDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    videoRef.current?.play()
      .then(() => setPlaybackBlocked(false))
      .catch(() => setPlaybackBlocked(true));
    return () => {
      videoRef.current?.pause();
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog className="preview-dialog" ref={dialogRef} onClose={onClose} onClick={(event) => {
      if (event.target === dialogRef.current) dialogRef.current.close();
    }}>
      <div className="dialog-topline"><span>{project.client.label} / PROJECT {String(project.index).padStart(2, '0')}</span><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close video">CLOSE ×</button></div>
      <video ref={videoRef} src={project.preview} poster={project.poster} controls playsInline preload="auto" />
      <p role="status">{playbackBlocked ? 'Playback did not start automatically — press play in the controls.' : 'Preview excerpt · the full published cut is linked below when available.'}</p>
    </dialog>
  );
}

function App() {
  const heroVideoRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const visibleProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'shorts') return project.portrait;
    return project.client.id === activeFilter;
  });
  const projectGroups = activeFilter === 'all'
    ? categoryOrder.map((id) => ({
      id,
      label: categoryLabels[id],
      projects: visibleProjects.filter((project) => project.category === id),
    })).filter((group) => group.projects.length > 0)
    : [{
      id: activeFilter,
      label: activeFilter === 'shorts' ? categoryLabels.shorts : categoryLabels[activeFilter],
      projects: visibleProjects,
    }];

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        video.play().catch((error) => {
          if (error.name !== 'NotAllowedError') {
            console.error('Hero showreel playback failed:', error);
          }
        });
      }
    };

    syncPlayback();
    motionPreference.addEventListener('change', syncPlayback);
    return () => motionPreference.removeEventListener('change', syncPlayback);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    targets.forEach((element) => {
      element.classList.remove('is-visible');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('feyikemi136@gmail.com');
      setCopyStatus('Email copied');
    } catch (error) {
      setCopyStatus('Copy unavailable — use the email link.');
    }
    window.setTimeout(() => setCopyStatus(''), 2400);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="David Fen, home"><span>DAVID</span><span>FEN</span></a>
        <div className="availability"><i aria-hidden="true" /><span>AVAILABLE FOR SELECT PROJECTS</span></div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span><i aria-hidden="true">{menuOpen ? '×' : '+'}</i>
        </button>
        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>WORK <span>01</span></a>
          <a href="#about" onClick={closeMenu}>ABOUT <span>02</span></a>
          <a href="#services" onClick={closeMenu}>SERVICES <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>CONTACT <span>04</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <video ref={heroVideoRef} className="hero-video" src={heroVideo} poster={heroPoster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-topline"><span>FILMMAKER / VIDEO EDITOR</span><span>ORIGINAL SHOWREEL · 2026</span></div>
          <div className="hero-content">
            <p className="hero-overline"><span>ABUJA, NIGERIA</span><span>WORKING WORLDWIDE</span></p>
            <h1 id="hero-title">STORIES <span>IN MOTION.</span></h1>
            <div className="hero-subline">
              <p>From the first frame<br />to the final feeling.</p>
              <a className="round-link" href="#work"><span>EXPLORE<br />THE WORK</span><i aria-hidden="true">↘</i></a>
              <p className="hero-side-note">FILMMAKER<br />& VIDEO EDITOR</p>
            </div>
          </div>
          <div className="hero-bottomline"><span>SHOWREEL / 2026</span><a href="#work">SCROLL TO EXPLORE <i aria-hidden="true">↓</i></a><span>SHOOT · SHAPE · DELIVER</span></div>
        </section>

        <div className="client-strip" aria-label="Selected collaborators">
          <span className="micro-label">IN THE FRAME WITH</span>
          <span>HAUSINORDER</span><span>FOOTFOOT</span><span>UPTOUCH STUDIOS</span><span>SHORT-FORM EDITS</span>
        </div>

        <section className="about section-shell" id="about">
          <SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" title={<>From the first frame<br />to the final feeling.</>}>
            <p>I’m David Fen — a videographer and editor in Abuja. I work across the whole story: shaping the idea, capturing the moments, and finding the cut that makes it land.</p>
            <a className="text-link" href="#contact">LET’S MAKE SOMETHING <span aria-hidden="true">↗</span></a>
          </SectionHeading>
          <div className="about-note">
            <span className="note-number">A / Z</span>
            <p>Some projects begin with a camera in hand. Others begin with a hard drive full of footage. Either way, the goal is the same: make a clear, memorable story.</p>
            <div className="process-line"><span>IDEA</span><i /><span>IMAGE</span><i /><span>EDIT</span><i /><span>DELIVERY</span></div>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <SectionHeading number="02" eyebrow="22 VIDEOS · ALL FROM YOUR ASSETS FOLDER" title={<>The work<br />speaks.</>}>
            <p>Every original clip gets its own correctly framed still and playable preview. Filter the work by project category and press play to hear each excerpt.</p>
          </SectionHeading>
          <div className="work-toolbar" data-reveal>
            <div className="filter-list" role="group" aria-label="Filter projects">
              {filters.map((filter) => (
                <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>
              ))}
            </div>
            <span className="work-count">{String(visibleProjects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} VIDEOS</span>
          </div>
          <div className="project-groups" aria-live="polite">
            {projectGroups.map((group) => (
              <section className={`project-category project-category-${group.id}`} key={group.id} aria-labelledby={`category-${group.id}`} data-reveal>
                <div className="project-category-heading">
                  <h3 id={`category-${group.id}`}>{group.label}</h3>
                  <span>{String(group.projects.length).padStart(2, '0')} PROJECTS</span>
                </div>
                <div className="project-grid">
                  {group.projects.map((project) => <ProjectCard key={project.slug} project={project} onPlay={setSelectedProject} />)}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="published-work section-shell" id="published">
          <SectionHeading number="03" eyebrow="PUBLISHED RELEASES" title={<>More than<br />a thumbnail.</>}>
            <p>Playable footage leads the portfolio. These links to the previously featured online releases are still here when you want to open the full published version.</p>
          </SectionHeading>
          <div className="published-grid">
            {publishedCollections.map((collection, index) => (
              <article className="published-card" key={collection.title}>
                <span className="published-number">{String(index + 1).padStart(2, '0')}</span>
                <p>{collection.client}</p>
                <h3>{collection.title}</h3>
                <div>{collection.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>
                ))}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="services section-shell" id="services">
          <SectionHeading number="04" eyebrow="WHAT I BRING TO THE FRAME" title={<>One story.<br />Start to finish.</>}>
            <p>From the shoot to the timeline, I can join where the project needs me — and carry it through to a finished film.</p>
          </SectionHeading>
          <div className="service-grid">
            <article className="service-card">
              <span className="service-number">01 / CAPTURE</span><div className="service-symbol" aria-hidden="true">◉</div>
              <h3>Videography</h3><p>On-location filming and visual storytelling for brands, creators, and live sessions.</p>
              <span className="service-tags">PRODUCTION · CAMERA · DIRECTION</span>
            </article>
            <article className="service-card">
              <span className="service-number">02 / CUT</span><div className="service-symbol" aria-hidden="true">▰</div>
              <h3>Video editing</h3><p>Long-form edits, social cutdowns, and product films, shaped with considered pacing, sound, and finish.</p>
              <span className="service-tags">LONG-FORM · SHORT-FORM · COMMERCIAL</span>
            </article>
          </div>
        </section>

        <section className="workflow section-shell">
          <SectionHeading number="05" eyebrow="HOW A PROJECT MOVES" title={<>A good story<br />takes a few cuts.</>}>
            <p>Clear steps, collaborative decisions, and a finished video ready for its audience.</p>
          </SectionHeading>
          <ol className="workflow-list">
            <li><span>01</span><h3>Brief</h3><p>We get on the same page about the story, audience, and deliverables.</p></li>
            <li><span>02</span><h3>Capture</h3><p>We film with a plan — attentive to the details that make a scene feel real.</p></li>
            <li><span>03</span><h3>Shape</h3><p>The edit finds its rhythm through structure, sound, pacing, and feedback.</p></li>
            <li><span>04</span><h3>Deliver</h3><p>Final exports are prepared for the platforms and formats you need.</p></li>
          </ol>
        </section>

        <section className="contact section-shell" id="contact">
          <SectionHeading number="06" eyebrow="HAVE A STORY IN MIND?" title={<>Let’s make<br />it move.</>}>
            <p>Tell me what you’re making, where you’re starting, and what you want the audience to feel.</p>
            <a
              className="contact-cta"
              href="mailto:feyikemi136@gmail.com?cc=godsdrex2001%40gmail.com&subject=Project%20inquiry"
            >
              START A CONVERSATION <span aria-hidden="true">↗</span>
            </a>
          </SectionHeading>
          <div className="contact-details">
            <div>
              <span className="micro-label">EMAIL</span>
              <a href="mailto:feyikemi136@gmail.com">feyikemi136@gmail.com</a>
              <button type="button" onClick={copyEmail}>COPY</button>
              <a href="mailto:godsdrex2001@gmail.com">godsdrex2001@gmail.com</a>
              <button type="button" onClick={copyEmail}>COPY</button>
            </div>
            <div>
              <span className="micro-label">PHONE</span>
              <a href="tel:+2347025584008">+234 702 558 4008</a>
              <a href="tel:+2348129598609">+234 812 9598609</a>
            </div>
            <div><span className="micro-label">FOLLOW</span><a href="https://www.instagram.com/th_at_fen/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><a href="https://www.linkedin.com/in/david-fenwa-ba6857202/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div>
            <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-mark" href="#home"><span>DAVID</span><span>FEN</span></a>
        <span>FILMMAKER · EDITOR · ABUJA, NIGERIA</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span>
      </footer>
      {selectedProject && <PreviewDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
