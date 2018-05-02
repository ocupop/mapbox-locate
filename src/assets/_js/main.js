import Map from './Map';

const heroHome = document.getElementById("hero-home");

if(heroHome) {
  let nextParticle = new NextParticle({
    image: document.all.logo,
    addTimestamp: true,
    width: window.innerWidth,
    height: 600,
    initPosition: 'random',
    initDirection: 'random',
    fadeDirection: 'random',
    fadePosition: 'random',
    particleGap: '1',
    maxWidth: '100%',
    disableInteraction: true,    
  });
  
  window.onresize = function() {
    nextParticle.width = window.innerWidth;;
    nextParticle.height = 600;
    nextParticle.start();
  };
}

$(document).ready(function () {
  $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("show");
      if (_opened === true && !clickover.hasClass("navbar-toggler")) {
          $(".navbar-toggler").click();
      }
  });
});

