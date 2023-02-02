let postProduct = document.querySelector(`.post-product-form`);
postProduct.addEventListener("submit", async (e) => {
    e.preventDefault();
    // prep
    let postData = new FormData(postProduct);
    // send
    let res = await fetch("/products", {
        method: "POST",
        body: formData,
    });
    // post handling
    if (res.ok) {
        newUserElm.reset();
    } else {
        console.log("signup fail");
    }
});


// let deleteProduct = document.querySelector(`.delete-product-form`);
// postProduct.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     // prep
//     let postData = new FormData(postProduct);
//     // send
//     let res = await fetch("/products", {
//         method: "POST",
//         body: formData,
//     });
//     // post handling
//     if (res.ok) {
//         newUserElm.reset();
//     } else {
//         console.log("signup fail");
//     }
// });