window.onload = function(){
  var game = new Game
  game.play()
};

function Game() {
  this.gameActive = true
  this.snake = new Snake
  this.apple = new Apple
  this.board = new Board
}

Game.prototype = {
  play: function() {
    if (this.gameActive) {
      document.addEventListener('keydown', this.snake.changeDirection.bind(this.snake), false);
      this.checkForApple()
      this.snake.advance()
      this.updateGameState()
      this.draw()
      setTimeout(this.play.bind(this), 50 )
    }
  },
  checkForApple: function() {
    if (this.snake.head.xPosition == this.apple.position.xPosition && this.snake.head.yPosition == this.apple.position.yPosition) {
      this.apple.generateNew()
    } else {
      this.snake.positions.pop()
    }
  },
  updateGameState: function() {
    if (this.snake.head.yPosition == -10 ||
      this.snake.head.xPosition == -10) {
      this.gameActive = false
    }
    if (this.snake.head.yPosition == 400 || this.snake.head.xPosition == 400) {
      this.gameActive = false
    }
    for (var i = 1; i < this.snake.positions.length; i++) {
      if (this.snake.head.xPosition == this.snake.positions[i].xPosition && this.snake.head.yPosition == this.snake.positions[i].yPosition) {
        this.gameActive = false
      }
    }
  },
  draw: function() {
    this.board.ctx.clearRect(0,0,400,400)
    this.apple.draw(this.board.ctx)
    this.snake.draw(this.board.ctx)
  }
}

function Snake() {
  this.xPosition = 20
  this.yPosition = 20
  this.direction = "right"
  this.speed = 10
  this.blockSize = 10
  this.positions = [new Coordinates(this.xPosition,this.yPosition) ]
  this.head = this.positions[0]
}

Snake.prototype = {
  changeDirection: function(event) {
    if (event.keyCode == 37) {
      this.direction = "left"
    } else if (event.keyCode == 38) {
      this.direction = "up"
    } else if (event.keyCode == 39) {
      this.direction = "right"
    } else if (event.keyCode == 40) {
      this.direction = "down"
    }
  },
  advance: function() {
    if (this.direction == "right") {
      this.xPosition += this.speed
    } else if (this.direction == "left") {
      this.xPosition -= this.speed
    } else if (this.direction == "down") {
      this.yPosition += this.speed
    } else {
      this.yPosition -= this.speed
    }
    this.newHead()
  },
  newHead: function() {
    var newHead = new Coordinates(this.xPosition, this.yPosition)
    this.positions.unshift(newHead)
    this.head = newHead
  },
  draw: function(ctx) {
    for (index in this.positions) {
      ctx.fillStyle = '#00f'
      ctx.fillRect(this.positions[index].xPosition,this.positions[index].yPosition,this.blockSize, this.blockSize)
    }
  }
}


function Apple() {
  this.blockSize = 10
  this.position
  this.generateNew()
}

Apple.prototype = {
  generateNew: function() {
    var x = (Math.floor(Math.random()*40))*10
    var y = (Math.floor(Math.random()*40))*10
    var apple = new Coordinates(x, y)
    this.position = apple
  },
  draw: function(ctx) {
    ctx.fillStyle = '#3a3'
    ctx.fillRect(this.position.xPosition,this.position.yPosition,this.blockSize,this.blockSize)
  }
}

function Coordinates(x,y) {
  this.xPosition = x
  this.yPosition = y
}


function Board() {
  this.template = "<canvas id='game' width='400' height ='400'></canvas>"
  this.ctx
  this.create()
}

Board.prototype = {
  create: function() {
    var div = document.querySelector("#container")
    div.innerHTML += this.template
    var canvas = document.querySelector('#game')
    this.ctx = canvas.getContext('2d')

  }
}