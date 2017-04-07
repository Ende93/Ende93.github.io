function quickSort(move, arr, start = 0, end) {
    end = end != null ? end : arr.length - 1;
    if(start < end) {
        let index = partition(arr, start, end, move);
        
        quickSort(move, arr, start, index - 1);
        quickSort(move, arr, index + 1, end);
    } else {
        console.log('arr: ' + arr);
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
    let t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;

    if(typeof fn == 'function')
        fn(a, b);
}
