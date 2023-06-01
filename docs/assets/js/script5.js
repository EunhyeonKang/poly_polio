// JSON 데이터 가져오기
fetch('./data/forum.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('table-body');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 10; // 페이지당 표시할 아이템 개수
    let currentPage = 0; // 현재 페이지 번호
    let totalPages = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수
    function updatePageButtons() {
      const buttons = pagination.getElementsByTagName('button');
    
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
    
      buttons[currentPage].classList.add('active');
    }
    // 페이지 번호를 생성하는 함수
    // 페이지 버튼 생성 함수
    function generatePageButtons() {
      const pagination = document.getElementById('pagination');

      pagination.innerHTML = '';

      const numPages = Math.ceil(data.length / itemsPerPage);

      for (let i = 0; i < numPages; i++) {
        const button = document.createElement('button');
        button.innerText = i + 1;
        button.addEventListener('click', () => {
          currentPage = i;
          renderTable();
          updatePageButtons();
        });
        pagination.appendChild(button);
      }
    }

    // 테이블 렌더링 함수
    function renderTable() {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const tableData = data.slice(startIndex, endIndex);

      tableBody.innerHTML = '';

      tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="checkbox" id="chk"></td>
          <td>${item.id}</td>
          <td>${item.title}</td>
        `;
        if (item.id % 2 === 0) {
            row.classList.add('even');
    
        } 
        tableBody.appendChild(row);
      });
    }

    // 초기 테이블 및 페이지네이션 렌더링
    renderTable();
    generatePageButtons();
    updatePageButtons();
});
