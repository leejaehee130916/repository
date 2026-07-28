// 경로: js/puzzle-game.js

document.addEventListener('DOMContentLoaded', function() {
    let board = null;
    let game = new Chess();
    let currentPuzzle = null;
    let moveHistory = [];

    const puzzleSelect = document.getElementById('puzzle-select');
    const randomBtn = document.getElementById('random-btn');
    const resetBtn = document.getElementById('reset-btn');
    const puzzleTitle = document.getElementById('puzzle-title');
    const puzzleDesc = document.getElementById('puzzle-desc');
    const statusEl = document.getElementById('status');

    // 1. 드롭다운에 300개 퍼즐 목록 추가
    if (typeof puzzleData !== 'undefined' && puzzleSelect) {
        puzzleData.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `퍼즐 #${p.id} (${p.mateIn}수 메이트)`;
            puzzleSelect.appendChild(opt);
        });

        puzzleSelect.addEventListener('change', function() {
            loadPuzzle(parseInt(this.value));
        });
    }

    // 2. 퍼즐 불러오기 함수
    function loadPuzzle(id) {
        const puzzle = puzzleData.find(p => p.id === id);
        if (!puzzle) return;

        currentPuzzle = puzzle;
        moveHistory = [];
        game.load(puzzle.fen);

        puzzleTitle.textContent = `퍼즐 #${puzzle.id} (${puzzle.mateIn}수 메이트)`;
        puzzleDesc.textContent = puzzle.description;
        statusEl.textContent = '';
        statusEl.style.color = '#ffffff';

        if (puzzleSelect) {
            puzzleSelect.value = id;
        }

        // 로컬 images 폴더 경로 설정 (pages/ 폴더 기준 상위 폴더의 images)
        const config = {
            draggable: true,
            position: puzzle.fen,
            orientation: game.turn() === 'w' ? 'white' : 'black',
            pieceTheme: '../images/{piece}.png',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
        };

        if (board) {
            board.destroy();
        }
        board = Chessboard('myBoard', config);
    }

    // 3. 기물 드래그 시작 시 검증
    function onDragStart(source, piece, position, orientation) {
        if (game.game_over()) return false;

        // 자신의 차례가 아닌 기물은 드래그 불가
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    }

    // 4. 기물을 놓았을 때 정답 체크
    function onDrop(source, target) {
        const moveStr = source + target;
        
        // 이동 시도 (프로모션 기본값 퀸)
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        // 불법적인 이동인 경우
        if (move === null) return 'snapback';

        moveHistory.push(moveStr);

        // 정답 수순과 비교
        const expectedMove = currentPuzzle.moves[moveHistory.length - 1];
        
        if (moveStr === expectedMove) {
            if (moveHistory.length === currentPuzzle.moves.length) {
                statusEl.textContent = '🎉 정답입니다! 축하합니다!';
                statusEl.style.color = '#4ade80';
            } else {
                statusEl.textContent = '좋은 수입니다! 계속하세요.';
                statusEl.style.color = '#60a5fa';
            }
        } else {
            statusEl.textContent = '❌ 틀렸습니다. 다시 시도해 보세요.';
            statusEl.style.color = '#f87171';
            game.undo();
            moveHistory.pop();
            return 'snapback';
        }
    }

    // 5. 보드 상태 동기화
    function onSnapEnd() {
        board.position(game.fen());
    }

    // 6. 이벤트 리스너 등록
    if (randomBtn) {
        randomBtn.addEventListener('click', function() {
            const randomId = Math.floor(Math.random() * puzzleData.length) + 1;
            loadPuzzle(randomId);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (currentPuzzle) {
                loadPuzzle(currentPuzzle.id);
            }
        });
    }

    // 초기 퍼즐 1번 로드
    loadPuzzle(1);
});