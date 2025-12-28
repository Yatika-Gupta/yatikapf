// ===============================
// INITIAL VALUE SETTERS
// ===============================
function valueSetters() {
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home span .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });
}

// ===============================
// REVEAL TEXT → WRAP INTO SPANS
// ===============================
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    // keep original HTML (IMPORTANT)
    child.innerHTML = elem.innerHTML;

    parent.appendChild(child);
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

// ===============================
// LOADER ANIMATION
// ===============================
function loaderAnimation() {
  var tl = gsap.timeline();

  tl
    // Loader text enter
    .from("#loader .child span", {
      x: 100,
      stagger: 0.5,
      duration: 1.4,
      ease: Power3.easeInOut
    })

    // Background fade
    .to(
      "#loader #bg-image",
      {
        opacity: 0.02,
        duration: 1.5,
        delay: -0.5,
        ease: "power3.out"
      },
      "-=0.6"
    )

    // Loader text exit
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 0.4,
      delay: 0.4,
      ease: "circ.easeInOut"
    })

    // Loader collapse
    .to("#loader", {
      height: 0,
      duration: 0.4,
      ease: "circ.easeInOut"
    })

    // Green wipe in
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 0.6,
      delay: -0.4,
      ease: "circ.easeInOut"
    })

    // Green wipe out
    .to("#green", {
      height: "0%",
      duration: 0.6,
      delay: -0.3,
      ease: "circ.easeInOut",
      onComplete: function () {
        animateHomePage(); // runs ONLY after loader finishes

        locoInitialize();
      }
    });
}

// ===============================
// HOME PAGE ANIMATION
// ===============================
function animateHomePage() {
  var tl = gsap.timeline();

  tl
    // Nav animation
    .to("#nav a", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: Expo.easeInOut
    })

    // Home text reveal
    .to("#home .parent .child", {
      y: 0,
      stagger: 0.1,
      duration: 1,
      ease: Expo.easeInOut
    })

    // Image fade in
    .to(
      "#home .row img",
      {
        opacity: 1,
        ease: Power2.easeInOut
      },
      "-=1.5"
    );
}

// ===============================
// VISUAL TEXT ANIMATION
// ===============================
function animateVisualText() {
  gsap.fromTo(
    "#vtext",
    {
      y: 60,
      opacity: 0,
      scale: 0.96
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.2,
      onComplete: () => {
        gsap.to("#vtext", {
          textShadow: "0 0 12px rgba(20, 207, 147, 0.6)",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }
    }
  );
}

// ===============================
// LOCAL TIME (INDIA)
// ===============================


function updateLocalTime() {
  const timeEl = document.getElementById("local-time");

  function setTime() {
    const now = new Date();

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata"
    };

    const timeString = new Intl.DateTimeFormat("en-IN", options).format(now);
    timeEl.textContent = timeString;
  }

  setTime();                 // run immediately
  setInterval(setTime, 60000); // update every minute
}

// ===============================
// LOCOMOTIVE SCROLL
// ===============================

let locoScroll;

function locoInitialize() {
  if (window.innerWidth < 768) {
    // ❌ NO locomotive on mobile
    document.body.style.overflow = "auto";
    return;
  }

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#maincnt"),
    smooth: true,
    smartphone: {
      smooth: false
    },
    tablet: {
      smooth: false
    }
  });

  setTimeout(() => {
    locoScroll.update();
  }, 1000);
}


// ===============================
// NAV SMOOTH SCROLL (LOCOMOTIVE SAFE)
// ===============================
// document.querySelectorAll('#nav a[data-scroll-to]').forEach(link => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();

//     const targetId = link.dataset.scrollTo;

//     if (!targetId) return;              // 🛑 safety
//     if (!locoScroll) return;            // 🛑 safety

//     locoScroll.scrollTo(`#${targetId}`, {
//       duration: 1.2,
//       easing: [0.25, 0.00, 0.35, 1.00]
//     });
//   });
// });



// ================= EMAIL MODAL =================

const contactNav = document.getElementById('contact-btn');

const modal = document.getElementById('email-modal');
const emailText = document.getElementById('emailText');
const copyHint = document.getElementById('copyHint');

// open modal
contactNav.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
});

// close on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// copy email
emailText.addEventListener('click', () => {
  navigator.clipboard.writeText(emailText.innerText);
  copyHint.innerText = 'Copied!';
});


// ===============================
// FUNCTION CALL ORDER (IMPORTANT)
// ===============================
revealToSpan();
valueSetters();

loaderAnimation();

animateVisualText();
locoInitialize();
updateLocalTime();

// cardShow();
