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

