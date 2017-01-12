var Carousel = require('./carousel/carousel');
var Scene = require('./carousel/scene');

window.onload = function () {
	var bgImage = 'https://i.ytimg.com/vi/J6g53Hm0rq4/maxresdefault.jpg';
	var CarouselEl = new Carousel('scene', bgImage);

	var sceneOneBG = 'http://www.bentleymotors.com/content/dam/bentley/Master/Models/Hero/PAST%20MODELS/ContinentalSprSprts_Hero_1920x670.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg.image_file.1116.389.file/cq5dam.web.1280.1280.jpg';
	var sceneTwoBG = 'https://i.kinja-img.com/gawker-media/image/upload/s--qp2F6uPK--/c_scale,fl_progressive,q_80,w_800/im4ymrlztv9j1befkpoa.jpg';
	var screenThreeBG = 'http://www.supercars.net/blog/wp-content/uploads/2016/05/1990-Ferrari-F40-4.jpg';
	var screenFourBG = 'http://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg';
	var screenFiveBG = 'http://wowslider.com/sliders/demo-77/data1/images/idaho239691_1920.jpg';

	var scene = new Scene(sceneOneBG,"#aaf0ff");
	var scene2 = new Scene(sceneTwoBG, "#ffff00");
	var scene3 = new Scene(screenThreeBG, "#f0fff0");
	var scene4 = new Scene(screenFourBG, "#f0aaf0");
	var scene5 = new Scene(screenFiveBG, "#f0ffaa");

	CarouselEl.addElements([scene,scene2,scene3,scene4,scene5]);

}
