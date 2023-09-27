export default class Carousel {
  constructor(carousel, wrapper) {
    this.carousel = document.querySelector(carousel);
    this.wrapper = document.querySelector(wrapper);
  }

  aoComecar(event) {
    event.preventDefault();
    console.log("mousedown");
    this.wrapper.addEventListener("mousemove", this.aoMover);
  }

  aoMover(event) {
    console.log("moveu");
  }

  aoTerminar(event) {
    this.wrapper.removeEventListener("mousemove", this.aoMover);
  }

  addCarouselEvents() {
    this.wrapper.addEventListener("mousedown", this.aoComecar);
    this.wrapper.addEventListener("mouseup", this.aoTerminar);
  }

  bindEvents() {
    this.aoComecar = this.aoComecar.bind(this);
    this.aoMover = this.aoMover.bind(this);
    this.aoTerminar = this.aoTerminar.bind(this);
  }

  init() {
    this.bindEvents();
    this.addCarouselEvents();
    return this;
  }
}
