var geometry
var material
var walls = []
var fakewalls = []
var glass = []
var floors = []
var ceilings = []
var oneways = []
var onewaydirections = []
var finishes = []
var buttons = []
var currentlevel = 0
var currentpack = 0

var loader = new THREE.TextureLoader()
var brickimg = loader.load("Images/Brick.png", function(){renderer.render(scene)})
var glassimg = loader.load("Images/Glass.png", function(){renderer.render(scene)})
var woodimg = loader.load("Images/Wood.png", function(){renderer.render(scene)})
var concreteimg = loader.load("Images/Concrete.png", function(){renderer.render(scene)})
var onewayimg = loader.load("Images/OneWay.png", function(){renderer.render(scene)})
var finishimg = loader.load("Images/Finish.png", function(){renderer.render(scene)})

function Wall(x, z){
	geometry = new THREE.BoxGeometry(3,3,3)
	material = new THREE.MeshBasicMaterial({map: brickimg})
	walls.push(new THREE.Mesh(geometry, material))
	scene.add(walls[walls.length-1])
	walls[walls.length-1].position.x = x*3
	walls[walls.length-1].position.z = z*3
}

function FakeWall(x, z){
	geometry = new THREE.BoxGeometry(3,3,3)
	material = new THREE.MeshBasicMaterial({map: brickimg})
	fakewalls.push(new THREE.Mesh(geometry, material))
	scene.add(fakewalls[fakewalls.length-1])
	fakewalls[fakewalls.length-1].position.x = x*3
	fakewalls[fakewalls.length-1].position.z = z*3
}

function Glass(x, z){
	geometry = new THREE.BoxGeometry(3,3,3)
	material = new THREE.MeshBasicMaterial({map: glassimg, transparent: true})
	glass.push(new THREE.Mesh(geometry, material))
	scene.add(glass[glass.length-1])
	glass[glass.length-1].position.x = x*3
	glass[glass.length-1].position.z = z*3
}

function Finish(x, z){
	geometry = new THREE.BoxGeometry(1,1,1)
	material = new THREE.MeshBasicMaterial({map: finishimg, transparent: true})
	finishes.push(new THREE.Mesh(geometry, material))
	scene.add(finishes[finishes.length-1])
	material.opacity = 0.50
	finishes[finishes.length-1].position.x = x*3
	finishes[finishes.length-1].position.z = z*3
}

function OneWay(x, z, direction){
	geometry = new THREE.BoxGeometry(3,3,0.15)
	material = new THREE.MeshBasicMaterial({map: onewayimg, transparent: true})
	oneways.push(new THREE.Mesh(geometry, material))
	onewaydirections.push(direction)
	scene.add(oneways[oneways.length-1])
	material.opacity = 0.50
	oneways[oneways.length-1].position.x = x*3
	oneways[oneways.length-1].position.z = z*3
	if(direction === "posx"){
		oneways[oneways.length-1].position.x += 1.425
		oneways[oneways.length-1].rotation.y = 1.5*Math.PI
	}else if(direction === "negx"){
		oneways[oneways.length-1].position.x -= 1.425
		oneways[oneways.length-1].rotation.y = 0.5*Math.PI
	}else if(direction === "posz"){
		oneways[oneways.length-1].position.z += 1.425
		oneways[oneways.length-1].rotation.y = Math.PI
	}else if(direction === "negz"){
		oneways[oneways.length-1].position.z -= 1.425
		oneways[oneways.length-1].rotation.y = 0
	}
}

function Floor(x, z){
	geometry = new THREE.PlaneGeometry(3,3)
	material = new THREE.MeshBasicMaterial({map: woodimg})
	floors.push(new THREE.Mesh(geometry, material))
	scene.add(floors[floors.length-1])
	floors[floors.length-1].rotation.x = 1.5*Math.PI
	floors[floors.length-1].position.x = x*3
	floors[floors.length-1].position.y -= 1.5
	floors[floors.length-1].position.z = z*3

	geometry = new THREE.PlaneGeometry(3,3)
	material = new THREE.MeshBasicMaterial({map: concreteimg})
	ceilings.push(new THREE.Mesh(geometry, material))
	scene.add(ceilings[ceilings.length-1])
	ceilings[ceilings.length-1].rotation.x = 0.5*Math.PI
	ceilings[ceilings.length-1].position.x = x*3
	ceilings[ceilings.length-1].position.y += 1.5
	ceilings[ceilings.length-1].position.z = z*3
}

function Collision(){
	for(var i = 0; i < walls.length; i++){
		if(camera.position.z < walls[i].position.z + 2 && camera.position.z > walls[i].position.z + 1.85 && camera.position.x < walls[i].position.x + 1.85 && camera.position.x > walls[i].position.x - 1.85){
	    	camera.position.z = walls[i].position.z + 2
	  	}
	  	if(camera.position.z < walls[i].position.z - 1.85 && camera.position.z > walls[i].position.z - 2 && camera.position.x < walls[i].position.x + 1.85 && camera.position.x > walls[i].position.x - 1.85){
	    	camera.position.z = walls[i].position.z - 2
	  	}
	  	if(camera.position.x < walls[i].position.x + 2 && camera.position.x > walls[i].position.x + 1.85 && camera.position.z < walls[i].position.z + 1.85 && camera.position.z > walls[i].position.z - 1.85){
	    	camera.position.x = walls[i].position.x + 2
	  	}
	  	if(camera.position.x < walls[i].position.x - 1.85 && camera.position.x > walls[i].position.x - 2 && camera.position.z < walls[i].position.z + 1.85 && camera.position.z > walls[i].position.z - 1.85){
	    	camera.position.x = walls[i].position.x - 2
	  	}
	}
	for(var i = 0; i < glass.length; i++){
		if(camera.position.z < glass[i].position.z + 2 && camera.position.z > glass[i].position.z + 1.85 && camera.position.x < glass[i].position.x + 1.85 && camera.position.x > glass[i].position.x - 1.85){
	    	camera.position.z = glass[i].position.z + 2
	  	}
	  	if(camera.position.z < glass[i].position.z - 1.85 && camera.position.z > glass[i].position.z - 2 && camera.position.x < glass[i].position.x + 1.85 && camera.position.x > glass[i].position.x - 1.85){
	    	camera.position.z = glass[i].position.z - 2
	  	}
	  	if(camera.position.x < glass[i].position.x + 2 && camera.position.x > glass[i].position.x + 1.85 && camera.position.z < glass[i].position.z + 1.85 && camera.position.z > glass[i].position.z - 1.85){
	    	camera.position.x = glass[i].position.x + 2
	  	}
	  	if(camera.position.x < glass[i].position.x - 1.85 && camera.position.x > glass[i].position.x - 2 && camera.position.z < glass[i].position.z + 1.85 && camera.position.z > glass[i].position.z - 1.85){
	    	camera.position.x = glass[i].position.x - 2
	  	}
	}
	for(var i = 0; i < oneways.length; i++){
		if(onewaydirections[i] === "negx"){
			if(camera.position.x > oneways[i].position.x - 0.575 && camera.position.x < oneways[i].position.x - 0.325 && camera.position.z < oneways[i].position.z + 1.85 && camera.position.z > oneways[i].position.z - 1.85){
				console.log("here")
				camera.position.x = oneways[i].position.x - 0.575
			}
		}else if(onewaydirections[i] === "posx"){
			if(camera.position.x < oneways[i].position.x + 0.575 && camera.position.x > oneways[i].position.x + 0.325 && camera.position.z < oneways[i].position.z + 1.85 && camera.position.z > oneways[i].position.z - 1.85){
				camera.position.x = oneways[i].position.x + 0.575
			}
		}else if(onewaydirections[i] === "negz"){
			if(camera.position.z > oneways[i].position.z - 0.575 && camera.position.z < oneways[i].position.z - 0.325 && camera.position.x < oneways[i].position.x + 1.85 && camera.position.x > oneways[i].position.x - 1.85){
				camera.position.z = oneways[i].position.z - 0.575
			}
		}else if(onewaydirections[i] === "posz"){
			if(camera.position.z < oneways[i].position.z + 0.575 && camera.position.z > oneways[i].position.z + 0.325 && camera.position.x < oneways[i].position.x + 1.85 && camera.position.x > oneways[i].position.x - 1.85){
				camera.position.z = oneways[i].position.z + 0.575
			}
		}
	}
	for(var i = 0; i < finishes.length; i++){
		if(camera.position.x < finishes[i].position.x + 0.5 && camera.position.x > finishes[i].position.x - 0.5 && camera.position.z < finishes[i].position.z + 0.5 && camera.position.z > finishes[i].position.z - 0.5){
			alert("Congratulations!")
			LoadLevel(1)
		}
	}
}

function LoadLevel(level){
	walls = []
	glass = []
	floors = []
	ceilings = []
	oneways = []
	onewaydirections = []
	finishes = []
	fakewalls = []
	scene = new THREE.Scene()
	if(level === undefined){
		var pack = prompt("Load level pack: 1-" + levelpacks.length) - 1
		currentpack = pack
		var level = prompt("Load level: 1-" + levelpacks[pack].length) - 1
		currentlevel = level
		if(isNaN(pack) || pack < 0 || pack >= levelpacks.length){
			window.alert("Invalid")
			LoadLevel()
		}else if(isNaN(level) || level < 0 || level >= levelpacks[pack].length){
			window.alert("Invalid")
			LoadLevel()
		}
		Create(pack, level)
	}else{
		currentlevel += level
		if(currentlevel < levelpacks[currentpack].length){
			Create(currentpack, currentlevel)
		}else{
			alert("You completed the level pack!")
			var leave = prompt("Continue? (yes/no)")
			if(leave === "no"){
				location.href = "Menu.html"
			}else if(leave === "yes"){				
				LoadLevel()
			}
		}
	}
}

function Create(parpack, parlevel){
	for(var zpos = 0; zpos < levelpacks[parpack][parlevel].length; zpos++){
		for(var xpos = 0; xpos < levelpacks[parpack][parlevel][zpos].length; xpos++){
			if(levelpacks[parpack][parlevel][zpos][xpos] == "W"){
				Wall(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "Wf"){
				Floor(xpos, zpos)
				FakeWall(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "G"){
				Floor(xpos, zpos)
				Glass(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "B"){
				Floor(xpos, zpos)
				Button(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "Opx"){
				Floor(xpos, zpos)
				OneWay(xpos, zpos, "posx")
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "Onx"){
				Floor(xpos, zpos)
				OneWay(xpos, zpos, "negx")
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "Opz"){
				Floor(xpos, zpos)
				OneWay(xpos, zpos, "posz")
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "Onz"){
				Floor(xpos, zpos)
				OneWay(xpos, zpos, "negz")
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "F"){
				Floor(xpos, zpos)
				Finish(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "P"){
				Floor(xpos, zpos)
				camera.position.x = xpos*3
				camera.position.z = zpos*3
				camera.rotation.y = 1.5*Math.PI + ((2.5*Math.PI)/360)
			}else{
				Floor(xpos, zpos)
			}
		}
	}
}