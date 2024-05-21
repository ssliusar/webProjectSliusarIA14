function processArray() {
    const input = document.getElementById('inputArray').value;
    const originalArray = input.split(',').map(Number);
    
    document.getElementById('originalArray').textContent = originalArray.join(', ');

    const filteredArray = [];
    const div2 = originalArray.filter(x => x % 2 === 0 && x % 3 !== 0);
    const div2And3 = originalArray.filter(x => x % 2 === 0 && x % 3 === 0);
    const div3 = originalArray.filter(x => x % 3 === 0 && x % 2 !== 0);

    filteredArray.push(...div2, ...div2And3, ...div3);
    document.getElementById('filteredArray').textContent = filteredArray.join(', ');

    const sortedArray = quickSort(originalArray);
    document.getElementById('sortedArray').textContent = sortedArray.join(', ');
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const right = arr.filter(x => x > pivot);
    const middle = arr.filter(x => x === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}
