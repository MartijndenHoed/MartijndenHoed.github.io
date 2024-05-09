//window.location.reload(true);
player.room = world.rooms[0];
//textParser.displayText(" <b> Welkom bij de interactieve paasdiner text-adventure. Type commandos om acties uit te voeren, type 'help' voor een lijst van alle commandos. <br> Versie 1.12: UI update </b>",0);
textParser.displayText("  WELKOM BIJ DE INTERACTIEVE PAASDINER TEXT-ADVENTURE. TYPE COMMANDOS OM ACTIES UIT TE VOEREN, TYPE 'HELP' VOOR EEN LIJST VAN ALLE COMMANDOS. <br> VERSIE 1.12: UI UPDATE ",0);
textParser.displayText("Je wordt verdwaast wakker uit een diepe slaap. Aan de geur van kots merk je dat je waarschijnlijk iets te brokko bent gegaan en randje coma zat...",1)
player.room.load();

var inputField = document.getElementById("input");
inputField.focus();

console.log(player);

