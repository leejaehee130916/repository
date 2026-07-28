// 경로: js/header.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. 현재 파일의 위치 판별 (pages 폴더 내부인지 여부 확인)
    const path = window.location.pathname;
    const isInPagesFolder = path.includes('/pages/');

    // 2. 현재 위치에 따른 상대 경로 설정
    const homeLink = isInPagesFolder ? '../index.html' : './index.html';
    const puzzleLink = isInPagesFolder ? './puzzle.html' : './pages/puzzle.html';
    const aiMatchLink = isInPagesFolder ? './ai-match.html' : './pages/ai-match.html';

    // 3. 현재 페이지 파일명 확인 (메뉴 활성화 표시용)
    let currentPage = path.split('/').pop();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }

    // 4. 헤더 HTML 구조 생성
    const headerElement = document.createElement('header');
    headerElement.innerHTML = `
        <nav>
            <div class="logo">
                <a href="${homeLink}">♟️ Chess World</a>
            </div>
            <ul class="nav-links">
                <li><a href="${homeLink}" class="${currentPage === 'index.html' ? 'active' : ''}">홈</a></li>
                <li><a href="${puzzleLink}" class="${currentPage === 'puzzle.html' ? 'active' : ''}">체스 퍼즐</a></li>
                <li><a href="${aiMatchLink}" class="${currentPage === 'ai-match.html' ? 'active' : ''}">AI와의 체스</a></li>
            </ul>
        </nav>
    `;

    // 5. body 맨 앞에 헤더 삽입
    document.body.insertBefore(headerElement, document.body.firstChild);
});