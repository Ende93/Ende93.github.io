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
    const WIDTH = 40;
    let delay_time = 0;
    let _len = 10;
    let stack = [];
    let target = document.querySelectorAll('.js-sort');
    let _mergeStack = [];
    let _timer = [];
    let STOP = false;

    [].forEach.call(target, function (ele) {
        ele.addEventListener('click', function () {
            clear();
            var type = this.dataset.type;
            let arr = createArr(_len, _len * 2.4);

            createBarFormArr(arr, MAX_HEIGHT / 10 / 2, (document.body.clientWidth - WIDTH * _len) / (_len + 2));
            type == 'quick' ? quickSort(barMove, arr) : mergeSort(mergeMove, arr);

        })
    });

    function clear() {
        STOP = true;
        $('#content').innerHTML = '';
        _timer.forEach(function (timer) {
            clearTimeout(timer);
        });
        delay_time = 0;
        stack = [];

        _timer = [];
        getList();
        STOP = false;
    }

    function createBarFormArr(arr, avg, margin) {
        let len = arr.length;
        let i = 0;
        let html = '';
        let box = $('#content');

        while (i < len) {
            html += `<div class="bar" style="height: ${arr[i] * avg}px; width: ${WIDTH};"><p>${arr[i]}</p><i></i></div>`;
            //left: ${(margin + WIDTH) * (i + 1)}px"></div>`;
            i++;
        }

        box.innerHTML = html;
    }

    var getList = (function () {
        let list;

        return function (refresh) {
            if(refresh || !list || list.length == 0) {
                list = [].slice.call($('.bar'));
            }
            if(isStop()) {
                return null;
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
            let list = [].slice.call($('.bar'));

            if(list.indexOf(_list[b]) === -1 || isStop()) {
                return;
            }

            list[a].insertAdjacentElement('beforebegin', _list[b])
        });
    }

    function delay(fn) {
        if(typeof fn == 'function') {
            _timer.push( setTimeout(function () {
                if(isStop()) {
                    return;
                }
                fn();
            }, delay_time) );
            delay_time += 100;
        }
    }

    function isStop() {
        return STOP;
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
