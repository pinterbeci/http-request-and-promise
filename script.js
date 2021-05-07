console.log(`_____________________________________`);
console.log(`HTTP protokoll`);

/*
        A JS motorban lévő utasítás végrehajtás
        A szinkron, aszinkron műveletek

        egy stack felel a műveletek végrehajtási sorrendjéért. Ahogy a kódban helyezkednek abban a sorrendben kerülnek be a stackbe.
        Viszont a DOM műveletek, AJAX kérések, setTimeout(), is bekerül, de azzal az elennal át is 'repül' a Web API-hoz.
        Ezt a többi utasítás nem veszi észre és hajtódnak végre sorban.
        Ha az összes olyan utasítás végrehajtódott, amik nem jogosultak az API-ban való helyek egyikre, akkor az API-ban
        felhalmozódott utasítások hajtódnak végre sorban, bekerülésük sorrendjében.
        Az API-ból vissza a 'stack'-be keverednek és végrehajtódnak.
        Ha esetleges egy setTimeout(füügvény, 0), azaz o ms várakozás idejű, akkor sem hajtódik hamarabb végre, csak miután az
        API-ból kikerül vissza a callback stack-be.

        Tehát az API-ba kerülnek aszinkron műveletek.
    */

console.log(`______________`);
console.log(`AJAX kérések:`);

("https://jsonplaceholder.typicode.com/posts");

const btn = document.querySelector("#fetch-posts");

btn.addEventListener("click", () => {
  /*
        szerver oldali kérést reprezentál az 'XMLHttpRequest',
        szerverrel való interakcióba, kapcsolatba lépésre használandó
    */
   let xhr = new XMLHttpRequest();

  /*
        ha a kérés életciklusában egy változás történik.
        4 állapotát különböztetjük meg:
            0 - ha a kérés nem incializált
            1 - ha a kapcsolat létrejött a szerverrel
            2 - ha a kérés fogadva lett
            3 - ha a kérés feldolgozás alatt van
            4 - ha a kérés kész, válasz kész.

         az 'onreadystatechange' property egy olyan függvény definiál,
         mely akkor hajtódik végre, ha a 'readyState' értéke változik   
    */

  /*
        az 'onreadyStatechange' property olyan függvényt definiál, mely figyeli a 'readytate' property értékének 
        változását, tehát milyen szakaszában van épp a kérés.  
    */
  xhr.onreadystatechange = () => {
    /*
            ha a 'readyState' === 4, azaz a kérés kész és a válasz kész,
            és a 'status' === 200, azaz sikeres a kérés, akkor lekérjük az adatokat.
        */
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));

      let postContainer = document.querySelector(".post-container");
      let posts = JSON.parse(xhr.responseText);
      let renderThisDataInHtml = "";

      for (currentItem in posts) {
        renderThisDataInHtml += `
                <ul>
                    <li> userId = ${posts[currentItem].userId} </li>
                    <li> id = ${posts[currentItem].id} </li>
                    <li> title = ${posts[currentItem].title} </li>
                    <li> body = ${posts[currentItem].body} </li>
                </ul>
      `;
      }

      postContainer.innerHTML = renderThisDataInHtml;
    }
  };

  /*
        az 'open()' metódus, egy metódust vár (GET, POST) és egy címet, ahová az adott típusú kérést kiküldjük
    */
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  /*
        a kérés konkrét kiküldése!!!!
    */
  xhr.send();
});







