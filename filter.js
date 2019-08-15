// "Фильтр"
// 15-08-2019

/* - Логика скрипта -

- в html есть блок с критериями фильтрации - "criterions";
- в нутри него находятся вложенные блоки, разделенные логически - "criterion" (например "масса", "высота");
- в нутри них в свою очередь находятся критерии для своего логического блока - input type="checkbox" (например для "масса" - разные варианты массы: 10, 20, ...);
- в html есть блок для вывода продуктов/товаров, куда выводятся либо все товары, либо отфильтрованные - "products";
- все товары выводятся по шаблону template id="templateProduct".

- каждый "criterion" должен иметь "id" равный названию свойства товара, по которому будет проходть фильтрация (например massa или height),
  по этому названию будет проходить отбор свойств, участвующих в фильтрации;
  
- два варианта фильтрации: по любому критерию и по совокупности критериев.
  
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
5) выводим продукты которые соответствуют критериям фильтрации.  

*/
'use strict';

(function () {
	
	let base = [
		{
			id: 1,
			title: 'Товар №1',
			img: 'images/bag.png',
			content: 'Описание: ',
			massa: 10,
			height: 100
		},
		{
			id: 2,
			title: 'Товар №2',
			img: 'images/cable.png',
			content: 'Описание: ',
			massa: 20,
			height: 200
		},		
		{
			id: 3,
			title: 'Товар №3',
			img: 'images/cashier.png',
			content: 'Описание: ',
			massa: 30,
			height: 300
		},
		{
			id: 4,
			title: 'Товар №4',
			img: 'images/egg.png',
			content: 'Описание: ',
			massa: 40,
			height: 400
		},
		{
			id: 5,
			title: 'Товар №5',
			img: 'images/jeans.png',
			content: 'Описание: ',
			massa: 50,
			height: 500
		},
		{
			id: 6,
			title: 'Товар №6',
			img: 'images/ruler.png',
			content: 'Описание: ',
			massa: 10,
			height: 200
		},
		{
			id: 7,
			title: 'Товар №7',
			img: 'images/sewing-machine.png',
			content: 'Описание: ',
			massa: 30,
			height: 100
		},
		{
			id: 8,
			title: 'Товар №8',
			img: 'images/soap.png',
			content: 'Описание: ',
			massa: 40,
			height: 200
		},
		{
			id: 9,
			title: 'Товар №9',
			img: 'images/supermarket.png',
			content: 'Описание: ',
			massa: 10,
			height: 300
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
			product.querySelector('.content').textContent = products[i].content + '\n' + 'Масса: ' + products[i].massa + '\n' + 'Высота: ' + products[i].height;
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

	/* --- Вариант фильтрации №1
		фильтруем по принципу: разные типы критериев (напр масса и высота) не зависят друг от друга
		т.е. если хоть один критерий подходит (например только масса продукта подходит под фильтр, а высота не подходит)
		то товар будет отображаться.
		Пример: "первый товар": масса 10, высота 20;
				"второй товар": масса 100, высота 200;
		Задача:	отмечены сл пункты фильтра: масса 10 и высота 200
		Итог: будут показаны оба товара, т.к. каждый попадает хоть под один критерий.
	--- 
	
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
					
					// если название свойства продукта такое же как и название критерия
					if (keyProduct === keyCriteria) {
						
						// тогда сравниваем значение свойства продукта со значениями критерия
						// тот самый момент сравнения параметров
						for (let j = 0; j < filteringСriteria[keyCriteria].length; j++) {

							// сравниваем значение свойства продукта со списком выбранных значений критерия
							if (String(base[i][keyProduct]) === String(filteringСriteria[keyCriteria][j])) {								 
								
								// прежде чем добавить продукт в новый массив, проверим нет ли его там уже
								// сравниваем по свойству "id" продукта/объекта
								let existence = false;
								for (let ii = 0; ii < filteredProducts.length; ii++) {
									if (base[i].id == filteredProducts[ii].id) {
										existence = true;
										break;
									};									
								}									
								if (existence === false) {filteredProducts.push(base[i]);}											
							}
						}
					}
				}			
			}
		}
		return filteredProducts;
	}
	*/

	/* --- Вариант фильтрации №2
		фильтруем по принципу: разные типы критериев (напр масса и высота) зависят друг от друга
		т.е. продукт должен соответствовать всем критериям фильтрации, если хоть один критерий не будет подходить
		то товар не будет отображаться.
		Пример: "первый товар": масса 10, высота 20;
				"второй товар": масса 100, высота 200;
				"третий товар": масса 10, высота 200;
		Задача:	отмечены сл пункты фильтра: масса 10 и высота 200
		Итог: будет показан только третий товар, т.к. соответствует всем заданным фильтрам
	---*/	
	function filteringProducts (filteringСriteria) {
		let filteredProducts = [];	// отфильтрованные продукты
		let removableProducts = [];	// продукты, которые не прошли фильтрацию
		
		// перебираем каждый продукт и создаем список удаляемых/не попадающих под фильтр
		for (let i = 0; i < base.length; i++) {
			
			// перебираем каждое свойство продукта
			for (let keyProduct in base[i]) {
				
				// сравниваем названия свойства продукта "keyProduct" с названием критерия фильтрации "keyCriteria"
				// путем перебора критериев
				for (let keyCriteria in filteringСriteria) {
					
					// если критерий пустой, то переходим к сл шагу цикла
					if (filteringСriteria[keyCriteria].length === 0) {continue;}
					
					// если название свойства продукта такое же как и название критерия
					if (keyProduct === keyCriteria) {
						let deletion = true;	// по умолчанию помечаем продукт на удаление из выводимого списка
						
						// сравниваем значение свойства продукта со значениями критерия
						// тот самый момент сравнения параметров
						for (let j = 0; j < filteringСriteria[keyCriteria].length; j++) {

							// если продукт подходит под фильтр (значение = критерию)
							if (String(base[i][keyProduct]) === String(filteringСriteria[keyCriteria][j])) {								
								deletion = false;	// отменям удаление продукта из списка
							}
						}		

						// создаем список удаляемых из вывода продуктов/не прошедших фильтрацию
						if (deletion === true) {
							// прежде чем добавить продукт в новый массив, проверим нет ли его там уже
							// сравниваем по свойству "id" продукта/объекта
							let existence = false;
							for (let ii = 0; ii < removableProducts.length; ii++) {
								if (base[i].id == removableProducts[ii].id) {
									existence = true;
									break;
								};									
							}									
							if (existence === false) {removableProducts.push(base[i]);}	
						}
					}
				}			
			}
		}
		
		// создаем список выводимых продуктов, отавшихся после фильтрации
		for (let i = 0; i < base.length; i++) {			
			let existence = false;			
			for (let j = 0; j < removableProducts.length; j++) {
				if (base[i].id == removableProducts[j].id) {
					existence = true;
					break;			
				}
			}
			if (existence === false) {filteredProducts.push(base[i]);}	
		}
		
		return filteredProducts;
	}	

})(); 









