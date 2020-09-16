
declare module '@egstad/marquee' {
  class Marquee {
    constructor(element: Element)
    stop(): void;
    reset(): void;
    destroy(): void;
  }
  export = Marquee
}
