export const smoothScroll = () => {
  const element = document.querySelector('.load-more-btn');
  element.scrollIntoView({
    behavior: 'smooth',
    // block: 'start',
    block: 'end',
  });
}
