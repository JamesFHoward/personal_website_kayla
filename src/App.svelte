<script>
  import { onMount } from 'svelte';

  let activeSection = 'home';
  const sections = ['home', 'about', 'services', 'contact'];

  const scrollToSection = (sectionId) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';

    if (sectionId === 'home' && window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior });
  };

  onMount(() => {
    const ratios = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });
        const best = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) activeSection = best[0];
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<a class="skip-link" href="#main-content">Skip to content</a>

<!-- mobile-only fixed top nav (rendered outside .layout so it overlays everything) -->
<nav class="mobile-nav" aria-label="Primary">
  <button
    class="mobile-nav-btn {activeSection === 'home' ? 'active' : ''}"
    aria-current={activeSection === 'home' ? 'true' : undefined}
    on:click={() => scrollToSection('home')}>Home</button
  >
  <button
    class="mobile-nav-btn {activeSection === 'about' ? 'active' : ''}"
    aria-current={activeSection === 'about' ? 'true' : undefined}
    on:click={() => scrollToSection('about')}>About</button
  >
  <button
    class="mobile-nav-btn {activeSection === 'services' ? 'active' : ''}"
    aria-current={activeSection === 'services' ? 'true' : undefined}
    on:click={() => scrollToSection('services')}>Services</button
  >
  <button
    class="mobile-nav-btn {activeSection === 'contact' ? 'active' : ''}"
    aria-current={activeSection === 'contact' ? 'true' : undefined}
    on:click={() => scrollToSection('contact')}>Contact</button
  >
</nav>

<div class="layout">
  <!-- ── LEFT PANEL ─────────────────────────── -->
  <aside class="left-panel">
    <img
      src="{import.meta.env.BASE_URL}avatar.svg"
      alt="Kayla"
      class="profile-photo"
      width="1200"
      height="1600"
    />
    <div class="left-overlay"></div>
    <div class="left-content">
      <p class="left-eyebrow">Personal &amp; Pet Care</p>
      <h1 class="left-name">Kayla</h1>
      <p class="left-subtitle">Pet Sitter, Dog Walker &amp; House Sitter</p>

      <nav class="left-nav" aria-label="Primary">
        <button
          class="nav-btn {activeSection === 'home' ? 'active' : ''}"
          aria-current={activeSection === 'home' ? 'true' : undefined}
          on:click={() => scrollToSection('home')}>Home</button
        >
        <button
          class="nav-btn {activeSection === 'about' ? 'active' : ''}"
          aria-current={activeSection === 'about' ? 'true' : undefined}
          on:click={() => scrollToSection('about')}>About</button
        >
        <button
          class="nav-btn {activeSection === 'services' ? 'active' : ''}"
          aria-current={activeSection === 'services' ? 'true' : undefined}
          on:click={() => scrollToSection('services')}>Services</button
        >
        <button
          class="nav-btn {activeSection === 'contact' ? 'active' : ''}"
          aria-current={activeSection === 'contact' ? 'true' : undefined}
          on:click={() => scrollToSection('contact')}>Contact</button
        >
      </nav>
    </div>
  </aside>

  <!-- ── RIGHT PANEL ────────────────────────── -->
  <main class="right-panel" id="main-content" tabindex="-1">
    <section id="home" class="section">
      <p class="section-label">Welcome</p>
      <h2>Hi, I'm Kayla</h2>
      <p>
        [Placeholder intro — replace with a short, friendly welcome. Example:
        "I'm a lifelong animal lover based in [Your City, State], and I help
        neighbors care for their pets and homes while they're away."]
      </p>
      <p>
        Whether you need someone to stay overnight while you travel or just a
        reliable set of hands to walk the dog and check in on the cat, I treat
        every home and every pet like my own.
      </p>

      <div class="skill-group">
        <h4 class="skill-group-label">What I Offer</h4>
        <div class="skills">
          <span class="skill-tag">House Sitting</span>
          <span class="skill-tag">Dog Walking</span>
          <span class="skill-tag">Pet Check-In Visits</span>
          <span class="skill-tag">Overnight Stays</span>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <p class="section-label">Get To Know Me</p>
      <h2>About Me</h2>
      <p>
        [Placeholder bio — replace with a few real sentences about Kayla:
        background, why she enjoys pet care, and what makes her a trustworthy
        choice. Example: "I grew up with dogs, cats, and everything in between,
        and I've spent the last few years helping friends and neighbors take
        care of their pets and homes while they travel."]
      </p>
      <p>
        [Add a personal touch here — hobbies, experience with animals,
        certifications, or anything that helps people get to know you before
        they trust you with their home and pets.]
      </p>
    </section>

    <section id="services" class="section">
      <p class="section-label">Pet Care &amp; House Sitting</p>
      <h2>Services</h2>
      <p>
        Serving [Your City, State] and surrounding areas. Every visit is
        tailored to your pet's routine — reach out for a personalized quote.
      </p>

      <div class="exp-list">
        <div class="exp-item">
          <div class="exp-header">
            <h3>House Sitting</h3>
          </div>
          <p>
            Overnight and extended stays in your home while you're away. I'll
            keep your pets company on their normal schedule, and can handle
            mail, plants, and trash bins along the way. [Add rate or "Contact
            for a quote".]
          </p>
        </div>

        <div class="exp-item">
          <div class="exp-header">
            <h3>Dog Walking</h3>
          </div>
          <p>
            Daily or weekly walks sized to your dog's energy level and your
            schedule — before work, over lunch, or in the evening. [Add rate or
            "Contact for a quote".]
          </p>
        </div>

        <div class="exp-item">
          <div class="exp-header">
            <h3>Pet Check-In Visits</h3>
          </div>
          <p>
            Drop-in visits for feeding, fresh water, litter boxes, and playtime
            — a great fit for cats or any pet that doesn't need a full house
            sitter. [Add rate or "Contact for a quote".]
          </p>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <p class="section-label">Get In Touch</p>
      <h2>Contact</h2>
      <p>
        Looking for a pet sitter or house sitter you can trust? Reach out by
        email or phone and I'll get back to you within a day. [Placeholder
        contact details below — replace with Kayla's real email and phone
        number.]
      </p>

      <div class="contact-links">
        <a class="button primary" href="mailto:kayla@example.com">✉ Email Me</a>
        <a class="button secondary" href="tel:+15555550123">☎ (555) 555-0123</a>
      </div>
    </section>

    <footer>Built with Svelte + Vite</footer>
  </main>
</div>

<style>
  :global(:root) {
    --bg: #1a1410;
    --text: #f5ede1;
    --text-muted: rgba(245, 237, 225, 0.62);
    --accent: #f59e0b;
    --accent-dim: rgba(245, 158, 11, 0.14);
    --accent-glow: rgba(245, 158, 11, 0.28);
    --accent-2: #fb923c;
    --border: rgba(245, 237, 225, 0.1);
    --item-bg: rgba(255, 255, 255, 0.03);
    --item-border-hover: rgba(245, 158, 11, 0.25);
  }

  :global(body) {
    margin: 0;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* ── ACCESSIBILITY ───────────────────────── */
  .skip-link {
    position: absolute;
    top: -48px;
    left: 8px;
    z-index: 1000;
    background: var(--accent);
    color: #1a1410;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 10px 18px;
    border-radius: 0 0 8px 8px;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 0;
  }

  .nav-btn:focus-visible,
  .mobile-nav-btn:focus-visible,
  .button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .right-panel:focus-visible {
    outline: none;
  }

  /* ── LAYOUT ──────────────────────────────── */
  .layout {
    display: flex;
    min-height: 100vh;
  }

  /* ── LEFT PANEL ──────────────────────────── */
  .left-panel {
    position: sticky;
    top: 0;
    width: 600px;
    flex-shrink: 0;
    height: 100vh;
    overflow: hidden;
  }

  .profile-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }

  .left-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(26, 20, 16, 0.05) 0%,
      rgba(26, 20, 16, 0.25) 40%,
      rgba(26, 20, 16, 0.85) 68%,
      rgba(26, 20, 16, 0.97) 100%
    );
  }

  .left-content {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
  }

  .left-eyebrow {
    margin: 0 0 10px;
    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .left-name {
    margin: 0 0 4px;
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #fff;
    line-height: 1.1;
  }

  .left-subtitle {
    margin: 0 0 28px;
    font-size: 0.84rem;
    color: rgba(245, 237, 225, 0.6);
  }

  .left-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-btn {
    background: none;
    border: none;
    border-left: 2px solid transparent;
    text-align: left;
    color: rgba(245, 237, 225, 0.48);
    font-size: 0.82rem;
    font-weight: 500;
    padding: 6px 10px;
    cursor: pointer;
    transition:
      color 0.2s,
      border-color 0.2s;
    letter-spacing: 0.05em;
    font-family: inherit;
  }

  .nav-btn:hover {
    color: #fff;
    border-left-color: rgba(255, 255, 255, 0.25);
  }

  .nav-btn.active {
    color: var(--accent);
    border-left-color: var(--accent);
    font-weight: 600;
  }

  /* ── MOBILE TOP NAV (hidden on desktop) ─── */
  .mobile-nav {
    display: none;
  }

  /* ── RIGHT PANEL ─────────────────────────── */
  .right-panel {
    flex: 1;
    background: var(--bg);
    border-left: 1px solid var(--border);
    min-height: 100vh;
  }

  .section {
    padding: 60px 52px;
    border-bottom: 1px solid var(--border);
  }

  .section-label {
    margin: 0 0 12px;
    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .section h2 {
    margin: 0 0 20px;
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #fff;
  }

  .section p {
    margin: 0 0 14px;
    line-height: 1.82;
    color: var(--text-muted);
    font-size: 0.92rem;
  }

  .section p:last-child {
    margin-bottom: 0;
  }

  /* skill tags */
  .skill-group {
    margin-top: 28px;
  }

  .skill-group-label {
    margin: 0 0 10px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-tag {
    background: var(--item-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--text-muted);
    transition:
      border-color 0.2s,
      color 0.2s;
    cursor: default;
  }

  .skill-tag:hover {
    border-color: var(--item-border-hover);
    color: var(--accent);
  }

  /* service items */
  .exp-list {
    display: grid;
    gap: 14px;
  }

  .exp-item {
    padding: 22px 24px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--item-bg);
    transition: border-color 0.2s;
  }

  .exp-item:hover {
    border-color: var(--item-border-hover);
  }

  .exp-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .exp-header h3 {
    margin: 0;
    font-size: 0.94rem;
    font-weight: 600;
    color: #fff;
  }

  .exp-item p {
    margin: 0;
    line-height: 1.78;
    font-size: 0.86rem;
    color: var(--text-muted);
  }

  /* contact */
  .contact-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 28px;
  }

  /* buttons */
  .button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    border-radius: 9999px;
    padding: 12px 28px;
    font-weight: 600;
    font-size: 0.88rem;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s,
      color 0.2s;
  }

  .button.primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #1a1410;
    box-shadow: 0 6px 28px var(--accent-glow);
  }

  .button.secondary {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text);
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px var(--accent-glow);
  }

  .button.secondary:hover {
    box-shadow: none;
    border-color: var(--item-border-hover);
    color: var(--accent);
  }

  footer {
    padding: 32px 52px;
    color: var(--text-muted);
    font-size: 0.78rem;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  /* ── MOBILE ──────────────────────────────── */
  @media (max-width: 768px) {
    .layout {
      flex-direction: column;
    }

    /* show top nav bar on mobile */
    .mobile-nav {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: 52px;
      background: rgba(26, 20, 16, 0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 0 12px;
    }

    .mobile-nav-btn {
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: rgba(245, 237, 225, 0.48);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 16px 10px 12px;
      cursor: pointer;
      transition:
        color 0.2s,
        border-color 0.2s;
      font-family: inherit;
      white-space: nowrap;
    }

    .mobile-nav-btn:hover {
      color: #fff;
    }

    .mobile-nav-btn.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
      font-weight: 600;
    }

    /* hide the left panel nav on mobile — top bar handles it */
    .left-nav {
      display: none;
    }

    .left-panel {
      position: relative;
      width: 100%;
      height: 80vw;
      min-height: 416px;
      max-height: none;
      margin-top: 52px; /* clear the fixed nav */
    }

    .right-panel {
      border-left: none;
      border-top: 1px solid var(--border);
    }

    .section {
      padding: 40px 24px;
    }

    footer {
      padding: 28px 24px;
    }
  }
</style>
