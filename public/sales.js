async function loadReceipt() {
    let search = new URLSearchParams(window.location.search)
    let orderId = search.get('orderId')
    let res = await fetch(`/sales?orderId=${orderId}`)
    if (res.ok) {
        let orderDetails = await res.json()

        updatePurchasedItemContainer(orderDetails)

    } else {
        res.json({
            message: "[RCPT002] Fail to load receipt"
        })
    }
}
loadReceipt()

function updatePurchasedItemContainer(orderDetails) {
    let addressElm = document.querySelector('address')
    addressElm.innerText = orderDetails.address

    let orderIdElm = document.querySelector('.invoice-no')
    orderIdElm.innerText = orderDetails.orderId

    let dateElm = document.querySelector('.date')
    dateElm.innerText = orderDetails.date

    let purchasedItemContainerElem = document.querySelector('.receipt')
    purchasedItemContainerElem.innerHTML = ''

    for (let orderDetailItem of orderDetails) {

        purchasedItemContainerElem.innerHTML += `
            <tr>
            <td class="td1">
            ${orderDetailItem.paidItems.name}
            </td>
            <td class=td2>${orderDetailItem.paidItems.product_id}</td>
            <td class=td3>${orderDetailItem.paidItems.quantity}</td>
            <td class=td4>${orderDetailItem.paidItems.subtotal}</td>
        </tr>


        <tr>
            <td>&nbsp;</td>
            <td colspan="2">
                <h5 class="text-success"><strong>Total</strong></h5>
            </td>
            <td>
                <h5 class="text-success"><strong>$ ${orderDetails.total}</strong></h5>
            </td>
        </tr>
        `
    }
}

