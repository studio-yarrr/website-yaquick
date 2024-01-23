document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  if (document && document.fonts) {
    setTimeout(function () {
      document.fonts.ready.then(function () {
        document.documentElement.classList.add('fontsloaded')
        xl.matches ? '' : initLetters()
        initTitle()
      });
    }, 0);
  } else {
    document.documentElement.classList.add('fontsloaded')
    xl.matches ? '' : initLetters()
    initTitle()
  }

  window.addEventListener('load', function () {
    setTimeout(() => {
      const letters1 = xl.matches ? document.getElementById('letters-mob') : document.getElementById('letters')

      if (!xl.matches) {
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

  function initLetters() {
    const letters1 = xl.matches ? document.getElementById('letters-mob') : document.getElementById('letters')

    if (letters1) {
      const inner = letters1.innerHTML
      letters1.innerHTML = ''
      const factor = xl.matches ? 0.013 : 0.01
      inner.trim().split('').forEach(el => {
        const div = document.createElement('div')
        div.innerHTML = el
        letters1.appendChild(div)
      })


      letterAnim = gsap.timeline({
        repeat: -1,
      }),

        dur = 1,
        each = dur * factor


      function letters() {
        [...letters1.children].forEach((char, i) => {
          let timeOffset = i * each / 1.45,
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
            let isLooped = false
            outerCategory.forEach((category, i) => {
              const slide = document.createElement('div')
              slide.classList.add('swiper-slide')
              slide.innerHTML = category.innerHTML
              slide.dataset.slideid = i
              wrapper.appendChild(slide)
              if (i === 3) {
                isLooped = true
              }
            })
            if (isLooped === true) {
              outerCategory.forEach((category, i) => {
                const slide = document.createElement('div')
                slide.classList.add('swiper-slide')
                slide.innerHTML = category.innerHTML
                slide.dataset.slideid = i
                wrapper.appendChild(slide)
              })
            }
          }
          const next = smenuSwiper.querySelector('.next')
          const prev = smenuSwiper.querySelector('.prev')
          const numberOfSlides = smenuSwiper.querySelectorAll('.swiper-slide') || []
          if (swiper) {
            outer = new Swiper(outerSwipers, {
              loop: false,
              slidesPerView: 'auto',
              spaceBetween: 0,
              speed: 500,
            })
            thumbs = new Swiper(swiper, {
              slidesPerView: 3,
              loop: numberOfSlides.length >= 4,
              slideToClickedSlide: true,
              spaceBetween: 0,
              grabCursor: true,
              speed: 500,
              breakpoints: {
                // when window width is >= 320px
                501: {
                  slidesPerView: 4,
                },
              },
              navigation: {
                nextEl: next,
                prevEl: prev,
              },
              on: {
                slideChange: function () {
                  const index = this.slides[this.activeIndex].dataset.slideid
                  outer.enable()
                  outer.slideTo(index, 700)
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
          speed: 500,
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
        // entry.target.classList.remove('loaded')
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
        let count = 0;
        let swiperSlide = null
        slides.forEach(slide => {
          if (count % 5 === 0) {
            swiperSlide = document.createElement('div')
            swiperSlide.classList.add('swiper-slide')
            wrapper.appendChild(swiperSlide)
          }
          const imgWrap = document.createElement('div')
          imgWrap.classList.add('img-cover', 'img-wrap')
          imgWrap.innerHTML = slide.innerHTML
          swiperSlide.appendChild(imgWrap)
          count++
        })
      }
      if (mob && xl.matches) {
        const numberOfSlides = mob.querySelectorAll('.swiper-slide') || []
        const allNumbers = mob.querySelector('.smenu-main-number');
        const allnumb = mob.querySelector('.smenu-all-number');
        const prev = mob.querySelector('.prev')
        const next = mob.querySelector('.next')
        new Swiper(mob, {
          slidesPerView: 'auto',
          navigation: {
            prevEl: prev,
            nextEl: next,
          },
          on: {
            init: function (sw) {
              if (allNumbers && allnumb) {
                allNumbers.classList.add('reached')
                reachBeginning = false
                allNumbers.innerHTML = pad(sw.realIndex + 1, 2);
                allnumb.innerHTML = pad(numberOfSlides.length, 2)
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
                allnumb.innerHTML = pad(numberOfSlides.length, 2)

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
      if (desc && !xl.matches) {
        const numberOfSlides = galleryWrapper.querySelectorAll('.mgallery-swiper-wrapper .swiper-slide') || []
        const allNumbers = galleryWrapper.querySelector('.mgallery-swiper-wrapper .smenu-main-number');
        const allnumb = galleryWrapper.querySelector('.mgallery-swiper-wrapper .smenu-all-number');
        const prev = galleryWrapper.querySelector('.mgallery-swiper-wrapper .prev')
        const next = galleryWrapper.querySelector('.mgallery-swiper-wrapper .next')
        let reachEnd = false
        let reachBeginning = true
        new Swiper(desc, {
          speed: 500,
          slidesPerView: 'auto',
          grabCursor: true,
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
          on: {
            init: function (sw) {
              if (allNumbers && allnumb) {
                allNumbers.classList.add('reached')
                reachBeginning = false
                allNumbers.innerHTML = pad(sw.realIndex + 1, 2);
                allnumb.innerHTML = pad(numberOfSlides.length, 2)
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
                allnumb.innerHTML = pad(numberOfSlides.length, 2)

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
    }
  }, 0)

  const gallery = document.querySelector('.gallery-wrapper')

  if (gallery) {
    const numberOfSlides = gallery.querySelectorAll('.swiper-slide') || []
    const allNumbers = gallery.querySelector('.smenu-main-number');
    const allnumb = gallery.querySelector('.smenu-all-number');
    const prev = gallery.querySelector('.prev')
    const next = gallery.querySelector('.next')
    const swiper = gallery.querySelector('.swiper')
    let reachEnd = false
    let reachBeginning = true
    new Swiper(swiper, {
      speed: 500,
      slidesPerView: 'auto',
      grabCursor: true,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
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

  var init = false;
  var swiper;
  function swiperCard() {
    let reachEnd = false
    let reachBeginning = true
    if (xl.matches) {
      const numberOfSlides = document.querySelectorAll('.mrent-swiper .swiper-slide') || []
      const allNumbers = document.querySelector('.mrent-swiper .smenu-main-number');
      const allnumb = document.querySelector('.mrent-swiper .smenu-all-number');
      const prev = document.querySelector('.mrent-swiper .prev')
      const next = document.querySelector('.mrent-swiper .next')
      if (!init) {
        init = true;
        swiper = new Swiper(".mrent-swiper", {
          slidesPerView: "auto",
          navigation: {
            prevEl: prev,
            nextEl: next,
          },
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
        });
      }
    } else if (init) {
      swiper.destroy();
      init = false;
    }
  }
  swiperCard();
  window.addEventListener("resize", swiperCard);



  const scrolledObj = document.querySelectorAll('[data-scroll]');

  if (scrolledObj.length) {
    scrolledObj.forEach(el => {
      el.addEventListener('click', function () {
        event.preventDefault()
        const sc = document.querySelector(this.dataset.scroll)
        if (sc) {
          const header = document.querySelector('header');
          let headerH = null;
          if (header) {
            headerH = header.getBoundingClientRect().height;
          }
          // const yOffset = headerH ? -headerH : -200;
          const yOffset = 0
          const onMedia = xl.matches ? 0 : 50;
          const y = sc.getBoundingClientRect().top + window.pageYOffset + yOffset - onMedia;

          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      })
    })
  }

  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl, sel;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        sel = this.parentNode.previousSibling.classList.add('select-selected--active')
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  } 

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  const menubtns = document.querySelectorAll('.menu-subbtn')
  if (menubtns.length) {
    menubtns.forEach(el => {
      el.addEventListener('click', function () {
        if (xl.matches) {
          event.preventDefault()
        }
        this.parentNode.classList.toggle('opened')
      })
    })
  }
});











