document.querySelector("footer").innerHTML = `

    <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>香港上環文咸西街59-67號金日集團中心
                ​11樓 C-E室</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@hoppers.com</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+852 9725 6400</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="font-weight-bold text-dark mb-4">快速連結</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-dark mb-2" href="/index.html"><i class="fa fa-angle-right mr-2"></i>首頁</a>
                            <a class="text-dark mb-2" href="/listing.html?category=all.html"><i class="fa fa-angle-right mr-2"></i>全部</a>
                            <a class="text-dark mb-2" href="/listing.html?category=food.html"><i class="fa fa-angle-right mr-2"></i>食品</a>
                            <a class="text-dark mb-2" href="/listing.html?category=toy.html"><i class="fa fa-angle-right mr-2"></i>玩具</a>
                            <a class="text-dark mb-2" href="/listing.html?category=clothing.html"><i class="fa fa-angle-right mr-2"></i>衣服</a>
                            <a class="text-dark" href="/listing.html?category=tool.html"><i class="fa fa-angle-right mr-2"></i>工具</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="font-weight-bold text-dark mb-4">獲取最新消息</h5>
                        <form action="">
                            <div class="form-group">
                                <input type="text" class="form-control border-0 py-4" placeholder="名稱" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0 py-4" placeholder="電郵"
                                    required="required" />
                            </div>
                            <div>
                                <button class="btn btn-primary btn-block border-0 py-3" type="submit">訂閱我們</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top border-light mx-xl-5 py-4">
            <div class="col-md-6 px-xl-0">
                <p class="mb-md-0 text-center text-md-left text-dark">
                    &copy; <a class="text-dark font-weight-semi-bold" href="#">Hoppers Co., Ltd.</a> 
                </p>
            </div>
            <div class="col-md-6 px-xl-0 text-center text-md-right">
                <img class="img-fluid" src="img/payments.png" alt="">
            </div>
        </div>
    </div>
`;
