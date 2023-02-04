async function fetchInventory() {
    let res = await fetch(`/warehouses`);
    if (res.ok) {
        let data = await res.json()
        let allProductsQtyS = data.data
        let stockListElm = document.querySelector(".numberOfStockList");

        stockListElm.innerHTML = "";
        if (allProductsQtyS.length === 0) {
            stockListElm.innerHTML += `
              <th>Out of stocks</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
        `;
        }

        for (allProductsQty of allProductsQtyS) {
            let outstandingOrderStatusId = outstandingOrder.order_status_id
            let outstandingOrderId = outstandingOrder.id
            outstandingElm.innerHTML += `
              
              <div id="outstandingOrderElm${outstandingOrderId}">            
                <th>${outstandingOrder.id}</th>
                <th>${outstandingOrder.ordered_by}</th>
                <th>${outstandingOrder.address}</th>
                <th>${outstandingOrder.total_price}</th>
                <th>${outstandingOrder.created_at}</th>
                <th>${outstandingOrder.updated_at}</th>
                <th>${outstandingOrderStatusId}</th>        
            
                                         
               
             `


        }
    }
}



(function init() {
    fetchInventory();
})();

