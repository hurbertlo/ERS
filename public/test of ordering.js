let grabElm = document.querySelector(`.wishlist`);
grabElm.addEventListener(`submit`, async (e) => {
  e.preventDefault();
  let formData ={
	amount: grabElm.amount.value,
  }

  let res = await fetch(`/user/basket`, {
    method: "POST",
	headers:{
		'Content-type': 'application/json'
	},
    body: JSON.stringify(formData)
  });
  //  post handling
  if (res.ok) {
    grabElm.reset();
    res.end("Added to basket");
  } else {
    res.end("Added fail");
  }
});