let newProductElm = document.querySelector(`.productLaunchForm`);
newProductElm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formData = new FormData(newUserElm);

    let res = await fetch("/product/launchProduct", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        newProductElm.reset();
        console.log("launch success");
    } else {
        console.log("launch fail");
    }
});

let productDelistElm = document.querySelector(`.productDelistForm`);
productDelistElm.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    let formData = {
        productID: productDelistElm.productId.value,
    }

    let res = await fetch(`/product/DelistProduct`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (res.ok) {
        console.log("Delist success");

    } else {
        console.log("Delist fail");
    }
});
