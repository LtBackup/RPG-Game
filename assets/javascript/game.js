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
megaMan.description = "Mega Man is Dr. Light's lab assistant, redesigned to combat the evil plans of Dr. Wily.\n\nHis attack is the Mega Buster: an arm cannon that can cover an area with a burst of projectiles";

var protoMan = new Character();
protoMan.hp = 110;
protoMan.name = "Proto Man";
protoMan.atk = 25;
protoMan.counter = 40;
protoMan.weapons = [false, true, false, false];
protoMan.atkName = "Proto Shield Attack";
protoMan.weaknessIndex = 2;
protoMan.description = "Proto Man is Dr. Light's first creation, and the predecessor to Mega Man.\n\nProto Man carries the Proto Shield. He can block weaker projectiles and shoot from behind cover.";

var gutsMan = new Character();
gutsMan.hp = 140;
gutsMan.name = "Guts Man";
gutsMan.atk = 20;
gutsMan.counter = 40;
gutsMan.weapons = [false, false, true, false];
gutsMan.atkName = "Guts Punch";
gutsMan.weaknessIndex = 3;
gutsMan.description = "Guts Man is a large construction robot reprogrammed by Dr. Wily to use his strength for evil deeds.\n\nGuts Man uses a guts punch attack that penetrates most defenses.";

var quickMan = new Character();
quickMan.hp = 80;
quickMan.name = "Quick Man";
quickMan.atk = 35;
quickMan.counter = 40;
quickMan.weapons = [false, false, false, true];
quickMan.atkName = "Quick Boomerang";
quickMan.weaknessIndex = 0;
quickMan.description = "Quick Man is a robot designed and built by Dr. Wily.\n\nQuick Man throws quick boomerangs, catching slower targets by surprise.";

var characters = [megaMan, protoMan, gutsMan, quickMan];
var selectedHeroButton;
var selectedOpponentButton;
var instruction = $("#instruction-text");
var status = $("#status");

$(".character-select").on("click", setCharacter);
$("#resetButton").on("click", reset);

function setCharacter() {
    $(".character-select").off("click").on("click", setOpponent);
    selectedCharButton = $(this);
    selectedCharButton.addClass("disabled");
    hero = jQuery.extend(true, {}, characters[selectedCharButton.val()]);
    instruction.text("Select an opponent");
}

function setOpponent() {
    $(".characterButton").off("click");
    selectedOpponentButton = $(this);
    selectedOpponentButton.addClass("disabled");
    opponent = jQuery.extend(true, {}, characters[$(this).val()]);
    instruction.text("Attack when ready!");
    //make attack button visible
    $("#attackButton").on("click", attack);
}

function attack() {
    console.log("Hero", hero.name);
    console.log("Opponent", opponent.name);
    console.log(opponent.weaknessIndex);
    if (hero.weapons[opponent.weaknessIndex]) {
        opponent.hp -= hero.atk * 2;
        console.log("Hard Hit, opponent HP", opponent.hp);
        //super effective message
    }
    else {
        opponent.hp -= hero.atk;
        console.log("Hit", opponent.hp)
        //standard attack message
    }
    if (opponent.hp > 0) {
        counterAttack();
        console.log("you got hit back. your HP:", hero.hp);
    }
    else {

        // disable($("button").val(""));
    }
    if(hero.hp < 0){
        $("#heroArena").addClass("disabled");
        console.log("you have been defeated!")
        //play death sound
    }
}

function counterAttack() {
    hero.hp -= opponent.counter;
    console.log("counterattack", opponent.counter);
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
