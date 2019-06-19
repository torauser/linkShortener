
const apiKey = 'd5520d91d0e1460bb771648e0eb5c09c';
const url = 'https://api.rebrandly.com/v1/links';


const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

const renderResponse = (res) => {
    if(res.errors){
      responseField.innerHTML = "<p>Что-то не так.</p><p>Попробуйте еще раз.</p>"
    } else {
      responseField.innerHTML = `<p>Готово: </p><p> ${res.shortUrl} </p>`
    }
  }


const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.response);
  		renderResponse(response);
	}
  }
    xhr.open('POST',url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', apiKey);
    xhr.send(data)
}


const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);
