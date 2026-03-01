document.addEventListener('DOMContentLoaded', () => {
  // Применяем анимацию входа для новой страницы
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.classList.add('new-page-enter');
  }

  // Обрабатываем все ссылки для перехода с анимацией выхода
  const links = document.querySelectorAll('a.link');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');

      if (pageContent) {
        // Добавляем анимацию выхода
        pageContent.classList.remove('new-page-enter');
        pageContent.classList.add('current-page-exit');

        // Получаем длительность анимации выхода из CSS (400мс)
        const animationDuration = 400;

        setTimeout(() => {
          window.location.href = href;
        }, animationDuration);
      } else {
        // Если .page-content не найден, просто переходим
        window.location.href = href;
      }
    });
  });
});


// Header

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".header");

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let scrollTimer;

    const hideDelay = 2000;       // скрыть через 2 сек
    const speedThreshold = 3.0;   // чувствительность скорости (подбирать)

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
        const currentTime = Date.now();

        const distance = Math.abs(currentScrollY - lastScrollY);
        const time = currentTime - lastTime;

        const speed = distance / time; // px per ms

        // Вверху страницы — всегда видно
        if (currentScrollY === 0) {
            showMenu();
            clearTimeout(scrollTimer);
            lastScrollY = currentScrollY;
            lastTime = currentTime;
            return;
        }

        // Появление только при быстром скролле
        if (speed > speedThreshold) {
            showMenu();
        }

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(hideMenu, hideDelay);

        lastScrollY = currentScrollY;
        lastTime = currentTime;

        // Анимация перехода страниц

        const links = document.querySelectorAll('a.link');
        const overlay = document.querySelector('.overlay');

        links.forEach(link => {
            link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');

            overlay.classList.add('active'); // запускаем анимацию

            setTimeout(() => {
                window.location.href = href; // переход после анимации
            }, 500); // время совпадает с CSS transition
            });
        });
    });
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
