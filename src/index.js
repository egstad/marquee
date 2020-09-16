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
    // let's bind the window resize event for easy setup/teardown
    this.onResize = this.getSignWidth.bind(this)
    
    this.styleElements();
    this.init();
  }
  init() {
    // measure the sign's width
    this.getSignWidth();
    // begin animation
    this.draw();
    // in case the contents change size on resize,
    // fetch & update the size for animation
    window.addEventListener("resize", this.onResize)
  }
  styleElements() {
    this.el.style.display = "flex";
    this.sign.style.display = "inline-flex";
  }
  getSignWidth() {
    this.signWidth = this.sign.clientWidth
  }
  draw() {
    const performAnimation = () => {
      // loop it!
      this.RAF = requestAnimationFrame(performAnimation);

      // if the item is fully hidden, start animation over
      if (-this.offset >= this.signWidth) {
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
    window.removeEventListener("resize", this.onResize)
  }
}



