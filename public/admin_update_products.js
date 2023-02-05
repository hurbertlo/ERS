let postProductElm = document.querySelector(`#admin-add-products-form`);
postProductElm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // prep
    let postData = new FormData(postProductElm);
    // send
    let res = await fetch("/products", {
        method: "POST",
        body: postData,
    });
    // post handling
    if (res.ok) {
        postProduct.reset();
        res.json({
            message: "Launch success"
        })
    } else {
        console.log("post fail");
    }
});


let deleteProductElm = document.querySelector(`#admin-delete-products-form`);
deleteProductElm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // prep
    let delistData = {
        product_id: deleteProductElm.product_id.value
    }
    // send
    let res = await fetch("/products", {
        method: "DELETE",
        body: delistData,
    });
    // post handling
    if (res.ok) {
        deleteProductElm.reset();
        res.json({
            message: "Delist success"
        })
    } else {
        console.log("delist fail");
    }
});