const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", () => {
  const url = "https://reqres.in/api/login";

  /*
        ezek az adatok szükésgesek a bejelentkezéshez.
     */
  const body = JSON.stringify({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  //egy token-t kapunk vissza válaszként, ha az adott adatokkal lépünk be.
  //body a request body, mivel a kéréseknek headerje, és bodyja is van.
  sendRequest(url, "POST", body, (token) => {
    console.log(token);

    sendRequest("https://reqres.in/api/users", "GET", null, (user) => {
      console.log(user);
    });
  });
});

const sendRequest = (url, method, body, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };

  xhr.open(method, url);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(body);
};
