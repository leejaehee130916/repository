document.addEventListener("DOMContentLoaded", () => {
  // 모든 페이지 맨 밑에 들어갈 푸터 HTML
  const footerHTML = `
    <footer>
      <p>© 2026 이재희 체스 프로젝트 | 오늘도 체스 공부 어떠세요?</p>
    </footer>
  `;

  // 화면 맨 아래에 추가
  document.body.insertAdjacentHTML("beforeend", footerHTML);
});