describe('Kayla site smoke test', () => {
  it('loads with correct title and meta tags', () => {
    cy.visit('/');
    cy.title().should('eq', 'Kayla | Pet Sitter, Dog Walker & House Sitter');
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content')
      .and('not.be.empty');
    cy.get('head meta[property="og:image"]')
      .should('have.attr', 'content')
      .and('include', 'avatar.svg');
  });

  it('exposes SEO fundamentals: canonical link, JSON-LD, robots.txt, sitemap.xml', () => {
    cy.visit('/');
    cy.get('head link[rel="canonical"]')
      .should('have.attr', 'href')
      .and('eq', 'https://jamesfhoward.github.io/personal_website_kayla/');

    cy.get('head script[type="application/ld+json"]').should(($script) => {
      const data = JSON.parse($script.text());
      expect(data['@type']).to.eq('Person');
      expect(data.name).to.eq('Kayla');
    });

    cy.request('/robots.txt').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include('Sitemap:');
    });

    cy.request('/sitemap.xml').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include('<urlset');
    });
  });

  it('provides a working skip-to-content link', () => {
    cy.visit('/');
    cy.get('.skip-link').should('have.attr', 'href', '#main-content');

    cy.get('.skip-link').should(($link) => {
      const top = parseFloat(getComputedStyle($link[0]).top);
      expect(top).to.be.lessThan(0);
    });

    cy.get('.skip-link').focus();
    cy.get('.skip-link').should(($link) => {
      const top = parseFloat(getComputedStyle($link[0]).top);
      expect(top).to.eq(0);
    });

    cy.get('.skip-link').click();
    cy.focused().should('have.attr', 'id', 'main-content');
  });

  it('respects prefers-reduced-motion when navigating via nav clicks', () => {
    // window.matchMedia is stubbed here to exercise the JS branch that picks
    // scrollIntoView's `behavior` — this does NOT emulate the OS-level media
    // feature, so it doesn't prove the CSS `@media (prefers-reduced-motion)`
    // block itself is applied; the next test checks that separately.
    cy.visit('/', {
      onBeforeLoad(win) {
        const realMatchMedia = win.matchMedia.bind(win);
        cy.stub(win, 'matchMedia').callsFake((query) => {
          if (query === '(prefers-reduced-motion: reduce)') {
            return { matches: true, addListener() {}, removeListener() {} };
          }
          return realMatchMedia(query);
        });
      },
    });

    cy.get('nav.left-nav .nav-btn').contains('About').click();
    cy.get('nav.left-nav .nav-btn.active').should('contain.text', 'About');
  });

  it('ships a prefers-reduced-motion override in the built CSS', () => {
    cy.visit('/');
    // Filter to the locally-built bundle — the head also has an external
    // Google Fonts stylesheet link that would otherwise be matched first.
    // Use the resolved `href` DOM property (absolute URL), not the raw
    // attribute: with a baseUrl that has its own path segment configured
    // (`/personal_website_kayla/`), cy.request() naively concatenates rather
    // than resolving like a browser, so a root-relative attribute value that
    // already includes that same path segment (as Vite's `base` config
    // produces) gets doubled into a bogus URL — which vite preview's SPA
    // fallback then serves as a silent 200 + index.html instead of a 404.
    cy.document()
      .find('link[rel="stylesheet"]')
      .filter((_, el) => el.getAttribute('href').includes('/assets/'))
      .should('have.length', 1)
      .then(($link) => cy.request($link.prop('href')))
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers['content-type']).to.include('css');
        expect(res.body).to.include('prefers-reduced-motion');
      });
  });

  it('shows a visible focus ring on interactive elements for keyboard users', () => {
    cy.visit('/');

    cy.get('nav.left-nav .nav-btn').contains('About').focus();
    cy.focused().should(($el) => {
      const cs = getComputedStyle($el[0]);
      expect(cs.outlineStyle).to.eq('solid');
      expect(parseFloat(cs.outlineWidth)).to.be.greaterThan(0);
    });

    cy.get('a.button.primary').focus();
    cy.focused().should(($el) => {
      const cs = getComputedStyle($el[0]);
      expect(cs.outlineStyle).to.eq('solid');
    });
  });

  it('serves the hero photo as a loaded, responsive image', () => {
    cy.visit('/');
    cy.get('img.profile-photo').should('have.attr', 'alt').and('not.be.empty');
    cy.get('img.profile-photo').should(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it('moves the active nav state as each section is clicked', () => {
    cy.visit('/');

    const sections = ['Home', 'About', 'Services', 'Contact'];
    sections.forEach((label) => {
      cy.get('nav.left-nav .nav-btn').contains(label).click();
      cy.wait(700);
      cy.get('nav.left-nav .nav-btn.active')
        .should('have.length', 1)
        .and('contain.text', label);
      cy.get('nav.left-nav .nav-btn.active').should(
        'have.attr',
        'aria-current',
        'true',
      );
      cy.get('nav.left-nav .nav-btn:not(.active)').each(($btn) => {
        cy.wrap($btn).should('not.have.attr', 'aria-current');
      });
    });
  });

  it('lists the three core pet care services', () => {
    cy.visit('/');
    cy.get('#services .exp-item').should('have.length', 3);
    cy.get('#services .exp-header h3').should('contain.text', 'House Sitting');
    cy.get('#services .exp-header h3').should('contain.text', 'Dog Walking');
    cy.get('#services .exp-header h3').should(
      'contain.text',
      'Pet Check-In Visits',
    );
  });

  it('has an email and a phone contact link', () => {
    cy.visit('/');
    cy.get('.contact-links a').should('have.length', 2);
    cy.get('.contact-links a[href^="mailto:"]').should('have.length', 1);
    cy.get('.contact-links a[href^="tel:"]').should('have.length', 1);
  });

  it('shows the mobile nav bar and tracks section state on small viewports', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('.mobile-nav').should('be.visible');

    ['Home', 'About', 'Services', 'Contact'].forEach((label) => {
      cy.get('.mobile-nav .mobile-nav-btn').contains(label).click();
      cy.wait(700);
      cy.get('.mobile-nav .mobile-nav-btn.active')
        .should('have.length', 1)
        .and('contain.text', label);
    });
  });
});
