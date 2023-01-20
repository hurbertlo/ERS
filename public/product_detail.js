window.onload = async () => {
    // should be inside window.onload
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    console.log(id);
  
    // Use the id to fetch data from
    const res = await fetch(`/products/${id}`)
    if (res.ok) {
      const product_detail = await res.json();
      console.log(product_detail)
    }else{
        console.log('fail');
    }
    // Rest of the code
  };