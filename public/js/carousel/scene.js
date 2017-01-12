var config = require('../../config');
var carouselEmitter = require('../utils/events');

console.warn(carouselEmitter);


var Scene = function(image, color) {

	this.element = document.createElement('div');
	this.newImage = new Image();

	this.element.className = 'carouselScene';
	this.image = image;

	this.startPosition;
	this.hidePosition;
	this.shoulPause = false;
	this.position = 0;
	this.tween = new TimelineMax({paused: true, onStart: function() {
		this.setPosition();
	}.bind(this)});

	this.element.style.backgroundImage = "url('./pictures/preloader_gear.gif')";

	this.newImage.onload = function() {
		this.element.style.backgroundImage = "url('" + this.newImage.src + "')";
		this.element.style.backgroundColor = color;

		TweenMax.from(this.element, 0.5,{autoAlpha: 0, ease: Circ.easeOut})
	}.bind(this);

	this.newImage.src = this.image;

	return this;
};

Scene.prototype.sceneTransition = function(position) {
		this.tween
			.set(this.element, {left: position.width})
			.to(this.element, 1, {left: 0, ease: Power1.easeOut, onComplete:function() {console.warn('zcxxzcxzc');} })
			.to(this.element, 1, {left:  -position.width, ease: Power1.easeOut, onStart: function() {
				carouselEmitter.emit('update')
			}, onComplete: function() {
					console.warn('almost finish');
					this.controls().kill.call(this);
			}.bind(this)}, '+=2.5')
};

Scene.prototype.setPosition = function() {
	this.elBoundings = document.getElementById('carousel').getBoundingClientRect();

	return this.position = {
		right: this.elBoundings.right,
		width: this.elBoundings.width
	};
};

Scene.prototype.controls = function() {
	return {
		play: function() {
			this.sceneTransition(this.setPosition());
			this.tween.play();
		}.bind(this),
		pause: function() {

		},
		kill: function() {
			this.tween.kill();
		}
	};
};

module.exports = Scene;