// 경로: js/ai-game.js

document.addEventListener('DOMContentLoaded', function() {
    let board = null;
    let game = new Chess();
    
    const ratingSelect = document.getElementById('rating-select');
    const startBtn = document.getElementById('start-btn');
    const gameStatusEl = document.getElementById('game-status');

    // 1. 기물 가치 평가표 (MiniMax 알고리즘용)
    const pieceValues = {
        p: 10,
        n: 30,
        b: 30,
        r: 50,
        q: 90,
        k: 900
    };

    // 2. 게임 시작/초기화 함수
    function startNewGame() {
        game.reset();
        
        const config = {
            draggable: true,
            position: 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
        };

        if (board) {
            board.destroy();
        }
        board = Chessboard('aiBoard', config);
        updateStatus();
    }

    // 3. 기물 드래그 제어 (플레이어는 항상 백)
    function onDragStart(source, piece, position, orientation) {
        if (game.game_over()) return false;
        
        // 흑(AI) 기물은 플레이어가 직접 움직일 수 없음
        if (piece.search(/^b/) !== -1) return false;
    }

    // 4. 플레이어의 착수
    function onDrop(source, target) {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q' // 자동 퀸 프로모션
        });

        if (move === null) return 'snapback';

        updateStatus();

        // 플레이어 착수 후 AI 응수 (작은 지연으로 자연스럽게 연출)
        if (!game.game_over()) {
            window.setTimeout(makeAIMove, 250);
        }
    }

    // 5. AI 응수 및 난이도별 알고리즘
    function makeAIMove() {
        const rating = parseInt(ratingSelect.value);
        const possibleMoves = game.moves();

        if (possibleMoves.length === 0) return;

        let selectedMove = null;

        // 난이도에 따른 착수 결정
        if (rating <= 200) {
            // Rating 200: 100% 무작위 착수
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            selectedMove = possibleMoves[randomIndex];
        } else if (rating <= 500) {
            // Rating 500: 70% 무작위 + 30% 기물 잡기 위주
            if (Math.random() < 0.7) {
                const randomIndex = Math.floor(Math.random() * possibleMoves.length);
                selectedMove = possibleMoves[randomIndex];
            } else {
                selectedMove = getBestCaptureMove() || possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            }
        } else {
            // Rating 1000~1500: 탐색 및 최적 수 계산
            selectedMove = getBestMove(rating);
        }

        game.move(selectedMove);
        board.position(game.fen());
        updateStatus();
    }

    // 기물 잡는 수 탐색
    function getBestCaptureMove() {
        const moves = game.moves({ verbose: true });
        const captures = moves.filter(m => m.captured);
        if (captures.length > 0) {
            captures.sort((a, b) => (pieceValues[b.captured] || 0) - (pieceValues[a.captured] || 0));
            return captures[0].san;
        }
        return null;
    }

    // 수 평가 기반 최적 수 계산
    function getBestMove(rating) {
        const moves = game.moves({ verbose: true });
        let bestMove = moves[0];
        let bestValue = -9999;

        // 실수할 확률 (1000: 30%, 1200: 15%, 1500: 0%)
        const mistakeRate = rating === 1000 ? 0.3 : (rating === 1200 ? 0.15 : 0);

        if (Math.random() < mistakeRate) {
            return moves[Math.floor(Math.random() * moves.length)].san;
        }

        moves.forEach(move => {
            game.move(move.san);
            let boardValue = evaluateBoard();
            game.undo();

            if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMove = move;
            }
        });

        return bestMove.san;
    }

    // 단순 보드 상태 평가 함수
    function evaluateBoard() {
        let totalEvaluation = 0;
        const b = game.board();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = b[i][j];
                if (piece) {
                    const val = pieceValues[piece.type] || 0;
                    totalEvaluation += (piece.color === 'b' ? val : -val);
                }
            }
        }
        return totalEvaluation;
    }

    // 6. 상태 메시지 업데이트
    function updateStatus() {
        let status = '';

        if (game.in_checkmate()) {
            status = game.turn() === 'w' ? '패배했습니다... (체크메이트)' : '🎉 승리했습니다! (체크메이트)';
        } else if (game.in_draw()) {
            status = '무승부입니다. (스테일메이트 또는 기물 부족)';
        } else {
            status = game.turn() === 'w' ? '당신의 차례입니다 (백)' : 'AI가 생각 중입니다... (흑)';
            if (game.in_check()) {
                status += ' - ⚠️ 체크!';
            }
        }

        gameStatusEl.textContent = status;
    }

    function onSnapEnd() {
        board.position(game.fen());
    }

    // 7. 이벤트 연결
    if (startBtn) {
        startBtn.addEventListener('click', startNewGame);
    }

    // 초기 게임 시작
    startNewGame();
});