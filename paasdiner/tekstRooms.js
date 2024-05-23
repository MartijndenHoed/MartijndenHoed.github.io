//heeeeel erg jammer dit



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
		items:[bierfles,slingers,spandoek,vijver,bos,toiletgebouw],
		connections:{north:"kasteel",kasteel:"kasteel",south:"bos",bos:"bos",west:"vijver",vijver:"vijver",WC:"WC",toiletgebouw:"WC",toilet:"WC",wc:"WC"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
		actors:[],
		
	},

	{
		ID: "kasteel",
		intro:"Je staat nu voor een groot kasteel, in het zuiden is het veld.",
		description: "Je beseft dat dit kasteel natuurlijk het keukenhof kasteel is. De grote deur is gesloten en het lijkt alsof je Niels binnen hoort.",
		items:[kasteelItem,kasteeldeur],
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
		ID: "brug",
		intro:"Dit is de iconische brug over de sloot van het keukenhof kasteel. Het leidt je van de kinderboerderij naar het treinspoor. Af en toe hoor je een trein voorbij rijden. Het lijkt erop dat er iemand onder de brug zit.",
		description: "Het bruggetje is van hout en half vervallen. Onder de brug zie je Bas zitten en het lijkt alsof hij ieder moment goblin mode kan gaan, het doet je denken aan een sprookje. Achter je ligt de kinderboerderij en voor je ligt het spoor.",
		items:[krat,brug],
		actors: [Bas],
		connections:{spoor:"spoor",boerderij:"boerderij",kinderboerderij:"boerderij",brug:"spoor"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
		{
		ID: "spoor",
		intro:"Je staat bij het hek dat het treinspoor omheint, dit is natuurlijk de lijn tussen voorhout en hillegom. Het pad loopt hier dood, achter je is het bruggetje.",
		description: "Het is hier een teringbende, wat je doet denken dat dit een hangplek is voor jongeren of zwervers ofzo. Bij het hek zie je Van Beek staan en naast hem ligt een halflege fles ice, hij kijkt regelmatig op zijn horloge.",
		items:[ice,brug,hek,spoor],
		actors: [Nelis],
		connections:{achter:"brug", brug:"brug", bruggetje:"brug",trein:"trein"},
		load: function(direction) {
			if(!Bas.puzzleSolved)
			{
				textParser.displayText("Terwijl je over de brug probeert te lopen houdt bas je geirriteerd tegen, hij tilt je op en zet je terug aan de kant van de boerderij.",true);
			}
			else
			{
				player.room = this;
				player.hasLooked = false;
				textParser.displayText(this.intro,true);
			}
		}
	},
	{
		ID: "hal",
		intro:"Je staat nu in de grote toegangshal van het kasteel. Voor je is de feestzaal en achter je is de buitenwereld",
		description: "Dit is de toegangshal van het kasteel. Ook deze ruimte is helemaal versierd met paasdiner slingers en spandoeken. Je struikelt bijna over een plooi in de rode loper, nou ja, het is een oud rood tapijt waar nog net geen ananasvlekken op zitten.",
		items:[tapijt,fakkel,slingers,spandoek],
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
		items:[kaak],
		connections:{zolder:"zolder",feestzaal:"feestzaal",achter:"feestzaal",omhoog:"zolder",boven:"zolder"},
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
		activeDescription: function(item=false) {
			if(item==verrekijker)
			{
				return "Als een gluurder kijk je met de verrekijker door de ramen naar buiten. Je hebt nu goed uitzicht op het bos en kan zien dat het bospad uitkomt bij de kinderboerderij. Als je eerst twee keer rechts afslaat, dan rechtdoor gaat, dan links, dan rechts en dan weer rechtdoor kom je aan bij je bestemming."
			}
			else if(!item)
			{
				
			}
			else return "Euhh ja wtf wil je daarmee doen dan"
			
			
		},
		outsideDescription: "Zoals ik dus zei, je ziet niet veel details.",
		items:[],
		connections:{terug:"trap",trap:"trap",trappenhuis:"trap",omlaag:"trap",raam:"max",buiten:"max",beneden:"trap"},
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
			lockedMessage: "Euhh, de deur zit op slot ofzo.",
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
		description: "De kelder is koud en vochtig, en het doet je denken aan de catacomben van de romeinenreis. Aan de wijnrekken kan je afleiden dat dit vroeger de wijnkelder was, maar de laatste flessen wijn die er nog waren zijn vanavond op gegaan. In de schaduw zie je 2 gedaantes zitten, ze lijken op Claire en Jeroen. ",
		items:[zolderSleutel,flesopener,ladder],
		connections:{omhoog:"hal",boven:"hal"},
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
		isDark: true,
		actors:[Jer]
	},
	
	{
		ID: "bos",
		intro:"Je staat in het bos dat door waar het nu al weer licht begint te worden. Het lijkt erop dat er twee individuen op de grond liggen. In het noorden is het open veld en in het zuiden is het bospad dat dieper het bos in gaat.",
		description: "Je ziet Foppe en Jeffrey op de grond liggen, knijterstoned. Hun ogen zijn bloedrood en het enige dat foppe kan uitbrengen met zijn slijkerige stem is 'Hey jij. Hey jij.'.",
		items:[jonko,bos],
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
		items:[neukbril,bos],
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
		intro:"Je staat bij de wereldberoemde kinderboerderij van het keukenhofbos. Het doet je denken aan die ene keer dat Jeff en Beek naar de kinderboerderij gingen en foto's namen van een geit ofzo. Er staat een grote stal voor de dieren en in het noorden is de fietsenstalling, achter je ligt het bospad. Ook is er een cool bruggetje over de sloot",
		description: "Je kijkt rond en een aantal vlagen van herinneringen schieten je voorbij. Gisteravond, nadat de meeste dates al weg waren, gingen jullie hierheen voor de afterparty. Er staat een grote stal waarvan de deur in een dronken bui is opgengebroken.",
		items:[brug,boerderij],
		connections:{bospad:"bos",bos:"bos",stal:"stal",fietsenstalling:"fietsenstalling",stalling:"fietsenstalling",noorden:"fietsenstalling",brug:"brug"},
		actors: [boerderij],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
		},
		{
		ID: "stal",
		intro:"Dit is een oude dierenstal. Ooit liepen hier schapen, maar gister hebben jullie het omgetoverd tot zuipschuur. De grond is vies en plakkering en in een hoekje ligt Koen, die er nogal miserabel uitziet. ",
		description: "Je kijkt rond en beseft je dat je hier gisteravond waarschijnlijk geweest bent, vlak voordat je blackout ging. Vaag herinner je iets over een shotje en een weddenschap maar je hoofdpijn voorkomt dat je te diep erover nadenkt.",
		items:[boerderij],
		connections:{buiten:"boerderij",boerderij:"boerderij"},
		actors: [Koen],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
		},
				{
		ID: "fietsenstalling",
		intro:"Je staat in de fietsenstalling waar het allemaal begon gister. De fietsen van alle ananielsers staan er nog, maar die van de dates zijn al lang verdwenen. ",
		description: "Je telt dat er 11 fietsen staan, alle ananielsers waren er gister, en zijn er nog steeds dus. Matthijs staat naast te fietsen herhaaldelijk zijn tas te doorzoeken, alsof die iets kwijt is. Achter je is de boerderij. ",
		items:[fiets],
		connections:{boerderij:"boerderij"},
		actors: [Matthijs],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		},
		door:{
			names: ["fiets","huis"],
			locked: true,
			lockedMessage: "Je stapt op je fiets, maar er zit geen beweging in. Je fiets staat op slot en je hebt geen sleutel.",
			keys: ["fietssleutel"],
			connection: "huis"
		}
	},
			{
		ID: "huis",
		intro:"huis",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText("Je stapt op je fiets en begint de tocht naar huis, het legendarische paasdiner is eindelijk over. <br> Je hebt het weer overleefd dit jaar.",true);
			creditsEvent();
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
		solved: false,
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
			if(this.padString == ["rechtsrechtsrechtdoorlinksrechtsrechtdoor"])
			{
				this.solved=true;
				textParser.displayText("Gelukt! je hebt de uitgang van het bos gevonden.",true);
				player.searchRoomById("boerderij").load();
			}
			else if (this.solved)
			{
				textParser.displayText("Lmao rustig maar, je hoeft die kutpuzzel niet opnieuw te doen.",true);
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
		intro:"De vijver is klein en ondiep, er zwemmen een paar eenden in. In het oosten zie je het open veld.",
		description: "Als je goed rondkijkt zie je aan de overkant van de vijver Marco voorovergebogen in het water barfen. Hij mompelt iets over grappig zijn voordat hij zijn complete maaginhoud in de vijver mikkert. Hij zal wel een kotspact zijn aangegaan.",
		items:[paasticket,eend,vijver],
		connections:{east:"hub",veld:"hub",vijver:"drown",water:"drown"},
		actors: [Marco],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			textParser.displayText(this.intro,true);
		}
	},
		{
		ID: "drown",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			//textParser.displayText(this.intro,true);
			textParser.displayText("Aarzelend laat je je vallen in het water. Het is ijskoud en zodra het water je hoofd raakt besef je dat dit echt heel erg dom was. Je kleren zuigen zich vol, en je hebt sowieso eigenlijk niet zoveel zin om te zwemmen, dus je doet je ogen maar dicht...",true);
			deathEvent();
		}
	},
			{
		ID: "max",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			//textParser.displayText(this.intro,true);
			textParser.displayText("M- M- Ma- Max? Oke dan maar, je euhhh doet het raam open en je ehhh je springt eruit...",true);
			deathEvent();
		}
	},
				{
		ID: "trein",
		intro:"",
		description: "",
		items:[],
		connections:{},
		actors: [],
		load: function(direction) {
			player.room = this;
			player.hasLooked = false;
			//textParser.displayText(this.intro,true);
			textParser.displayText("Je worstelt jezelf door een gat in het hek en stapt op het spoor. Je moet even wachten want de NS is uiteraard te laat, maar dan wordt het uiteindelijk zwart voor je ogen....",true);
			deathEvent();
		}
	},
	{
		ID: "WC",
		intro:"Je staat nu bij het toiletgebouw, wat naast het veld staat. Je hoort dat Lars ligt te creperen binnen.",
		description: "Overal liggen kotsresten en het is echt heel erg ranzig. Lars zit er ook niet best uit, maar gelukkig is hij wel gewend te barfen.",
		items:[toiletgebouw],
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

function deathEvent()
{
	setTimeout(function() {textParser.displayText("LMAO, JE BENT DOOD GEGAAN, GAME OVER. <br> Herlaad de pagina en probeer het nog maar eens een keer m'n jongen... ",false);
	},5000);
	var inputField = document.getElementById("input");
	inputField.disabled = true;
	inputField.focus();
}


function creditsEvent()
{
	textParser.displayText(` GEFELICITEERD, JE HEBT DE PAASDINER-SIMULATOR UITGESPEELD! <BR> JOUW SCORE: ${player.score}`,false);
	string = `
			Credits: <br>
			Producer: Martijn <br>
			Concept & scenario: Martijn <br>
			Engine development: Martijn <br>
			Storybuilding & lore: Martijn <br>
			Visual design: Martijn <br>
			Localization: Martijn <br>
			Marketing & PR: Martijn <br>
			Beta-testing: Martijn, Marcus, Foppe m'n jongen <br>
			<br>
			In nagedachtenis van alle slachtoffers van het paasdiner <br>
			`;
	creditsText = string.split("<br>");
	var inputField = document.getElementById("input");
	inputField.disabled = true;
	for(var i=0;i<creditsText.length-1;i++)
	{
	setTimeout(function() {textParser.displayText(creditsText[i],false); i+=1;},(i+1)*4000);
	inputField.focus();
	}
	i=0;
}
