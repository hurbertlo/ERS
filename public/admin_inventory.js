let mode = 'view'

function toggleMode() {
    mode = mode === 'view' ? 'edit' : 'view'
    fetchInventory()
}

async function fetchInventory() {
    let res = await fetch(`/warehouses`);
    if (res.ok) {
        let data = await res.json()
        let allProductsQty = data.data
        let stockListElm = document.querySelector("table.numberOfStockList > tbody");

        stockListElm.innerHTML = "";

        for (productQty of allProductsQty) {
            stockListElm.innerHTML += `     
            <tr>
                  <td>${productQty.product_id}  </td>
                  <td>${mode === 'edit' ? `<input type="text" value = "${productQty.name}">` : `${productQty.name}`}</td>
                  
                  <td>${productQty.category_id}</td>
                  <td>${productQty.available_quantity}</td>
                  <td>${productQty.unit_size}</td>
                  <td>no</td>
                  <td>${productQty.updated_at}</td>         
                 </tr>
            `
        }
        stockListElm.innerHTML += `  
                <tr>
                    <td colspan='6' style='text-align:right;font-weight:bold'>貨倉剩餘空間: </td>
                    <td ></td>
                    
                </tr>
                
            `
    }
}

(function init() {
    fetchInventory();
    const socket = io.connect();
    socket.on('new-order-received', () => {
        fetchInventory()
    })
})();

