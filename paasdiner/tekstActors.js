var NielsOpdam = {
	names: ["Niels Opdam", "niels", "opdam"],
	description: "Het ziet eruit alsof Niels helemaal brokko is gegaan, hij is niet echt meer aanspreekbaar.",
	visible: false,
	giveItem: function(item) {
		if(player.room.ID=="kasteel" && player.room.door.locked)
		{
			if(item==paasticket && player.room.door)
			{
				textParser.displayText("Je schuift het ticket door de brievenbus en hoort dat Niels niet meer de deur blokkeert",1);
				player.room.door.locked=false;
				player.inventory.items.splice(player.inventory.items.indexOf(item),1);
				this.visible = true;
			}
			else
			{
				textParser.displayText("Je probeert het door de brievenbus te schuiven, maar het wordt teruggeduwt: 'NAI NAI NAI. ZE KOMEN ER NIET IN'",1);
			}
		}
		else
		{
			textParser.displayText("Niels staart je verward aan met zijn visogen en zegt lichtelijk geirriteerd dat je je troep bij je moet houden",1);
		}


	},
	talk: function() {
		if((player.room.door && !player.room.door.locked)||!player.room.door)
		{
		textParser.displayText("Pas op dat je niet struikelt in de zaal van het kasteel m'n rakker.",1);
		}
		else if(player.room.door.locked)
		{
			textParser.displayText("Je probeert met hem te praten maar hij reageert alleen maar met: 'NAI NAI NAI. ZE KOMEN ER NIET IN ZONDER TICKET'",1);
		}
	}
}

var Jeffrey = {
	names: ["Jeffrey","jeff","jeffrey","jef"],
	description: ["Weet je nog die ene keer dat Jeffrey meer dan een halve brownie op had? Dat is hij er nu uitziet."],
	visible: true,
	giveItem: function(item) {
		if(item==chips)
		{
			this.hasMunchies = true;
			textParser.displayText("Jeff neemt de chips aan en probeert nog een jonko aan te steken. Om een ambulance te voorkomen pak je z'n aansteker maar af. Geirriteerd eet hij twee chipjes en valt hij in slaap.",true);
			player.inventory.add(aansteker);
		}
		else 
		{
			textParser.displayText("Jeffrey praat niet maar je kan zien dat hij het niet wilt aannemen.",true);
		}
		
	},
	hasMunchies: false,
	talk: function() {
		if(!this.hasMunchies)
		{
			textParser.displayText("'ik heb echt pauperharde munchies, waar liggen de doritos?'",true);
		}
		else
		{
			textParser.displayText("Jeffrey is in slaap gevallen.",true);
		}
		
	}
	
	
}

var Foppe = {
	names: ["Foppe","foppe","fopp","fop"],
	description: "Foppe ziet er gelukkig uit",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'Hahahahaha hou dat maar m'n jongen'",true);
	},
	talk: function() {
		textParser.displayText("'Hahaha zullen we Secret Hitler spelen?'",true);
	}
	
	
}

var Marco = {
	names: ["Marco","marco","marc"],
	description: "Marco zit erbij alsof hij zwaar depressief is en veels te veel vodka geshot heeft",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'GA'",true);
	},
	talk: function() {
		textParser.displayText("'GA'",true);
		
	}
}

var Lars = {
	names: ["Lars","lars"],
	description: "Lars hangt over de wc-pot en zit in het pijnlijke proces van barfen met een lege maag. Iets is anders aan zijn gezicht vandaag.... Oh wacht hij draagt gewoon geen bril.",
	visible: true,
	giveItem: function(item) {
		if(item.names[0]=="neukbril")
		{
		textParser.displayText("'Snel haal de meiden want nu ben ik onweerstaanbaar. Deze heb ik nu ook niet meer nodig' zegt Lars terwijl hij je zijn verrekijker geeft.",true);
		player.inventory.add(verrekijker);
		}
		else{
			textParser.displayText("'Ja ik zie echt voor geen meter wat dat is'",true);
		}
	},
	talk: function() {
		larsEvent();
		
	}
}

var Gijs = {
	names: ["Gijs","gijs"],
	description: "Gijs zit halfdood in de hoek van de kamer. Hij zei dat die deze week al drie keer had gezopen bij lustrumfeesten van Forestus dus het is niet gek daat hij er beroerd uitziet.",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'Nee dankje, ik ben al genoeg kwijt geraakt vanavond. Toen we met een groep naar het bos gingen was ik ze na twee afslagen naar links al kwijt, samen met lars zijn bril. Daarna ben ik maar terug gegaan om verder te drinken.'",true);
	},
	talk: function() {
		textParser.displayText("'Gelukkig was mijn antibioticakuur voor mijn driedubbele longontsteking net afgelopen, anders had ik niet mogen zuipen. Of het verstandig was om te gaan zuipen? Natuurlijk! Ik had zoveel hype...'",true);
		
	}
}

var Matthijs = {
	names: ["Matthijs","matthijs","Mathijs","mathijs","Mat","mat","neo","Neo"],
	description: "Matthijs lijkt de enige te zijn die geen kater heeft opgelopen, als je hem beter bekijkt valt het je echter op dat hij een halfvolle fles jenever bij zich heeft; Hij heeft geen kater want hij is nog steeds dronken.",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'Hou dat maar, ik heb me handen al vol aan Moniek.'",true);
	},
	talk: function() {
		textParser.displayText("'Gecondoleerd met je date'",true);
		
	}
}

var Koen = {
	names: ["Koen","koen"],
	description: "Koen ziet er echt heel beroerd uit. Hij heeft zijn handen op zijn buik en staart ongelukkig voor zich uit. Het doet je denken aan die trip naar Montenegro.",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("Koen ziet in zijn ooghoeken dat je iets wilt geven, maar hij heeft niet de energie om het aan te pakken",true);
	},
	talk: function() {
		textParser.displayText("Koen ratelt iets incoherents waaruit je opmaakt dat hij buikpijn heeft.",true);
		
	}
}

var Jer = {
	names: ["Jeroen","Jer","jer","Jer","Claire","claire"],
	description: "Jeroen en Claire ",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'Jeroen en Claire'",true);
	},
	talk: function() {
		textParser.displayText("' '",true);
		
	}
}

var Nelis = {
	names: ["Niels","niels","Nielert","nielert","Nelis","nelis"],
	description: "",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("''",true);
	},
	talk: function() {
		textParser.displayText("' '",true);
		
	}
}

function larsEvent()
{
	string = `Een man fietst over een landweggetje en ziet opeens een kip met drie poten voorbij rennen. Hij stapt af en probeert de kip te pakken, maar steeds als hij in de buurt komt zet de kip het op een rennen. De man volgt de kip en komt bij een boerderij uit. Daar ziet hij een boer staan. Hij vraagt hem: "Is die kip van u?" "Ja," antwoordt de boer. De man zegt: "Weet u dat het dier drie poten heeft?" "Ja, dat klopt," antwoordt de boer weer, "en dat komt zo: ik woon hier met mijn vrouw en zoon, en steeds als we kip aten hadden we ruzie over wie de pootjes mocht opeten. Na lang onderzoek is het ons gelukt een kip met drie poten te fokken". De man vraagt: "En is het nou over met die ruzies?" De boer antwoordt: "Dat weet ik niet, want het is ons nog steeds niet gelukt het beest te vangen."`
	string = string.replaceAll(`"`,"")
	string = string.replaceAll(`?`,"?.")
	string = string.replaceAll(`:`,":.")
	larsText = string.split(".");
	//console.log(larsText[0]);
	textParser.displayText("Lars probeert zijn kots in te houden en begint te praten: <br> <'Heb je deze al gehoord?'",true);
	var inputField = document.getElementById("input");
	inputField.disabled = true;
	for(var i=0;i<larsText.length-1;i++)
	{
	setTimeout(function() {textParser.displayText("'" + larsText[i] + "'",true); i+=1;},(i+1)*4000);
	}
	setTimeout(function() {textParser.displayText("'hue hue hue'",true)
	inputField.disabled = false;
	},(i+2)*4000)
	i=0;
	
	
	
	
	
	
}