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
		intro:"Je staat op een open veld in wat een groot feest lijkt te zijn. In het zuiden zie je een donker bos en in het noorden een groot kasteel. In het westen zie je een kleine vijver en aan de rand van het veld staat een toiletgebouw.",
		description: "Als je beter kijkt zie je dat er overal ballonnen en slingers hangen. Groot in het midden van het veld staat een spandoek met de dikgedrukte tekst: 'PAASDINER'.",
		items:[bierfles],
		connections:{north:"kasteel",kasteel:"kasteel",south:"bos",bos:"bos",west:"vijver",vijver:"vijver",WC:"WC",toiletgebouw:"WC",toilet:"WC"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
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
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "hal",
		intro:"Je staat nu in de grote toegangshal van het kasteel. Voor je is de feestzaal en achter je is de buitenwereld",
		description: "Dit is de toegangshal van het kasteel. Ook deze ruimte is helemaal versierd met paasdiner slingers en spandoeken. Je struikelt bijna over een plooi in de rode loper, nou ja, het is een oud rood tapijt waar nog net geen ananasvlekken op zitten.",
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
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
		{
		ID: "trap",
		intro:"Je staat nu in het grote trappenhuis van het kasteel. Hier hadden jullie vannacht geen toegang tot dus alles hier is nog net en schoon, op wat stof na. Achter je zie je de hal van de feestzaal en voor je zie je de deuren van de bovenverdiepingen van het kasteel.",
		description: "De trap is van stevig eikenhout gemaakt en bekleed met fluweelrode bekleding. Als je de deuren nader bekijkt zie je dat alleen de deur die naar de zolder leidt niet vergrendelt is.",
		items:[steen],
		connections:{zolder:"zolder",feestzaal:"feestzaal",achter:"feestzaal"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
	},
		{
		ID: "zolder",
		intro:"Dit is de hoogste  verdieping van het keukenhof-kasteel. Alles hier is oud en pauper en zit onder een dikke laag stof. Achter je is de trap die weer terug leidt naar de begane grond.",
		description: "Als je door het raam naar buiten kijkt heb je goed uitzicht op het keukenhofbos. Je ogen zijn alleen nogal moe en het bos is ver weg dus je ziet niet heel veel details.",
		activeDescription: function(item) {
			if(item==verrekijker)
			{
				return "Als een gluurder kijk je met de verrekijker door de ramen naar buiten. Je hebt nu goed uitzicht op het bos en kan zien dat het bospad uitkomt bij de kinderboerderij. Als je eerst twee keer rechts afslaat, dan rechtdoor gaat, dan links, dan rechts en dan weer links kom je aan bij je bestemming."
			}
			else return "Euhh ja wtf wil je daarmee doen dan"
			
			
		},
		items:[],
		connections:{terug:"trap",trap:"trap",trappenhuis:"trap",omlaag:"trap"},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "feestzaal",
		intro:"Dit is de zaal waar het echte zuipen is gebeurd. De enige uitgangen zijn de hal en een deur aan de overkant van de ruimte.",
		description: "Dit is de prachtige hoofdzaal van het kasteel. Het is ontworpen in de 17e eeuw en heeft enkele verbouwingen ondergaan maar je kan alsnog wel opmaken dat dit oorspronkelijk is gebouwd volgens de classisistische stijl, maar later is aangepast met neogotiek. Als je dat even negeert zie je dat het echt een teringbende is, overal liggen etensresten en drankvlekken. In de hoek ligt Gijs uit te kateren.",
		items:[chips],
		actors:[Gijs],
		connections:{hal:"hal",trap:"trap",trappenhuis:"trap"},
		door:{
			names: ["deur","trap"],
			locked: true,
			lockedMessage: "De deur zit op slot.",
			keys: ["sleutel"],
			connection: "trap"
		},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
	},
	
	
	{
		ID: "kelder",
		intro:"Dit is de kelder van het kasteel. De ladder omhoog geeft toegang tot de kasteelhal.",
		description: "De kelder is koud en vochtig, en het doet je denken aan de catacomben van de romeinenreis. Aan de wijnrekken kan je afleiden dat dit vroeger de wijnkelder was, maar de laatste flessen wijn die er nog waren zijn vanavond op gegaan. ",
		items:[zolderSleutel,flesopener],
		connections:{omhoog:"hal",boven:"hal"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
		isDark: true
	},
	
	{
		ID: "bos",
		intro:"Je staat in het bos dat door waar het nu al weer licht begint te worden. Het lijkt erop dat er twee individuen op de grond liggen. In het noorden is het open veld en in het zuiden is het bospad dat dieper het bos in gaat.",
		description: "Je ziet Foppe en Jeffrey op de grond liggen, knijterstoned. Hun ogen zijn bloedrood en het enige dat foppe kan uitbrengen met zijn slijkerige stem is 'Hey jij. Hey jij.'.",
		items:[jonko],
		connections:{north:"hub",veld:"hub",pad:"bospad",bospad:"bospad"},
		actors: [Jeffrey,Foppe],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "bospad",
		intro:"Je volgt bet bospad tot je uiteindelijk bij een kruising komt, je kan hier rechts, links of rechtdoor.",
		description: "Je herkent deze plek echt voor geen meter ook al ben je hier waarschijnlijk al zo vaak geweest. In de verte hoor je een vogel fluiten en het begint al bijna licht te worden.",
		items:[neukbril],
		connections:{rechts:"bospadInter",links:"bospadInter",rechtdoor:"bospadInter"},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
		{
		ID: "boerderij",
		intro:"Je staat bij de wereldberoemde kinderboerderij van het keukenhofbos. Het doet je denken aan die ene keer dat Jeff en Nelis naar de kinderboerderij gingen en foto's namen van een geit ofzo. Er staat een grote stal voor de dieren en in het noorden is de fietsenstalling",
		description: "Je kijkt rond en een aantal vlagen van herinneringen schieten je voorbij. Gisteravond, nadat de meeste dates al weg waren, gingen jullie hierheen voor de afterparty. De wijnflessen en sterke drank ligt nog op de grond en er ligt ook wat spaghetti. Er staat een grote stal waarvan de deur in een dronken bui is opgengebroken.",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
		},
		{
		ID: "stal",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
		},
				{
		ID: "fietsenstalling",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	
		{
		ID: "bospadInter",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		padCounter: [],
		load: function(direction) {
			this.padCounter.push(direction);
			this.padString = this.padCounter.join("");
			if(player.searchRoomById("bospad").items.length>0)
			{
				if(this.padString == ["linkslinks"])
				{
					player.searchRoomById("bospad").items[0].undiscoverable = false;
					
				}
				else{
					player.searchRoomById("bospad").items[0].undiscoverable = true;
				}
			}
			if(this.padString == ["rechtsrechtsrechtdoorlinksrechtslinks"])
			{
				player.searchRoomById("boerderij").load();
			}
			else if(this.padCounter.length>5)
			{
				this.padCounter = [];
				player.searchRoomById("bos").load();
			}
			else
			{
				player.searchRoomById("bospad").load();
			}


		}
	},
		{
		ID: "vijver",
		intro:"De vijver is klein en ondiep, er zwemmen een paar lege bierflesjes in. In het oosten zie je het open veld.",
		description: "Als je goed rondkijkt zie je aan de overkant van de vijver Marco voorovergebogen in het water barfen. Hij mompelt iets over grappig zijn voordat hij zijn complete maaginhoud in de vijver mikkert. Hij zal wel een kotspact zijn aangegaan.",
		items:[paasticket],
		connections:{east:"hub",veld:"hub"},
		actors: [Marco],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	{
		ID: "WC",
		intro:"Je staat nu bij het toiletgebouw, wat naast het veld staat. Je hoort dat Lars ligt te creperen binnen",
		description: "Overal liggen kotsresten en het is echt heel erg ranzig. Lars zit er ook niet best uit, maar gelukkig is hij wel gewend te barfen.",
		items:[],
		connections:{veld:"hub"},
		actors: [Lars],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
	

],



};