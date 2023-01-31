

async function loadReceipt() {
    let res = await fetch('/receipt')
    if (res.ok) {
        let data = await res.json()
        let orderDetails = data.data

        updatePurchasedItemContainer(orderDetails)

    } else {
        res.json({
            message: "[RCPT002] Fail to load receipt"
        })
    }
}

function updatePurchasedItemContainer(orderDetails) {

    let purchasedItemContainerElem = document.querySelector('.receipt')
    purchasedItemContainerElem.innerHTML = ''

    for (let orderDetailItem of orderDetails) {
        let addressElm = document.querySelector('address')
        addressElm.innerText = orderDetailItem.address

        let orderIdElm = document.querySelector('.invoice-no')
        orderIdElm.innerText = orderDetailItem.id

        let dateElm = document.querySelector('.date')
        dateElm.innerText = orderDetailItem.updated_at
        purchasedItemContainerElem.innerHTML += `
            <tr>
            <td class="td1">
            ${orderDetailItem.name}
            </td>
            <td class=td2>${orderDetailItem.product.id}</td>
            <td class=td3>${orderDetailItem.quantity}</td>
            <td class=td4>${orderDetailItem.subtotal}</td>
        </tr>


        <tr>
            <td>&nbsp;</td>
            <td colspan="2">
                <h5 class="text-success"><strong>Total</strong></h5>
            </td>
            <td>
                <h5 class="text-success"><strong>$ ${total}</strong></h5>
            </td>
        </tr>
        `
    }
}

(async function init() {
    await loadReceipt()
    const socket = io.connect();
    socket.on('load-receipt', () => {
        loadReceipt()
    })
})()