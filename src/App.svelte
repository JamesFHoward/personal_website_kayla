<script>
  import { onMount } from 'svelte';

  let activeSection = 'home';
  const sections = ['home', 'about', 'services', 'booking', 'contact'];

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
    class="mobile-nav-btn {activeSection === 'booking' ? 'active' : ''}"
    aria-current={activeSection === 'booking' ? 'true' : undefined}
    on:click={() => scrollToSection('booking')}>Booking</button
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
    <div
      class="photo-grid"
      role="img"
      aria-label="Collage of Kayla and the pets she's cared for — placeholder photos, to be replaced with real ones"
    >
      {#each Array.from({ length: 10 }, (_, i) => i + 1) as n (n)}
        <img
          src="{import.meta.env.BASE_URL}gallery/photo-{n}.svg"
          alt=""
          class="photo-tile"
          width="400"
          height="400"
          loading="lazy"
        />
      {/each}
    </div>
    <div class="left-overlay"></div>
    <div class="left-content">
      <p class="left-eyebrow">Compassion in Action</p>
      <h1 class="left-name">Kayla</h1>
      <p class="left-subtitle">
        Pet Sitter, Dog Walker &amp; House Sitter · Bon Air, VA
      </p>

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
          class="nav-btn {activeSection === 'booking' ? 'active' : ''}"
          aria-current={activeSection === 'booking' ? 'true' : undefined}
          on:click={() => scrollToSection('booking')}>Booking</button
        >
        <button
          class="nav-btn {activeSection === 'contact' ? 'active' : ''}"
          aria-current={activeSection === 'contact' ? 'true' : undefined}
          on:click={() => scrollToSection('contact')}>Contact</button
        >
      </nav>

      <div class="social-links">
        <a
          class="social-link"
          href="https://www.linkedin.com/in/amanda-mcneill-67b669328/"
          target="_blank"
          rel="noopener"
        >
          <svg
            class="social-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            ><path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            /></svg
          > LinkedIn</a
        >
        <a
          class="social-link"
          href="https://www.rover.com/members/kayla-m-compassion-in-action/"
          target="_blank"
          rel="noopener"
        >
          <svg
            class="social-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="7" cy="8" r="2.2" />
            <circle cx="12" cy="5.5" r="2.2" />
            <circle cx="17" cy="8" r="2.2" />
            <path
              d="M12 11c-3 0-6.5 2.6-6.5 6 0 2 1.6 3.3 3.5 3.3 1.2 0 1.9-.6 3-.6s1.8.6 3 .6c1.9 0 3.5-1.3 3.5-3.3 0-3.4-3.5-6-6.5-6z"
            />
          </svg> Rover</a
        >
      </div>
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
        Serving Bon Air, VA and surrounding areas. Every visit is tailored to
        your pet's routine — reach out for a personalized quote. Also
        <a
          href="https://www.rover.com/members/kayla-m-compassion-in-action/"
          target="_blank"
          rel="noopener">bookable and verified on Rover ↗</a
        >.
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

    <section id="booking" class="section">
      <p class="section-label">Schedule A Visit</p>
      <h2>Booking</h2>
      <p>
        Every new client starts with a free, no-obligation Meet &amp; Greet — a
        chance for me to meet your pet(s), walk through your home and routine,
        and make sure it's a good fit before any paid visit is scheduled.
        Returning clients can book directly.
      </p>

      <div class="exp-list">
        <div class="exp-item">
          <div class="exp-header">
            <h3>New Client? Start Here</h3>
          </div>
          <p>
            Book a free 15-minute Meet &amp; Greet — required before your first
            paid visit or house sitting stay.
          </p>
          <a
            class="button primary booking-cta"
            href="https://cal.com/PLACEHOLDER-replace-with-kaylas-username/meet-and-greet"
            target="_blank"
            rel="noopener">Book a Meet &amp; Greet ↗</a
          >
        </div>

        <div class="exp-item">
          <div class="exp-header">
            <h3>Returning Client? Book a Visit</h3>
          </div>
          <p>
            Already had a Meet &amp; Greet? See my live availability and book
            your next visit directly.
          </p>
          <a
            class="button secondary booking-cta"
            href="https://cal.com/PLACEHOLDER-replace-with-kaylas-username/pet-care-visit"
            target="_blank"
            rel="noopener">View Availability ↗</a
          >
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
  .social-link:focus-visible,
  .section p a:focus-visible,
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

  .photo-grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2px;
  }

  .photo-tile {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
    margin-bottom: 22px;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    padding: 5px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(245, 237, 225, 0.6);
    text-decoration: none;
    transition:
      background 0.2s,
      color 0.2s,
      border-color 0.2s;
  }

  .social-link:hover {
    background: var(--accent-dim);
    border-color: rgba(245, 158, 11, 0.3);
    color: var(--accent);
  }

  .social-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
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

  .section p a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .section p a:hover {
    color: var(--accent-2);
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

  .booking-cta {
    margin-top: 16px;
    padding: 10px 22px;
    font-size: 0.82rem;
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
