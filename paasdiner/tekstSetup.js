"use strict";


//heeeeel erg jammer dit


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
		var request = false;
		if(this.requestChecker(subText[subText.length-1]))
		{
			request = true;
			subText.pop();
		}
		
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
		
		actions.executeAction(action,accusatief,datief,0,request);
		//this.displayText("&lt;command received");
		
		
		
	},
	actionTranslator: function(action) {
		if(action=="bekijk") return "kijk";
		if(action=="neem") return "pak";
		if(action=="loop"||action=="wandel"||action=="stap"||action=="spring") return "ga";
		if(action=="raap") return "pak";
		if(action=="zet") return "schakel";
		
		return action;
	},
	checkDirective: function(partikel) {
		if(partikel=="naar"||partikel=="op"||partikel=="in"||partikel=="uit"||partikel=="voor") return true;
		
		return 0;
	},
	wordTranslator: function(word) {
		if(word=="noord"||word=="noordelijk"||word=="noordwaarts"||word=="noorden") return "north"
		if(word=="zuid"||word=="zuidelijk"||word=="zuidwaarts"||word=="zuiden") return "south"
		if(word=="west"||word=="westelijk"||word=="westwaarts"||word=="westen") return "west"
		if(word=="oost"||word=="oostelijk"||word=="oostwaarts"||word=="oosten") return "east"
		if(word=="rechtsaf") return "rechts"
		if(word=="linksaf") return "links"
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
		if(action=="drink") return ["op"];
		if(action=="steek") return ["aan"];
		if(action=="gooi") return ["weg"];
		if(action=="schakel") return ["uit","aan"];
		if(action=="ga") return ["in","op","uit"];
		
		return false;
	},
	preposCode: function(prepos) {
		if(prepos=="naar") return 1;
		if(prepos=="met") return 2;
		if(prepos=="voor") return 3;
		if(prepos=="tegen") return 4;
		if(prepos=="aan") return 5;
		if(prepos=="onder") return 6;
		if(prepos=="in") return 7;
		if(prepos=="door") return 8;
		if(prepos=="op") return 9;
		return 0;
	},
	requestChecker: function(word) {
		if(word=="alsjeblieft"||word=="please") return 1;
		return 0;
	},
	qeueuedText: "",
	displayedText:"",
	lineRenderer: false,
	displayText: function(input="",isOutput=false) {
		if(input)
		{
			if(isOutput) input = "&lt;".concat(input);
			if(input.startsWith(">")) this.displayedText += input + " <br>"
			else this.qeueuedText += input + " <br>"
		}
		this.displayedText += this.qeueuedText.slice(0,1);
		this.qeueuedText = this.qeueuedText.slice(1);
		
		
		
		var lines = this.displayedText.split("<br>");
		if(lines.length>maxLines)
		{
			//console.log(this.displayedText);
			this.displayedText = "";
			//console.log(lines);
			for(var i=1;i<lines.length-1;i++)
			{
				this.displayedText += lines[i] + "<br>";
			}
			//console.log(this.displayedText);
		}
		
		var totalLinesString = this.displayedText;
		var div = document.getElementById("output");
		div.innerHTML = totalLinesString;
		//console.log(this.qeueuedText);
		
		
		if(this.qeueuedText) setTimeout(function() {textParser.displayText();},5)
		
	},
	/*
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
	*/
	
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
	},
	irritation: 0
	
	
	
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
	executeAction: function(action,accusatief,datief,ablatief,request) {
		player.score--;
		if(player.score<0) player.score=0;
		if(request)
		{
			textParser.irritation=0;
		}
		
		if(textParser.irritation==10)
		{
			textParser.displayText("Yo ik ben je bitch niet, zeg alsjeblieft of ik doe niks meer.",1);
			textParser.irritation+=1;
			return 0;
		}
		if(textParser.irritation==11)
		{
			textParser.displayText("Ben je blind en doof ofzo?",1);
			textParser.irritation+=1;
			return 0;
		}
		if(textParser.irritation>11)
		{
			textParser.displayText("Nee.",1);
			textParser.irritation+=1;
			return 0;
		}
		
		
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
						textParser.irritation+=1;
					}
				}
				else{
					
					
					if(reach==1) textParser.displayText("Je hebt niks dat ook maar lijkt op " + accusatief.raw,true);
					if(reach==2) textParser.displayText("Je ziet niks dat ook maar lijkt op " + accusatief.raw,true);
				}
			
			
			
			break;
			case "drink":

			//textParser.displayText("gelezen");
				
				if(item && item.discovered)
				{
					if(item.hasOwnProperty("drinkable"))
					{
						if(item.drinkable)
						{
							if(!item.empty)
							{
							textParser.displayText("Je hebt echt geen plek in je maag hiervoor, maar oke dan maar. Je forceert het je strot in na een paar minuten weet je zeker dat je het binnen kan houden.",true);
							item.empty = true;
							}
							else{
								textParser.displayText("Yo die is leeg.",true);
							}
						}
						else{
							textParser.displayText("Je probeert het, maar de geur van alcohol tiggert een pavlov reactie en zorgt dat je meteen barft. ",true);
						}
					}
					else
					{
						textParser.displayText("Hoe de fuck wil je dat drinken.",true);
						textParser.irritation+=1;
					}
				}
				else{
					
					
					if(reach==1) textParser.displayText("Je hebt niks dat ook maar lijkt op " + accusatief.raw,true);
					if(reach==2) textParser.displayText("Je ziet niks dat ook maar lijkt op " + accusatief.raw,true);
				}
			
			
			
			break;
			
			case "kijk":
				if((accusatief.noun=="buiten" && !datief.noun) )
				{
					if(player.room.hasOwnProperty("outsideDescription"))
					{
						textParser.displayText(player.room.outsideDescription,true);
					}
					else{
						textParser.displayText("Jesse wat bedoel je in hemelsnaam",true);
					}
					break;
					
					
				}
				else if(accusatief.noun=="rond" || (accusatief.noun=="buiten" &&datief.noun)  ||(!accusatief.noun&&datief.preposCode==2))
				{
					var item2 = false;
					if(datief.noun)
					{
						if(datief.prefixCode==3) var reach =1;
						else var reach=2;

						item2 = player.itemSelector(datief,reach);
						if(item2==false) 
						{
							textParser.displayText("Je hebt niets dat daarop lijkt",true);
							textParser.irritation+=1;
							break;
						}
					}
					if(!player.room.isDark)
					{
						player.lookAround("",item2);
					}
					else
					{
						var isIlluminated = false;
						for(var i=0;i<player.inventory.items.length;i++)
						{
							player.inventory.items[i].illuminating;
							if(player.inventory.items[i].illuminating)
							{
								
								
								var string = player.inventory.items[i].names[1] + " geeft genoeg licht om rond te kunnen kijken. ";
								player.lookAround(string,item2);
								isIlluminated = true;
								break;
							}
							
						}
						if(!isIlluminated) textParser.displayText("Het is te donker, je ziet echt geen moker.",true);
						
					}
					break;
				}
				if(datief.noun)
				{
					if(datief.prefixCode==3) var reach =1;
					else var reach=2;

					var item2 = player.itemSelector(datief,reach);
					//console.log(item2);
					if(item2)
					{
						if(item2.hasOwnProperty("spatialDescriptions") && item2.spatialDescriptions.hasOwnProperty(datief.prepos))
						{
							textParser.displayText(item2.spatialDescriptions[datief.prepos],1);
							break;
						}
						else
						{
							textParser.displayText("Je ziet niets " + datief.prepos +" " +  item2.names[1] ,1);
							textParser.irritation+=1;
							break;
						}
					}
					else
					{
						textParser.displayText("Je ziet niets dat daarop lijkt.",1);
						break;
					}
					
				}
				
				if(accusatief.noun=="inventory")
				{
					player.inventory.check();
					
					break;
				}
				
				if(item && item.discovered)
				{
					//console.log(item);
					if(!item.hasOwnProperty("activeDescription"))
					{
						var description = item.description;
						for(var i=0;i<item.additions.length;i++)
						{
						description += ", " + item.additions[i];
						}
						textParser.displayText(description,true);
						break;
					}
					else
					{
						textParser.displayText(item.activeDescription(),true);
						break;
					}
				}
				if(player.actorSelector(accusatief.noun))
				{
					var actor = player.actorSelector(accusatief.noun);
					if(actor.visible)
					{
						textParser.displayText(actor.description,true);
					}
					else
					{
						 textParser.displayText("Je kan " + actor.names[0] + " niet zien.",true);
					}
					break;
				}
				if(reach==1) textParser.displayText("Je hebt niets dat daarop lijkt",true);
				if(reach==2) textParser.displayText("Je ziet niets dat daarop lijkt",true);
			
			
			break;
			
			case "pak":
				if(player.actorSelector(accusatief.noun))
				{
					textParser.displayText(`Je probeert ${player.actorSelector(accusatief.noun).names[0]} op te pakken. Verschrikt roept die: 'BAS ZET ME ALSJEBLIEFT NEER'`,true);
					break;
				}
				if(reach==2)
				{
					var item = player.itemSelector(accusatief,3);
					if(item && item.discovered)
					{	
						if(item.hasOwnProperty("notTakeable"))
						{
							textParser.displayText(item.notTakeable,true);
							
						}
						else
						{
						player.inventory.add(item);
						textParser.displayText("Met veel moeite strek je je uit en pak je " +item.names[1],true);
						item.isTaken=true;
						player.room.items.splice(player.room.items.indexOf(item),1);
						}
					}
					else{
						if(player.itemSelector(accusatief,1))
						{
							textParser.displayText("Euhh dat heb je toch al?",true);
							textParser.irritation+=1;
						}
						else{
							textParser.displayText("Euhh ja dat is er niet",true);
							textParser.irritation+=1;
						}
					}
				}
				else
				{
					textParser.displayText("Euhh ja dat is er niet",true);
					textParser.irritation+=1;
					
				}
			
			
			break;
			
			case "ga":
				if(accusatief.mode=="in"||accusatief.mode=="op"||accusatief.mode=="uit")
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
							player.searchRoomById(player.room.connections[accusatief.noun]).load(accusatief.noun);
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
						textParser.displayText("Euhh wat bedoel je?",1);
						break;
					}
					if(accusatief.noun=="binnen")
					{
						if(player.room.hasOwnProperty("door")&&!player.room.connections.hasOwnProperty("binnen"))
						{
							player.openDoor(player.room.door.names[0]);
							break;
						}
				
					}
					if(player.room.hasOwnProperty("door") && player.room.door.names.indexOf(accusatief.noun)!=-1)
					{
						player.openDoor(player.room.door.names[0]);
						break;
					}
					else if(player.searchRoomById(player.room.connections[accusatief.noun]))
					{
						player.searchRoomById(player.room.connections[accusatief.noun]).load(accusatief.noun);
					}
					else
					{
						textParser.displayText("Yo ik heb geen idee wat je bedoelt daarmee.",true);
						textParser.irritation+=1;
					}
				}
			
			
			break;
			
			case "help":
				player.helpCounter++;
				if(player.helpCounter==4)
				{
				textParser.displayText("Yo als je zoveel hulp nodig hebt is dit spel misschien te lastig voor je, ga lekker iets simpels als smite spelen ofzo.");
				player.helpCounter=0;
				}
				else
				{
					textParser.displayText("Toegestaane acties zijn: kijk, bekijk, lees, pak, ga, steek aan, open, praat, geef, spring, drink, help. Combineer deze werkwoorden met andere woorden om acties te vormen, voorbeelden: 'kijk rond', 'bekijk [object]', 'pak [object] op' enz.");
				}
				textParser.irritation+=1;
			
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
						textParser.displayText("Hoe wil je " + item.names[2] + " nou weer aansteken?",true);
						textParser.irritation+=1;
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
								textParser.displayText("'" + "Hoe creeert men vuur uit dat wat niet brandt?' ~Confucius",true);
							}
							else {
								textParser.displayText("Voorzichtig steek je " + item.names[1] + " aan terwijl een stekende pijn zich door je vingertoppen beweegt: je hebt je hand verbrand.",true);
								item.lit=true;
								if(item.hasOwnProperty("illuminating")) item.illuminating = true;
								item.additions.push("langzaam maar warm smeult het.");
							}
							
						}
						else
						{
							textParser.displayText("Je moet wel iets hebben waarmee je " + item.names[1] + " aan wilt steken. ",1);
							textParser.irritation+=1;
						}
						
						
						
					}
					
					
					
				}
				else
				{
					if(player.actorSelector(accusatief.noun))
					{
						textParser.displayText("Het is niet zo netjes om " + accusatief.noun +" te steken.",1);
						
					}
					else if(!item || !item.discovered)
					{
						textParser.displayText("Ga niet steken gast",1);
						textParser.irritation+=1;
					}

					else {
						
						textParser.displayText("Het is niet zo makkelijk om " + item.names[2] +" te steken.",1);
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
							textParser.irritation+=1;
						}
						
						
					}
					else{
						
						player.openDoor(accusatief.noun);
						
					}
				}
			
				else {
					
					textParser.displayText("Wat wil je nou weer openen jij slijkbrein.",1);
					textParser.irritation+=1;
				}
			
			
			break;
			
			case "praat":
				if(!datief.noun)
				{
					if(accusatief.noun) 
					{
						if(accusatief.noun=="Nederlands"||accusatief.noun=="nederlands") textParser.displayText("Kappen nou...",1);
						else textParser.displayText("Dat moment dat zelfs dit programma nog kan herkennen dat je grammatica shit is. Praat Nederlands.",1);
						textParser.irritation+=1;
					}
					else textParser.displayText("Praten doe je met iemand.",1);
					break;
				}
			
				var actor = player.actorSelector(datief.noun);
				if(actor)
				{
				actor.talk();
				}
				else
				{
					textParser.displayText("Je ziet geen " + datief.noun + " om je heen, ben je misschien schizo?",1);
				}
			break;
			
			case "geef":
				if(!datief.noun)
				{
					if(accusatief.noun) textParser.displayText("Jesse waar heb je het in hemelsnaam over?",1);
					else textParser.displayText("Jesse waar heb je het in hemelsnaam over?",1);
					break;
				}
				item = player.itemSelector(accusatief,1)
				if(!item)
				{
					textParser.displayText("Je moet wel iets hebben wat je wilt geven",1);
					break;
				}
				var actor = player.actorSelector(datief.noun);
				if(actor)
				{
				actor.giveItem(item);
				}
				else
				{
					textParser.displayText("Je ziet geen " + datief.noun + " om je heen, ben je misschien schizofreen?",1);
					textParser.irritation+=1;
				}
			break;
			
			default:
			
			
				textParser.displayText(action + " staat niet in mijn woordenboek.",true);
			break;
		
		}
	}
	
	
}

var player = {
	score: 225,
	helpCounter:0,
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
			if(player.room.actors[i].names.indexOf(name)!=-1)
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
					if(player.inventory.search({noun:door.keys[0],adjectives:[]}))
					{
						console.log(player.inventory.search({noun:door.keys[0],adjectives:[]}));
						player.searchRoomById(door.connection).load();
					}
					else
					{
						textParser.displayText(door.lockedMessage,1);
					}
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
						player.inventory.items.splice(player.inventory.items.indexOf(item),1);
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
	lookAround: function(string="",item=false) {
		if(!player.hasLooked||item!=false)
		{
			if(this.room.hasOwnProperty("activeDescription")&& item!=false)
			{
				var description = string + this.room.activeDescription(item);
			}
			else
			{
				//console.log(item);
				if(item!=false)
				{
					textParser.displayText("Euhhhhh ja ik heb echt geen idee hoe je " + item.names[2] + " hier wilt gebruiken.",true);
					return
				}
				var description = string + this.room.description;
			}
			player.hasLooked = true;
		}
		else
		{
			var description = string + this.room.intro;
			player.hasLooked = false;
		}
		//console.log(player.hasLooked);
		var items = Array();
		for(var i=0;i<this.room.items.length;i++)
		{
			if(!this.room.items[i].isTaken && !this.room.items[i].undiscoverable)
			{
				if(this.room.items[i].hasOwnProperty("roomDescription")) 
				{
					console.log(this.room.items[i]);
					description += " " + this.room.items[i].roomDescription + " ";
					
				}
				else 
				{
					items.push(this.room.items[i].names[2]);
				}
				this.room.items[i].discovered = true;
			}

		}
		console.log(description);
		var itemList = textParser.listItems(items);
		if(itemList) description +=" Voor de rest zie je " +  itemList + ".";
		textParser.displayText(description,true);
		
		
	},
	room:0,
	hasLooked: false,
	recentWeapon:false
}

