"use strict";

let $ = function (selector) {
    if(typeof selector == 'function') {
        return $.ready(selector);
    } else if(typeof selector == 'string') {
        return selector[0] == '#' ?
            document.getElementById(selector.replace('#', '')) :
            document.querySelectorAll(selector);
    }
    return null;
};

$.ready = function (fn) {
    document.onreadystatechange = function () {
        if (document.readyState === "interactive") {
            fn();
        }
    }
};

$(function () {
    const MAX_HEIGHT = 500;
    const LEN = 10;
    const WIDTH = 40;
    let delay_time = 1000;
    let stack = [];
    let target = document.querySelectorAll('.js-sort');

    [].forEach.call(target, function (ele) {
        ele.addEventListener('click', function () {
            var type = this.dataset.type;
            let arr = createArr(LEN, LEN * 2);
            stack = [];
            
            createBarFormArr(arr, MAX_HEIGHT / 10 / 2, (document.body.clientWidth - WIDTH * LEN) / (LEN + 2));
            type == 'quick' ? quickSort(barMove, arr) : mergeSort(barMove, arr);
        })
    })

    function createBarFormArr(arr, avg, margin) {
        let len = arr.length;
        let i = 0;
        let html = '';
        let box = $('#content');

        while(i < len) {
            html += `<div class="bar" style="height: ${arr[i] * avg}px; width: ${WIDTH};"></div>`;
                //left: ${(margin + WIDTH) * (i + 1)}px"></div>`;
            i++;
        }

        box.innerHTML = html;
    }

    function barMove(a, b) {
        stack.push([a, b]);
        if(stack.length) {
            setTimeout(function () {
                let t = stack.shift();
                delayMove(t[0], t[1]);
            }, delay_time);
            delay_time += 300;
        }
    }

    function delayMove(a, b) {
        let list = $('.bar');
        let box = $('#content');
        let t = list[a];
        if(a < 0 || b >= list.length) {
            return;
        }

        box.insertBefore(list[b], list[a]);
        if(b == list.length - 1) {
            box.appendChild(t);
        } else {
            box.insertBefore(t, list[b+1]);
        }
    }

    function createArr(len, max) {
        let ret = [];
        for(let i = 0; i < len; i++) {
            ret[i] = Math.floor(Math.random() * max) + 1;
        }
        return ret;
    }
});
