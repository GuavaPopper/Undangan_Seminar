(function () {
  const introOverlay = document.getElementById("introOverlay");
  const openInvitation = document.getElementById("openInvitation");
  const audio = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMusicState(isPlaying) {
    if (!musicToggle) return;

    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
  }

  function toggleMusic(forcePlay) {
    if (!audio) return;

    const shouldPlay = forcePlay || audio.paused;

    if (shouldPlay) {
      const playAttempt = audio.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt
          .then(() => setMusicState(true))
          .catch(() => setMusicState(false));
      } else {
        setMusicState(true);
      }
      return;
    }

    audio.pause();
    setMusicState(false);
  }

  function openPage() {
    if (introOverlay) {
      introOverlay.classList.add("is-hidden");
    }

    toggleMusic(true);
  }

  function initAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    if (reduceMotion) {
      revealItems.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".intro-mark", {
      duration: 1.2,
      scale: 0.82,
      autoAlpha: 0,
      ease: "power3.out",
    });

    gsap.from(".intro-overlay h1, .intro-kicker, .intro-name, .open-button", {
      duration: 1,
      y: 26,
      autoAlpha: 0,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.12,
    });

    gsap.from(".ornament-top", {
      duration: 1.4,
      y: -36,
      autoAlpha: 0,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.utils.toArray(".section-panel").forEach((section) => {
      const items = section.querySelectorAll(".reveal");

      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        y: 44,
        autoAlpha: 0,
        duration: 0.95,
        stagger: 0.14,
        ease: "power3.out",
      });
    });

    gsap.to(".side-left", {
      scrollTrigger: {
        trigger: ".page-shell",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: 70,
      ease: "none",
    });

    gsap.to(".side-right", {
      scrollTrigger: {
        trigger: ".page-shell",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: -70,
      ease: "none",
    });
  }

  if (openInvitation) {
    openInvitation.addEventListener("click", openPage);
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", () => toggleMusic(false));
  }

  if (audio) {
    audio.addEventListener("pause", () => setMusicState(false));
    audio.addEventListener("play", () => setMusicState(true));
  }

  window.addEventListener("load", initAnimations);
  window.toggleMusic = toggleMusic;
})();
