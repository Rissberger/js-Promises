let fav = 33;
let URL = "http://numbersapi.com";

fetch(`${URL}/${fav}?json`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error:', error));



let favnums = [4, 6, 9];
fetch(`${URL}/${favnums}?json`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });


  Promise.all(
    Array.from({ length: 4 }, () => {
      return fetch(`${URL}/${fav}?json`).then(response => response.json());
    })
  )
  .then(facts => {
    facts.forEach(data => {
      let p = document.createElement('p');
      p.textContent = data.text;
      document.body.appendChild(p);
    });
  })
  .catch(error => console.error('Error:', error));
  