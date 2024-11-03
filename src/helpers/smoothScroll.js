export const smoothScroll = () => {
  const element = document.querySelector('.load-more-btn');
  console.log('smoothScroll', element);
  element.scrollIntoView({
    behavior: 'smooth',
    // block: 'start',
    block: 'end',
  });
}
