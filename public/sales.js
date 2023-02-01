async function loadReceipt() {
    let search = new URLSearchParams(window.location.search)
    console.log(search)
    let res = await fetch(`/sales?orderId=${search.get('orderId')}`)
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
    console.log(orderDetails);
    let addressElm = document.querySelector('address')
    addressElm.innerText = orderDetails.address

    let orderIdElm = document.querySelector('.invoice-no')
    orderIdElm.innerText = orderDetails.orderId

    let dateElm = document.querySelector('.date')
    dateElm.innerText = orderDetails.date

    let purchasedItemContainerElem = document.querySelector('.receipt')
    purchasedItemContainerElem.innerHTML = ''

    for (let orderDetailItem of orderDetails.paidItems) {

        purchasedItemContainerElem.innerHTML += `
            <tr>
            <td class="td1">
            ${orderDetailItem.name}
            </td>
            <td class=td2>${orderDetailItem.product_id}</td>
            <td class=td3>${orderDetailItem.quantity}</td>
            <td class=td4>${orderDetailItem.subtotal}</td>
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

