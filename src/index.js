export default class Marquee {
  constructor(el) {
    // marquee el
    this.el = document.querySelector(el);
    // marquee inner wrap (first child)
    this.elWrap = this.el.children[0];
    // raf instance, cached for cancel
    this.RAF = null;
    this.winWidth = window.innerWidth;
    // transformX offset
    this.offset = 0;
    this.speed = this.el.dataset.speed || 1;
    this.observerOptions = {
      rootMargin: '0px 0px',
      threshold: 0,
    };
    this.observer = null;
    
    // style el and child for animation
    this.styleElements();
  }
  init() {
    this.observerInit();
    this.observer.observe(this.elWrap);
    this.draw();
  }
  styleElements() {
    this.el.style.display = "flex";
    this.elWrap.style.display = "inline-flex";
  }
  draw() {
    const performAnimation = () => {
      this.RAF = requestAnimationFrame(performAnimation);
      // update offset
      this.offset = this.offset - this.speed;
      this.elWrap.style.transform = `translate3d(${this.offset}px, 0, 0)`;
      // console.log("frame", this.offset);
    };

    requestAnimationFrame(performAnimation);
  }
  stop() {
    cancelAnimationFrame(this.RAF);
  }
  reset() {
    this.offset = window.innerWidth;
    this.elWrap.style.transform = `translate3d(${this.offset}px, 0, 0)`;
  }
  observerInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          // in view
        } else {
          // out of view
          this.reset()
        }
      });
    }, this.observerOptions);
  }
  destroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
}



