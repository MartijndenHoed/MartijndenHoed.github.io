//window.location.reload(true);
player.room = world.rooms[0];
textParser.displayText("Welkom bij de interactieve paasdiner text-adventure. Type commandos om acties uit te voeren, type help voor een lijst van alle commandos. <br> Versie 1.3 NPC's kunnen praten",0);
textParser.displayText("Je wordt verdwaast wakker uit een diepe slaap. Aan de geur van kots merk je dat je waarschijnlijk iets te brokko bent gegaan en lichtelijk coma ging.",1)
player.room.load();

console.log(player);

