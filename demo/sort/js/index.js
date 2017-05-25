"use strict";

let $ = function (selector) {
    if (typeof selector == 'function') {
        return $.ready(selector);
    } else if (typeof selector == 'string') {
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
    let delay_time = 0;
    let stack = [];
    let target = document.querySelectorAll('.js-sort');
    let _mergeStack = [];

    [].forEach.call(target, function (ele) {
        ele.addEventListener('click', function () {
            var type = this.dataset.type;
            let arr = createArr(LEN, LEN * 2);

            delay_time = 0;
            stack = [];

            createBarFormArr(arr, MAX_HEIGHT / 10 / 2, (document.body.clientWidth - WIDTH * LEN) / (LEN + 2));
            type == 'quick' ? quickSort(barMove, arr) : mergeSort(mergeMove, arr);

        })
    })

    function createBarFormArr(arr, avg, margin) {
        let len = arr.length;
        let i = 0;
        let html = '';
        let box = $('#content');

        while (i < len) {
            html += `<div class="bar" style="height: ${arr[i] * avg}px; width: ${WIDTH};"></div>`;
            //left: ${(margin + WIDTH) * (i + 1)}px"></div>`;
            i++;
        }

        box.innerHTML = html;
    }

    var getList = (function () {
        let list;

        return function (refresh) {
            if(refresh || !list) {
                list = $('.bar');
            }
            return list;
        }
    }());

    function mergeMove(a, b, mergeEnd) {
        if (a == b && a != null) {
            return;
        }

        delay(function () {
            if (mergeEnd && a == b && a == null) {
                getList(mergeEnd);
                return;
            }
            // arr of mergeSort which during merge progress
            let _list = getList();
            // truth div list
            let list = $('.bar');

            list[a].insertAdjacentElement('beforebegin', _list[b])
        });
    }

    function delay(fn) {
        if(typeof fn == 'function') {
            setTimeout(fn, delay_time);
            delay_time += 300;
        }
    }

    function barMove(a, b) {
        if (a == b) {
            return;
        }
        delay(function() {
            delayBarMove(a, b);
        });
    }

    function delayBarMove(a, b) {
        let list = [].slice.call($('.bar'));
        let box = $('#content');
        let t = list[a];
        if (a < 0 || b >= list.length) {
            return;
        }

        t.insertAdjacentElement('beforebegin', list[b]);
        if (b == list.length - 1) {
            box.appendChild(t);
        } else {
            list[b + 1].insertAdjacentElement('beforebegin', t);
        }
    }

    function createArr(len, max) {
        let ret = [];
        for (let i = 0; i < len; i++) {
            ret[i] = Math.floor(Math.random() * max) + 1;
        }
        return ret;
    }
});
