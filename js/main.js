AOS.init({
  easing: 'ease-out-back',
  duration: 1000,
  once: true

});

$(document).ready(function() {
  $("#menu-toggler").click(function() {
    toggleBodyClass("menu-active");
  });
  function toggleBodyClass(className) {
    document.body.classList.toggle(className);
  }
 });
const header=document.querySelector('.main-header');
window.addEventListener('scroll',()=>{
  const scrollPos=window.scrollY;
  //console.log(scrollPos);
  if(scrollPos>10  ){

    header.classList.add('scrolled');
  }
  else
  {
    header.classList.remove('scrolled');
  }
  
  
})

$('.filters ul li').click(function(){
  $('.filters ul li').removeClass('active');
  $(this).addClass('active');
  
  var data = $(this).attr('data-filter');
  $grid.isotope({
    filter: data
  })
});

var $grid = $(".grid").isotope({
  itemSelector: ".all",
  percentPosition: true,
  masonry: {
    columnWidth: ".all"
  }
})
var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },900);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

  $('.nav__link').click(function(){
    $("body").removeClass('menu-active');
  });


$(document).scroll(function () {
  $('section').each(function () {
      if($(this).position().top <= $(document).scrollTop() && ($(this).position().top + $(this).outerHeight()) > $(document).scrollTop()) {
          if(($(this).attr('id')=="about")||($(this).attr('id')=="portfolio")){
            header.classList.remove('scrolledodd');
            header.classList.add('scrolled');
           
          }
         
          if($(this).attr('id')=="skills"){
            header.classList.remove('scrolled');
            header.classList.add('scrolledodd');
            
          }
        
      }
  });
});


(function($){
	$( document ).ready( function() {
		$('.nav__link[href*="#"]').off();
		$(document).on('click', '.nav__link[href*="#"]', function(e) {
      $("body").removeClass('menu-active');
		e.preventDefault();
		console.log( $(this).attr('href') );
		var hash = '#' + $(this).attr('href').split('#')[1];
		if ( hash == '#' ) return false;
		$('html, body').stop().animate({ scrollTop : $(hash).offset().top - $('.navbar').height() });
		} );
	});
})(jQuery);


function ball(name) {
  // DOM Object
  this.name= name;
  this.obj= document.getElementById(name);
  // Size
  this.size= {
    x: this.obj.offsetWidth, 
    y: this.obj.offsetHeight
  }
  // Parent size
  this.sizeParent= {
    x: this.obj.offsetParent.offsetWidth, 
    y: this.obj.offsetParent.offsetHeight
  }
  // Minimum position
  this.posMin= {
    x: this.size.x/2, 
    y: this.size.y/2
  }
  // Maximum position
  this.posMax= {
    x: this.sizeParent.x-this.size.x,
    y: this.sizeParent.y-this.size.y
  }
  // Actual position
  this.pos= {
    x: this.posMin.x, 
    y: this.posMin.y
  };
  // Actual speed
  this.speed= {
    x: 0, 
    y: 0
  };  
  // Update time
  var time= (new Date()).getTime()/1000;
  
  // Move to new position
  this.move= function(x, y){
    // Limit
    this.pos.x= Math.min(this.posMax.x,
      Math.max(this.posMin.x, x));
    this.pos.y= Math.min(this.posMax.y,
      Math.max(this.posMax.y, y));
    // Updated
    time= (new Date()).getTime()/1000;
  };
  
  // Paint
  this.paint= function(){
    
    // Bounce calculation
    // pos= current position
    // min= minimum position
    // max= maximum position
    // move= movement
    // Return new postion and bounce=true if bounced
    var bounced;
    function bounce(pos, min, max, move){
      var range= max-min;
      // Normalize to [-2*range .. +2*range]
      if (move < 0) {
        move= -(-move%(2*range));
      } else {
        move= move%(2*range);          
      }
      // New position without bounces
      var npos= pos+move;
      // Bounce on min side
      if (pos-min < -move && -move < range) {
        bounced= true;
        return 2*min-npos;
      }
      // Bounce on max side
      if (max-pos < move && move < range) {
        bounced= true;
        return 2*max-npos;
      }
      // No bounce, or even number of bounces
      bounced= false;
      return (npos+2*range)%(2*range);
    }
    
    // Delta t
    var now= (new Date()).getTime()/1000;
    var dt= now-time;
    time= now;
    // Move
    this.pos.x= bounce(
      this.pos.x, 
      this.posMin.x, this.posMax.x,
      this.speed.x*dt
    );
    if (bounced) { this.speed.x= -this.speed.x; }
    this.pos.y= bounce(
      this.pos.y, 
      this.posMin.y, this.posMax.y,
      this.speed.y*dt
    );
    if (bounced) { this.speed.y= -this.speed.y; }
    
    // Move
    this.obj.style.left= (this.pos.x-this.size.x/2) + "px";
    this.obj.style.top= (this.pos.y-this.size.y/2) + "px";
  } 
}

// Balls
var js= new ball("js");
var html= new ball("html");
var css= new ball("css");
var c= new ball("c");
var bootstrap= new ball("bootstrap");
var php= new ball("php");
var balls= [ js, html, css,c,bootstrap,php ];

// Random speed
function randomSpeed(i) {
  balls[i].speed.x= 1000*(Math.random()-0.5);
  balls[i].speed.y= 1000*(Math.random()-0.5);
}

// Initial speed
for (var i= 0; i < balls.length; i++) {
  randomSpeed(i);
}

// Play
window.setInterval(function(){
  randomSpeed(Math.floor(3*Math.random()));
}, 2000);

// Paint
window.setInterval(function(){
  js.paint();
  html.paint();
  css.paint();
  c.paint();
  php.paint();
  bootstrap.paint();
}, 10);
