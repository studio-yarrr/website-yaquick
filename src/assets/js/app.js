document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  if (document && document.fonts) {
    setTimeout(function () {
      document.fonts.ready.then(function () {
        document.documentElement.classList.add('fontsloaded')
        initLetters()
        initTitle()
      });
    }, 0);
  } else {
    document.documentElement.classList.add('fontsloaded')
    initLetters()
    initTitle()
  }

  window.addEventListener('load', function () {
    setTimeout(() => {
      const letters1 = document.getElementById('letters')

      if (letters1) {
        letters1.classList.add('loaded')
      }
    }, 500)
  })

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    }

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('header__nav--active');
      this.button.classList.remove('header__menu-button--active');
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector('header');

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener('scroll', handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  }

  if (xl.matches) {
    scrollAdd();
    document.removeEventListener('scroll', scrollHeader);
  } else {
    document.addEventListener('scroll', scrollHeader);
    scrollRemove();
  }

  xl.addEventListener('change', () => {
    if (xl.matches) {
      document.removeEventListener('scroll', scrollHeader);
      scrollAdd();
    } else {
      document.addEventListener('scroll', scrollHeader);
      scrollRemove();
    }
  });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };
    const num = xl.matches ? 50 : 100;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    };
    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else {
      header.classList.add('out');
    };
    prevScrollpos = currentScrollPos;
  };

  function initHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const num = xl.matches ? 50 : 150;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  }

  initHeader();

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2);
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  // gsap.ticker.lagSmoothing(1000, 16);
  // gsap.ticker.fps(30);

  function initLetters() {
    const letters1 = document.getElementById('letters')

    if (letters1) {
      const inner = letters1.innerHTML
      letters1.innerHTML = ''
      inner.trim().split('').forEach(el => {
        const div = document.createElement('div')
        div.innerHTML = el
        letters1.appendChild(div)
      })


      letterAnim = gsap.timeline({
        repeat: -1,
      }),

        dur = 20,
        each = dur * 0.01


      function letters() {
        [...letters1.children].forEach((char, i) => {
          let timeOffset = i * each / 1.44,
            startTime = dur / 2 + timeOffset,
            pathOffset = startTime / dur;

          letterAnim.to(char, {
            motionPath: {
              path: '#m',
              align: '#m',
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: pathOffset,
              end: 1 + pathOffset
            },
            stagger: 0.01,
            immediateRender: false,
            lazy: true,
            duration: 20,
            ease: "none",
          }, 0);
        });
      }
      window.addEventListener("resize", letters);
      letters();
    }
  }

  function initTitle() {
    const title = document.getElementById('title')
    if (title) {
      const tl = gsap.timeline();

      tl.to(".main-title .line span", {
        attr: { style: "transform: translate3d(0, 0, 0)" },
        stagger: {
          amount: 0.3
        }
      })
        .to('.main-btn', {
          onComplete: function () {
            if (this._targets.length) {
              this._targets.forEach(el => {
                el.classList.add('loaded')
              })
            }
          }
        })
    }
  }

  function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  const smenus = document.querySelectorAll('.smenu')

  if (smenus.length) {
    smenus.forEach(smenu => {

      const outerSwipers = smenu.querySelector('.smenu-outer-swiper')
      let outer = null
      thumbs = null
      if (outerSwipers) {

        const smenuSwiper = document.querySelector('.smenu-swiper-wrapper')
        if (smenuSwiper) {
          const swiper = smenuSwiper.querySelector('.swiper')
          const wrapper = smenuSwiper.querySelector('.swiper-wrapper')
          const outerCategory = outerSwipers.querySelectorAll('.smeny-copy-category')
          if (outerCategory.length) {
            outerCategory.forEach(category => {
              const slide = document.createElement('div')
              slide.classList.add('swiper-slide')
              slide.innerHTML = category.innerHTML
              wrapper.appendChild(slide)
            })
          }
          const next = smenuSwiper.querySelector('.next')
          const prev = smenuSwiper.querySelector('.prev')
          const numberOfSlides = smenuSwiper.querySelectorAll('.swiper-slide') || []
          if (swiper) {
            outer = new Swiper(outerSwipers, {
              loop: false,
              slidesPerView: 'auto',
              spaceBetween: 0,
            })
            thumbs = new Swiper(swiper, {
              slidesPerView: 4,
              loop: numberOfSlides.length >= 4,
              slideToClickedSlide: true,
              spaceBetween: 0,
              grabCursor: true,
              navigation: {
                nextEl: next,
                prevEl: prev,
              },
              on: {
                slideChange: function () {
                  const index = this.slides[this.activeIndex].dataset.swiperSlideIndex
                  outer.enable()
                  outer.slideTo(index, 500)
                  outer.disable()
                }
              }
            })

            if (numberOfSlides.length < 4 && outer) {
              numberOfSlides.forEach((el, i) => {
                el.addEventListener('click', function () {
                  outer.enable()
                  outer.slideTo(i, 500)
                  outer.disable()
                  numberOfSlides.forEach(slide => {
                    slide.classList.remove('swiper-slide-active')
                  })
                  this.classList.add('swiper-slide-active')
                })
              })
            }
            setTimeout(() => {
              swiper.classList.add('loaded')
            }, 100)
          }
        }
        if (outer && thumbs) {
          outer.disable()
        }
      }
    })
  }

  const smenuMainSwiper = document.querySelectorAll('.smenu-mainSwiper-wrapper')
  if (smenuMainSwiper.length) {
    smenuMainSwiper.forEach(el => {
      const swiper = el.querySelector('.swiper')
      const numberOfSlides = el.querySelectorAll('.swiper-slide') || []
      const allNumbers = el.querySelector('.smenu-main-number');
      const allnumb = el.querySelector('.smenu-all-number');
      const prev = el.querySelector('.prev')
      const next = el.querySelector('.next')
      let reachEnd = false
      let reachBeginning = true
      if (swiper) {
        new Swiper(swiper, {
          slidesPerView: 'auto',
          grabCursor: true,
          navigation: {
            prevEl: prev,
            nextEl: next,
          },
          preloadImages: false,
          lazy: true,
          on: {
            init: function (sw) {
              if (allNumbers && allnumb) {
                allNumbers.classList.add('reached')
                reachBeginning = false
                allNumbers.innerHTML = pad(sw.realIndex + 1, 2);
                allnumb.innerHTML = pad(numberOfSlides.length - 1, 2)
              }
            },
            slideChange: function (sw) {
              if (allNumbers && allnumb) {
                if (reachBeginning) {
                  allNumbers.classList.add('reached')
                } else {
                  allNumbers.classList.remove('reached')
                }

                if (reachEnd) {
                  allnumb.classList.add('reached')
                } else {
                  allnumb.classList.remove('reached')
                }

                allNumbers.innerHTML = pad(sw.realIndex + 1, 2);
                allnumb.innerHTML = pad(numberOfSlides.length - 1, 2)

                reachBeginning = false
                reachEnd = false
              }
            },
            reachBeginning: function () {
              reachBeginning = true
            },
            reachEnd: function () {
              reachEnd = true
            }
          },
        })
      }
    })
  }



  const items = document.querySelectorAll('.smenu-item')

  if (items.length) {
    items.forEach(el => {
      const inp = el.querySelector('.plusminus-input');
      const price = el.querySelector('[data-price]')
      const initialPrice = price?.innerHTML || 1;
      if (inp && price) {
        inp.addEventListener('input', inputHandler);
        inp.addEventListener('change', inputHandler);

        inp.addEventListener('blur', function () {
          if (+inp.value <= +inp.dataset?.min) {
            inp.value = inp.dataset.min;
          }
          this.dispatchEvent(new Event('change'));
        })

        inputHandler.apply(inp);
      }

      function inputHandler() {
        inp.value = Math.abs(inp.value.replace(/[^0-9]/g, '')) || ''
        if (+inp.value >= +inp.dataset?.max) {
          inp.value = inp.dataset.max;
        }
        price.innerHTML = initialPrice * (inp.value || 1)
      }

      const plus = el.querySelector('[data-plus]')
      if (plus) {
        plus.onclick = function () {

          if (inp) {
            if (+inp.value >= +inp.dataset?.max) {
              inp.value = inp.dataset.max;
              inp.dispatchEvent(new Event('change'));
              return;
            }

            inp.value = Number(inp.value) + +inp.dataset?.step || 1;
            inp.dispatchEvent(new Event('change'));
          }
        }
      }
      const minus = el.querySelector('[data-minus]')
      if (minus) {
        minus.onclick = function () {
          if (inp) {
            if (+inp.value <= +inp.dataset?.min) {
              inp.value = inp.dataset.min;
              inp.dispatchEvent(new Event('change'));
              return;
            }
            inp.value -= inp.dataset?.step || 1;
            inp.dispatchEvent(new Event('change'));
          }
        }
      }
    })
  }

  const callback = (entries) => {

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded')
      } else {
        entry.target.classList.remove('loaded')
      }
    })

  };


  const observer = new IntersectionObserver(callback, { rootMargin: '-50px' });

  setTimeout(() => {

    const target = document.querySelectorAll('[data-animonscroll]');
    if (target.length) {
      target.forEach(el => {
        if (xl.matches) {
          el.classList.add('loaded')
        } else {
          observer.observe(el);
        }
      })
    }
  }, 0)

  setTimeout(() => {
    const galleryWrapper = document.querySelector('.mgallery-wrapper')
    if (galleryWrapper) {
      const mob = document.querySelector('.mgallery-swiper-mob')
      const desc = document.querySelector('.mgallery-swiper-desc')

      const slides = mob.querySelectorAll('.swiper-slide')
      if (desc) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('swiper-wrapper')
        desc.appendChild(wrapper)
        let count = 1;
        let arr = []

        slides.forEach(slide => {
          const imgWrapper = document.createElement('div')
          imgWrapper.classList.add('img-cover')
          imgWrapper.innerHTML = slide.innerHTML
          arr.push(slide)
          if (count === 1) {
            const swiperSlide = document.createElement('div')
            swiperSlide.classList.add('swiper-slide')
            wrapper.appendChild(swiperSlide)
            arr = []
            count = 1
          }
          count++
        })
      }
      if (mob && xl.matches) {
        new Swiper(mob, {
        })
      } 
      if (desc && !xl.matches) {
        new Swiper(desc, {
        })
      }
    }
  }, 0)

});











