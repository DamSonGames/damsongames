var selected = 0;
	pos = 1;
	movement = 0;
	characters = ["&#65514;", "&#65516;", "&#65513;", "&#65515;", "+", "-", "In", "Out", "Grab", "Drop"];
	movedirection = [1, 3, 4, 2];
	complicated = [1, 2, 3, 4, 5, 5, "-", "+", 5, 10, 15, 20, 25, 1, "+", "-", 21, 22, 23, 24, 25, 5, "+", "-", 1, 6, 11, 16, 21, 1, "-", "+",];
	inventory1 = 0;
	inventory2 = 0;
	input1 = Math.ceil(Math.random() * 50);
	input2 = Math.ceil(Math.random() * 50);
	random = Math.ceil(Math.random() * 3);
	if(random == 1){
		output = input1 + input2;
	}else if(random == 2){
		output = input1 - input2;
	}else{
		output = input2 - input1;
	}
	importer = 1;
	running = 0;
	plusminus = ["+=", "-="];

for(i = 1; i < 26; i++){
	eval("var fieldfunction" + i + " = 0;");
	eval("var field" + i + " = 0;");
	eval("var fieldholding" + i + " = 0;");
	field1 = 1;
	UpdateField(i);
}

function InitiateUpdate(){
	for(i = 1; i < 26; i++){
		UpdateField(i);
	}
}

function UpdateField(i){
	if(eval("field" + i) == 0){
		document.getElementById("Field" + i).style.background = "white";
	}else if(eval("field" + i) == 1){
		document.getElementById("Field" + i).style.background = "orange";
	}
	for(j = 1; j < 26; j++){
		document.getElementById("FieldHolding" + i).innerHTML = eval("fieldholding" + i);
		if(eval("fieldholding" + i) == 0){
			document.getElementById("FieldHolding" + i).innerHTML = "";
		}
	}
	document.getElementById("ImportField1Text").innerHTML = input1;
	document.getElementById("ImportField2Text").innerHTML = input2;
	document.getElementById("ExportFieldText").innerHTML = output;
	if(importer == 1){
		document.getElementById("ImportField1").style.background = "gainsboro";
		document.getElementById("ImportField2").style.background = "white";
	}else if(importer == 2){
		document.getElementById("ImportField2").style.background = "gainsboro";
		document.getElementById("ImportField1").style.background = "white";
	}
}

function PlaceField(place){
	eval("fieldfunction" + place + " = " + selected);
	FillField();
}

function FillField(){
	for(i = 1; i < 26; i++){
		for(j = 0; j < 10; j++){
			if(eval("fieldfunction" + i) == (j + 1)){
				eval("document.getElementById('FieldText" + i + "').innerHTML = '" + characters[j] + "';");
			}
		}
	}
}

function Select(item){
	if(item == selected){
		selected = 0;
		for(i = 1; i < 11; i++){
			eval("document.getElementById('Select" + i + "').style.background = 'white'");
		}
	}else{
		selected = item;
		for(i = 1; i < 11; i++){
			eval("document.getElementById('Select" + i + "').style.background = 'white'");
		}
		eval("document.getElementById('Select" + item + "').style.background = 'yellow'");
	}
}

function InitiateStart(){
	running = 1;
	Start();
}

function Start(){
	var timer = setTimeout(UpdateAll, 500);
}

function UpdateAll(){
	if((eval("fieldfunction" + pos) > 4) || (eval("fieldfunction" + pos) < 1)){
		if(eval("fieldfunction" + pos) == 9){
			Grab();
		}else if(eval("fieldfunction" + pos) == 10){
			Drop();
		}else if(eval("fieldfunction" + pos) == 7){
			Import();
		}else if(eval("fieldfunction" + pos) == 8){
			Export();
		}else if((eval("fieldfunction" + pos) == 5) || (eval("fieldfunction" + pos) == 6)){
			Add(eval("fieldfunction" + pos) - 5);
		}
		Move();
	}else{
		for(i = 1; i < 5; i++){
			if(eval("fieldfunction" + pos) == (i)){
				movement = eval("movedirection[" + (i - 1) + "]");
				Move();
			}
		}
	}
}

function Move(){
	for(i = 0; i < 4; i++){
		if(movement == (i + 1)){
			var temp = 8 * i;
			if((pos != complicated[temp]) && (pos != complicated[(temp + 1)]) && (pos != complicated[(temp + 2)]) && (pos != complicated[(temp + 3)]) && (pos != complicated[(temp + 4)])){
				pos = eval("pos" + complicated[(temp + 6)] + complicated[(temp + 5)]);
				eval("field" + pos + " = 1");
				eval("field" + (eval("pos" + complicated[(temp + 7)] + complicated[(temp + 5)])) + " = 0");
				InitiateUpdate();
			}
		}
	}
	Start();
}

function Grab(){
	if((eval("fieldholding" + pos) != 0) && (inventory1 == 0)){
		inventory1 = eval("fieldholding" + pos);
		eval("fieldholding" + pos + " = 0;");
		document.getElementById("InventoryField1Text").innerHTML = inventory1;
	}else if((eval("fieldholding" + pos) != 0) && (inventory2 == 0)){
		inventory2 = eval("fieldholding" + pos);
		eval("fieldholding" + pos + " = 0;");
		document.getElementById("InventoryField2Text").innerHTML = inventory2;
	}
}

function Drop(){
	if(eval("fieldholding" + pos) == 0){
		eval("fieldholding" + pos + " = " + inventory1);
		inventory1 = 0;
		if(inventory2 != 0){
			inventory1 = inventory2;
			inventory2 = 0;
		}
		document.getElementById("InventoryField1Text").innerHTML = inventory1;
		document.getElementById("InventoryField2Text").innerHTML = inventory2;
	}
}

function Import(){
	if(fieldholding8 == 0){
		if(importer == 1){
			fieldholding8 = input1;
			importer = 2;
		}else if(importer == 2){
			fieldholding8 = input2;
			importer = 1;
		}
	}
}

function Export(){
	if(fieldholding18 != 0){
		if(eval("fieldholding18") == output){
			document.getElementById("ExportField").style.background = "lime";
			running = 0;
		}else{
			document.getElementById("ExportField").style.background = "red";
			var removered = setTimeout(function(){document.getElementById("ExportField").style.background = "white"}, 500);
		}
	}else{
		document.getElementById("ExportField").style.background = "red";
		var removered = setTimeout(function(){document.getElementById("ExportField").style.background = "white"}, 500);
	}
}

function Add(i){
	if((inventory1 != 0) && (inventory2 != 0)){
		eval("inventory1" + plusminus[i] + "inventory2;");
		inventory2 = 0;
		document.getElementById("InventoryField1Text").innerHTML = inventory1;
		document.getElementById("InventoryField2Text").innerHTML = inventory2;
	}
}