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
  let receiptMain = document.querySelector('main')

  receiptMain.innerHTML = ''
  receiptMain.innerHTML =  /**HTML */`
    
        <div class="row align-items-center py-3 px-xl-5">
    <div class="col-lg-3">
      <img class="logo" src="/pet_logo.jpg" />
    </div>
    <div class="col-lg-6 col-6 text-left"></div>
    <div class="col-lg-3 col-6 text-right">
      <div>送貨地址: ${orderDetails.address} 
      <br />
      帳單編號:${orderDetails.orderId} 
      <br />
      日期: ${orderDetails.date} 
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row align-items-center py-3 px-xl-5">
      <div class="col-lg-3">
        <p class="mb-2">
          <i class="fa fa-map-marker-alt text-primary mr-3"></i>香港上環文咸西街59-67號金日集團中心 ​11樓 C-E室
        </p>

      </div>
    </div>
  </div>

  <!-- Table Start -->
  <div class="container-fluid pt-5">
    <div class="row px-xl-5">
      <div class="col-lg-12 table-responsive mb-5">
        <table class="basket-item table table-bordered text-center mb-0">
          <thead class="bg-secondary text-dark">
            <tr>
              <th>產品編號</th>
              <th>名稱</th>
              <th>數量</th>
              <th>價錢</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody class="align-middle">

          ${orderDetails.paidItems.map(e => {
    return (
      `
            <tr>
                <td class="align-middle">${e.product_id}</td>
                <td class="align-middle">${e.name}</td>
                <td class="align-middle">${e.quantity}</td>
                <td class="align-middle">$${e.subtotal / e.quantity}</td>
                <td class="align-middle">$${e.subtotal}</td>
            </tr>
            `
    )
  })
    }
            

            <tr>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle">帳單總額:</td>
              <td class="align-middle">$${orderDetails.paidItems.reduce((acc, curr) => {
      return acc + curr.subtotal
    }, 0)}</td>
            </tr>

            <div class="container-fluid pt-5"></div>
            <!-- <tbody class="align-middle"></tbody> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Table End -->

  <div class="container-fluid">
    Thank you!
  </div>

    
    `

}

