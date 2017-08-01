const ajax = (verb, url, body, successCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(verb, `${url}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(body));

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

const client = {
  getPosts: () => {
    ajax("GET", "/posts/", null, (res) => {
      console.log(res);
    });
  },
  newPost: (picUrl, description) => {
    ajax("POST", "/posts/", {picUrl, description}, (res) => {
      console.log(res);
    });
  }
}