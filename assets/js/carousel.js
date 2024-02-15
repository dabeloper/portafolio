( () => {
  // Respect user perference
  const isReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Helper to apply inline CSS
  const setStyleProps = ($el, styles) => {
    for (const [key, value] of Object.entries(styles)) {
      if (value === false) {
        $el.style.removeProperty(key);
      } else {
        $el.style.setProperty(key, value);
      }
    }
  };

  document.querySelectorAll('.Carousel').forEach(($carousel) => {
    $carousel.scrollLeft = 0;

    const $cards = Array.from($carousel.querySelectorAll('.Card'));
    const $pagination = $carousel.nextElementSibling;
    const [$previous, $next] = $pagination.querySelectorAll('.Arrow');
    $pagination.querySelector('.Dot').classList.add('Dot--active');

    const $start = document.createElement('div');
    const $end = document.createElement('div');
    $carousel.prepend($start);
    $carousel.append($end);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === $start) {
          if ($previous) {
            $previous.disabled = entry.isIntersecting;
          }
        }
        if (entry.target === $end) {
          if ($next) {
            $next.disabled = entry.isIntersecting;
          }
        }
      });
    });
    observer.observe($start);
    observer.observe($end);

    const scrollTo = ($card) => {
      let offset = getOffset($card);
      const left = document.dir === 'rtl' ? -offset : offset;
      const behavior = isReducedMotion ? 'auto' : 'smooth';
      $card.classList.add('Card--active');
      $carousel.scrollTo({left, behavior});
      setTimeout(
          _=> {        
              $previous.removeAttribute("disabled");
              $next.removeAttribute("disabled");
          }, 500
      );
    };

    const getOffset = ($el) => {
      let offset = $el.offsetLeft;
      if (document.dir === 'rtl') {
        offset = $carousel.offsetWidth - (offset + $el.offsetWidth);
      }
      return offset;
    };

    $previous.addEventListener('click', (ev) => {
      $previous.setAttribute('disabled',"disabled");
      ev.preventDefault();
      let selectedCard = $carousel.querySelectorAll('.Card--active')?.item(0);
      Array.from($carousel.querySelectorAll('.Card--active'))?.forEach(box => {
          box.classList.remove('Card--active');
      });
      let firstCard = true;
      let $card = $cards[0];
      const scroll = Math.abs($carousel.scrollLeft);
      $cards.forEach(($item) => {
        const offset = getOffset($item);
        if (offset - scroll < -1 && offset > getOffset($card)) {
          firstCard = $card === $item;
          $card = $item;
        }
      });
      const _offset = getOffset($card);
      if ( firstCard || selectedCard === $card ) {
          $previous.classList.add('disabled');
      } else {
          $previous.classList.remove('disabled');
      }
      $next.classList.remove('disabled');
      scrollTo($card);
    });

    $next.addEventListener('click', (ev) => {
      $next.setAttribute('disabled',"disabled");
      ev.preventDefault();
      let selectedCard = $carousel.querySelectorAll('.Card--active')?.item(0);
      Array.from($carousel.querySelectorAll('.Card--active'))?.forEach(box => {
          box.classList.remove('Card--active');
      });
      let lastCard = true;
      let $card = $cards[$cards.length - 1];
      const scroll = Math.abs($carousel.scrollLeft);
      $cards.forEach(($item) => {
        const offset = getOffset($item);
        if (offset - scroll > 1 && offset < getOffset($card)) {
          lastCard = $card === $item;
          $card = $item;
        }
      });
      const _offset = getOffset($card);
      if ( lastCard || selectedCard === $card ) {
          $next.classList.add('disabled');
      } else {
          $next.classList.remove('disabled');
      }
      $previous.classList.remove('disabled');
      scrollTo($card);
    });

    $pagination.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('Dot')) {
        ev.preventDefault();
        const $card = document.querySelector(new URL(ev.target.href).hash);
        if ($card) scrollTo($card);
      }
    });

    // Highlight nearest "Dot" in pagination
    let scrollTimeout;
    $carousel.addEventListener(
      'scroll',
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          let $dot = $pagination.querySelector('.Dot--active');
          if ($dot) $dot.classList.remove('Dot--active');
          let $active;
          const scroll = Math.abs($carousel.scrollLeft);
          if (scroll <= 0) {
            $active = $cards[0];
          }
          if (scroll >= $carousel.scrollWidth - $carousel.offsetWidth) {
            $active = $cards[$cards.length - 1];
          }
          if (!$active) {
            let oldDiff;
            $cards.forEach(($card) => {
              const newDiff = Math.abs(scroll - getOffset($card));
              if (!$active || newDiff < oldDiff) {
                $active = $card;
                oldDiff = newDiff;
              }
            });
          }
          $dot = $pagination.querySelector(
            `[href="#${($active ?? $card[0]).id}"]`
          );
          if ($dot) $dot.classList.add('Dot--active');
        }, 50);
      },
      {passive: true}
    );

    // Improve arrow key navigation
    $carousel.addEventListener('keydown', (ev) => {
      if (/^(Arrow)?Left$/.test(ev.key)) {
        ev.preventDefault();
        (document.dir === 'rtl' ? $next : $previous).click();
      } else if (/(Arrow)?Right$/.test(ev.key)) {
        ev.preventDefault();
        (document.dir === 'rtl' ? $previous : $next).click();
      }
    });

    
    /*// Improve transition when tabbing focus

    let scrollLeft = 0;
    $carousel.addEventListener(
      'blur',
      (ev) => {
        scrollLeft = $carousel.scrollLeft;
      },
      {capture: true}
    );
    $carousel.addEventListener(
      'focus',
      (ev) => {
        $carousel.scrollLeft = scrollLeft;
        const $card = ev.target.closest('.Card');
        if ($card) scrollTo($card);
      },
      {capture: true}
    );
    */
  });

  // Optional polyfill for Safari 14
  if (!isReducedMotion && !window.CSS.supports('scroll-behavior: smooth')) {
    import('https://cdn.skypack.dev/smoothscroll-polyfill').then((module) => {
      module.polyfill();
    });
  }

  $(".slider--prev, .slider--next").click(function() {
      var t = $(this)
        , e = $(".slider").find(".slider--item-left")
        , i = $(".slider").children().index(e)
        , n = $(".slider").find(".slider--item-center")
        , s = $(".slider").children().index(n)
        , r = $(".slider").find(".slider--item-right")
        , o = $(".slider").children().index(r)
        , a = $(".slider").children().length
        , l = $(".slider--item-left")
        , c = $(".slider--item-center")
        , h = $(".slider--item-right")
        , u = $(".slider--item");
      $(".slider").animate({
          opacity: 0
      }, 400),
      setTimeout(function() {
          t.hasClass("slider--next") ? a - 1 > i && a - 1 > s && a - 1 > o ? (l.removeClass("slider--item-left").next().addClass("slider--item-left"),
          c.removeClass("slider--item-center").next().addClass("slider--item-center"),
          h.removeClass("slider--item-right").next().addClass("slider--item-right")) : i === a - 1 ? (u.removeClass("slider--item-left").first().addClass("slider--item-left"),
          c.removeClass("slider--item-center").next().addClass("slider--item-center"),
          h.removeClass("slider--item-right").next().addClass("slider--item-right")) : s === a - 1 ? (l.removeClass("slider--item-left").next().addClass("slider--item-left"),
          u.removeClass("slider--item-center").first().addClass("slider--item-center"),
          h.removeClass("slider--item-right").next().addClass("slider--item-right")) : (l.removeClass("slider--item-left").next().addClass("slider--item-left"),
          c.removeClass("slider--item-center").next().addClass("slider--item-center"),
          u.removeClass("slider--item-right").first().addClass("slider--item-right")) : 0 !== i && 0 !== s && 0 !== o ? (l.removeClass("slider--item-left").prev().addClass("slider--item-left"),
          c.removeClass("slider--item-center").prev().addClass("slider--item-center"),
          h.removeClass("slider--item-right").prev().addClass("slider--item-right")) : 0 === i ? (u.removeClass("slider--item-left").last().addClass("slider--item-left"),
          c.removeClass("slider--item-center").prev().addClass("slider--item-center"),
          h.removeClass("slider--item-right").prev().addClass("slider--item-right")) : 0 === s ? (l.removeClass("slider--item-left").prev().addClass("slider--item-left"),
          u.removeClass("slider--item-center").last().addClass("slider--item-center"),
          h.removeClass("slider--item-right").prev().addClass("slider--item-right")) : (l.removeClass("slider--item-left").prev().addClass("slider--item-left"),
          c.removeClass("slider--item-center").prev().addClass("slider--item-center"),
          u.removeClass("slider--item-right").last().addClass("slider--item-right"))
      }, 400),
      $(".slider").animate({
          opacity: 1
      }, 400)
  });

  // Toggle right-to-left for demo
  document.querySelector('#toggle-rtl').addEventListener('change', (ev) => {
    document.dir = ev.target.checked ? 'rtl' : 'ltr';
    document.querySelectorAll('.Carousel').forEach(($carousel) => {
      $carousel.scrollLeft = 0;
    });
  });

  // Toggle single slides class for demo
  document.querySelector('#toggle-single').addEventListener('change', (ev) => {
    document.querySelectorAll('.Carousel').forEach(($carousel) => {
      $carousel.classList.toggle('Carousel--single', ev.target.checked);
    });
  });
})();