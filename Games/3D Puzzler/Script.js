var keys = {}
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false)
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false)

var moveForwards = 0
var moveLeft = 0
var moveBackwards = 0
var moveRight = 0
var turnLeft = 0
var turnRight = 0

keyboardJS.bind('w', function(e){
  moveForwards = 1
}, function(e){
  moveForwards = 0
})

keyboardJS.bind('a', function(e){
  moveLeft = 1
}, function(e){
  moveLeft = 0
})

keyboardJS.bind('s', function(e){
  moveBackwards = 1
}, function(e){
  moveBackwards = 0
})

keyboardJS.bind('d', function(e){
  moveRight = 1
}, function(e){
  moveRight = 0
})

keyboardJS.bind('left', function(e){
  turnLeft = 1
}, function(e){
  turnLeft = 0
})

keyboardJS.bind('right', function(e){
  turnRight = 1
}, function(e){
  turnRight = 0
})

keyboardJS.bind('l', function(e){
  LoadLevel()
})

keyboardJS.bind('x', function(e){
  LoadLevel(0)
})

function MovePlayer(){
  if(moveForwards === 1){
      camera.position.z -= Math.cos(camera.rotation.y) / 10
      camera.position.x -= Math.sin(camera.rotation.y) / 10
  }
  if(moveLeft === 1){
      camera.position.z += Math.sin(camera.rotation.y) / 10
      camera.position.x -= Math.cos(camera.rotation.y) / 10
  }
  if(moveBackwards === 1){
      camera.position.z += Math.cos(camera.rotation.y) / 10
      camera.position.x += Math.sin(camera.rotation.y) / 10
  }
  if(moveRight === 1){
      camera.position.z -= Math.sin(camera.rotation.y) / 10
      camera.position.x += Math.cos(camera.rotation.y) / 10
  }
  if(turnRight === 1){
    camera.rotation.y -= ((5*Math.PI)/360)
  }
  if(turnLeft === 1){
    camera.rotation.y += ((5*Math.PI)/360)
  }
}

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.id = "canvas"
document.body.appendChild(renderer.domElement)

LoadLevel()

function Render(){
  requestAnimationFrame(Render)

  MovePlayer()
  Collision()

  renderer.render(scene, camera)
}
Render()