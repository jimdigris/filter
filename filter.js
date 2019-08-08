// "Фильтр"
// 08-08-2019

/* - Логика скрипта -

- в html есть блок с критериями фильтрации - "criterions";
- в нутри него находятся вложенные блоки, разделенные логически - "criterion" (например "масса", "высота");
- в нутри них в свою очередь находятся критерии для своего логического блока - input type="checkbox" (например для "масса" - разные варианты массы: 10, 20, ...);
- в html есть блок для вывода продуктов/товаров, куда выводятся либо все товары, либо отфильтрованные - "products";

- каждый "criterion" должен иметь "id" равный названию свойства товара, по которому будет проходть фильтрация (например massa или height),
  по этому названию будет проходить отбор свойств, участвующих в фильтрации;
  
Порядок работы:
1) происходит нажатие кн "фильрация";
2) идет сбор отмеченных чекбоксов для фильтрации;
3) далее идет проверка было ли что то отмечено или нет:
  - если нет, то выводятся все продукты/товары, т.е. обновляется поле с выводом товаров 
  (если ранее были выведены отфильтрованнве товары, то после нажатия кн фильтрация пропадет);
  - если были отмечены критерии/чекбоксы, то начинается процесс фильтрации:
4) берем список продуктов и проверяем:
  - каждый продукт - в нем: перебираем каждое свойство продукта
  - название свойства продукта сравниваем с названием критерия фильтрации (тут замешан тот самы id из описания выше)
  - если совпадает, то уже сравниваем значение свойства со значениями критериев (как раз тот самый момент фильтрации)
  - если продукт попадает под фильтр (значение свойства продукта = хоть одному значению критерия), то добавляем его в новый массив отфильтрованных продуктов/товаров
5) выводим продукты которые соответствуют криетриям фильтрации.
  

*/
'use strict';

(function () {
	
	let base = [
		{
			id: 1,
			title: 'Товар №1',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 1',
			massa: 10,
			height: 100
		},
		{
			id: 2,
			title: 'Товар №2',
			img: 'http://zaokurs.ru/assets/images/products/254/medium/maket-dlya-miniatyur-20191.jpg',
			content: 'контент 2',
			massa: 20,
			height: 200
		},		
		{
			id: 3,
			title: 'Товар №3',
			img: 'http://zaokurs.ru/assets/images/products/255/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 3',
			massa: 30,
			height: 300
		},
		{
			id: 4,
			title: 'Товар №4',
			img: 'http://zaokurs.ru/assets/images/products/260/medium/akkumulyator-fl-500mp-y5.jpg',
			content: 'контент 4',
			massa: 40,
			height: 400
		},
		{
			id: 5,
			title: 'Товар №5',
			img: 'http://zaokurs.ru/assets/images/products/253/medium/maket-dlya-miniatyur-2019.jpg',
			content: 'контент 5',
			massa: 50
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
			let filteredProducts =  filteringProducts (criterions);		// фильтрация продуктов/товаров. сбор нового массива продуктов.
			console.log(filteredProducts);
			drawProducts (filteredProducts);							// вывод/отрисовка отфильтрованных продуктов
		} else {
			clearProductOutput();
			drawProducts (base);
		};
	}	
	
	// ---

	drawProducts (base);	// вывод/отрисовка всех продуктов
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
		let filteredProducts = [];
		
		// перебираем каждый продукт
		for (let i = 0; i < base.length; i++) {
			
			// перебираем каждое свойство продукта
			for (let keyProduct in base[i]) {
				
				// сравниваем названия свойства продукта "keyProduct" с названием критерия фильтрации "keyCriteria"
				// путем перебора критериев
				for (let keyCriteria in filteringСriteria) {
					
					// если критерий пустой, то переходим к сл шагу цикла
					if (filteringСriteria[keyCriteria].length === 0) {continue;}
					
					// если свойство продукта (называется) такое же как и название критерия
					if (keyProduct === keyCriteria) {
						
						// тогда сравниваем значение свойства продукта со значениями критерия
						// тот самый момент сравнения параметров
						for (let j = 0; j < filteringСriteria[keyCriteria].length; j++) {

							// сравниваем значение свойства продукта со списком выбранных значений критерия
							if (String(base[i][keyProduct]) === String(filteringСriteria[keyCriteria][j])) {
								
								// прежде чем добавить продукт в новый массив, проверим нет ли его там уже
								// сравниваем по свойству "id" продукта/объекта
								for (let ii = 0; ii < filteredProducts; ii++) {
									/*if (filteredProducts[ii].id != base[i].id) {
										filteredProducts.push(base[i]);
									};*/
								}								
							}
						}
					}
				}			
			}
		}
		return filteredProducts;
	}

})(); 









