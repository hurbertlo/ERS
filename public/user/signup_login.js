$("#form")
  .find("input, textarea")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();
  console.log("12312r");
  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(800);
});

let newUserElm = document.querySelector(`.signupform`);
newUserElm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // prep
  let formData = new FormData(newUserElm);
  // send
  let res = await fetch("/user/signup", {
    method: "POST",
    body: formData,
  });
  // post handling
  if (res.ok) {
    newUserElm.reset();
  } else {
    console.log("signup fail");
  }
});

let signInElm = document.querySelector(`.signform`);
signInElm.addEventListener(`submit`, async (e) => {
  e.preventDefault();
  let formData ={
	email: signInElm.email.value,
	password: signInElm.password.value,
  }

  let res = await fetch(`/user/signin`, {
    method: "POST",
	  headers:{
		'Content-type': 'application/json'
	},
    body: JSON.stringify(formData)
  });
  //  post handling
  if (res.ok) {
    console.log("sign in success");
  } else {
    console.log("sign in fail");
  }

  // 	let data = res.json()
  // 	console.log(data)
  // window.location = '/index.html'
});
