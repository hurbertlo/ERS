async function fetchOrders() {

  let res = await fetch(`/order/outstanding`);
  if (res.ok) {
    let data = await res.json()
    let outstandingOrders = data.data
    return outstandingOrders
  }
  throw new Error("Cannot fetch items")

}

async function fetchOrders2() {

  let res = await fetch(`/order/outstanding`);
  if (res.ok) {
    let data = await res.json()
    let outstandingOrders = data.data
    return outstandingOrders
  }
  throw new Error("Cannot fetch items")

}

async function fetchData() {
  await fetchOrders()
  await fetchOrders2()
}


async function deliverOrder(orderId, order_status_id) {

  let orderData = {
    orderId,
    order_status_id
  }

  let res = await fetch(`/order/deliver/${orderId}`, {

    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(orderData)
  })

  if (!res.ok) {
    let isConfirmed = confirm("Delivering failure, please reload");
    if (isConfirmed) {
      window.location.reload();
    }
  }
  fetchOrders()
}

async function completedOrder(orderId, order_status_id) {

  let orderData = {
    orderId,
    order_status_id
  }
  let res = await fetch(`/order/completed/${orderId}`, {
    method: "put",
    headers: {
      "Content-type": "appllication/json",
    },
    body: JSON.stringify(orderData)
  })
  if (!res.ok) {
    let isConfirmed = confirm("Complete failure, please reload");
    if (isConfirmed) {
      window.location.reload();
    }
  }
  fetchOrders()
}


function renderoutstandingOrdersTable(selecter, outstandingOrders) {

  let targetElm = document.querySelector(selecter);
  if (!targetElm) {
    return
  }

  targetElm.innerHTML = "";
  if (outstandingOrders.length === 0) {
    targetElm.innerHTML += `
            <th>No outstanding orders</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
      `;
  }

  for (let outstandingOrder of outstandingOrders) {
    let outstandingOrderStatusId = outstandingOrder.order_status_id
    let outstandingOrderId = outstandingOrder.id
    targetElm.innerHTML += `
            
            <tr id="outstandingOrderElm${outstandingOrderId}">            
              <th>${outstandingOrder.id}</th>
              <th>${outstandingOrder.ordered_by}</th>
              <th>${outstandingOrder.address}</th>
              <th>${outstandingOrder.total_price}</th>
              <th>${outstandingOrder.created_at}</th>
              <th>${outstandingOrder.updated_at}</th>
              <th>${outstandingOrderStatusId}</th>        
          
                                       
                <td class="align-middle">
                <button class="bi bi-truck" onclick="deliverOrder(${outstandingOrderId},${outstandingOrderStatusId})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck"
                    viewBox="0 0 16 16" >
                    <path
                      d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </button>
                </td>
                <td class="align-middle">
                <button class="bi bi-check-lg" onclick="completedOrder(${outstandingOrderId},${outstandingOrderStatusId})" ></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                </button>
                </td>
              </tr>
           `

  }
}


(async function init() {
  try {
    let outstandingOrders = await fetchOrders();
    renderoutstandingOrdersTable('.outstandingOrderList', outstandingOrders)
  } catch (error) {
    alert('fail')
  }

})();

