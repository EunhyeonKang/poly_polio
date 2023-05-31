var xhr = new XMLHttpRequest();
xhr.open('GET', './data/person.json', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    var table = document.getElementById('person-table');

    var tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + data[i].id + '</td>' +
                      '<td>' + data[i].first_name + '</td>' +
                      '<td>' + data[i].last_name + '</td>' +
                      '<td>' + data[i].email + '</td>' +
                      '<td>' + data[i].gender + '</td>';
      tbody.appendChild(row);
    }
  }
};

xhr.send();


const cardContainer = document.querySelector('.card-container');

fetch('./data/card.json')
  .then(response => response.json())
  .then(data => {
    data.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');

      const imageElement = document.createElement('img');
      imageElement.src = card.image;
      cardElement.appendChild(imageElement);

      const nameElement = document.createElement('h3');
      nameElement.textContent = card.name;
      cardElement.appendChild(nameElement);

      const typeElement = document.createElement('p');
      typeElement.textContent = `Type: ${card.type}`;
      cardElement.appendChild(typeElement);

      if (card.creditLimit) {
        const creditLimitElement = document.createElement('p');
        creditLimitElement.textContent = `Credit Limit: $${card.creditLimit}`;
        cardElement.appendChild(creditLimitElement);
      }

      const balanceElement = document.createElement('p');
      balanceElement.textContent = `Balance: $${card.balance}`;
      cardElement.appendChild(balanceElement);

      cardContainer.appendChild(cardElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


fetch('./data/traffic_data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#trafficTable tbody');

    data.traffic.forEach(item => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = item.id;
      row.appendChild(idCell);

      const locationCell = document.createElement('td');
      locationCell.textContent = item.location;
      row.appendChild(locationCell);

      const vehicleCountCell = document.createElement('td');
      vehicleCountCell.textContent = item.vehicleCount;
      row.appendChild(vehicleCountCell);

      const statusCell = document.createElement('td');
      statusCell.textContent = item.status;
      row.appendChild(statusCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


// API 요청
/*
fetch('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=4Xq9MUHZEaIYSBNn1XcmpLC3psy0AhQZ&searchdate=20230431&data=AP01', { 
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
.then(response => {
    console.log(response);
  })
  .catch(error => {
    // 에러 처리
    console.error(error);
  });*/
  fetch('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=4Xq9MUHZEaIYSBNn1XcmpLC3psy0AhQZ&searchdate=20230431&data=AP01', { 
  mode: 'no-cors' 
})
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    // 에러 처리
  });

  function loginWithKakao() {
    Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5500/kakao/login.html',
    });
}

// 아래는 데모를 위한 UI 코드입니다.
displayToken();
function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
        Kakao.Auth.setAccessToken(token);
        Kakao.Auth.getStatusInfo()
            .then(function(res) {
            if (res.status === 'connected') {
                document.getElementById('token-result').innerText
                = 'login success, token: ' + Kakao.Auth.getAccessToken();
            }
            })
            .catch(function(err) {
            Kakao.Auth.setAccessToken(null);
            });
    }
}

function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { 
        return parts[1].split(';')[0]; 
    }
}