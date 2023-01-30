window.onload = async () => {
  // should be inside window.onload

  const res = await fetch(`/basket`);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  } else {
    console.log("fail");
  }
  // Rest of the code
};
