class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "Travelers"),
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city),
      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split('').map(l => React.createElement("span", null, l))),

      React.createElement("p", { className: "slider__slide-readmore" }, "read more")),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))),






      React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }),
      React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) })));


  }}


const slides = [
{
  city: 'EEE_Batch',
  country: 'Diwali 2k19',
  img: './assets/popular-post/IMG-20191027-WA0038.jpg'},

{
  city: 'Party_Time',
  country: 'Khana Khazana',
  img: '../assets/popular-post/IMG-20191117-WA0015.jpg' },

{
  city: 'Muskeeters',
  country: 'Gangs of SRMpur',
  img: '../assets/popular-post/IMG-20191027-WA0036.jpg' },

{
  city: 'Celebration',
  country: 'Birthday Rampage',
  img: '../assets/popular-post/IMG-20190905-WA0016.jpg' },

{
  city: 'Dilwale',
  country: 'Pyaar Ka Bandhan',
  img: '../assets/popular-post/IMG20200108161033.jpg' },

{
  city: 'Meet_Up',
  country: 'Back To Pavilion',
  img: '../assets/popular-post/IMG-20201114-WA0007.jpg' },

{
  city: 'Smart_Bros',
  country: 'Apna Time Aayega',
  img: '../assets/popular-post/IMG-20200101-WA0042.jpg' }];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.querySelector('#app'));



function lerp({ x, y }, { x: targetX, y: targetY }) {
  const fraction = 0.1;

  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;

  return { x, y };
}

class Slider {
  constructor(el) {
    const imgClass = this.IMG_CLASS = 'slider__images-item';
    const textClass = this.TEXT_CLASS = 'slider__text-item';
    const activeImgClass = this.ACTIVE_IMG_CLASS = `${imgClass}--active`;
    const activeTextClass = this.ACTIVE_TEXT_CLASS = `${textClass}--active`;

    this.el = el;
    this.contentEl = document.getElementById('slider-content');
    this.onMouseMove = this.onMouseMove.bind(this);

    this.activeImg = el.getElementsByClassName(activeImgClass);
    this.activeText = el.getElementsByClassName(activeTextClass);
    this.images = el.getElementsByTagName('img');

    document.getElementById('slider-dots').
    addEventListener('click', this.onDotClick.bind(this));

    document.getElementById('left').
    addEventListener('click', this.prev.bind(this));

    document.getElementById('right').
    addEventListener('click', this.next.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));

    this.onResize();

    this.length = this.images.length;
    this.lastX = this.lastY = this.targetX = this.targetY = 0;
  }
  onResize() {
    const htmlStyles = getComputedStyle(document.documentElement);
    const mobileBreakpoint = htmlStyles.getPropertyValue('--mobile-bkp');

    const isMobile = this.isMobile = matchMedia(
    `only screen and (max-width: ${mobileBreakpoint})`).
    matches;

    this.halfWidth = innerWidth / 2;
    this.halfHeight = innerHeight / 0.5;
    this.zDistance = htmlStyles.getPropertyValue('--z-distance');

    if (!isMobile && !this.mouseWatched) {
      this.mouseWatched = true;
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.style.setProperty(
      '--img-prev',
      `url(${this.images[+this.activeImg[0].dataset.id - 1].src})`);

      this.contentEl.style.setProperty('transform', `translateZ(${this.zDistance})`);
    } else if (isMobile && this.mouseWatched) {
      this.mouseWatched = false;
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.contentEl.style.setProperty('transform', 'none');
    }
  }
  getMouseCoefficients({ pageX, pageY } = {}) {
    const halfWidth = this.halfWidth;
    const halfHeight = this.halfHeight;
    const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
    const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;

    return { xCoeff, yCoeff };
  }
  onMouseMove({ pageX, pageY }) {
    this.targetX = pageX;
    this.targetY = pageY;

    if (!this.animationRunning) {
      this.animationRunning = true;
      this.runAnimation();
    }
  }
  runAnimation() {
    if (this.animationStopped) {
      this.animationRunning = false;
      return;
    }

    const maxX = 10;
    const maxY = 10;

    const newPos = lerp({
      x: this.lastX,
      y: this.lastY },
    {
      x: this.targetX,
      y: this.targetY });


    const { xCoeff, yCoeff } = this.getMouseCoefficients({
      pageX: newPos.x,
      pageY: newPos.y });


    this.lastX = newPos.x;
    this.lastY = newPos.y;

    this.positionImage({ xCoeff, yCoeff });

    this.contentEl.style.setProperty('transform', `
      translateZ(${this.zDistance})
      rotateX(${maxY * yCoeff}deg)
      rotateY(${maxX * xCoeff}deg)
    `);

    if (this.reachedFinalPoint) {
      this.animationRunning = false;
    } else {
      requestAnimationFrame(this.runAnimation.bind(this));
    }
  }
  get reachedFinalPoint() {
    const lastX = ~~this.lastX;
    const lastY = ~~this.lastY;
    const targetX = this.targetX;
    const targetY = this.targetY;

    return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX) && (
    lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
  }
  positionImage({ xCoeff, yCoeff }) {
    const maxImgOffset = 1;
    const currentImage = this.activeImg[0].children[0];

    currentImage.style.setProperty('transform', `
      translateX(${maxImgOffset * -xCoeff}em)
      translateY(${maxImgOffset * yCoeff}em)
    `);
  }
  onDotClick({ target }) {
    if (this.inTransit) return;

    const dot = target.closest('.slider__nav-dot');

    if (!dot) return;

    const nextId = dot.dataset.id;
    const currentId = this.activeImg[0].dataset.id;

    if (currentId == nextId) return;

    this.startTransition(nextId);
  }
  transitionItem(nextId) {
    function onImageTransitionEnd(e) {
      e.stopPropagation();

      nextImg.classList.remove(transitClass);

      self.inTransit = false;

      this.className = imgClass;
      this.removeEventListener('transitionend', onImageTransitionEnd);
    }

    const self = this;
    const el = this.el;
    const currentImg = this.activeImg[0];
    const currentId = currentImg.dataset.id;
    const imgClass = this.IMG_CLASS;
    const textClass = this.TEXT_CLASS;
    const activeImgClass = this.ACTIVE_IMG_CLASS;
    const activeTextClass = this.ACTIVE_TEXT_CLASS;
    const subActiveClass = `${imgClass}--subactive`;
    const transitClass = `${imgClass}--transit`;
    const nextImg = el.querySelector(`.${imgClass}[data-id='${nextId}']`);
    const nextText = el.querySelector(`.${textClass}[data-id='${nextId}']`);

    let outClass = '';
    let inClass = '';

    this.animationStopped = true;

    nextText.classList.add(activeTextClass);

    el.style.setProperty('--from-left', nextId);

    currentImg.classList.remove(activeImgClass);
    currentImg.classList.add(subActiveClass);

    if (currentId < nextId) {
      outClass = `${imgClass}--next`;
      inClass = `${imgClass}--prev`;
    } else {
      outClass = `${imgClass}--prev`;
      inClass = `${imgClass}--next`;
    }

    nextImg.classList.add(outClass);

    requestAnimationFrame(() => {
      nextImg.classList.add(transitClass, activeImgClass);
      nextImg.classList.remove(outClass);

      this.animationStopped = false;
      this.positionImage(this.getMouseCoefficients());

      currentImg.classList.add(transitClass, inClass);
      currentImg.addEventListener('transitionend', onImageTransitionEnd);
    });

    if (!this.isMobile)
    this.switchBackgroundImage(nextId);
  }
  startTransition(nextId) {
    function onTextTransitionEnd(e) {
      if (!e.pseudoElement) {
        e.stopPropagation();

        requestAnimationFrame(() => {
          self.transitionItem(nextId);
        });

        this.removeEventListener('transitionend', onTextTransitionEnd);
      }
    }

    if (this.inTransit) return;

    const activeText = this.activeText[0];
    const backwardsClass = `${this.TEXT_CLASS}--backwards`;
    const self = this;

    this.inTransit = true;

    activeText.classList.add(backwardsClass);
    activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
    activeText.addEventListener('transitionend', onTextTransitionEnd);

    requestAnimationFrame(() => {
      activeText.classList.remove(backwardsClass);
    });
  }
  next() {
    if (this.inTransit) return;

    let nextId = +this.activeImg[0].dataset.id + 1;

    if (nextId > this.length)
    nextId = 1;

    this.startTransition(nextId);
  }
  prev() {
    if (this.inTransit) return;

    let nextId = +this.activeImg[0].dataset.id - 1;

    if (nextId < 1)
    nextId = this.length;

    this.startTransition(nextId);
  }
  switchBackgroundImage(nextId) {
    function onBackgroundTransitionEnd(e) {
      if (e.target === this) {
        this.style.setProperty('--img-prev', imageUrl);
        this.classList.remove(bgClass);
        this.removeEventListener('transitionend', onBackgroundTransitionEnd);
      }
    }

    const bgClass = 'slider--bg-next';
    const el = this.el;
    const imageUrl = `url(${this.images[+nextId - 1].src})`;

    el.style.setProperty('--img-next', imageUrl);
    el.addEventListener('transitionend', onBackgroundTransitionEnd);
    el.classList.add(bgClass);
  }}


const sliderEl = document.getElementById('slider');
const slider = new Slider(sliderEl);


let timer = 0;

function autoSlide() {
  requestAnimationFrame(() => {
    slider.next();
  });

  timer = setTimeout(autoSlide, 5000);
}

function stopAutoSlide() {
  clearTimeout(timer);

  this.removeEventListener('touchstart', stopAutoSlide);
  this.removeEventListener('mousemove', stopAutoSlide);
}

sliderEl.addEventListener('mousemove', stopAutoSlide);
sliderEl.addEventListener('touchstart', stopAutoSlide);

timer = setTimeout(autoSlide, 2000);
