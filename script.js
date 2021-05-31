/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 50; // x-positie van speler
var spelerY = 680; // y-positie van speler

var kogelX = 60;    // x-positie van kogel
var kogelY = 680;    // y-positie van kogel


var vijandX = 250;   // x-positie van vijand
var vijandY = 680;   // y-positie van vijand

var score = 100; // aantal behaalde punten

var springStatus = false;
var valStatus = false;
var sprongHoogte = 680;
var sprongSnelheid = 1;
var grondHoogte = 680;




/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("white");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill("red");
    ellipse(vijandX, vijandY, 50, 50);
    
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
   fill('black');
   ellipse(kogelX, kogelY, 10, 10);

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
    fill(0, 255, 0);
    ellipse(spelerX, spelerY, 50, 50);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {

     if (spelerX > vijandX) {
        vijandX += 2.5;
    } else if ( spelerX < vijandX) {
        vijandX -= 2.5;
    } 
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

var beweegSpeler = function()  {
     if (keyIsDown(68) || keyIsDown(39)) {
        spelerX+= 5;
     } 
     if (keyIsDown(65) && spelerX > 50 || keyIsDown(37) && spelerX > 50) {
        spelerX-= 5;
     } 
     if (springStatus === false) {
         sprongHoogte = spelerY - 200;
     }
     if (keyIsDown(32) && springStatus === false && valStatus === false || keyIsDown(38) && springStatus === false && valStatus === false) {
         springStatus = true
     }
     if (springStatus === true) {
         spelerY = spelerY - Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY <= sprongHoogte) {
         valStatus = true;
         springStatus = false;
     }
     if (valStatus === true && spelerY < grondHoogte) {
         spelerY = spelerY + Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY >= grondHoogte) {
         valStatus = false;
         sprongSnelheid = 3;
         spelerY = grondHoogte;
     }

};


var tekenScore = function() {
    var tekenScore = round(score);
    fill(255,0,0) //maakt de tekst rood
    textSize(50) //bepaalt de grootte van de tekst
    text("Score:" + tekenScore, 30, 30, 25, 50); //zet de score op het beeld
    score = score - (1/50); //iedere seconde wordt er 1 score weggehaald
};


/** 
  Zoekt uit of de vijand is geraakt
  @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {  
  if (kogelX >= vijandX - 25 && kogelX <= vijandX + 25 && kogelY >= vijandY - 25 && kogelY <= vijandY + 25 && mouseIsPressed) {
     score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
     vijandX = 0;
     vijandY = 0;
     
} 
    
return false;

};

var beweegKogel = function() {

if (mouseIsPressed && mouseX > spelerX) {
    kogelX += 30;
    } else if (mouseIsPressed && mouseX < spelerX) {
        kogelX -= 30;
    } 
    if (mouseIsPressed && mouseY > spelerY) {
        kogelY += 5;
    } else if (mouseIsPressed && mouseY < spelerY) {
        kogelY -= 5;
    }
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
        
        if(vijandX === spelerX + 25 && vijandY === spelerY){
            score -= 500;
        } else if(vijandX === spelerX - 25 && vijandY === spelerY){
            score -= 500;
        } else {
        return false;
    }

};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
  if(score <= 0) {
      return true;
  }  
  else {
      return false; 
}
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      setup();  
 
      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      tekenScore();
      checkVijandGeraakt();
      checkSpelerGeraakt();
 
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
        fill(207, 53, 23);
        rect(100,100,1100,550); // maakt een rechthoek
        fill(255,255,255);
        textSize(100)
        text('Game Over',400,150,600,450); // Zet de tekst game over op de rechthoek
      }
      break;
  }
}
