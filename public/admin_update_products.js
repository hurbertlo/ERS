let postProduct = document.querySelector(`#admin-add-products-form`);
postProduct.addEventListener("submit", async (e) => {
    e.preventDefault();
    // prep
    let postData = new FormData(postProduct);
    // send
    let res = await fetch("/launchProduct", {
        method: "POST",
        body: postData,
    });
    // post handling
    if (res.ok) {
        postProduct.reset();
    } else {
        console.log("post fail");
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