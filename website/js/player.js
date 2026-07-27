// 파일 경로: js/player.js

class Player {

    constructor(game){

        this.game = game;

        this.width = 40;
        this.height = 40;

        this.x =
            (game.width - this.width) / 2;

        this.y =
            game.height - this.height - 20;

        this.speed = 6;

        this.hp = 3;

        this.cooldown = 0;

        this.maxCooldown = 12;

        this.moveLeft = false;
        this.moveRight = false;

    }

    update(){

        if(this.moveLeft){

            this.x -= this.speed;

        }

        if(this.moveRight){

            this.x += this.speed;

        }

        if(this.x < 0){

            this.x = 0;

        }

        if(this.x + this.width > this.game.width){

            this.x =
                this.game.width - this.width;

        }

        if(this.cooldown > 0){

            this.cooldown--;

        }

    }

    draw(ctx){

        ctx.save();

        ctx.fillStyle = "#00A8FF";

        ctx.beginPath();

        ctx.moveTo(
            this.x + this.width/2,
            this.y
        );

        ctx.lineTo(
            this.x,
            this.y + this.height
        );

        ctx.lineTo(
            this.x + this.width,
            this.y + this.height
        );

        ctx.closePath();

        ctx.fill();

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            this.x + 17,
            this.y + 8,
            6,
            18
        );

        ctx.restore();

    }

    shoot(){

        if(this.cooldown > 0){

            return;

        }

        this.cooldown =
            this.maxCooldown;

        this.game.bullets.push(

            new Bullet(

                this.x + this.width/2 - 2,

                this.y,

                -8

            )

        );

    }

    damage(){

        this.hp--;

        if(this.hp < 0){

            this.hp = 0;

        }

        if(typeof updateHP === "function"){

            updateHP(this.hp);

        }

        if(this.hp === 0){

            this.game.gameOver();

        }

    }

}// ================================
// 키보드 입력 이벤트
// ================================

Player.prototype.bindKeyboard = function(){

    window.addEventListener("keydown",(e)=>{

        switch(e.code){

            case "ArrowLeft":
                this.moveLeft = true;
                break;

            case "ArrowRight":
                this.moveRight = true;
                break;

            case "Space":
                e.preventDefault();
                this.shoot();
                break;

        }

    });

    window.addEventListener("keyup",(e)=>{

        switch(e.code){

            case "ArrowLeft":
                this.moveLeft = false;
                break;

            case "ArrowRight":
                this.moveRight = false;
                break;

        }

    });

};

// ================================
// 모바일 버튼 연결
// ================================

Player.prototype.bindMobile = function(){

    const left =
        document.getElementById("leftBtn");

    const right =
        document.getElementById("rightBtn");

    const fire =
        document.getElementById("fireBtn");

    if(left){

        left.addEventListener("touchstart",()=>{

            this.moveLeft = true;

        });

        left.addEventListener("touchend",()=>{

            this.moveLeft = false;

        });

    }

    if(right){

        right.addEventListener("touchstart",()=>{

            this.moveRight = true;

        });

        right.addEventListener("touchend",()=>{

            this.moveRight = false;

        });

    }

    if(fire){

        fire.addEventListener("touchstart",()=>{

            this.shoot();

        });

    }

}
;

// ================================
// 초기화
// ================================

Player.prototype.init = function(){

    this.bindKeyboard();

    this.bindMobile();

};

// ================================
// 전역 등록
// ================================

window.Player = Player;