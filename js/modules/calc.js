function calc() {
    const calcResult = document.querySelector('.calculating__result span'); // Куда будет записываться результат

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() { // Функция которая будет считать все введенные данные по формулам
        if (!sex || !height || !weight || !age || !ratio) {
            calcResult.textContent = '____';
            return;
        }
        if (sex === 'female') {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // Для женщины
        } else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); // Для мужчины
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) { //Навешиваем обработчик событий на каждую кнопку
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }


                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')




    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);


        const errorMessage = document.createElement('div');
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
        const handleInput = () => {
            if (input.value.match(/\D/)) {
                errorMessage.classList.add('error-message')
                input.style.cssText = 'box-shadow: 0px 0px 2px 0.5px #ff0000;'
                errorMessage.textContent = 'Введите число!';
            } else {
                input.style.cssText = 'none';
                errorMessage.textContent = '';
            }
        };

        input.addEventListener('input', handleInput);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/)) {

            } else {

            }
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal()
        });

    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');



    const testArr = [1, 3, 5, 6, 7, 8, 9, 10]

    const arrRes = testArr.filter(arr => arr > 5)
    console.log(arrRes)
}

module.exports = calc;