window.onload = async () => {
  // should be inside window.onload
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  console.log(id);

  // Use the id to fetch data from
  const res = await fetch(`/products/${id}`);
  if (res.ok) {
    const product_detail = await res.json();
    console.log(product_detail);
    const rightBoard = document.querySelector(".right-board");
    rightBoard.innerHTML = ` 

      
      <h3 class="font-weight-semi-bold">${product_detail.data.name}</h3>
        <div class="d-flex mb-3">
            <div class="text-primary mr-2">
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star-half-alt"></small>
                <small class="far fa-star"></small>
            </div>
            <small class="pt-1">(50 Reviews)</small>
        </div>
        <h3 class="font-weight-semi-bold mb-4">$${product_detail.data.price}</h3>
        <pre class="mb-4">${product_detail.data.discription}</pre>
      
        
        <div class="d-flex align-items-center mb-4 pt-2">
            <div class="input-group quantity mr-3" style="width: 130px;">
                <div class="input-group-btn">
                    <button class="btn btn-primary btn-minus" >
                    <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="form-control bg-secondary text-center" value="1">
                <div class="input-group-btn">
                    <button class="btn btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
        </div>
      `;
  }
  console.log(rightBoard);
  // Rest of the code
};
