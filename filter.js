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
		let criterions = collectCriteria ();				// сбор и группировка отмеченных критериев для фильтрации
		let needFiltering = getNeedFiltering (criterions);	// узнать нужно ли фильтровать
		
		if (needFiltering) {
			clearProductOutput();
			let filteredProducts =  filteringProducts (criterions);		// фильтрация продуктов/товаров
			drawProducts (filteredProducts);
		} else {
			clearProductOutput();
			drawProducts (base);
		};
	}	
	
	// ---

	drawProducts (base);
	function drawProducts (products) {
		for (let i = 0; i < products.length; i++) {
			let product = templateProduct.cloneNode(true);
			product.querySelector('.title').textContent = products[i].title;
			product.querySelector('.image').src = products[i].img;
			product.querySelector('.content').textContent = products[i].content;
			filterElements.products.appendChild(product);
		}
	}
	
	function clearProductOutput() {
		while (filterElements.products.firstChild) {
			filterElements.products.removeChild(filterElements.products.firstChild);
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
	
	function getNeedFiltering (filteringСriteria) {
		let need = false;
		for (let key in filteringСriteria) {
			need = (filteringСriteria[key].length > 0) ? true : false;			
			if (need) {break;};			
		}
		return need;
	}
	
	function filteringProducts (filteringСriteria) {
		
	}

})(); 









