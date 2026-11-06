// ================================================
// KAUSHIK DAS ARNOB — PERSONAL PORTFOLIO
// Complete JavaScript
// ================================================

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  // ==============================================
  // 01. ELEMENT SELECTORS
  // ==============================================

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  const year = document.querySelector("#current-year");
  const backToTop = document.querySelector(".back-to-top");

  // ==============================================
  // 02. DYNAMIC COPYRIGHT YEAR
  // ==============================================

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==============================================
  // 03. LIGHT MODE / OXBLOOD MODE
  // ==============================================

  const THEME_KEY = "kda-theme";

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn("Could not save theme preference.", error);
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || "light";
    } catch (error) {
      console.warn("Could not load theme preference.", error);
      return "light";
    }
  }

  function setTheme(theme) {

    const isOxblood = theme === "dark";

    body.classList.toggle("dark-theme", isOxblood);

    // Update theme icon
    if (themeIcon) {
      themeIcon.textContent = isOxblood ? "☀" : "◐";
    }

    // Update accessibility label
    if (themeToggle) {
      const label = isOxblood
        ? "Switch to Light Mode"
        : "Switch to Oxblood Mode";

      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }

    // Save preference
    saveTheme(isOxblood ? "dark" : "light");
  }

  // Restore saved theme on page load
  setTheme(getSavedTheme());

  // Switch themes when clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      const currentlyOxblood =
        body.classList.contains("dark-theme");

      setTheme(currentlyOxblood ? "light" : "dark");

    });
  }

  // ==============================================
  // 04. MOBILE NAVIGATION
  // ==============================================

  if (menuToggle && nav) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

    // Close navigation after clicking a link
    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

      });

    });

    // Close navigation with Escape key
    document.addEventListener("keydown", event => {

      if (event.key === "Escape" && nav.classList.contains("open")) {

        nav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.focus();

      }

    });

  }

  // ==============================================
  // 05. PROJECT FILTERS
  // ==============================================

  const filterButtons = document.querySelectorAll(".filter-button");

  const projectCards = document.querySelectorAll(
    ".project-card[data-category]"
  );

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter = button.dataset.filter;

      // Update active filter button
      filterButtons.forEach(item => {

        const isActive = item === button;

        item.classList.toggle("active", isActive);

        item.setAttribute(
          "aria-pressed",
          String(isActive)
        );

      });

      // Filter project cards
      projectCards.forEach(card => {

        const categories = card.dataset.category
          .trim()
          .split(/\s+/);

        const shouldShow =
          filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !shouldShow);

      });

    });

  });

  // ==============================================
  // 06. SCROLL REVEAL ANIMATIONS
  // ==============================================

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

            revealObserver.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });

  } else {

    // Fallback for older browsers
    revealItems.forEach(item => {
      item.classList.add("revealed");
      item.classList.remove("reveal");
    });

  }

  // ==============================================
  // 07. BACK TO TOP BUTTON
  // ==============================================

  function updateBackToTop() {

    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 500
    );

  }

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  updateBackToTop();

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

  // ==============================================
  // 08. ACTIVE NAVIGATION LINK
  // ==============================================

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
  );

  if (
    "IntersectionObserver" in window &&
    sections.length > 0 &&
    navLinks.length > 0
  ) {

    const sectionObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(link => {

              const isActive =
                link.getAttribute("href") ===
                `#${entry.target.id}`;

              link.classList.toggle("active", isActive);

            });

          }

        });

      },

      {
        rootMargin: "-35% 0px -55% 0px"
      }

    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

  // ==============================================
  // 09. INITIALIZATION COMPLETE
  // ==============================================

  console.log("Portfolio initialized successfully.");

});
