var NielsOpdam = {
names: ["Niels", "Niels Opdam", "Niels O."],
description: "",
giveItem: function(item) {



},
talk: function() {
	if(!player.room.door)
	{
	textParser.displayText("Niels opdam zegt: 'bruh'",1);
	}
	else if(player.room.door && !player.room.door.locked)
	{
	textParser.displayText("Niels opdam zegt: 'bruh'",1);
	}
	else if(player.room.door.locked)
	{
		textParser.displayText("Niels opdam zegt: 'NAI NAI NAI. JE KOMT ER NIET IN ZONDER TICKET'",1);
	}
}



}