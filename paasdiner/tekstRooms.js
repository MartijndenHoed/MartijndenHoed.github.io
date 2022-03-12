/*

function Room(description,items) {
	
	
	this.intro
	this.shortIntro
	this.ID
	
	this.objects[]
	this.visuals[]
	this.connections[]
	this.actions[]

	this.bootscript()
	

	this.description = description;
	this.items = items;
}
*/

var world = {rooms:
[
	{
		ID: "hub",
		intro:"Je staat op een open veld in wat een groot feest lijkt te zijn. In het zuiden zie je een donker bos en in het noorden een groot kasteel. In het westen zie je een kleine vijver.",
		description: "Als je beter kijkt zie je dat er overal ballonnen en slingers hangen. Groot in het midden van het veld staat een spandoek met de dikgedrukte tekst: 'PAASDINER'.",
		items:[bierfles],
		connections:{north:"kasteel",kasteel:"kasteel",south:"bos",bos:"bos",west:"vijver",vijver:"vijver"},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		}
	},

	{
		ID: "kasteel",
		intro:"Je staat nu voor een groot kasteel, in het zuiden is het veld.",
		description: "Je beseft dat dit kasteel natuurlijk het keukenhof kasteel is. De grote deur is gesloten en het lijkt alsof je Niels binnen hoort.",
		items:[],
		actors: [NielsOpdam],
		connections:{south:"hub",veld:"hub"},
		door:{
			names: ["deur","kasteel","poort","binnen"],
			locked: true,
			lockedMessage: "Je probeert de deur te openen, maar het voelt alsof hij vanbinnen wordt dichtgeduwd.",
			keys: [],
			connection: "hal"
		},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "hal",
		intro:"Je staat nu in de grote toegangshal van het kasteel. Voor je is de feestzaal en achter je is de buitenwereld",
		description: "Dit is de toegangshal van het kasteel. Ook deze ruimte is helemaal versierd met paasdiner slingers en spandoeken. Om het extra luxe te maken is er zelfs een rode loper neergelegd, nou ja, het is een oud rood tapijt waar nog net geen ananasvlekken op zitten.",
		items:[tapijt,fakkel],
		actors: [NielsOpdam],
		door:{
			names: ["luik","valluik","omlaag"],
			locked: false,
			lockedMessage: "Je krijgt de deur voor geen meter open.",
			keys: [],
			connection: "kelder"
		},
		connections:{buiten:"kasteel",feestzaal:"feestzaal",voren:"feestzaal"},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "feestzaal",
		intro:"Dit is de zaal waar het echte zuipen is gebeurd. De enige uitgang is de hal.",
		description: "Dit is de prachtige hoofdzaal van het kasteel. Het is ontworpen in de 17e eeuw en heeft enkele verbouwingen ondergaan maar je kan alsnog wel opmaken dat dit oorspronkelijk is gebouwd volgens de classisistische stijl, maar later is aangepast met neogotiek. Als je dat even negeert zie je dat het echt een teringbende is, overal liggen etensresten en drankvlekken.",
		items:[chips],
		connections:{hal:"hal"},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		},
	},
	
	
	{
		ID: "kelder",
		intro:"Dit is de kelder van het kasteel. De ladder omhoog geeft toegang tot de kasteelhal.",
		description: "Kelderbeschrijving",
		items:[],
		connections:{omhoog:"hal",boven:"hal"},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		},
		isDark: true
	},
	{
		ID: "bos",
		intro:"Je staat in het bos dat door de schemering enigzins donker begint te worden. Het lijkt erop dat er twee individuen op de grond liggen. In het noorden is het open veld.",
		description: "Je ziet Foppe en Jeffrey op de grond liggen, knijterstoned. Hun ogen zijn bloedrood en het enige dat foppe kan uitbrengen met zijn slijkerige stem is 'Hey jij. Hey jij.'.",
		items:[jonko],
		connections:{north:"hub",veld:"hub"},
		actors: [Jeffrey,Foppe],
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		}
	},
		{
		ID: "vijver",
		intro:"De vijver is klein en ondiep, er zwemmen een paar lege bierflesjes in. In het oosten zie je het open veld.",
		description: "Als je goed rondkijkt zie je aan de overkant van de vijver Marco voorovergebogen in het water barfen. Hij mompelt iets over grappig zijn voordat hij zijn complete maaginhoud in de vijver mikkert. Hij zal wel geen date hebben gevonden.",
		items:[paasticket],
		connections:{east:"hub",veld:"hub"},
		load: function(direction) {
			player.room = this;
			textParser.displayText(this.intro,true);
		}
	},


],



};