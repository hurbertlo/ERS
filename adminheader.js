document.querySelector("#header").innerHTML = /*html*/ `
<nav class="navbar bg-light">
<div class="container-fluid">
   <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
    <!--<a class="navbar-brand" href="#">Pet World</a>  -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Hoppers</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
       
        <div class="menu-container">
            <a href='/index.html'>
            <div class="menu-item">首頁</div>
            </a>
            <a href='/listing.html?category=chat'>
              <div class="menu-item">對話</div>
            </a>
            <a href='/listing.html?category=orderStatus'>
              <div class="menu-item">交易狀態</div>
            </a>
            <a href='/listing.html?category=Stock'>
              <div class="menu-item">貨存</div>
            </a>
            <a href='/listing.html?category=Catelog'>
              <div class="menu-item">產品目錄</div>
            </a>
            <a href='/listing.html?category=tool'>
              <div class="menu-item">XXX</div>
            </a>

        </div>
       
    
 
    </div>
    </div>
    </div>
</nav> 

<div class="main-container">
        <div class="head-container">
        <img class="logo" src="/pet_logo.jpg">
        <div class="icon-group">
        <div class="icon-group-item">
            <a href='/user/signup_login.html'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg></i></div></a>
            <a href='/cart.html'>
            <div class="icon-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg></div></a>
            <a href='/chat.html'>
        <div class="icon-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg></div>
        </div>
        </div>




        <div class="menu-container-2">
        <a href='/index.html'>
          <div class="menu-item">首頁</div>
        </a>
        <a href='/listing.html?category=all'>
          <div class="menu-item">全部</div>
        </a>
        <a href='/listing.html?category=food'>
          <div class="menu-item">食品</div>
        </a></b>
        <a href='/listing.html?category=clothing'>
          <div class="menu-item">玩具</div>
        </a></b>
        <a href='/listing.html?category=toy'>
          <div class="menu-item">衣服</div>
        </a></b>
        <a href='/listing.html?category=tool'>
          <div class="menu-item">工具</div>
        </a>
        </div>
</div>`;

window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY > 10) {
        document.querySelector("#header").classList.add("header-shadow");
    } else {
        document.querySelector("#header").classList.remove("header-shadow");
    }
});
