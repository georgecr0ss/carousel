var config = require('../../config');
var carouselEmitter = require('../utils/events');

console.warn(carouselEmitter);


var Scene = function(data, nextScreen) {
	// console.warn(data);
	this.element = document.createElement('div');
	this.newImage = new Image();
	this.parent = document.getElementById(data.parent);
	console.warn(this.parent);
	this.parent.appendChild(this.element);

	this.element.className = 'carouselScene';
	this.image = data.image;

	this.startPosition;
	this.hidePosition;
	this.shoulPause = false;
	this.position = 0;
	this.element.style.backgroundImage = "url('./pictures/preloader_gear.gif')";
	this.element.style.backgroundColor = data.color;

	this.newImage.onload = function() {
		this.element.style.backgroundImage = "url('" + this.newImage.src + "')";
		this.element.style.backgroundColor = data.color;

		TweenMax.from(this.element, 0.5,{autoAlpha: 0, ease: Circ.easeOut})
	}.bind(this);

	this.newImage.src = this.image;

	this.sceneTransition.call(this, nextScreen);

	return this;
};

Scene.prototype.sceneTransition = function(nextScreen) {
		this.left = this.parent.getBoundingClientRect().width * -1;
		var time = 1.5;
		this.tween = new TimelineMax({paused: true});

		this.tween
			.to(this.element, time, {left: 0})
			.set(this.element, {left: this.left })
			.to(this.element, time, {left:  -1300 ,
				 onStart: function() {
					 nextScreen();
			}})
};

module.exports = Scene;