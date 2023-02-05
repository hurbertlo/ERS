async function fetchInventory() {
    let res = await fetch(`/warehouses`);
    if (res.ok) {
        let data = await res.json()
        let allProductsQty = data.data
        let stockListElm = document.querySelector(".numberOfStockList");

        stockListElm.innerHTML = "";

        for (productQty of allProductsQty) {
            stockListElm.innerHTML += `     
            <div class="container-fluid pt-5">
             <div class="row px-xl-5">
              <div class="col-lg-12 table-responsive mb-5">
               <table class="basket-item table table-bordered text-center mb-0">
                <thead class="bg-secondary text-dark">
                 <tr>
                  <td>${productQty.product_id}</td>
                  <td>${productQty.name}</td>
                  <td>${productQty.category_id}</td>
                  <td>${productQty.available_quantity}</td>
                  <td>${productQty.unit_size}</td>
                  <td>no</td>
                  <td>${productQty.updated_at}</td>         
                 </tr>
                </thead>
               </table>
              </div>
             </div>
            </div>
    `
        }
    }
}

(function init() {
    fetchInventory();
    const socket = io.connect();
    socket.on('new-order-received', () => {
        fetchInventory()
    })
})();

