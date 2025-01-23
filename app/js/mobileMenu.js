export function setupMobileMenu() {
  const html = document.documentElement;
  const menuBtn = document.querySelector('.menu-btn');
  const headerMobile = document.querySelector('.header__mobile');
  const headerLogo = document.querySelector('.header__logo');
  const anchors = document.querySelectorAll('a.mobile');

  menuBtn.addEventListener('click', () => {
    menuBtn.blur();
    html.classList.toggle('active');
    menuBtn.classList.toggle('active');
    headerMobile.classList.toggle('active');
    headerLogo.classList.toggle('active');
  });

  function scrollToTarget(targetId) {
    const targetSection = document.querySelector(targetId);
    const header = document.querySelector('.header');
    if (targetSection) {
      html.classList.remove('active');
      headerMobile.classList.remove('active');
      menuBtn.classList.remove('active');
      headerLogo.classList.remove('active');
      setTimeout(() => {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetOffset = targetSection.offsetTop - headerHeight - 40;
        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
      }, 700);
    }
  }

  function handleAnchorClick(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const hrefParts = href.split('#');
    if (hrefParts.length === 2) {
      const targetId = '#' + hrefParts[1];
      scrollToTarget(targetId);
    }
  }

  for (const anchor of anchors) {
    anchor.addEventListener('click', handleAnchorClick);
    anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
  }
}