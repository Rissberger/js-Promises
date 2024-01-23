let fav = 3;
let URL = "http://numbersapi.com";


async function getUrl() {
    let res = await axios.get(`${URL}/${fav}?json`);
    let data = await res.json();   
    console.log(data)

}

getUrl();


const favNumbers = [7, 11, 22];

async function part2() {
  let response = await fetch(`${URL}/${favNumbers}?json`);
  let data = await response.json();
  console.log(data);
}
part2();


async function part3() {
    let promises = Array.from({ length: 4 }, () => fetch(`${baseURL}/${favNumber}?json`).then(response => response.json()));
    let facts = await Promise.all(promises);
    facts.forEach(data => {
      let p = document.createElement('p');
      p.textContent = data.text;
      document.body.appendChild(p);
    });
  }
  part3();
  