var geometry
var material
var walls = []
var windows = []
var floors = []
var teleports = []
var ceilings = []
var finishes = []
var finisheswhite = []
var finishesgray = []
var	finishestrans = []
var currentlevel = 0
var currentpack = 0
var testobject = {
	lel: "abc",
	lawl: "def"
}

var loader = new THREE.TextureLoader()
var glassimg = loader.load("Images/Glass.png", function(){renderer.render(scene)})

function Wall(x, z){
	geometry = new THREE.BoxGeometry(3,3,3)
	material = new THREE.MeshBasicMaterial({color: 0xd5d5d5})
	walls.push(new THREE.Mesh(geometry, material))
	scene.add(walls[walls.length-1])
	walls[walls.length-1].position.x = x*3
	walls[walls.length-1].position.z = z*3
}

function Glass(x, z){
	geometry = new THREE.BoxGeometry(3,3,3)
	material = new THREE.MeshBasicMaterial({map: glassimg, transparent: true})
	windows.push(new THREE.Mesh(geometry, material))
	material.opacity = 1
	scene.add(windows[windows.length-1])
	windows[windows.length-1].position.x = x*3
	windows[windows.length-1].position.z = z*3
}

function Teleport(x, z, dx, dz){
	geometry = new THREE.BoxGeometry(1,1,1)
	material = new THREE.MeshBasicMaterial({transparent: true})
	teleports.push(new THREE.Mesh(geometry, material))
	scene.add(teleports[teleports.length-1])
	material.opacity = 0
	teleports[teleports.length-1].position.x = x*3
	teleports[teleports.length-1].position.z = z*3
	teleports[teleports.length-1].teleportx = parseInt(dx)
	teleports[teleports.length-1].teleportz = parseInt(dz)
}

function Finish(x, z){
	geometry = new THREE.BoxGeometry(1,1,1)
	material = new THREE.MeshBasicMaterial({transparent: true})
	finishes.push(new THREE.Mesh(geometry, material))
	scene.add(finishes[finishes.length-1])
	material.opacity = 0
	finishes[finishes.length-1].position.x = x*3
	finishes[finishes.length-1].position.z = z*3

	geometry = new THREE.CylinderGeometry(1,1,0.2,32)
	material = new THREE.MeshBasicMaterial({color: "white"})
	finisheswhite.push(new THREE.Mesh(geometry, material))
	scene.add(finisheswhite[finisheswhite.length-1])
	finisheswhite[finisheswhite.length-1].position.x = x*3
	finisheswhite[finisheswhite.length-1].position.z = z*3
	finisheswhite[finisheswhite.length-1].position.y -= 1.45

	geometry = new THREE.CylinderGeometry(1,1.2,0.2,32,32,true)
	material = new THREE.MeshBasicMaterial({color: "gray"})
	finisheswhite.push(new THREE.Mesh(geometry, material))
	scene.add(finisheswhite[finisheswhite.length-1])
	finisheswhite[finisheswhite.length-1].position.x = x*3
	finisheswhite[finisheswhite.length-1].position.z = z*3
	finisheswhite[finisheswhite.length-1].position.y -= 1.45

	geometry = new THREE.CylinderGeometry(1,1,0.2,32)
	material = new THREE.MeshBasicMaterial({color: "white"})
	finisheswhite.push(new THREE.Mesh(geometry, material))
	scene.add(finisheswhite[finisheswhite.length-1])
	finisheswhite[finisheswhite.length-1].position.x = x*3
	finisheswhite[finisheswhite.length-1].position.z = z*3
	finisheswhite[finisheswhite.length-1].position.y += 1.45

	geometry = new THREE.CylinderGeometry(1.2,1,0.2,32,32,true)
	material = new THREE.MeshBasicMaterial({color: "gray"})
	finisheswhite.push(new THREE.Mesh(geometry, material))
	scene.add(finisheswhite[finisheswhite.length-1])
	finisheswhite[finisheswhite.length-1].position.x = x*3
	finisheswhite[finisheswhite.length-1].position.z = z*3
	finisheswhite[finisheswhite.length-1].position.y += 1.45

	geometry = new THREE.CylinderGeometry(0.7,0.7,3,32)
	material = new THREE.MeshBasicMaterial({color: "white", transparent: true})
	material.opacity = 0.5
	finishestrans.push(new THREE.Mesh(geometry, material))
	scene.add(finishestrans[finishestrans.length-1])
	finishestrans[finishestrans.length-1].position.x = x*3
	finishestrans[finishestrans.length-1].position.z = z*3
}

function Floor(x, z){
	geometry = new THREE.PlaneGeometry(3,3)
	material = new THREE.MeshBasicMaterial({color: 0xeaeaea})
	floors.push(new THREE.Mesh(geometry, material))
	scene.add(floors[floors.length-1])
	floors[floors.length-1].rotation.x = 1.5*Math.PI
	floors[floors.length-1].position.x = x*3
	floors[floors.length-1].position.y -= 1.5
	floors[floors.length-1].position.z = z*3

	geometry = new THREE.PlaneGeometry(3,3)
	material = new THREE.MeshBasicMaterial({color: 0xc0c0c0})
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
	for(var i = 0; i < windows.length; i++){
		if(camera.position.z < windows[i].position.z + 2 && camera.position.z > windows[i].position.z + 1.85 && camera.position.x < windows[i].position.x + 1.85 && camera.position.x > windows[i].position.x - 1.85){
	    	camera.position.z = windows[i].position.z + 2
	  	}
	  	if(camera.position.z < windows[i].position.z - 1.85 && camera.position.z > windows[i].position.z - 2 && camera.position.x < windows[i].position.x + 1.85 && camera.position.x > windows[i].position.x - 1.85){
	    	camera.position.z = windows[i].position.z - 2
	  	}
	  	if(camera.position.x < windows[i].position.x + 2 && camera.position.x > windows[i].position.x + 1.85 && camera.position.z < windows[i].position.z + 1.85 && camera.position.z > windows[i].position.z - 1.85){
	    	camera.position.x = windows[i].position.x + 2
	  	}
	  	if(camera.position.x < windows[i].position.x - 1.85 && camera.position.x > windows[i].position.x - 2 && camera.position.z < windows[i].position.z + 1.85 && camera.position.z > windows[i].position.z - 1.85){
	    	camera.position.x = windows[i].position.x - 2
	  	}
	}
	for(var i = 0; i < finishes.length; i++){
		if(camera.position.x < finishes[i].position.x + 0.5 && camera.position.x > finishes[i].position.x - 0.5 && camera.position.z < finishes[i].position.z + 0.5 && camera.position.z > finishes[i].position.z - 0.5){
			alert("Congratulations!")
			LoadLevel(1)
		}
	}
	for(var i = 0; i < teleports.length; i++){
		if(camera.position.x < teleports[i].position.x + 1.25 && camera.position.x > teleports[i].position.x - 1.25 && camera.position.z < teleports[i].position.z + 1.25 && camera.position.z > teleports[i].position.z - 1.25){
			camera.position.x += teleports[i].teleportx * 3
			camera.position.z += teleports[i].teleportz * 3
		}
	}
}

function LoadLevel(level){
	walls = []
	windows = []
	floors = []
	teleports = []
	ceilings = []
	finishes = []
	finisheswhite = []
	finishesgray = []
	finishestrans = []
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
				location.href = "index.html"
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
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "F"){
				Floor(xpos, zpos)
				Finish(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "G"){
				Floor(xpos, zpos)
				Glass(xpos, zpos)
			}else if(levelpacks[parpack][parlevel][zpos][xpos].substr(0,1) == "T"){
				Floor(xpos, zpos)
				Teleport(xpos, zpos, levelpacks[parpack][parlevel][zpos][xpos].substr(1,3), levelpacks[parpack][parlevel][zpos][xpos].substr(4,3))
			}else if(levelpacks[parpack][parlevel][zpos][xpos].substr(0,1) == "P"){
				Floor(xpos, zpos)
				camera.position.x = xpos*3
				camera.position.z = zpos*3
				camera.rotation.y = parseFloat(levelpacks[parpack][parlevel][zpos][xpos].substr(1,3))*Math.PI + ((2.5*Math.PI)/360)
			}else if(levelpacks[parpack][parlevel][zpos][xpos] == "_"){
				continue
			}else{
				Floor(xpos, zpos)
			}
		}
	}
}