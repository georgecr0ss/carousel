var carouselEmitter = require('../utils/events');

var Carousel = function(parent, bgImage) {
	this.carousel = document.createElement('div');
	this.carousel.id = 'carousel';

	this.elements = [];
	this.image = new Image();

	this.loopIndex = 0;
	this.loopIndexCorrection = 0;

	this.arrowState = false;
	this.playCarousel = new TimelineMax();

	var grandParent = document.getElementById(parent);
	grandParent.appendChild(this.carousel);

	carouselEmitter.on('update', this.animation.bind(this));

	this.createArrows();
	this.image.onload = function(){

	}.bind(this);
	this.image.src = bgImage;
	return this;
};

Carousel.prototype.addElements = function(array) {
	var type = typeof array === 'object';

	if(type) {
		var self = this;
		array.map(function(el) {
			if(typeof el === 'object') {
				self.appendElement(el.element)
			}

			self.elements.push(el);
		});
	} else {
		this.elements.push(array);
	}
	this.initScene();
	return this;
};

Carousel.prototype.log = function(array) {
	console.warn(7777777);
};

Carousel.prototype.curretnElement = function(customeIndex) {
	var index =  customeIndex !== undefined ? getCustomIndex.call(this, customeIndex) : updateIndex.call(this);

	function getCustomIndex(passedIndex) {
		return passedIndex % this.elements.length;
	}

	function updateIndex() {
		this.loopIndex = (this.loopIndex) % this.elements.length;

		return this.loopIndex;
	}

	return this.elements[ index ];
};

Carousel.prototype.nextElement = function() {
	console.error(this.loopIndex);
	this.loopIndex++;
	return this.curretnElement();
};

Carousel.prototype.prevElement = function() {
	this.loopIndex += this.elements.length - 1;

	return this.curretnElement();
};

Carousel.prototype.createArrows = function() {
	this.leftArrow = document.createElement('div');
	this.rightArrow = document.createElement('div');

	this.leftArrow.id = 'leftArrow';
	this.rightArrow.id = 'rightArrow';

	this.leftArrow.className = 'arrows';
	this.rightArrow.className = 'arrows';

	this.appendElement(this.leftArrow);
	this.appendElement(this.rightArrow);

	this.arrows = document.getElementsByClassName('arrows');


	this.leftArrow.removeEventListener("click", this.playNextElement.bind(this, true))
	this.rightArrow.removeEventListener("click", this.playPrevElement.bind(this))

	this.carousel.addEventListener('mouseover', this.arrowsState.bind(this, true));
	this.carousel.addEventListener('mouseout', this.arrowsState.bind(this, false));
};

Carousel.prototype.hidePosition = function() {
	var carouselBounds = this.carousel.getBoundingClientRect()
	return carouselBounds.width;
};

Carousel.prototype.arrowsState = function(state) {
	switch (state) {
		case true:
			this.arrows[0].style.display = 'inline';
			this.arrows[1].style.display = 'inline';
			break;
		case false:
			this.arrows[0].style.display = 'none';
			this.arrows[1].style.display = 'none';
			break;
		default:
			break;
	}
};

Carousel.prototype.appendElement = function(child) {
	this.child = child;
	this.carousel.appendChild(this.child);
};


Carousel.prototype.eventEmmiter = function(subject, event, callback) {
	this.subject = subject;
	this.event = event;
	this.callback = callback;

	this.subject.addEventListener(this.event, this.callback);
};

Carousel.prototype.animation = function() {
	console.warn(this.nextElement());
	this.nextAnimationElement = this.nextElement();
	this.nextAnimationElement.controls().play()
};

Carousel.prototype.initScene = function() {
	var position = this.hidePosition();
	this.currentAnimationElement = this.curretnElement();

	this.currentAnimationElement.controls().play();
};

Carousel.prototype.playNextElement = function(tween) {
	var current = this.curretnElement().element;
	var next = this.nextElement().element;
	var nextElPos = this.hidePosition();
	var tweenNextElement = new TimelineMax();

	tweenNextElement
		.set(next, {left: nextElPos})
		.to(current, 1, {left: -nextElPos, ease: Power2.easeOut})
		.to(next, 1, {left: 0, ease: Power2.easeOut}, '-=1')
};

Carousel.prototype.playPrevElement = function() {
	var current = this.curretnElement().element;
	var prev = this.prevElement().element;
	var currPos = this.hidePosition();
	var tweenPrevElement = new TimelineMax();

	tweenPrevElement
		.set(prev, {left: -currPos, ease: Power2.easeOut})
		.to(current, 0.6, {left: currPos, ease: Power2.easeOut})
		.to(prev, 0.6, {left: 0, ease: Power2.easeOut})
};

module.exports = Carousel;
