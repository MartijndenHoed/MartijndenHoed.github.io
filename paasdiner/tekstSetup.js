"use strict";

var maxLines = 20;

function inputHandler() {
	var inputField = document.getElementById("input");
	var inputText = inputField.value;
	inputField.value = "";
	textParser.handleText(inputText);
}

var textParser = {
	storedLines: Array(),
	handleText: function(input) {
		this.displayText(">" + input);
		
		var subText = input.toLowerCase().split(" ");
		var action = this.actionTranslator(subText[0]);
		
		var accusatief = new word();
		var datief = new word();
		
		var wordCounter = 1;
		
		if(subText[1])
		{
			if(this.checkDirective(subText[wordCounter]))
			{
				
				subText.splice(wordCounter,1);
			}
			accusatief.prefixCode = this.prefixCode(subText[wordCounter]);
			if(accusatief.prefixCode)
			{
				accusatief.prefix = subText[wordCounter];
				wordCounter +=1;
			}
			else accusatief.prefix = false;
			
			var preposPos = subText.length;
	
			var partikelLength =0;
			var partikelPos = 0;
			var partikel = this.checkSplitVerb(action);
			if(partikel)
			{
				for(var i=0;i<subText.length;i++)
				{

					for(var j=0;j<partikel.length;j++)
					{
						if(partikel[j] == subText[i])
						{
							partikelLength = 1;
							partikelPos = i;
							accusatief.mode = subText[i];
						}
					}
				}

			}				
			
			
			for(var i=partikelPos+1;i<subText.length;i++)
			{
				if(this.preposCode(subText[i]))
				{
					preposPos = i;
					
					datief.preposCode = this.preposCode(subText[i]);
					datief.prepos = subText[i];
				}
				
			}
		
			if(preposPos-1-partikelLength!=0)
			{
			accusatief.noun = this.wordTranslator(subText[preposPos-1-partikelLength]);
			}
			else
			{
				accusatief.noun = false;
			}
			//accusatief.noun = this.wordTranslator(subText[preposPos-1-partikelLength]);
			for(var i=wordCounter;i<preposPos-1-partikelLength;i++)
			{
				accusatief.adjectives[i-wordCounter] = subText[i];
			}
			for(var i=1;i<preposPos-partikelLength;i++) accusatief.raw += " " + subText[i];
			accusatief.raw = accusatief.raw.substr(1);
		}
		
		
		if(datief.prepos) 
		{
			datief.prefixCode = this.prefixCode(subText[preposPos+1]);
			if(datief.prefixCode)
			{
				datief.prefix = subText[preposPos+1];
				wordCounter = preposPos+2;
			}
			else
			{
				wordCounter = preposPos+1;
			}
			datief.noun = this.wordTranslator(subText[subText.length-1]);
			for(var i=wordCounter;i<subText.length-1;i++)
			{
				datief.adjectives[i-wordCounter] = subText[i];
			}
			
			for(var i=preposPos+1;i<subText.length;i++) datief.raw += " " + subText[i];
			datief.raw = datief.raw.substr(1);
		}
	
		console.log(action);
		console.log(accusatief);
		console.log(datief);
		console.log("");
		
		actions.executeAction(action,accusatief,datief);
		//this.displayText("&lt;command received");
		
		
		
	},
	actionTranslator: function(action) {
		if(action=="bekijk") return "kijk";
		if(action=="neem") return "pak";
		if(action=="loop"||action=="wandel") return "ga";
		if(action=="raap") return "pak";
		if(action=="zet") return "schakel";
		
		return action;
	},
	checkDirective: function(partikel) {
		if(partikel=="naar") return true;
		
		return 0;
	},
	wordTranslator: function(word) {
		if(word=="noord"||word=="noordelijk"||word=="noordwaarts"||word=="noorden") return "north"
		if(word=="zuid"||word=="zuidelijk"||word=="zuidwaarts"||word=="zuiden") return "south"
		if(word=="west"||word=="westelijk"||word=="westwaarts"||word=="westen") return "west"
		if(word=="oost"||word=="oostelijk"||word=="oostwaarts"||word=="oosten") return "east"
		if(word=="spullen"||word=="rugzak") return "inventory";
		
		return word;
	},
	prefixCode: function(prefix) {
		//geen:0/false onbepaald:1 bepaald:2 mijn:3
		if(prefix=="de" || prefix=="het") return 2;
		if(prefix=="een") return 1;
		if(prefix=="mijn") return 3;
		return 0;
		
	},
	checkSplitVerb: function(action) {
		if(action=="pak") return ["op"];
		if(action=="steek") return ["aan"];
		if(action=="gooi") return ["weg"];
		if(action=="schakel") return ["uit","aan"];
		if(action=="ga") return ["in"];
		
		return false;
	},
	preposCode: function(prepos) {
		if(prepos=="naar") return 1;
		if(prepos=="met") return 2;
		if(prepos=="voor") return 3;
		if(prepos=="tegen") return 4;
		if(prepos=="aan") return 5;
		return 0;
	},
	
	displayText: function(input,isOutput) {
		if(this.storedLines.unshift(input)>maxLines) this.storedLines.pop();
		if(isOutput) this.storedLines[0] = "&lt;".concat(this.storedLines[0]);
		var div = document.getElementById("output");
		var totalLinesString = "";
		for(var i=this.storedLines.length-1;i>=0;i--)
		{
			totalLinesString=totalLinesString.concat(this.storedLines[i] + " <br /> ");
		}
		div.innerHTML = totalLinesString;
	},
	
	listItems: function(items) {
		if(items.length ==0) return false;
		if(items.length==1) return items[0];
		var string = "";
		for(var i=0;i<items.length-2;i++)
		{
			string += items[i] + ", ";
			
		}
		string += items[items.length-2] + " en ";
		string += items[items.length-1];
		return string;
	}
	
	
	
	
}

function word() {
	this.raw = "";
	this.noun = false;
	this.adjectives = Array();
	this.prefix = false;
	this.prefixCode = false;
	this.prepos = false;
	this.preposCode=false;
	this.mode=false;
}

var actions = {
	executeAction: function(action,accusatief,datief,ablatief) {
		
		if(accusatief.noun)
		{
			if(accusatief.prefixCode==3) var reach =1;
			else var reach=2;

			var item = player.itemSelector(accusatief,reach);
			
		}
		
		switch(action) {
			case "lees":

			//textParser.displayText("gelezen");
				
				if(item && item.discovered)
				{
					if(item.readable)
					{
						textParser.displayText("Met vermoeide ogen lees je het volgende: &quot;" + item.text + " &quot;",true);
					}
					else
					{
						textParser.displayText("Hoe hard je ook probeert, er valt niks leesbaars uit op te maken",true);
					}
				}
				else{
					
					
					if(reach==1) textParser.displayText("Je hebt niks dat ook maar lijkt op " + accusatief.raw,true);
					if(reach==2) textParser.displayText("Je ziet niks dat ook maar lijkt op " + accusatief.raw,true);
				}
			
			
			
			break;
			
			case "kijk":
				if(accusatief.noun=="rond" || !accusatief.noun)
				{
					var description = player.room.description;
					var items = Array();
					for(var i=0;i<player.room.items.length;i++)
					{
						if(!player.room.items[i].isTaken)
						{
							items.push(player.room.items[i].names[2]);
							player.room.items[i].discovered = true;
						}
						
					}
					var itemList = textParser.listItems(items);
					if(itemList) description +=" Voor de rest zie je " +  itemList + ".";
					textParser.displayText(description,true);
					break;
				}
				
				if(accusatief.noun=="inventory")
				{
					player.inventory.check();
					
					break;
				}
				
				if(item && item.discovered)
				{
					//console.log(item);
					var description = item.description;
					for(var i=0;i<item.additions.length;i++)
					{
					description += ", " + item.additions[i];
					}
					textParser.displayText(description,true);
					break;
				}
				if(reach==1) textParser.displayText("Je hebt niets dat daarop lijkt",true);
				if(reach==2) textParser.displayText("Je ziet niets dat daarop lijkt",true);
			
			
			break;
			
			case "pak":
			
				if(reach==2)
				{
					var item = player.itemSelector(accusatief,3);
					if(item && item.discovered)
					{
						player.inventory.add(item);
						textParser.displayText("Met veel moeite strek je je uit en pak je " +item.names[1],true);
						item.isTaken=true;
					}
					else{
						textParser.displayText("Wat denk je te pakken?",true);
					}
				}
				else
				{
					textParser.displayText("Wat denk je te pakken?",true);
					
					
				}
			
			
			break;
			
			case "ga":
				if(accusatief.mode=="in")
				{
					if(accusatief.noun==false)
					{
						textParser.displayText("Dat zei je moeder gister ook XD XD XD",1);
					}
					else
					{
						if(player.room.hasOwnProperty("door")&&(player.room.door.names.indexOf(accusatief.noun)!=-1))
						{
							player.openDoor(accusatief.noun);
							break;
						}
						if(player.searchRoomById(player.room.connections[accusatief.noun]))
						{
							player.searchRoomById(player.room.connections[accusatief.noun]).load();
						}
						else
						{
							textParser.displayText("Hoeveel vastberadenheid je ook hebt, daar kan je niet in",true);
						}
					}
				}
				if(!accusatief.mode)
				{
					if(accusatief.noun==false)
					{
						textParser.displayText("Waar wil je heen?",1);
					}
					if(accusatief.noun=="binnen")
					{
						if(player.room.hasOwnProperty("door")&&!player.room.connections.hasOwnProperty("binnen"))
						{
							player.openDoor(player.room.door.names[0]);
							break;
						}
				
					}
					if(player.searchRoomById(player.room.connections[accusatief.noun]))
					{
						player.searchRoomById(player.room.connections[accusatief.noun]).load();
					}
					else
					{
						textParser.displayText("Hoeveel vastberadenheid je ook hebt, daar kan je niet heen",true);
					}
				}
			
			
			break;
			
			case "help":
			
				textParser.displayText("Toegestaane acties zijn: kijk, bekijk, lees, pak, ga, steek aan, open, help. Combineer deze werkwoorden met andere woorden om acties te vormen, voorbeelden: 'kijk rond', 'bekijk [object]', 'pak [object] op' enz");
			
			
			break;
			
			case "steek":
				if(accusatief.mode)
				{
					if(!item)
					{
						textParser.displayText("Je ziet niks dat daar ook maar op lijkt",true);
					}
					else if(!item.burnable)
					{
						textParser.displayText("Hoe wil je " + item.names[2] + " nou weer aansteken?",true)
					}
					else if(item.lit)
					{
						textParser.displayText(accusatief.raw + " brandt al",true);
					}
					else {
						if(datief.noun)
						{
							if(datief.prefixCode==3) var reach =1;
							else var reach=2;

							var item2 = player.itemSelector(datief,reach);
							
							
							if(!item2.lit)
							{
								textParser.displayText("Hoe creeert men vuur uit dat wat niet brandt?",true);
							}
							else {
								textParser.displayText("Voorzichtig steek je " + item.names[1] + " aan terwijl een stekende pijn zich door je vingertoppen beweegt: je hebt je hand verbrand.",true);
								item.lit=true;
								item.additions.push("langzaam maar warm smeult het.");
							}
							
						}
						else
						{
							textParser.displayText("Je moet wel iets hebben waarmee je " + item.names[1] + " aan wilt steken. ",1);
							
						}
						
						
						
					}
					
					
					
				}
				else
				{
					if(!item || !item.discovered)
					{
						textParser.displayText("Wat wil je nou weer steken?",1);
					}
					else{
						
						textParser.displayText("Het is niet zo netjes om " + item.names[2] +" te steken.",1);
					}
					
					
				}
			
			
			
			break;
			
			case "open":
				if(accusatief.noun == "inventory")
				{
					player.inventory.check();
					break;
				}
				if(accusatief.noun)
				{
					if(datief.noun)
					{
						if(datief.prefixCode==3) var reach =1;
						else var reach=2;

						var item2 = player.itemSelector(datief,reach);
						if(item2)
						{
							player.openDoor(accusatief.noun,item2);
							
							
						}
						else
						{
							textParser.displayText("Je hebt toch helemaal geen " + datief.noun + ".",1);
							
						}
						
						
					}
					else{
						
						player.openDoor(accusatief.noun);
						
					}
				}
			
				else {
					
					textParser.displayText("Wat wil je nou weer openen jij slijkbrein.",1);
				}
			
			
			break;
			
			case "praat":
				if(!datief.noun)
				{
					if(accusatief.noun) textParser.displayText("Dat moment dat zelfs dit programma nog kan herkennen dat je grammatica shit is. Praat Nederlands.",1);
					else textParser.displayText("Met wie denk je te willen praten?",1);
					break;
				}
			
				var actor = player.actorSelector(datief.noun);
				if(actor)
				{
				actor.talk();
				}
				else
				{
					textParser.displayText("Je ziet geen " + datief.noun + " om je heen, ben je misschien schizofreen?",1);
				}
			break;
			
			default:
			
			
				textParser.displayText(action + " staat niet in mijn woordenboek.",true);
			break;
		
		}
	}
	
	
}

var player = {
	
	
	inventory: {
		items:Array(),
		maxSize:20,
		
		add: function(item)
		{
			this.items.push(item);
			
		},
		
		remove: function(id)
		{
			
			
		},
		
		search: function(word)
		{
						
			for(var i=0;i<this.items.length;i++)
			{
				var item = this.items[i];
				if(player.itemMatch(word,item)) return item
			}
			
			return false
		},
		check: function() {
			var items = Array();
					
			for(var i=0;i<player.inventory.items.length;i++)
			{
				items.push(player.inventory.items[i].names[2]);
			}
			var itemList = textParser.listItems(items);
			if(itemList) textParser.displayText("In je rugzak heb je " + itemList,true);
			else textParser.displayText("Je hebt niks, jij pauperjoch",true);
	
			
			
		}
		
		
	},
	
	searchRoom: function(word)
	{
		var room = this.room;
		
		for(var i=0;i<this.room.items.length;i++)
		{
			var item = this.room.items[i];
			if(this.itemMatch(word,item)&&!item.isTaken) 
			{
				return item
			}
		}
		
		
	},
	
	itemSelector: function(word,reach)
	{
		//reach 1:zelf
		//reach 2: overal
		//reach 3: buiten
		var item=false;
		if(reach>=1&&reach!=3)
		{
			
			var item = this.inventory.search(word);
			
		}
		if(reach>=2)
		{
			if(this.searchRoom(word)) item = this.searchRoom(word)
		}
		return item;
	},
	
	searchRoomById: function(ID) {
		for(var i=0;i<world.rooms.length;i++)
		{
			if(world.rooms[i].ID == ID) return world.rooms[i];
			
		}
		
		return false;
	},
	actorSelector: function(name)
	{
		if(!player.room.hasOwnProperty("actors")) return false;
		for(var i=0;i<player.room.actors.length;i++)
		{
			if(player.room.actors[i].names.indexOf(name))
			{
				return player.room.actors[i];
			}
			
		}
		
		return false;
	},
	
	itemMatch: function(a,b)
	{
		if(b.names.indexOf(a.noun)!=-1)
		{
			for(var i=0;i<a.adjectives.length;i++)
			{
				var adjective = a.adjectives[i];
				if(b.adjectives.indexOf(adjective)==-1) return false
			}
			return true
		}
		
		
		return false
	},
	checkDoor: function(name)
	{
		if(!player.room.hasOwnProperty("door")) return false
		for(var i=0;i<player.room.door.names.length;i++)
		{
			if(name==player.room.door.names[i])
			{
				return true
			}
		}
		return false
	},
	openDoor: function(doorName,item)
	{
		if(this.checkDoor(doorName))
		{
			var door = player.room.door;
			if(!item)
			{
				if(door.locked)
				{
					textParser.displayText(door.lockedMessage,1);
				}
				else
				{
					player.searchRoomById(door.connection).load();
				}
			}
			else
			{
				if(door.locked)
				{
					if(door.keys.indexOf(item.names[0])!=-1)
					{
						door.locked = false;
						player.inventory.items.splice(player.inventory.items.indexOf(item));
						player.searchRoomById(door.connection).load();
					}
					else
					{
						
						textParser.displayText(item.names[1] + " heeft geen enkel effect.",1);
					}
				}
				else {
					
					player.searchRoomById(door.connection).load();
				}
				
				
				
			}
		}
		else
		{
			textParser.displayText("Je ziet niets dat daarop lijkt.",1);
		}
		
	},
	
	room:0,
	recentWeapon:false
}

