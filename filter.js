// "Фильтр"
// 30-07-2019

'use strict';

(function () {
	
	let base = [
		{
			title: 'Товар №1',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 1',
			massa: 10
		},
		{
			title: 'Товар №2',
			img: 'http://zaokurs.ru/assets/images/products/254/medium/maket-dlya-miniatyur-20191.jpg',
			content: 'контент 2',
			massa: 20
		},		
		{
			title: 'Товар №3',
			img: 'http://zaokurs.ru/assets/images/products/255/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 3',
			massa: 30
		},
		{
			title: 'Товар №4',
			img: 'http://zaokurs.ru/assets/images/products/260/medium/akkumulyator-fl-500mp-y5.jpg',
			content: 'контент 4',
			massa: 40
		},
		{
			title: 'Товар №5',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 5',
			massa: 50
		}		
	]
	
	const filterWrap = document.querySelector('.filterWrap');
	const templateProduct = filterWrap.querySelector('#templateProduct').content.querySelector('.product');
	
	const filterElements = {
		criterions: filterWrap.querySelector('.criterions'),
		products: filterWrap.querySelector('.products'),
		buttonExecute: filterWrap.querySelector('.buttonExecute')
	};
	
	drawAllProducts ();
	function drawAllProducts () {
		for (let i = 0; i < base.length; i++) {
			let product = templateProduct.cloneNode(true);
			product.querySelector('.title').textContent = base[i].title;
			product.querySelector('.image').src = base[i].img;
			product.querySelector('.content').textContent = base[i].content;
			filterElements.products.appendChild(product);
		}
	}

})();