var converttable = {
	R: {
		class: "rock",
		text: "RR",
		walkable: false,
		laser: false
	},
	G: {
		class: "grass",
		text: "GG",
		walkable: true,
		laser: true
	},
	S: {
		class: "sand",
		text: "SS",
		walkable: true,
		laser: true
	},
	W: {
		class: "water",
		text: "WW",
		walkable: false,
		laser: true
	},
	B: {
		class: "bridge",
		text: "==",
		walkable: true,
		laser: true
	},
	Dr: {
		class: "doorr",
		text: "||",
		walkable: false,
		laser: false
	},
	Lr: {
		class: "leverr",
		text: "*-",
		walkable: "activate",
		laser: false
	},
	Br: {
		class: "bridge",
		text: "==",
		walkable: true,
		laser: true
	},
	Dg: {
		class: "doorg",
		text: "||",
		walkable: false,
		laser: false
	},
	Lg: {
		class: "leverg",
		text: "*-",
		walkable: "activate",
		laser: false
	},
	Bg: {
		class: "bridge",
		text: "==",
		walkable: true,
		laser: true
	},
	Db: {
		class: "doorb",
		text: "||",
		walkable: false,
		laser: false
	},
	Lb: {
		class: "leverb",
		text: "*-",
		walkable: "activate",
		laser: false
	},
	Bb: {
		class: "bridge",
		text: "==",
		walkable: true,
		laser: true
	},
	Xx: {
		class: "laseroff",
		text: "=>",
		walkable: "laser",
		laser: false
	},
	Xo: {
		class: "laseron",
		text: "=>",
		walkable: "laser",
		laser: false
	},
	Mu: {
		class: "mirror",
		text: "//",
		walkable: false,
		laser: "mirror"
	},
	Md: {
		class: "mirror",
		text: "\\\\",
		walkable: false,
		laser: "mirror"
	},
	Tr: {
		class: "teleport",
		text: "88",
		walkable: "teleport",
		laser: true
	},
	Tg: {
		class: "teleport",
		text: "88",
		walkable: "teleport",
		laser: true
	},
	Tb: {
		class: "teleport",
		text: "88",
		walkable: "teleport",
		laser: true
	}
}

var fielddata = [
	{//0
		down: 1
	},
	{//1
		up: 0,
		right: 2
	},
	{//2
		left: 1,
		up: 3
	},
	{//3
		down: 2,
		right: 4
	},
	{//4
		left: 3,
		right: 5
	},
	{//5
		left: 4,
		down: 6
	},
	{//6
		up: 5,
		right: 7
	},
	{//7
		left: 6,
		right: 8
	},
	{//8
		left: 7
	}
]

/*

IDEAS:

	-LEVERED DOORS (DONE)
	-LASER BEAMS FOR OPENING DOORS WITH MIRRORS (DONE)
	-TELEPORTERS (DONE)
	-MOVABLE BLOCKS

*/