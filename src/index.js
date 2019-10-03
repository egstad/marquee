export default class Marquee {
  constructor(el) {
    // marquee el
    if (typeof el === "object") {
      this.el = el;
    } else if (typeof el === "string") {
      this.el = document.querySelector(el);  
    } else {
      throw new TypeError("Marquee accepts either a HTML Element (object) or a class/id to query (string).");
    }
    // marquee content
    this.sign = this.el.children[0];
    // raf instance, cached for cancel
    this.RAF = null;
    this.offset = this.el.offsetWidth;
    this.speed = this.el.dataset.speed || 1;
    this.observerOptions = {
      rootMargin: '0px 0px',
      threshold: 0,
    };
    this.observer = null;
    
    this.styleElements();
    this.init();
  }
  init() {
    this.observerInit();
    this.observer.observe(this.sign);
    this.draw();
  }
  styleElements() {
    this.el.style.display = "flex";
    this.sign.style.display = "inline-flex";
  }
  draw() {
    const performAnimation = () => {
      // loop it!
      this.RAF = requestAnimationFrame(performAnimation);
      // update offset
      this.offset = this.offset - this.speed;
      this.sign.style.transform = `translate3d(${this.offset}px, 0, 0)`;
    };

    requestAnimationFrame(performAnimation);
  }
  stop() {
    cancelAnimationFrame(this.RAF);
  }
  reset() {
    this.offset = this.el.offsetWidth;
    this.sign.style.transform = `translate3d(${this.offset}px, 0, 0)`;
  }
  observerInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 0) {
          this.reset()
        }
      });
    }, this.observerOptions);
  }
  destroy() {
    this.stop()
    this.observer.unobserve(this.sign);
  }
}



