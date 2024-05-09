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
		textParser.displayText("'Pas op dat je niet struikelt in de zaal van het kasteel m'n rakker.'",1);
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
			player.inventory.items.splice(player.inventory.items.indexOf(item),1);
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
	description: "Marco ligt half in slaap en ziet er gebroken uit.",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'GA'",true);
	},
	talk: function() {
		textParser.displayText("'ANKER'",true);
		
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
		player.inventory.items.splice(player.inventory.items.indexOf(item),1);
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
	description: "Matthijs lijkt de enige te zijn die geen kater heeft opgelopen, als je hem beter bekijkt valt het je echter op dat hij een halfvolle fles jenever bij zich heeft; Hij heeft geen kater want hij is nooit gestopt met drinken...",
	visible: true,
	dialogCount: 0,
	giveItem: function(item) {
		if(item==ice)
		{
			if(item.empty)
			{
			textParser.displayText("Je geeft de lege fles aan Matthijs en de jongen wordt helemaal gelukkig. Hij zet z'n fles jenever neer en begint met zijn reis naar de glasbak. ",true);
			player.inventory.items.splice(player.inventory.items.indexOf(item),1);
			player.room.items.push(drank);
			}
			else
			{
				textParser.displayText("'Yo wat moet ik met een volle fles?'",true);
			}
		}
		else
		{
		textParser.displayText("'Hou dat maar, ik heb me handen al vol aan Moniek.'",true);
		}
	},
	talk: function() {
		if(this.dialogCount==0)
		{
		textParser.displayText("'Gecondoleerd met je date.'",true);
		this.dialogCount++;
		}
		else{
			textParser.displayText("'Wist je dat Moniek 18 is?'",true);
		}
		
	}
}

var Koen = {
	names: ["Koen","koen"],
	description: "Koen ziet er echt heel beroerd uit. Hij heeft zijn handen op zijn buik en staart ongelukkig voor zich uit. Het doet je denken aan die trip naar Montenegro.",
	visible: true,
	giveItem: function(item) {
		if(item==drank)
		{
			textParser.displayText("Koen pakt de fles aan en neemt een slok. Zijn gezicht verdraait meteen en hij kotst zijn hele maag leeg. Er glinstert iets in de kots, en als je beter kijkt zie je dat er een sleutel tussen zat.",true);
			player.room.items.push(fietssleutel);
		}
		else
		{
		textParser.displayText("Koen ziet in zijn ooghoeken dat je iets wilt geven, maar hij heeft niet de energie om het aan te pakken",true);
		}
	},
	talk: function() {
		textParser.displayText("Koen ratelt iets incoherents waaruit je opmaakt dat hij buikpijn heeft.",true);
		
	}
}

var Jer = {
	names: ["Jeroen","Jer","jer","Jer","Claire","claire","jeroen"],
	description: "Jeroen en Claire ",
	visible: true,
	giveItem: function(item) {
		textParser.displayText("'Jeroen en Claire zitten samen op de grond, het lijkt erop dat Jeroen een McWrap heeft gevonden waar hij nu van aan het genieten is. Claire ziet er nogal misslijk uit.",true);
	},
	talk: function() {
		var speech = ["ad impiccare questa ribelle genia d'Italia, ci vuole corda assai. Non ne ha abbastanza il boia. Conrad[1] non ha avuto abbastanza uomini e cannoni per costringerci alla resa. Ci credevano ancora percossi, piegati nella rovina triste di Caporetto e ci hanno trovati in piedi, pronti a tutti i sacrifici. ", "Amate il pane, cuore della casa, profumo della mensa, gioia del focolare. Rispettate il pane, sudore della fronte, orgoglio del lavoro, poema di sacrificio.","Egli era un nomade della vita, un pellegrino che portava nella sua bisaccia poco pane e moltissimi sogni e camminava così, nella sua tempestosa giovinezza, combattendo e prodigandosi, senza chiedere nulla. Leviamoci un momento dalle bassure della vita parlamentare; allontaniamoci da questo spettacolo mediocre e sconfortante; andiamo altrove col nostro pensiero che non dimentica; portiamo altrove il nostro cuore, le nostre angosce segrete, le nostre speranze superbe, e inchiniamoci sulla pietra che, nella desolazione dell'Altipiano di Trieste, segnò il luogo dove Filippo Corridoni cadde in un tumulto e in una rievocazione di vittoria.","Era necessario farci strada con la violenza, con il sacrificio, con il sangue; era necessario stabilire un ordine e una disciplina voluti dalle masse, ma impossibili da ottenere con una propaganda all'acqua di rose, con parole, parole e ancora parole e con ingannevoli battaglie parlamentari e giornalistiche.","Comunichi al senatore Agnelli che nei nuovi stabilimenti Fiat devono esserci comodi e decorosi refettori per gli operai. Gli dica che l'operaio che mangia in fretta e furia vicino alla macchina non è di questo tempo fascista. Aggiunga che l'uomo non è una macchina adibita a un'altra macchina."];
		speech = speech[Math.floor(Math.random()*speech.length)];
		textParser.displayText(`Claire kijkt op en begint te ratelen: '${speech}'`,true);
		
	}
}

var Nelis = {
	names: ["Niels","niels","Nielert","nielert","Nelis","nelis","Beek","beek"],
	description: "Niels ziet er niet heel dronken uit, maar dat is ook wel logisch want hij was niet bij het diner gister. Je herinnert je vaag dat hij niet een date wilde en laat in de avond pas kwam toen iedereen al flink dronken was. ",
	visible: true,
	giveItem: function(item) {
		textParser.displayText(`'Niels pakt ${item.names[1]} aan en bekijkt het aandachtig, vervolgens brabbelt die iets over de definitie van eigendomsrecht uit het burgerlijk wetboek en geeft het terug.'`,true);
	},
	talk: function() {
		nielsEvent();
		
	}
}

var Bas = {
	names: ["Bas","bas"],
	description: "Bas zit op 2 lege kratten bier, en staart zoekend voor zich uit. Blijkbaar is hij aan het kratzitten en uit de wallen onder zijn ogen maak je op dat hij nog steeds bezig is.",
	visible: true,
	puzzleSolved: false,
	giveItem: function(item) {
		if(item==bierfles)
		{
			textParser.displayText("Bas neemt het flesje aan, doet het snelste adtje dat je ooit hebt gezien, en zet het in het kratje als het laatste puzzelstukje in een grote legpuzzel. Tevreden doet hij zijn ogen dicht en valt in slaap.",true);
			player.room.description = "Het bruggetje is van hout en half vervallen. Onder de brug zie je Bas zitten als een gnoom op een pot goud, het doet je denken aan een sprookje. Achter je ligt de kinderboerderij en voor je ligt het spoor.";
			this.description = "Bas ligt op 2 lege kratten bier, hij ziet er vredig uit.";
			this.puzzleSolved = true;
			player.inventory.items.splice(player.inventory.items.indexOf(item),1);
		}
		else
		{
			textParser.displayText("'Nee m'n jongen.'",true);
		}
	},
	talk: function() {
		textParser.displayText("'Ik zal niet rusten voordat ik een dubbele kratzit heb gedaan, m'n jongen.'",true);
	}
}

function nielsEvent()
{
	textParser.displayText("Niels brandt los:",true);
	string = `lol ik kreeg vandaag een mailtje binnen van traffic. Dat zijn medewerkers die de hele dag alle werkzaamheden en wachtrijen van FNV Contactcenter in de gaten houden. Kennelijk als het echt heel druk is op de lijn is er een soort 'noodknop' waarmee het onmogelijk wordt gemaakt om te bellen. Als je dan als lid probeert te bellen, krijg je een bandje met dat het vanwege extreme drukte niet mogelijk is om iemand te woord te staan. Je zal maar willen bellen omdat je bijv. net op staande voet bent ontslagen. '`
	string = string.replaceAll(`"`,"")
	string = string.replaceAll(`?`,"?.")
	string = string.replaceAll(`:`,":.")
	nielsText = string.split(".");
	var inputField = document.getElementById("input");
	inputField.disabled = true;
	for(var i=0;i<nielsText.length-1;i++)
	{
	setTimeout(function() {textParser.displayText("'" + nielsText[i] + "'",true); i+=1;},(i+1)*4000);
	}
	setTimeout(function() {inputField.disabled = false;
	inputField.focus();
	},(i+2)*4000)
	i=0;
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
	inputField.focus();
	},(i+2)*4000)
	i=0;
}