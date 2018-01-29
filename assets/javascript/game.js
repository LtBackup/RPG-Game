function Character() {
    this.hp;
    this.name = "";
    this.atk;
    this.weapons = [];
    this.atkName = "";
    this.weaknessIndex;
    this.description = "";
}

var hero = new Character();
var opponent = new Character();

var megaMan = new Character();
megaMan.hp = 100;
megaMan.name = "Mega Man";
megaMan.atk = 30;
megaMan.counter = 40;
megaMan.weapons = [true, false, false, false];
megaMan.atkName = "Mega Buster";
megaMan.weaknessIndex = 1;
megaMan.pic = "assets/images/megaman.png";
megaMan.altPic = "Mega Man";
megaMan.description = "Mega Man is Dr. Light's lab assistant, redesigned to combat the evil plans of Dr. Wily.\n\nHis attack is the Mega Buster: an arm cannon that can cover an area with a burst of projectiles";

var protoMan = new Character();
protoMan.hp = 110;
protoMan.name = "Proto Man";
protoMan.atk = 25;
protoMan.counter = 40;
protoMan.weapons = [false, true, false, false];
protoMan.atkName = "Proto Shield Attack";
protoMan.weaknessIndex = 2;
protoMan.pic = "assets/images/protoman.png";
protoMan.altPic = "Proto Man";
protoMan.description = "Proto Man is Dr. Light's first creation, and the predecessor to Mega Man.\n\nProto Man carries the Proto Shield. He can block weaker projectiles and shoot from behind cover.";

var gutsMan = new Character();
gutsMan.hp = 140;
gutsMan.name = "Guts Man";
gutsMan.atk = 20;
gutsMan.counter = 40;
gutsMan.weapons = [false, false, true, false];
gutsMan.atkName = "Guts Punch";
gutsMan.weaknessIndex = 3;
gutsMan.pic = "assets/images/gutsman.png";
gutsMan.altPic = "Guts Man";
gutsMan.description = "Guts Man is a large construction robot reprogrammed by Dr. Wily to use his strength for evil deeds.\n\nGuts Man uses a guts punch attack that penetrates most defenses.";

var quickMan = new Character();
quickMan.hp = 80;
quickMan.name = "Quick Man";
quickMan.atk = 35;
quickMan.counter = 40;
quickMan.weapons = [false, false, false, true];
quickMan.atkName = "Quick Boomerang";
quickMan.weakness = 0;
quickMan.pic = "assets/images/quickman.png";
quickMan.altPic = "Quick Man";
quickMan.description = "Quick Man is a robot designed and built by Dr. Wily.\n\nQuick Man throws quick boomerangs, catching slower targets by surprise.";

var characters = [megaMan, protoMan, gutsMan, quickMan];
var selectedChar;
/*function addCharacterButtons() {
    for (var i = 0; i < characters.length; i++) {
        var button = $("<div>");
        button.addClass("characterButton");
        var charName = $("<div>");
        charName.addClass("charName");
        charName.text(characters[i].name);
        var charHp = $("<div>");
        charHp.addClass("charHp");
        charHp.text(characters[i].hp);
        //get picture html in
        charPic = $("<div>");
        charPic.addClass("charPic");
        charPic.html(character[i].pic);
    }

}*/

$(".character-select").on("click", setCharacter);
$("#resetButton").on("click", reset);

function setCharacter() {
    hero = jQuery.extend(true, {}, characters[$(this).val()]);
    console.log(hero);
    //disable the button you just clicked
    //change instruction text
    $(".character-select").off("click", setCharacter).on("click", setOpponent);
    //$(".character-select").on("click", setOpponent);
}

function setOpponent() {
    opponent = jQuery.extend(true, {}, characters[$(this).val()]);
    console.log(opponent);
    //disable the button you just clicked
    //change instruction text
    $(".characterButton").off("click", setOpponent);
    //make attack button visible
    $("#attackButton").on("click", attack);
}

function attack() {
    console.log("Hero", hero);
    console.log("Opponent", opponent);
    if (hero.weapons[opponent.weaknessIndex]) {
        opponent.hp - hero.atk * 2;
        //super effective message
    }
    else {
        opponent.hp - hero.atk;
        //standard attack message
    }
    if (opponent.hp > 0) {
        counterAttack();
    }
    else {
        disable($("button").val("))
    }
}

function reset() {
    hero = new Character();
    opponent = new Character();
    //reset arenas
    //reset listeners
    //clear battle text
    //reset instructions
    //reset button disables
}
