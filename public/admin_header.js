document.querySelector("#admin_header").innerHTML = /*html*/ `

 <!-- Topbar Start -->
 <div class="container-fluid">
 <div class="row bg-secondary py-2 px-xl-5">
 </div>
</div>
<!-- Topbar End -->

<!-- Navbar Start -->
<div class="container-fluid mb-5">
<div class="row border-top px-xl-5">

 <div class="col-lg-9">
     <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
         <a href="" class="text-decoration-none d-block d-lg-none">
             <h1 class="m-0 display-5 font-weight-semi-bold">Hoppers</h1>
         </a>
         <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
             <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
             <div class="navbar-nav mr-auto py-0">
                 <a href="admin_panel.html" class="nav-item nav-link">首頁</a>
                 <a href="chat.html" class="nav-item nav-link">即時對話</a>
                 <a href="admin_update_order_status.html" class="nav-item nav-link">交易狀態</a>
                 <a href="admin_update_products.html" class="nav-item nav-link">產品更新</a>
                 <a href="admin_inventory.html" class="nav-item nav-link">存貨紀錄</a>
                 <a href="admin_order_details.html" class="nav-item nav-link">銷售紀錄</a>
                 <a href="/index.html" class="nav-item nav-link">返回購物網站</a> 
             </div>
         </div>
     </nav>

 </div>
</div>
</div>
<!-- Navbar End -->
`;

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  if (window.scrollY > 10) {
    document
      .querySelector("#admin_header")
      .classList.add("admin_header-shadow");
  } else {
    document
      .querySelector("#admin_header")
      .classList.remove("admin_header-shadow");
  }
});
