const ajax = (verb, url, successCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(verb, `${url}`);
  xhr.send(null);

  xhr.onreadystatechange = () => {
    const DONE = 4;
    const OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {        
        successCallback(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}

ajax("GET", "/posts/", (res) => {
  console.log(res);
});