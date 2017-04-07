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
    let arr = createArr(LEN, LEN * 2);
    let delay_time = 1000;
    let stack = [];        

    console.log(arr);
    createBarFormArr(arr, MAX_HEIGHT / 10 / 2, (document.body.clientWidth - WIDTH * LEN) / (LEN + 2));
    quickSort(barMove, arr);

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
                console.log('timeout: ' + Date.now());
            }, delay_time);
            delay_time += 300;
        }
    }

    function delayMove(a, b) {
        let list = $('.bar');
        let box = $('#content');
        let t = list[a];

        box.replaceChild(list[b], list[a]);
        box.insertBefore(t, list[b+1]);
    }

    function createArr(len, max) {
        let ret = [];
        for(let i = 0; i < len; i++) {
            ret[i] = Math.floor(Math.random() * max) + 1;
        }
        return ret;
    }
});
