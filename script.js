gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

  const panels = gsap.utils.toArray(".parallax-item");
  const lastCard = document.querySelector(".parallax-item.last");
  const foot = document.querySelector(".foot");

  panels.forEach((panel, i, sections) => {
    ScrollTrigger.create({
      trigger: panel,
      start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
      end:
        i === sections.length
          ? `+=${lastCard.offsetHeight / 2}` 
          : lastCard.offsetTop,
      pin: true,
      pinSpacing: false,
      markers: true,
    })
  })

  const heroH1 = document.querySelector(".hero h1");
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "+=400vh",
    scrub: 1,
    onUpdate: (self) => {
      let opacityProgress = self.progress;
      heroH1.style.opacity = 1 - opacityProgress;
    }
  })

  const footH1 = document.querySelector(".foot h1");
  ScrollTrigger.create({
    trigger: ".foot",
    start: "top center",
    scrub: 1,
    markers: true,
    onUpdate: (self) => {
      let opacityProgress = self.progress;
      footH1.style.opacity = 0 + opacityProgress;
    }
  })
  
  function animateChars(chars, reverse = false) {
    const staggerOptions = {
      each: 0.35,
      from: reverse ? "start" : "end",
      ease: "linear",
    };

    gsap.fromTo(
      chars,
      { fontWeight: 100 },
      {
        fontWeight: 900,
        duration: 1,
        ease: "none",
        stagger: staggerOptions,
        scrollTrigger: {
          trigger: chars[0].closest(".marquee-container"),
          start: "50% bottom",
          end: "top top",
          scrub: true,
          markers: true,
        },
      }
    );
  }

  new SplitType(".item h1", { types: "chars" });

  const marqueeContainers = document.querySelectorAll(".marquee-container");
  marqueeContainers.forEach((container, index) => {
    let start = "0%";
    let end = "-15%";

    if (index % 2 === 0) {
      start = "0%";
      end = "10%";
    }

    const marquee = container.querySelector(".marquee");
    const words = marquee.querySelectorAll(".item h1");

    gsap.fromTo(
      marquee,
      {
        x: start,
      },
      {
        x: end,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "150% top",
          scrub: true,
          markers: true,
        },
      }
    );

    words.forEach((word) => {
      /** .item h1 의 쪼갠문자 */
      const chars = Array.from(word.querySelectorAll(".char"));
      if (chars.length) { //chars의 문자수
        const reverse = index % 2 !== 0; //짝수가 아닐때 reverse 에 저장
        animateChars(chars, reverse); // 함수 호출
      }
    });
  });

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 500));
  gsap.ticker.lagSmoothing(0);
})