async function loadSales() {
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
    console.log(orderDetails)
    let receiptMain = document.querySelector('main')

    receiptMain.innerHTML = ''
    receiptMain.innerHTML =  /**HTML */`
    <div id="admin_header"></div>
    <script src="/admin_header.js"></script>

<!-- Table Start -->
<div class="container-fluid pt-5">
    <div class="row px-xl-5">
      <div class="col-lg-12 table-responsive mb-5">
        <table class="basket-item table table-bordered text-center mb-0">
          <thead class="bg-secondary text-dark">
            <tr>
              <th>ID</th>
              <th>貨單編號</th>
              <th>貨品編號</th>
              <th>數量</th>
              <th>價錢</th>
              <th>折扣</th>
              <th>小計</th>
              <th>購買時間</th>
              <th>更新時間</th>
            </tr>
        </thead>
        <tbody class="align-middle">

            ${orderDetails.paidItems.map(e => {
        return (
            `


            <tr>
                <td class="align-middle">ID</td>
                <td class="align-middle">${orderDetails.orderId} </td>
                <td class="align-middle">${orderDetails.productId} </td>
                <td class="align-middle">${orderDetails.quantity} </td>
                <td class="align-middle">${orderDetails.price} </td>
                <td class="align-middle">${orderDetails.discunt_amount} </td>
                <td class="align-middle">${orderDetails.subtotal} </td>
                <td class="align-middle">${orderDetails.crreated_at} </td>
                <td class="align-middle">${orderDetails.updated_at} </td>
        </tr>
         `
        )
    })
        }
          </thead>
          <!-- <tbody class="align-middle"></tbody> -->
        </table>
      </div>
    </div>
  </div>       
  

    }
