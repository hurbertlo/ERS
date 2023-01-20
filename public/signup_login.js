$('#form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  console.log('12312r')
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(800);
  
});



let newUserElm = document.querySelector(`#signup`)

newUserElm.addEventListener('submit', async (e) => {
	e.preventDefault()

	// prep
	let formData = new FormData(newUserElm)

	// send
	let res = await fetch('/user/signup', {
		method: 'POST',
		body: formData
	})


	// post handling
	if (res.ok) {
		newUserElm.reset()
		// let data = await res.json()
		// console.log('post ok', data)
		// loadMemos()
	} else {
		console.log('post fail')
	}
})





// signinElm.addEventListener(`sumit`,async(e)=>{
//   e.preventDefault()

//   let uploadData = {
//     user_type_id: newUserElm.user_type_id.value,
//     name:  newUserElm.name.value,
//     address: newUserElm.address.value,
//     mobile: newUserElm.mobile.value, 
//     email: newUserElm.email.value,
//     password: newUserElm.password.value,
//     profile_picture: newUserElm.profile_picture.value
//   }
//   let res = await fetch(`/user/signin`,{
//     method: 'POST',
//     headers:{
//       'Content-Type': 'application/jsom'
//     },
//     body: JSON.stringify(uploadData)
//   })
//   // post handling
// 	if (!res.ok) {
// 		return
// 	}

// 	let data = res.json()
// 	console.log(data)
// 	window.location = '/index.html'

// })