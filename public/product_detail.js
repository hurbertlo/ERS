window.onload = async () => {
  // should be inside window.onload
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  console.log(productId);

  // Use the id to fetch data from
  const res = await fetch(`/products/${productId}`);
  if (res.ok) {
    const product_detail = await res.json();
    console.log(product_detail);
    const leftBoard = document.querySelector(".left-board");
    leftBoard.innerHTML = ` 
    
    <img class="w-80 h-80" src="${product_detail.data.image}" alt="Image" />
    `;

    const rightBoard = document.querySelector(".right-board");
    rightBoard.innerHTML = ` 

      
      <h3 class="font-weight-semi-bold">${product_detail.data.name}</h3>
        <div class="d-flex mb-3">
            <div class="text-primary mr-2">
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star-half-alt"></small>
                <small class="far fa-star"></small>
            </div>
            <small class="pt-1">(50 Reviews)</small>
        </div>
        <h3 class="font-weight-semi-bold mb-4">$${product_detail.data.price}</h3>
        <div> 
        <pre class="mb-4">${product_detail.data.description}</pre>
      
    
        <div class="d-flex align-items-center mb-4 pt-2">
            <div class="input-group quantity mr-3" style="width: 130px;">
            <div class="input-group-btn">
                    <button class="btn btn-primary btn-minus" >
                    <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input disabled type="text" class="form-control bg-secondary text-center" value="1" id="quantity-display">
                <div class="input-group-btn">
                    <button class="btn btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <button id="add-to-cart" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
        </div>
      `;
  }

  registerEventListener();

  function registerEventListener() {
    let displayElm = document.querySelector("#quantity-display");
    document
      .querySelector(".btn-plus")
      .addEventListener("click", function (event) {
        let currentQuantity = Number(displayElm.value);
        displayElm.value = currentQuantity + 1;
      });
    document
      .querySelector(".btn-minus")
      .addEventListener("click", function (event) {
        let currentQuantity = Number(displayElm.value);
        if (currentQuantity === 1) return;
        displayElm.value = currentQuantity - 1;
      });

    document
      .querySelector("#add-to-cart")
      .addEventListener("click", async function (event) {
        let res = await fetch("asldlsa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            quantity: Number(displayElm.value),
            productId,
          },
        });
        if (res.ok) {
          Notiflix.Notify.success("成功加入購物車！");
        } else {
          Notiflix.Notify.failure("未能加入購物車！");
        }
      });
  }

  // Rest of the code
};
