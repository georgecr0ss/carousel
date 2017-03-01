
window.onload = function () {
	var bgImage = 'https://i.ytimg.com/vi/J6g53Hm0rq4/maxresdefault.jpg';


var Scene = function(data) {
	console.warn(data);
	this.element = document.createElement('div');
	this.newImage = new Image();
	this.parent = document.getElementById(data.parent);
	this.parent.appendChild(this.element);

	this.element.className = 'carouselScene';
	this.image = data.image;

	this.startPosition;
	this.hidePosition;
	this.shoulPause = false;
	this.position = 0;
	this.element.style.backgroundImage = "url('./pictures/preloader_gear.gif')";

	this.newImage.onload = function() {
		this.element.style.backgroundImage = "url('" + this.newImage.src + "')";
		this.element.style.backgroundColor = data.color;

		TweenMax.from(this.element, 0.5,{autoAlpha: 0, ease: Circ.easeOut})
	}.bind(this);

	this.newImage.src = this.image;

	this.sceneTransition.call(this, data.checkLoop);
	return this;
};

Scene.prototype.sceneTransition = function(checkLoop) {

		this.tween = new TimelineMax({paused: true, onStart: function() {
			// this.setPosition();
			console.log(3333333333);
		}});

		this.tween
			.to(this.element, 1, {left: 0})
			.to(this.element, 1, {left:  -this.parent.getBoundingClientRect().width,
				onStart: function() {
					checkLoop();
				}, onComplete: function() {
			}}, '+=1.5')
			.set(this.element, {left: this.parent.getBoundingClientRect().width})
};
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

	// carouselEmitter.on('update', this.animation.bind(this));

	this.createArrows();
	this.image.onload = function(){

	}.bind(this);
	this.image.src = bgImage;
	return this;
};

Carousel.prototype.scene = Scene;

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

Carousel.prototype.anime = function(array) {
	var screens = array.map(function(element) {

		element.checkLoop = checkLoop;

		return new this.scene(element);
	}, this);
	var self = this;
	var index = 0;

	function nextScreen () {
		index++;
		index = (index) % screens.length;
		console.log(index);
		screens[index].tween.restart();
		console.log(66666666666);
	}

	function playFirstScreen () {
		screens[index].tween.play();
		console.log(111111111111111);
	}

	playFirstScreen();

	function checkLoop () {
		nextScreen();
		console.log(222222222222);
	}

	console.warn(screens);
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

	var CarouselEl = new Carousel('scene', bgImage);

	var sceneOneBG = 'http://www.bentleymotors.com/content/dam/bentley/Master/Models/Hero/PAST%20MODELS/ContinentalSprSprts_Hero_1920x670.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg.image_file.1116.389.file/cq5dam.web.1280.1280.jpg';
	var sceneTwoBG = 'https://i.kinja-img.com/gawker-media/image/upload/s--qp2F6uPK--/c_scale,fl_progressive,q_80,w_800/im4ymrlztv9j1befkpoa.jpg';
	var screenThreeBG = 'http://www.supercars.net/blog/wp-content/uploads/2016/05/1990-Ferrari-F40-4.jpg';
	var screenFourBG = 'http://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg';
	var screenFiveBG = 'http://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg';

	// var scene = new Scene(sceneOneBG,"#aaf0ff");
	// var scene2 = new Scene(sceneTwoBG, "#ffff00");
	// var scene3 = new Scene(screenThreeBG, "#f0fff0");
	// var scene4 = new Scene(screenFourBG, "#f0aaf0");
	// var scene5 = new Scene(screenFiveBG, "#f0ffaa");

	var array = [
		{
			image: sceneOneBG,
			color: "#aaf0ff",
			parent: 'carousel'
		},
		{
			image: sceneTwoBG,
			color: "#ffff00",
			parent: 'carousel'
		},
		{
			image: screenThreeBG,
			color: "#f0aaf0",
			parent: 'carousel'
		},
		{
			image: screenFourBG,
			color: "#f0ffaa",
			parent: 'carousel'
		},
		{
			image: screenFiveBG,
			color: "#f0ffaa",
			parent: 'carousel'
		}
	];

	CarouselEl.anime(array);

}
