export default class Carousel {
  constructor(carousel, wrapper) {
    this.carousel = document.querySelector(carousel);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      posicaoFinal: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveImg(distX) {
    this.dist.movePosition = distX;
    this.carousel.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  posicaoAtualizada(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.posicaoFinal - this.dist.movement;
  }

  aoComecar(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.aoMover);
  }

  aoMover(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const posicaoFinal = this.posicaoAtualizada(pointerPosition);
    this.moveImg(posicaoFinal);
  }

  aoTerminar(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, this.aoMover);
    this.dist.posicaoFinal = this.dist.movePosition;
  }

  addCarouselEvents() {
    this.wrapper.addEventListener("mousedown", this.aoComecar);
    this.wrapper.addEventListener("touchstart", this.aoComecar);
    this.wrapper.addEventListener("mouseup", this.aoTerminar);
    this.wrapper.addEventListener("touchend", this.aoTerminar);
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
