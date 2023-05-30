// main card
window.onscroll = () => {
    const parentDiv = document.querySelector('.parent_div');
    const viewportHeight = window.innerHeight;
    const fromViewportToParentHeight = parentDiv.getBoundingClientRect().top;
    const scrolling = viewportHeight - fromViewportToParentHeight;
    // parentDiv의 height가 뷰포트 높이보다 크면 뷰포트로, 아닐경우 parentDiv로
    let divHeight = parentDiv.clientHeight > viewportHeight ? viewportHeight : parentDiv.clientHeight;
    let scrollRate = scrolling / divHeight * 100;

    if (scrolling / divHeight * 100 < 0) {
        scrollRate = 0;
    } else if (scrolling / divHeight * 100 > 100) {
        scrollRate = 100;
    }

    // 스타일 적용하는 부분
    const childDiv = document.querySelector('.child_div');
    childDiv.style.transform = `scale(${scrollRate / 100})`;
};


// text 에니메이션
const lines = document.querySelectorAll('.textAnimation .line');

function showLines() {
lines.forEach((line, index) => {
    setTimeout(() => {
    line.classList.add('show');
    }, (index + 1) * 1000);
});
}

showLines();
// 버튼 경로
document.getElementById('contact').addEventListener('click', function() {
    window.location.href = '/ctmCenter';
  });
  document.getElementById('cardInfo').addEventListener('click', function() {
    window.location.href = '/bankInfo';
  });

// 라이트/다크 모드
function nightDayHandler(self) {
var target = document.getElementById('content-wrap');
if (self.value === 'night') {
    target.style.backgroundColor = 'black';
    target.style.color = 'white';
    self.value = 'day';
} else {
    target.style.backgroundColor = 'white';
    target.style.color = 'black';
    self.value = 'night';
}
}


// 캘린더
  var Calendar = {
  // 현재 날짜 정보
  currentDate: new Date(),

  // 캘린더 테이블을 표시할 요소
  calendarElement: null,

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

  // 날짜 클릭 시 동작
  onDateClick: function (event) {
      var selectedDates = this.calendarElement.querySelectorAll('.selected');
      selectedDates.forEach(function(date) {
          date.classList.remove('selected');
      });

      var selectedDay = event.target.textContent;
      console.log('Selected day:', selectedDay);
      event.target.classList.add('selected');
      // 여기에 선택한 날짜에 대한 동작을 추가할 수 있습니다.
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
      previousButton.textContent = '이전 달';
      previousButton.addEventListener('click', function () {
          Calendar.goToPreviousMonth();
      });
      calendarTable.appendChild(previousButton);

      // 다음 달로 이동 버튼
      var nextButton = document.createElement('button');
      nextButton.textContent = '다음 달';
      nextButton.addEventListener('click', function () {
          Calendar.goToNextMonth();
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
          td.addEventListener('click', this.onDateClick.bind(this));
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
          daysRow.appendChild(td);
          nextMonthDay++;
      }

      calendarTable.appendChild(daysRow);

      // 캘린더 요소에 테이블 추가
      this.calendarElement.innerHTML = "";
      this.calendarElement.appendChild(calendarTable);
  },
};

// 캘린더 생성
var calendarElement = document.getElementById('calendar');
Calendar.createCalendar(calendarElement);



