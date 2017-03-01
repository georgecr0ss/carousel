// var Carousel = require('./carousel/demo');
var Carousel = require('./carousel/carousel');

window.onload = function () {
	var bgImage = 'https://i.ytimg.com/vi/J6g53Hm0rq4/maxresdefault.jpg';
	var CarouselEl = new Carousel();

	var sceneOneBG = 'http://www.bentleymotors.com/content/dam/bentley/Master/Models/Hero/PAST%20MODELS/ContinentalSprSprts_Hero_1920x670.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg.image_file.1116.389.file/cq5dam.web.1280.1280.jpg';
	var sceneTwoBG = 'https://i.kinja-img.com/gawker-media/image/upload/s--qp2F6uPK--/c_scale,fl_progressive,q_80,w_800/im4ymrlztv9j1befkpoa.jpg';
	var screenThreeBG = 'http://www.supercars.net/blog/wp-content/uploads/2016/05/1990-Ferrari-F40-4.jpg';
	var screenFourBG = 'http://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg';
	var screenFiveBG = 'http://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg';

	var array = [
		{
			// image: sceneOneBG,
			color: "#aaf0ff",
			parent: 'carousel'
		},
		{
			// image: sceneTwoBG,
			color: "#ffff00",
			parent: 'carousel'
		},
		{
			// image: screenThreeBG,
			color: "#f0aaf0",
			parent: 'carousel'
		},
		{
			// image: screenFourBG,
			color: "#f0ffaa",
			parent: 'carousel'
		},
		{
			// image: screenFiveBG,
			color: "#f0ffaa",
			parent: 'carousel'
		}
	];

	// CarouselEl.anime(array);
	var sceneTransition = function(nextScreen) {
		var time = 2;
		var carouselClass = document.querySelectorAll(".carouselScene")
		this.tween = new TimelineMax({paused: false});

		this.tween
			.to(carouselClass[0], time, {left: 0, ease: Bounce.easeOut})
			.to(carouselClass[1], time, {left: 0, ease: Bounce.easeOut})
			.to(carouselClass[2], time, {left: 0, ease: Bounce.easeOut})
			.to(carouselClass[3], time, {left: 0, ease: Bounce.easeOut})
	}
	sceneTransition();
}
