(function () {
function quickSort(move, arr, start = 0, end = arr.length - 1) {
    if(start < end) {
        let index = partition(arr, start, end, move);
        
        quickSort(move, arr, start, index - 1);
        quickSort(move, arr, index + 1, end);
    }
}

function partition(arr, low, high, fn) {
    while(low < high) {
        let key = arr[low];

        while(low < high && key <= arr[high]) high--;
        swap(arr, low, high, fn);

        while(low < high && key >= arr[low]) low++;
        swap(arr, low, high, fn);
    }
    return low;
}

function swap(arr, a, b, fn) {
    [arr[a], arr[b]] = [arr[b], arr[a]];

    if(typeof fn == 'function')
        fn(a, b);
}

window.quickSort = quickSort;
}());