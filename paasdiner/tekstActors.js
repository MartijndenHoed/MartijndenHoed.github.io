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
		textParser.displayText("Pas op dat je niet uitglijdt in de zaal van het kasteel m'n rakker.",1);
		}
		else if(player.room.door.locked)
		{
			textParser.displayText("Je probeert met hem te praten maar hij reageert alleen maar met: 'NAI NAI NAI. ZE KOMEN ER NIET IN ZONDER TICKET'",1);
		}
	}
}

var Jeffrey = {
	names: ["Jeffrey","jeff","jeffrey"],
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