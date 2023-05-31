var context = document
        .getElementById('myChart')
        .getContext('2d');
    var myChart = new Chart(context, {
        type: 'line', // 차트의 형태
        data: { // 차트에 들어갈 데이터
            labels: [
                //x 축
                '1','2','3','4','5','6','7'
            ],
            datasets: [
                { //데이터
                    label: 'test1', //차트 제목
                    fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: [
                        21,19,25,20,23,26,25 //x축 label에 대응되는 데이터 값
                    ],
                    backgroundColor: [
                        //색상
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        //경계선 색상
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1 //경계선 굵기
                }/* ,
                {
                    label: 'test2',
                    fill: false,
                    data: [
                        8, 34, 12, 24
                    ],
                    backgroundColor: 'rgb(157, 109, 12)',
                    borderColor: 'rgb(157, 109, 12)'
                } */
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });


        // AJAX 요청을 통해 JSON 파일 가져오기
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../../data/traffic.json'); // traffic.json 파일 경로에 따라 수정해야 할 수 있습니다.
        xhr.onload = function() {
          if (xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);
            const tableBody = document.querySelector('#trafficTable tbody');
    
            // JSON 데이터를 테이블에 추가하는 함수
            function addRowToTable(data) {
              const newRow = document.createElement('tr');
    
              Object.values(data).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                newRow.appendChild(cell);
              });
    
              tableBody.appendChild(newRow);
            }
    
            // JSON 데이터의 각 객체를 순회하며 테이블에 추가
            jsonData.realtimestationarrival.row.forEach(rowData => {
              addRowToTable(rowData);
            });
          } else {
            console.error('Failed to load JSON file');
          }
        };
        xhr.send();