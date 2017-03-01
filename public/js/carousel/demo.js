function Carousel(containerID) {
	this.container = document.getElementById(containerID) || document.body;
	this.slides = this.container.querySelectorAll('.carouselScene');
	this.total = this.slides.length - 1;
	this.current = 0;
	this.prevBtn = this.container.querySelectorAll('#prev')[0];
	this.nextBtn = this.container.querySelectorAll('#next')[0];

	this.prevBtn.addEventListener("click", this.prev.bind(this))
	this.nextBtn.addEventListener("click", this.next.bind(this))
	// console.warn(this.stop);
	// start on slide 1
	// this.slide(this.current);
	// this.prev(1000);
}
// NEXT
Carousel.prototype.next = function (interval) {
	this.loopIndex++;
	this.stop();
	this.slide(this.currentElement());

	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.next(interval);
		}, interval);
	}
};
// PREVIOUS
Carousel.prototype.prev = function (interval) {
	this.loopIndex--;
	this.stop();
	this.slide(this.currentElement());

	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.prev(interval);
		}, interval);
	}
};
// STOP PLAYING
Carousel.prototype.stop = function () {
	clearTimeout(this.run);
};
// SELECT SLIDE
Carousel.prototype.playNextElement = function (index) {
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

module.exports = Carousel;