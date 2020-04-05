function arrayDifference(arr1, arr2) {
    const array = arr1.concat(arr2);
    const newArr =  array.filter((item,index) => array.indexOf(item) !== index);
    return array.filter(i => !newArr.includes(i) );
}

console.log(arrayDifference(['javascript', 'is', 'awesome'], ['javascript', 'awesome']));
// ['is']
console.log(arrayDifference([1, 2, 3, 4, 5], [3, 4, 2, 7]));
// [1, 5, 7]
