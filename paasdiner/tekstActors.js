var NielsOpdam = {
names: ["Niels Opdam", "niels", "opdam"],
description: "Het ziet eruit alsof Niels helemaal brokko is gegaan, hij is niet echt meer aanspreekbaar.",
visible: false,
giveItem: function(item) {
	if(player.room.ID=="kasteel")
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
			textParser.displayText("Je probeert het in de brievenbus te schuiven, maar het wordt teruggeduwt: 'NAI NAI NAI. ZE KOMEN ER NIET IN'",1);
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
	textParser.displayText("Niels opdam staart glazig voor zich uit.",1);
	}
	else if(player.room.door.locked)
	{
		textParser.displayText("Je probeert met hem te praten maar hij reageert alleen maar met: 'NAI NAI NAI. ZE KOMEN ER NIET IN ZONDER TICKET'",1);
	}
}



}