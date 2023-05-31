// 드래그 시작 시 호출되는 함수
function dragStart(event) {
    draggedElement = event.target;
    prevIndex = Array.from(draggedElement.parentNode.children).indexOf(draggedElement);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", draggedElement.innerHTML);
    draggedElement.classList.add("dragging");
  }
  
  // 날짜 클릭 시 동작
function onDateClick(event) {
    var selectedDates = this.calendarElement.querySelectorAll('.selected');
    selectedDates.forEach(function(date) {
      date.classList.remove('selected');
    });
  
    var selectedDay = event.target.textContent;
    console.log('Selected day:', selectedDay);
    event.target.classList.add('selected');
    // 여기에 선택한 날짜에 대한 동작을 추가할 수 있습니다.
  }
  

  var Calendar = {
    // 현재 날짜 정보
    currentDate: new Date(),
  
    // 캘린더 테이블을 표시할 요소
    calendarElement: null,
  
    // 선택된 날짜 배열
    selectedDates: [],
  
    // 캘린더 테이블 생성 및 초기화
    createCalendar: function (element) {
      this.calendarElement = element;
      this.updateCalendar();
    },
  
    // 이전 달로 이동
    goToPreviousMonth: function () {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateCalendar();
    },
  
    // 다음 달로 이동
    goToNextMonth: function () {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updateCalendar();
    },
  
    // 캘린더 업데이트
    updateCalendar: function () {
      var year = this.currentDate.getFullYear();
      var month = this.currentDate.getMonth();
  
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
  
      var firstDayOfWeek = firstDay.getDay();
      var daysInMonth = lastDay.getDate();
  
      var calendarTable = document.createElement('table');
  
      // 월, 연도 표시
      var caption = document.createElement('caption');
      caption.textContent = year + '년 ' + (month + 1) + '월';
      calendarTable.appendChild(caption);
  
      // 이전 달로 이동 버튼
      var previousButton = document.createElement('button');
      previousButton.innerHTML = '이전 달';
      previousButton.classList.add('arrow-button');
      previousButton.addEventListener('click', function () {
        Calendar.goToPreviousMonth();
        enableDrag(); // 드래그 기능 활성화 함수 호출
      });
      calendarTable.appendChild(previousButton);
  
        // 다음 달로 이동 버튼
        var nextButton = document.createElement('button');
        nextButton.innerHTML = '다음 달';
        nextButton.classList.add('arrow-button');
        nextButton.addEventListener('click', function () {
        Calendar.goToNextMonth();
        // 다음 달로 이동한 후에 드래그 기능을 다시 활성화해야 합니다.
        enableDrag(); // 드래그 기능 활성화 함수 호출
        });
        calendarTable.appendChild(nextButton);
        
      // 요일 표시
      var weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      var weekdaysRow = document.createElement('tr');
      for (var i = 0; i < 7; i++) {
        var th = document.createElement('th');
        th.textContent = weekdays[i];
        weekdaysRow.appendChild(th);
      }
      calendarTable.appendChild(weekdaysRow);
  
      // 날짜 표시
      var date = 1;
      var daysRow = document.createElement('tr');
  
      // 이전 달 날짜 표시
      for (var i = 0; i < firstDayOfWeek; i++) {
        var td = document.createElement('td');
        td.classList.add('previous-month');
        td.textContent = lastDay.getDate() - (firstDayOfWeek - i - 1);
        td.addEventListener('dragstart', dragStart.bind(this)); // 수정된 부분
        td.addEventListener('click', onDateClick.bind(this)); // 수정된 부분
        daysRow.appendChild(td);
      }
  
      // 현재 달 날짜 표시
      while (date <= daysInMonth) {
        var td = document.createElement('td');
        td.textContent = date;
        if (
          date === this.currentDate.getDate() &&
          month === this.currentDate.getMonth() &&
          year === this.currentDate.getFullYear()
        ) {
          td.classList.add('selected');
        }
        td.addEventListener('click', onDateClick.bind(this));
        td.addEventListener('dragstart', dragStart.bind(this));
        td.addEventListener('dragstart', dragStart.bind(this)); // 수정된 부분
        td.addEventListener('click', onDateClick.bind(this)); // 수정된 부분
        daysRow.appendChild(td);
        if (daysRow.children.length % 7 === 0) {
          calendarTable.appendChild(daysRow);
          daysRow = document.createElement('tr');
        }
        date++;
      }
  
      // 다음 달 날짜 표시
      var nextMonthDay = 1;
      while (daysRow.children.length < 7) {
        var td = document.createElement('td');
        td.classList.add('next-month');
        td.textContent = nextMonthDay;
        td.addEventListener('dragstart', dragStart.bind(this)); // 수정된 부분
        td.addEventListener('click', onDateClick.bind(this)); // 수정된 부분
        daysRow.appendChild(td);
        nextMonthDay++;
      }
  
      calendarTable.appendChild(daysRow);
  
      // 캘린더 요소에 테이블 추가
      this.calendarElement.innerHTML = '';
      this.calendarElement.appendChild(calendarTable);
    },
  };
  
  
  var isDragging = false;
  var startDateElement = null;
  function enableDrag() {

  var dateElements = calendarElement.getElementsByTagName('td');
  
  Array.from(dateElements).forEach(function(dateElement) {
    dateElement.addEventListener('mousedown', function(event) {
      event.preventDefault();
      isDragging = true;
      startDateElement = event.target;
      startDateElement.classList.add("selected");
    });
  
    dateElement.addEventListener('mouseover', function(event) {
      if (isDragging) {
        var endDateElement = event.target;
        if (endDateElement !== startDateElement) {
          var allDateElements = Array.from(dateElements);
          var startIndex = allDateElements.indexOf(startDateElement);
          var endIndex = allDateElements.indexOf(endDateElement);
          var minIndex = Math.min(startIndex, endIndex);
          var maxIndex = Math.max(startIndex, endIndex);
  
          allDateElements.forEach(function(element, index) {
            if (index >= minIndex && index <= maxIndex) {
              element.classList.add("selected");
            } else {
              element.classList.remove("selected");
            }
          });
        }
      }
    });
  
    dateElement.addEventListener('mouseup', function(event) {
      isDragging = false;
      startDateElement = null;
  
      var selectedDates = calendarElement.querySelectorAll('.selected');
  
      var dateArray = Array.from(selectedDates).map(function(dateElement) {
        return dateElement.textContent;
      });
  
      console.log('Selected dates:', dateArray);
  
    //   selectedDates.forEach(function(date) {
    //     date.classList.remove('selected');
    //   });
    });
  });
};

  // 캘린더 생성
  var calendarElement = document.getElementById('calendar');
  Calendar.createCalendar(calendarElement);
  enableDrag(); // 초기에 드래그 기능 활성화

