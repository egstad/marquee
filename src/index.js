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
    // marquee inner wrap (first child)
    this.elWrap = this.el.children[0];
    // raf instance, cached for cancel
    this.RAF = null;
    // transformX offset
    this.offset = this.el.offsetWidth;
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
    this.offset = this.el.offsetWidth;
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
  destroy() {}
}



