//heeeeel erg jammer dit


var book = {
	names: ["boek", "het boek","een boek"],
	additions: [],
	adjectives: [],
	description:"Een boek zoals al tijden niet uitgegeven zijn.",
	readable:true,
	text:"er was eens een man in bagdad",
	
	burnable:true,
	lit:false
	
	
};

var stok = {
	names:["stok","de stok","een stok"],
	adjectives: ["houten"],
	description:"Een houten stok, wellicht te gebruiken als wapen",
	additions: [],
	weapon:true,
	burnable:true,
	lit:false
};

var aansteker = {
	names:["aansteker","de aansteker","een aansteker"],
	adjectives: [],
	description:"Een klassieke plastic aansteker van de kermis met foppes naam erin gekrast. Het lijkt erop dat hij hier veel jonko mee heeft geklapt.",
	additions: [],
	weapon:true,
	lit:true,
	discovered: true,
};

var steen = {
	names:["steen","de steen","een steen"],
	adjectives: [],
	description:"Een ruw stuk graniet, wellicht ooit onderdeel geweest van een hoog-gotisch kathedraal",
	additions: []
	
	
};

var kaak = {
	names:["kaakbot","het kaakbot","een kaakbot","bot","kaak"],
	adjectives: [],
	description:"Het lijkt op een menselijk kaakbot met een breuk erin.",
	additions: []
	
	
};



var moker = {
	names: ["moker", "de moker", "een moker"],
	adjectives: ["grote"],
	description: "Een paupergrote moker die echt pauperhard lijkt",
	additions: []
	
	
	
}

var bierfles = {
	names: ["bierflesje", "het bierflesje", "een bierflesje","flesje","bier","biertje","bierfles"],
	adjectives: [],
	description: "Een ongeopend flesje Brouwers. Het verbaast je dat iemand dit zou achterlaten.",
	additions: [],
	drinkable: false,
}

var brug = {
	names: ["brug", "de brug", "een brug","bruggetje"],
	adjectives: [],
	description: "Het bruggetje ziet er best wel ziek uit, het heeft echt zo'n boog en van die stenen en shit.",
	additions: [],
	notTakeable: "Jesse dat is scheikundig gezien unmeugelijk",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var vijver = {
	names: ["vijver", "de vijver", "een vijver","bruggetje"],
	adjectives: [],
	description: "Ja het is echt zo'n gat met water erin.         *kuch kuch* je moeder gister ook *kuch kuch*",
	additions: [],
	notTakeable: "Jesse dat is scheikundig gezien unmeugelijk.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var bos = {
	names: ["bos", "het bos", "een bos","bos"],
	adjectives: [],
	description: "Je ziet bomen.",
	additions: [],
	notTakeable: "Ben je achterlijk ofzo?",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var kasteeldeur = {
	names: ["deur", "de deur", "een deur"],
	adjectives: [],
	description: "Het is een klassieke eikenhouten door, met ijzer beslag. Er zit ook een pisvlek van waarschijnlijk Marco op.",
	additions: [],
	notTakeable: "Nah man de deur zit echt vast.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var hek = {
	names: ["hek", "het hek", "een hek"],
	adjectives: [],
	description: "Het is een hoog stalen hek met prikkeldraad erop, het doet je denken aan het hek tussen Israel en Gaza.",
	additions: [],
	notTakeable: "Nah man dat gaat nie.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var spoor = {
	names: ["spoor", "het spoor", "een spoor"],
	adjectives: [],
	description: "Het spoor is gemaakt van stalen balken. Hier en daar zie je een bloedvlek of een stuk orgaan liggen.",
	additions: [],
	notTakeable: "Yo zo sterk ben je niet.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var slingers = {
	names: ["slingers", "de slingers", "een slinger","ballon","ballonnen","slinger"],
	adjectives: [],
	description: "Er zit een prijskaartje van de action op, je herinnert je dat jullie dit gister last minute hebben gekocht.",
	additions: [],
	notTakeable: "Die zijn niet van jou.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var fiets = {
	names: ["fiets", "de fiets", "een fiets","fietsen"],
	adjectives: [],
	description: "De 12 fietsen staan op een rij.",
	additions: [],
	notTakeable:"Ze staan allemaal op slot.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var boerderij = {
	names: ["boerderij", "de boerderij", "een boerderij","kinderboerderij","stal"],
	adjectives: [],
	description: "Het is een complex van stallen en euhh ja eigenlijk is het maar 1 stal. Er zijn geen dieren want die hebben jullie gister vrij gelaten.",
	additions: [],
	notTakeable: "Jesse.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var ladder = {
	names: ["ladder", "de ladder", "een ladder"],
	adjectives: [],
	description: "De ladder is glibberig en koud.",
	additions: [],
	notTakeable: "Dat ding zit echt teringgoed vast.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var spandoek = {
	names: ["spandoek", "het spandoek", "een spandoek"],
	adjectives: [],
	description: "Het is een mooi zwart doek met daarop witte letters, je herinnert je dat dit ding echt veels te veel geld heeft gekocht.",
	additions: [],
	notTakeable: "Het hangt te hoog om te pakken.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true		
}

var ice = {
	names: ["ice", "de ice", "een ice"],
	adjectives: [],
	empty:false,
		activeDescription: function() {
		if(!this.empty)
		{
			return "Een halflege fles ice van Niels. De prik is er helemaal uit en er zit amper alcohol in.";
			
		}
		else
		{
			
			return "Een lege fles ice, dit kan direct de glasbak in."
		}
	},
	additions: [],
		undiscoverable:true,
	discovered: true,
	drinkable: true,
}

var flesopener = {
	names: ["flesopener", "de flesopener", "een flesopener","opener"],
	adjectives: ["gouden"],
	description: "Een gouden flesopener in de vorm van een ananas. Het is zo onwaarschijnlijk dat dit uit een winkel komt dat het naar verluid door Bas custom is laten maken.",
	additions: []
	
	
	
}

var zolderSleutel = {
	names: ["sleutel","de sleutel","een sleutel"],
	adjectives:[],
	description: "Een antieke sleutel. Hij ziet er goudkleurig uit, maar is waarschijnlijk van messing gemaakt.",
	additions: [],
	roomDescription:"In de hoek zie je een kleine sleutel liggen."
}

var jonko = {
	names: ["jonko", "de jonko", "een jonko"],
	adjectives: [],
	description: "Een gedoofde half opgebrande jonko. Als je hem aansteek kan je er misschien nog een teugje van nemen.",
	additions: [],
	burnable:true,
	lit:false
}
var eend = {
	names: ["eend", "de eend", "een eend","eenden"],
	adjectives: [],
	description: "Ja het is een eend I guess.",
	notTakeable: "Laat die dieren met rust yo.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true
}
var krat = {
	names: ["krat", "de krat", "een krat","bier"],
	adjectives: [],
	description: "De twee kratten zijn gevuld met lege flesjes Brouwers, als je goed kijkt ontbreekt er 1 flesje in het bovenste kratje.",
	notTakeable: "Je hebt niet de kracht om 2 kratten te tillen. Zwak.",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true
}
var kasteelItem = {
	names: ["kasteel", "het kasteel", "een kasteel"],
	adjectives: [],
	description: "Je weet wel hoe kasteel keukenhof eruit ziet.",
	notTakeable: "Jesse dat is scheikundig gezien unmeugelijk",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true
}

var toiletgebouw = {
	names: ["toiletgebouw", "het toiletgebouw", "een toiletgebouw","wc","toilet"],
	adjectives: [],
	description: "Het is zo'n ranzig klein gebouwtje met twee wc's",
	notTakeable: "Jesse dat is scheikundig gezien unmeugelijk",
	additions: [],
	burnable:false,
	lit:false,
	undiscoverable:true,
	discovered: true
}
var paasticket = {
	names: ["paasticket", "de paasticket", "een paasticket","ticket"],
	adjectives: [],
	description: "<img src='paasticket.png' width='300px'  height='auto' > </img>",
	additions: [],
	burnable:true,
	lit:false
}

var chips = {
	names: ["doritos", "de doritos", "een zak doritos","chips"],
	adjectives: ["zak"],
	description: "Een halflege zak sweet chili doritos. Helaas is het niet flamin' hot.",
	additions: [],
	roomDescription: "De grond is bezaait met halflege zakken chips.",
	spatialDescriptions: {in:"Er zitten doritos in...... Wat had je verwacht?"},
	discovered: true,
}

var verrekijker = {
	names: ["verrekijker", "de verrekijker", "een verrekijker"],
	adjectives: [],
	description: "Lars zijn vertrouwde verrekijker. Het vergroot met een factor 45, wat betekent dat je van zo'n 800 meter afstand door iemands ramen kan kijken.",
	additions: [],
	spatialDescriptions: {door:"De verrekijker in combinatie met je kater maakt je plots erg misselijk."},
	discovered: true,
}

var neukbril = {
	names: ["neukbril", "de neukbril", "een bril","bril"],
	adjectives: [],
	description: "Lars zijn stijlvolle neukbril. Hiermee heeft hij al vele meiden gebekt... XD natuurlijk niet",
	additions: [],
	undiscoverable:true,
}

var tapijt = {
	names: ["tapijt", "het tapijt", "een tapijt"],
	adjectives: ["groot"],
	description: "Een prachtig karmijnrood tapijt dat erg duur lijkt. Tenminste dat was het want nu zit het onder de biervlekken. Er zit een aparte plooi in.",
	additions: [],
	spatialDescriptions: {onder:"Onder het tapijt zie je een groot luik, gelukkig zit er geen slot op."},
	undiscoverable:true,
	notTakeable: "Nah man het is echt veels te zwaar",
	discovered: true
}

var drank = {
	names: ["jenever", "de jenever", "jenever","fles","drank"],
	description: "Een halflege fles van de allergoedkoopste jenever. De geur alleen al doet je bijna kotsen.",
	additions: [],
	activeDescription: function() {return "Op de grond liggen lege flessen drank, Matthijs is blijkbaar niet gaan glasbakken gister."},
	undiscoverable:false,
	discovered: true,
	drinkable: false,
}


var fakkel = {
	names: ["fakkel", "de fakkel", "een fakkel"],
	adjectives:[],
	description: "",
	additions:[],
	burnable:true,
	lit:false,
	illuminating:false,
	roomDescription: "De muur is ook nog versierd met oude fakkels, bijna als in Minecraft.",
	activeDescription: function() {
		if(!this.lit)
		{
			return "Een oude, gedoofde fakkel. De top is gedrenkt in teer dus misschien valt die nog aan te steken. Het doet je denken aan een hele grote jonko.";
			
		}
		else
		{
			
			return "Een oude fakkel. Hij brandt zacht en geeft een minimale hoeveelheid licht."
		}
	},
		
		
}
 
	
var fietssleutel = {	
	names: ["fietssleutel", "de fietssleutel", "een fietssleutel","sleutel"],
	adjectives: [],
	description: "Het is je fietssleutel, die onder de kots zit. Fucking ranzig. ",
	additions: [],
	burnable:true,
	lit:false,
	discovered: true,
	
}
