// should be inside window.onload

async function fetchBasketItems() {
  const res = await fetch(`/basket`);
  if (res.ok) {
    const data = await res.json();
    const basketItems = data.data;
    const basketItemTBodyElm = document.querySelector(".basket-item tbody");

    basketItemTBodyElm.innerHTML = "";

    for (let basketItem of basketItems) {
      basketItemTBodyElm.innerHTML += `
            <tr id='basket_item_${basketItem.basket_id}'>
                  <td class="align-middle">
                    <img src="img/product-1.jpg" alt="" style="width: 50px" />
                    ${basketItem.name}
                  </td>
                  <td class="align-middle">$${basketItem.price}</td>
                  <td class="align-middle">
                    <div
                      class="input-group quantity mx-auto"
                      style="width: 100px"
                    >
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" 
                        onclick='updateBasketItemQuantity(${basketItem.basket_id
        }, -1)'>
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        
                        type="text"
                        class="quantity-display form-control form-control-sm bg-secondary text-center"
                        value="${basketItem.quantity}"
                      />
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" 
                        onclick='updateBasketItemQuantity(${basketItem.basket_id
        }, +1)'>
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">$${basketItem.price * basketItem.quantity
        }</td>
                  <td class="align-middle">
                    <button class="btn btn-sm btn-primary"
                    onclick="removeBasketItem(${basketItem.basket_id})">
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
            `;
    }
    let basketItemAmountElm = document.querySelector(".totalAmount");
    basketItemAmountElm.innerHTML = `
            <div class="card border-secondary mb-5">
            <div class="card-header bg-secondary border-0">
              <h4 class="font-weight-semi-bold m-0">購物車總結</h4>
            </div>
            
            <div class="card-footer border-secondary bg-transparent">
              <div class="d-flex justify-content-between mt-2">
                <h5 class="font-weight-bold">帳單總額</h5>
                <h5 class="font-weight-bold">$${getTotalAmount(
      basketItems
    )}</h5>
              </div>
              <button class="btn btn-block btn-primary my-3 py-3"
              onclick='createOrder()'
              >確認付款
              </button>
            </div>
          </div>
          `;
  }
}

function getTotalAmount(basketItems) {
  console.log(basketItems);
  let total = 0;
  for (let i = 0; i < basketItems.length; i++) {
    let subtotal = basketItems[i].price * basketItems[i].quantity;
    total = total + subtotal;
  }
  return total;
}

async function updateBasketItemQuantity(basketItemId, amendment) {
  let newQuantity =
    +document.querySelector(
      `#basket_item_${basketItemId} input.quantity-display`
    ).value + amendment;

  if (newQuantity <= 0) {
    return;
  }
  let res = await fetch(`/basket/${basketItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: newQuantity,
    }),
  });

  if (!res.ok) {
    let isConfirmed = confirm("Shopping cart failure, please reload");
    if (isConfirmed) {
      window.location.reload();
    }
  }

  fetchBasketItems();
}

async function removeBasketItem(basketItemId) {
  console.log("deleting...", basketItemId);
  let res = await fetch(`/basket/${basketItemId}`, {
    method: "delete",
  });
  if (!res.ok) {
    let isConfirmed = confirm("Shopping cart failure, please reload");
    if (isConfirmed) {
      window.location.reload();
    }
  }
  let result = await res.json();
  console.log(result);

  fetchBasketItems();
}

async function createOrder() {
  let res = await fetch(`/order/basket`, {
    method: "post",
  });

  if (res.ok) {
    let data = await res.json();
    window.location = data.redirect;
  }
}

(function init() {
  fetchBasketItems();
})();
