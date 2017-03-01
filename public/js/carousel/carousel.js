var carouselEmitter = require('../utils/events');
var Scene = require('./scene');


var Carousel = function(parent, bgImage) {
	this.carousel = document.createElement('div');
	this.carousel.id = 'carousel';

	this.elements = [];
	this.image = new Image();

	this.loopIndex = 0;
	this.loopIndexCorrection = 0;

	this.arrowState = false;
	// this.playCarousel = new TimelineMax();

	var grandParent = document.getElementById("scene");
	grandParent.appendChild(this.carousel);

	this.createArrows();
	this.image.onload = function(){

	}.bind(this);
	this.image.src = bgImage;
	this.anime.bind(this)
	return this;
};

Carousel.prototype.Scene = Scene;

Carousel.prototype.anime = function(array) {
	var self = this;
	this.screens = array.map(function(element) {
	// debugger;
		return new this.Scene(element, nextScreen.bind(this));
	}, this);

	this.index = 0;

	function nextScreen() {
		// self.screens[self.index].tween.kill();
		self.index++;
		self.index = (self.index) % self.screens.length;
		console.warn(self.screens[self.index]);
		self.screens[self.index].tween.play();
	}

	function playFirstScreen () {
		self.screens[self.index].tween.play();
	}

	playFirstScreen();

	// this.callNextScreen = setInterval(function () {
	// 	self.nextScreen();
	// }, 2500);

};
Carousel.prototype.stop = function () {
	clearTimeout(self.nextScreen());
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

	// this.carousel.addEventListener('mouseover', this.arrowsState.bind(this, true));
	// this.carousel.addEventListener('mouseout', this.arrowsState.bind(this, false));
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

			clearInterval(this.callNextScreen);
			this.screens[this.index].tween.pause();
			break;
		case false:
			this.arrows[0].style.display = 'none';
			this.arrows[1].style.display = 'none';
			var self = this;
			this.screens[this.index].tween.play();
			// console.warn(this.callNextScreen);
			// setInterval(function() {
			// 	self.nextScreen()
			// }, 2500);
			// this.screens[this.index].tween.play();
			break;
		default:
			break;
	}
};

Carousel.prototype.appendElement = function(child) {
	this.child = child;
	this.carousel.appendChild(this.child);
};

module.exports = Carousel;
