const arraysMatch = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	
	return true;
};

class SnakeGame {
    constructor(x, y, cs, canvas) {
        
        this.direction = [0, 0];
       
        this.launched = false;
        this.hasStarted = false;
      
        this.timer = 1e3 / (cs / 2);
        
        this.runningTime = 0;

       
        if (!canvas.getContext('2d')) throw 'nope';

      
        this.ctx = canvas.getContext('2d');

       
        this.cs = cs;
       
        this.xC = (x - (x % cs)) / cs;
       
        this.yC = (y - (y % cs)) / cs;

      
        this.apple = [Math.floor(Math.random() * this.xC), Math.floor(Math.random() * this.yC)];

      
        this.snake = new (class {
            constructor(x0, y0) {
                this.pos = [[x0, y0], [x0 + 1, y0], [x0 + 2, y0]];
            }
        })((this.xC - (this.xC % 2)) / 2 - 1, (this.yC - (this.yC % 2)) / 2 - 1);
    }

   
    async start() {
       
        this.launched = true;

       
        this.init()

      
        while (1) {
         
            while (this.launched) {
                
                await this.wait(this.timer);
                
                this.run();
            }
        }
    }

    init() {
        
        this.ctx.fillStyle = '#222222';
        this.ctx.fillRect(0, 0, 600, 600);

       
        addEventListener('keydown', function (e) {
           
            const moves = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

          
            if (moves.includes(e.key)) {
               
                const move = moves.indexOf(e.key);

                if (move % 2 === 0) {
                  
                    if (game.direction[0] !== 0 || !game.hasStarted) {
                        
                        game.direction[1] = move === 0 ? -1 : 1;
                        game.direction[0] = 0;
                       
                        if (!game.hasStarted) game.hasStarted = true;
                    }
                } else if (move % 2 === 1) {
                   
                    if (game.direction[1] !== 0 || !game.hasStarted) {
                       
                        game.direction[0] = move === 1 ? -1 : 1;
                        game.direction[1] = 0;
                        
                        if (!game.hasStarted) game.hasStarted = true;
                    }
                }
            }
        });
    }

  
    run() {
        if (this.hasStarted) {
           
            const positions = this.snake.pos.splice(0, this.snake.pos.length - 1);
            this.snake.pos = [positions[0].map((p, i) => p += this.direction[i]), ...positions];

            if (arraysMatch(this.snake.pos[0], this.apple)) {
                // Apple Eaten?
                this.snake.pos.push(this.apple);
                this.apple = [Math.floor(Math.random() * this.xC), Math.floor(Math.random() * this.yC)];
            } else if (Array.from(this.snake.pos).splice(1, this.snake.pos.length).map(p => arraysMatch(p, this.snake.pos[0])).includes(true)) {
               
                alert(`You lose! Your total score was ${this.snake.pos.length - 3}!`);
                this.hasStarted = false;
                this.reset();
            }

            if (this.snake.pos[0].map((p, i) => i === 0 ? p < 0 || p > this.xC - 1 : p < 0 || p > this.yC - 1).includes(true)) {
               
                alert(`You lose! Your total score was ${this.snake.pos.length - 3}!`);
                this.hasStarted = false;
                this.reset();
            }

           
            this.runningTime += this.timer;

          
            document.getElementById('score').innerHTML = `You have ${this.snake.pos.length - 3} points.`;
            document.getElementById('time').innerHTML = `Time: ${(this.runningTime / 1e3).toFixed(1)}s`;
        }

        
        return this.draw();
    }

    draw() {
        
        const { ctx, cs } = this;

        
        for (let xC = 0; xC < this.xC; xC++) {
            
            for (let yC = 0; yC < this.yC; yC++) {
               
                const pos = [xC, yC];
               
                const offset = 3;

                if (this.snake.pos.map(p => arraysMatch(p, pos)).includes(true)) {
                    
                    if (this.snake.pos.map(p => arraysMatch(p, pos)).indexOf(true) !== 0) ctx.fillStyle = '#41ff41';
                    else ctx.fillStyle = '#ffaa41';
                    ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
                } else if (arraysMatch(this.apple, pos)) {
                    
                    ctx.fillStyle = '#ff4141';
                    ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
                } else {
                    
                    ctx.fillStyle = '#333333';
                    ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
                }
            }
        }
    }

   
    async wait(t) {
        return new Promise(resolve => setTimeout(() => resolve(), t));
    }

    
    reset() {
        this.apple = [Math.floor(Math.random() * this.xC), Math.floor(Math.random() * this.yC)];

        this.snake = new (class {
            constructor(x0, y0) {
                this.pos = [[x0, y0], [x0 + 1, y0], [x0 + 2, y0]];
            }
        })((this.xC - (this.xC % 2)) / 2 - 1, (this.yC - (this.yC % 2)) / 2 - 1);
      
       
        this.runningTime = 0;
      
       
        document.getElementById('score').innerHTML = `You have 0 points.`;
      
        document.getElementById('time').innerHTML = `Press any arrow key to start moving!`;
    }
  }


const game = new SnakeGame(600, 600, 20, document.getElementById('snakeGame'));


game.start();