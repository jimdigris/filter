// "Фильтр"
// 30-07-2019

'use strict';

(function () {
	
	let base = [
		{
			title: 'Товар №1',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 1',
			massa: 10,
			height: 100
		},
		{
			title: 'Товар №2',
			img: 'http://zaokurs.ru/assets/images/products/254/medium/maket-dlya-miniatyur-20191.jpg',
			content: 'контент 2',
			massa: 20,
			height: 200
		},		
		{
			title: 'Товар №3',
			img: 'http://zaokurs.ru/assets/images/products/255/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 3',
			massa: 30,
			height: 300
		},
		{
			title: 'Товар №4',
			img: 'http://zaokurs.ru/assets/images/products/260/medium/akkumulyator-fl-500mp-y5.jpg',
			content: 'контент 4',
			massa: 40,
			height: 400
		},
		{
			title: 'Товар №5',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 5',
			massa: 50,
			height: 500
		}		
	]
	
	const filterWrap = document.querySelector('.filterWrap');
	const filterElements = {
		criterions: filterWrap.querySelector('.criterions').querySelectorAll('.criterion'),
		products: filterWrap.querySelector('.products'),
		buttonExecute: filterWrap.querySelector('.buttonExecute')
	};
	const templateProduct = filterWrap.querySelector('#templateProduct').content.querySelector('.product');	
	
	// ---
	
	filterElements.buttonExecute.addEventListener('click', onButtonExecuteClick);	
	
	// ---

	function onButtonExecuteClick () {
		let criterions = collectCriteria ();	// сбор и группирвка отмеченных критериев для фильтрации
		filteringProducts (criterions);			// фильтрация продуктов/товаров
	}	

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
	
	function collectCriteria () {
		let criterionsAll = {};
		
		// перебираем все критерии (блоки с чекбоксами объединенные по смыслу)
		for (let i = 0; i < filterElements.criterions.length; i++) {
			
			// перебираем все опции (чекбоксы) текущего критерия
			let optionsElements = filterElements.criterions[i].querySelectorAll('input');
			let optionsAll = [];
			for (let j = 0; j < optionsElements.length; j++) {
				if (optionsElements[j].checked) {
					optionsAll.push(optionsElements[j].value);
				}
			}
			criterionsAll[filterElements.criterions[i].id] = optionsAll;
		}		
		return criterionsAll;
	}
	
	function filteringProducts (filteringСriteria) {
		console.log(filteringСriteria);
		
		// удаляем текущие продукты
		while (filterElements.products.firstChild) {
			filterElements.products.removeChild(filterElements.products.firstChild);
		}
	}


})();









