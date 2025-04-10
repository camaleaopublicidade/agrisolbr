const defaultLang = "pt-BR";
const supportedLangs = ["pt-BR", "en", "es", "fr", "zh", "hi"];

function detectLanguage() {
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang && supportedLangs.includes(savedLang)) {
    return savedLang;
  }

  const browserLang = navigator.language || navigator.userLanguage;
  const shortLang = browserLang.split('-')[0];

  // Tenta encontrar uma correspondência direta
  if (supportedLangs.includes(browserLang)) return browserLang;

  // Ou tenta pela versão simplificada (ex: "en" → "en")
  const match = supportedLangs.find(l => l.startsWith(shortLang));
  return match || defaultLang;
}

function setLanguage(lang) {
  fetch(`./lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });

      localStorage.setItem('userLanguage', lang);
      document.documentElement.lang = lang;

      const langSelect = document.getElementById("lang-select");
      if (langSelect) langSelect.value = lang;

      document.querySelectorAll('.lang-link').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-lang') === lang) {
          el.classList.add('active');
        }
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar o idioma "${lang}":`, err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const lang = detectLanguage();
  setLanguage(lang);

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  document.querySelectorAll('.lang-link').forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});

let swiper = new Swiper(".slide-characters", {
  slidesPerView: 1.1,
  spaceBetween: 12,
  freeMode: true,
  breakpoints: {
    640: {
      slidesPerView: 2.1,
    },
    768: {
      slidesPerView: 2.1,
    },
    1024: {
      slidesPerView: 3.1,
    },
    1280: {
      slidesPerView: 3.1,
    },

    1536: {
      slidesPerView: 3.1,
    },
  },
});
