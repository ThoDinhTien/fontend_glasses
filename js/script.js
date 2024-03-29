
const srart_pos = 90.75;
const item_count = 4;
const s = 0.52 * Math.PI / 180; //Вычислим угол смещения

var pos = [];
var elem = document.getElementsByClassName('item-kc');


function allocationItems() {
	var i;
	var pp = elem[1].getElementsByTagName('a')[0].getAttribute('data-img-kc'); 
	pos[0] = srart_pos;
	for (i = 1; i < item_count; i++) {
		pos[i] = pos[i - 1] - 0.6;
		last_pos=pos[i];
	}
	for (i = 0; i < item_count+1; i++) {
		elem[i].style.right = 240 + 310 * Math.sin(pos[i]) + 'px';
		elem[i].style.top = 240 + 255 * Math.cos(pos[i]) + 'px';
	}
}  

allocationItems();

function animation(args, flag) { // некоторые аргументы определим на будущее
	var $ = {
        radius: 250, // радиус окружности 
        speed: 10 // скорость/задержка ( в js это мс, например 10 мс = 100 кадров в секунду)
    };
    var e = elem;
    function animate(draw, duration, callback) {
    	var start = performance.now();
    	requestAnimationFrame(function animate(time) {
            // определить, сколько прошло времени с начала анимации
            var timePassed = time - start;
            // возможно небольшое превышение времени, в этом случае зафиксировать конец
            if (timePassed > duration)
            	timePassed = duration;
            // нарисовать состояние анимации в момент timePassed
            draw(timePassed);
            // если время анимации не закончилось - запланировать ещё кадр
            if (timePassed < duration) {
            	requestAnimationFrame(animate);
            } else callback();
        });
    }
    animate(function (timePassed) {
    	var i;
    	for (i = 0; i < item_count; i++) {
    		e[i].style.right = 300 + $.radius * Math.sin(pos[i]) + 'px';
    		e[i].style.top = 240 + $.radius * Math.cos(pos[i]) + 'px';
    		if (flag) {
    			pos[i] += s; 
    		} else {
    			pos[i] -= s; 
    		}
    	}   /* callback function */
    }, 800, function changeItems() {
    	var list = document.getElementById('list');
    	var ch = flag ? list.firstElementChild : list.lastElementChild
    	ch.remove();
    	if (flag) {
    		list.appendChild(ch);
    	} else {
    		list.insertBefore(ch, list.firstChild);
    	}
    	allocationItems();
    });
}