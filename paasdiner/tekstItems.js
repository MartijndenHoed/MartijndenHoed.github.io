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


var moker = {
	names: ["moker", "de moker", "een moker"],
	adjectives: ["grote"],
	description: "Een paupergrote moker die echt pauperhard lijkt",
	additions: []
	
	
	
}

var bierfles = {
	names: ["bierflesje", "het bierflesje", "een bierflesje","flesje","bier"],
	adjectives: [],
	description: "Een half opgedranken bierflesje met een rietje van Gijs erin",
	additions: []
	
	
	
}

var jonko = {
	names: ["jonko", "de jonko", "een jonko"],
	adjectives: [],
	description: "Een gedoofde half opgebrande jonko. Als je hem aansteek kan je er misschien nog een teugje van nemen.",
	additions: [],
	burnable:true,
	lit:false
	
	
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

var tapijt = {
	names: ["tapijt", "het tapijt", "een tapijt"],
	adjectives: ["groot"],
	description: "Een prachtig karmijnrood tapijt dat erg duur lijkt. Tenminste dat was het want nu zit het onder de biervlekken",
	additions: [],
	spatialDescriptions: {onder:"Onder het tapijt zie je een groot luik, gelukkig zit er geen slot op."},
	undiscoverable:true,
	discovered: true
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
			
			return "Een oude fakkel. Hij brandt zacht en geeft een miniale hoeveelheid licht."
		}
	},
		
		
}

	
	

