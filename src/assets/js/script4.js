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
