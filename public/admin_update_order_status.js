async function fetchOrders() {
    let res = await fetch(`/order/outstanding`);
    if (res.ok) {
        let data = await res.json()
        let outstandingOrders = data.data
        let outstandingElm = document.querySelector(".outstandingOrderList");

        outstandingElm.innerHTML = "";
        if (outstandingOrders.length === 0) {
            outstandingElm.innerHTML += `
            No outstanding orders
      `;
        }

        for (outstandingOrder of outstandingOrders) {
            let outstandingOrderStatusId = outstandingOrder.order_status_id
            let outstandingOrderId = outstandingOrder.id

            outstandingElm.innerHTML += `
            
              <th>${outstandingOrder.id}</th>
              <th>${outstandingOrder.ordered_by}</th>
              <th>${outstandingOrder.address}</th>
              <th>${outstandingOrder.total_price}</th>
              <th>${outstandingOrder.created_at}</th>
              <th>${outstandingOrder.updated_at}</th>
              <th>${outstandingOrder.order_status_id}</th>
                      
          
                                       
                <td class="align-middle">
                <button class="bi bi-truck deliver${outstandingOrder.id}" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck"
                    viewBox="0 0 16 16" >
                    <path
                      d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </button>
                </td>
                <td class="align-middle">
                <button class="bi bi-check-lg complete${outstandingOrderId}" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                </button>
                </td>
                       
           `
        }
    }
}

fetchOrders();




document.querySelector(`.deliver${outstandingOrder.id}`).addEventListener("click", async function deliverOrder(e, outstandingOrderStatusId, outstandingOrderId) {
    e.preventDefault();
    let res = await fetch(`/order/delivering/${outstandingOrderId}`, {

        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            order_status_id: outstandingOrderStatusId,
            orderId: outstandingOrderId
        })
    })
    if (!res.ok) {
        let isConfirmed = confirm("Delivering failure, please reload");
        if (isConfirmed) {
            window.location.reload();
        }
    }
    fetchOrders()
})
document.querySelector(`.completed${outstandingOrderId}`).addEventListener("click", async function completedOrder(e, outstandingOrderStatusId, outstandingOrderId) {
    e.preventDefault();
    let res = await fetch(`/order/completed/${outstandingOrderId}`, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            order_status_id: outstandingOrderStatusId,
            orderId: outstandingOrderId
        })
    })
    if (!res.ok) {
        let isConfirmed = confirm("Delivering failure, please reload");
        if (isConfirmed) {
            window.location.reload();
        }
    }
    fetchOrders()
})

    (function init() {
        fetchOrders();
    })();

