async function fetchOrders() {
    const res = await fetch(`order/outstanding`);
    if (res.ok) {
        const data = await res.json();
        const outstandingOrders = data.data;
        const outstandingElm = document.querySelector(".???????????????");

        outstandingElm.innerHTML = "";

        for (let outstandingOrder of outstandingOrders) {
            outstandingElm.innerHTML += `
            <tr id ='outstanding_${outstandingOrder.id}'>
                <td class="align-middle">
                ${outstandingOrder.id} 
                </td>
                <td class="align-middle">${outstandingOrder.ordered_by}</td>
                <td class="align-middle">${outstandingOrder.address}</td>
                <td class="align-middle">${outstandingOrder.total_price}</td>
                <td class="align-middle">${outstandingOrder.order_status_id}</td>
                <td class="align-middle">${outstandingOrder.created_at}</td>
                <td class="align-middle">${outstandingOrder.updated_at}</td>
                <button class="btn btn-sm btn-primary"
                    onclick="deliveringOrder(${outstandingOrder.order_status_id, outstandingOrder.id})">                     
                </button>
                <button class="btn btn-sm btn-primary"
                    onclick="completeOrder(${outstandingOrder.order_status_id, outstandingOrder.id})">                      
                </button>
            </tr>            
           `
        }
    }
}


async function deliveringOrder(outstandingOrderStatusId, outstandingOrderId) {
    let outstandingOrderStatusId = outstandingOrder.order_status_id
    let outstandingOrderId = outstandingOrder.id
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
}

async function completeOrder(outstandingOrderStatusId, outstandingOrderId) {
    let outstandingOrderStatusId = outstandingOrder.order_status_id
    let outstandingOrderId = outstandingOrder.id
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
}


(function init() {
    fetchOrders();
})();

