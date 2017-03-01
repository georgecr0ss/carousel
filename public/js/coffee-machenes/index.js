var coffeeMachines = [
    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQfWwweE8rIyiyJ6hjdmJC5B7SwEh9IwCGhHITBh4wL5ls8yToB',
    'http://shop.illy.com/wcsstore7.00.156.258.02/eShop%20US/Attachment/Product/Machines/Espresso%20Machines/Y3-espresso-tray-angle%20left-304.jpg',
    'http://shop.illy.com/wcsstore7.00.156.258.02/eShop%20US/Attachment/Product/Machines/Espresso%20Machines/E334-machines-espresso-machines-X7-1-304x304.jpg'
];

var CoffeeMachine = function () {
    this.element = document.createElement('div');
    this.coffeeMachineImage = new Image();
    this.element.className = 'coffee-machine-wrapper';

    this.coffeeMachineImage.src = '';
}