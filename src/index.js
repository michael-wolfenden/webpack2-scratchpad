const add = (x, y) => x + y

new Promise(resolve => {
    setTimeout(function () { resolve(10); }, 3000);
})
.then(function (result) {
    console.log(add(result,5))
});
