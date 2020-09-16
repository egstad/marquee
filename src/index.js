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
    
    this.styleElements();
    this.init();
  }
  init() {
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

      // if the item is fully hidden, start animation over
      if (-this.offset >= this.sign.clientWidth) {
        this.reset()
      }
      
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
  destroy() {
    this.stop()
  }
}



