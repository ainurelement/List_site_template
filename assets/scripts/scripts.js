

// Скелетон

(function () {

  const blocks = document.querySelectorAll('[data-sm="mammoth"]');

  blocks.forEach(block => {

    // включаем скелетон
    block.classList.add('sm-loading');

    const mediaElements = block.querySelectorAll('img, video, iframe');

    if (!mediaElements.length) {
      block.classList.remove('sm-loading');
      return;
    }

    let loadedCount = 0;
    const total = mediaElements.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= total) {
        block.classList.remove('sm-loading');
      }
    };

    mediaElements.forEach(el => {

      // IMG
      if (el.tagName === 'IMG') {
        if (el.complete && el.naturalHeight !== 0) {
          checkAllLoaded();
        } else {
          el.addEventListener('load', checkAllLoaded, { once: true });
          el.addEventListener('error', checkAllLoaded, { once: true });
        }
      }

      // VIDEO
      else if (el.tagName === 'VIDEO') {
        if (el.readyState >= 3) {
          checkAllLoaded();
        } else {
          el.addEventListener('loadeddata', checkAllLoaded, { once: true });
          el.addEventListener('error', checkAllLoaded, { once: true });
        }
      }

      // IFRAME
      else if (el.tagName === 'IFRAME') {
        el.addEventListener('load', checkAllLoaded, { once: true });
        el.addEventListener('error', checkAllLoaded, { once: true });
      }

    });

  });

})();

// Header
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".header");

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollTimer;

    const hideDelay = 1000;
    const speedThreshold = 2.5; // чувствительность (px/ms)

    function showMenu() {
        menu.classList.remove("hidden");
    }

    function hideMenu() {
        if (window.scrollY > 0 && !menu.matches(":hover")) {
            menu.classList.add("hidden");
        }
    }

    window.addEventListener("scroll", function () {
        const currentScrollY = window.scrollY;
        const currentTime = performance.now();

        const distance = currentScrollY - lastScrollY;
        const timeDiff = currentTime - lastTime;

        const speed = Math.abs(distance) / timeDiff; // px/ms

        // Вверху страницы — всегда видно
        if (currentScrollY <= 0) {
            showMenu();
            clearTimeout(scrollTimer);
            lastScrollY = currentScrollY;
            lastTime = currentTime;
            return;
        }

        // Скролл вниз — сразу скрываем
        if (distance > 0) {
            hideMenu();
        }

        // Скролл вверх — только если быстро
        if (distance < 0 && speed > speedThreshold) {
            showMenu();
        }

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (window.scrollY > 0) {
                hideMenu();
            }
        }, hideDelay);

        lastScrollY = currentScrollY;
        lastTime = currentTime;
    });

    // Появление при наведении к верхнему краю
    document.addEventListener("mousemove", function (e) {
        if (e.clientY <= 15) {
            showMenu();
        }
    });

    // Для мобильных
    document.addEventListener("touchstart", function (e) {
        if (e.touches[0].clientY <= 15) {
            showMenu();
        }
    });
});

// Анимация при скролле
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,                // срабатывает сразу
    rootMargin: "0px 0px -0.5% 0px" // запуск раньше, за 20% до низа
  });

  elements.forEach(el => observer.observe(el));
});


// Установка cookie с возможностью указания срока
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Получение значения cookie по имени
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Основная функция проверки наличия cookie
function checkCookies() {
    const cookieNote = document.getElementById('cookie_note');
    const cookieBtnAccept = cookieNote?.querySelector('.cookie_accept');

    // Проверка наличия cookie
    if (!getCookie('cookies_policy') && cookieNote && cookieBtnAccept) {
        cookieNote.classList.add('show');

        // Обработчик клика на кнопку согласия
        cookieBtnAccept.addEventListener('click', function () {
            setCookie('cookies_policy', 'true', 90); // Срок хранения 3 месяца (90 дней)
            cookieNote.classList.remove('show');
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', checkCookies);
