window.ClubHouseGame.registerRestart(() => {});

// Används när en spelsession är slut (dvs när man får Game Over).
// Observera att man själv får se till att inte spelet fortsätter i bakgrunden när Bussklubbens meny dyker upp.
window.ClubHouseGame.gameDone();

// Används för att meddela att spelet är laddat och klart att startas.
// Options är ett objekt som för närvarande bara innehåller en parameter hideInGame som man kan sätta till true om man vill sköta visningen av poäng i spelet själv.
// window.ClubHouseGame.gameLoaded((options) => {
//   hideInGame: false;
// });
window.ClubHouseGame.gameRunning();

window.ClubHouseGame.getScore();

// Används för att registrera en funktion som körs när spelet startas eller startas om.
window.ClubHouseGame.registerRestart(() => {});

// Används för att skicka in poäng till Bussklubben. Poängen visas av Bussklubben-apiet.
// window.ClubHouseGame.setScore(score);
