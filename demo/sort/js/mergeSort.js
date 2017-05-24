(function () {
  var temp = null;

  function mergeSort (move, arr, start = 0, end = arr.length - 1) {
    if(!temp) {
      temp = [];
    }

    if(start < end) {
      var mid = Math.floor((start + end) / 2);

      mergeSort(move, arr, start, mid);
      mergeSort(move, arr, mid + 1, end);
      merge(move, arr, start, mid, end, temp);
    }
  }

  function merge(move, arr, start, mid, end, temp) {
    var i = start, j = mid + 1,
      k = 0;

    while(i <= mid && j <= end) {
      if(typeof move == 'function') {
        move(start + k, arr[i] <= arr[j] ? i : j);
      }
      temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    }  

    while(i <= mid) {
      if(typeof move == 'function') {
        move(start + k, i);
      }
      temp[k++] = arr[i++];
    }

    while(j <= end) {
      if(typeof move == 'function') {
        move(start + k, j);
      }
      temp[k++] = arr[j++];
    }

    for(i = 0; i < k; i++) {
      arr[start + i] = temp[i];
    }
  }

  window.mergeSort = mergeSort;
}());