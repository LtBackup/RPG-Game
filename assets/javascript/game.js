function Character() {
    this.hp;
    this.name = "";
    this.atk;
    this.weapons = [];
    this.weaponIndex;
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
megaMan.weaponIndex = 0;
megaMan.atkName = "Mega Buster";
megaMan.weaknessIndex = 1;
megaMan.description = "Mega Man is Dr. Light's lab assistant, redesigned to combat the evil plans of Dr. Wily.\n\nHis attack is the Mega Buster: an arm cannon that can cover an area with a burst of projectiles";

var protoMan = new Character();
protoMan.hp = 110;
protoMan.name = "Proto Man";
protoMan.atk = 25;
protoMan.counter = 40;
protoMan.weapons = [false, true, false, false];
protoMan.weaponIndex = 1;
protoMan.atkName = "Proto Shield Attack";
protoMan.weaknessIndex = 2;
protoMan.description = "Proto Man is Dr. Light's first creation, and the predecessor to Mega Man.\n\nProto Man carries the Proto Shield. He can block weaker projectiles and shoot from behind cover.";

var gutsMan = new Character();
gutsMan.hp = 120;
gutsMan.name = "Guts Man";
gutsMan.atk = 20;
gutsMan.counter = 40;
gutsMan.weapons = [false, false, true, false];
gutsMan.weaponIndex = 2;
gutsMan.atkName = "Guts Punch";
gutsMan.weaknessIndex = 3;
gutsMan.description = "Guts Man is a large construction robot reprogrammed by Dr. Wily to use his strength for evil deeds.\n\nGuts Man uses a guts punch attack that penetrates most defenses.";

var quickMan = new Character();
quickMan.hp = 90;
quickMan.name = "Quick Man";
quickMan.atk = 35;
quickMan.counter = 40;
quickMan.weapons = [false, false, false, true];
quickMan.weaponIndex = 3;
quickMan.atkName = "Quick Boomerang";
quickMan.weaknessIndex = 0;
quickMan.description = "Quick Man is a battle robot designed and built by Dr. Wily.\n\nQuick Man throws quick boomerangs, catching slower targets by surprise.";

var characters = [megaMan, protoMan, gutsMan, quickMan];
var weaponReference = ["Mega Buster", "Proto Shield Attack", "Guts Punch", "Quick Boomerang"];
var selectedHeroButton;
var selectedOpponentButton;
var instruction = $("#instruction-text");
var battleText = $("#battleText");
var megaCover = $("#megaCover");
var protoCover = $("#protoCover");
var gutsCover = $("#gutsCover");
var quickCover = $("#quickCover");
var attackButton = $("#attackButton");
var characterSelect = $(".character-select");


$(".character-select").on("click", setCharacter);
$("#resetButton").on("click", reset);

function setCharacter() {
    $(".character-select").off("click").on("click", setOpponent);
    selectedCharButton = $(this);
    selectedCharButton.addClass("invisible");
    hero = jQuery.extend(true, {}, characters[selectedCharButton.val()]);
    instruction.text("Select an opponent");
}

function setOpponent() {
    $(".character-select").off("click");
    selectedOpponentButton = $(this);
    selectedOpponentButton.addClass("disabled");
    opponent = jQuery.extend(true, {}, characters[$(this).val()]);
    instruction.text("Attack when ready!");
    attackButton.removeClass("invisible");
    $("#attackButton").on("click", attack);
}

function attack() {
    console.log("Hero", hero.name);
    console.log("Opponent", opponent.name);
    console.log(opponent.weaknessIndex);
    if (hero.weapons[opponent.weaknessIndex]) {
        opponent.hp -= hero.atk * 2;
        console.log("Hard Hit, opponent HP", opponent.hp);
        battleText.text("You hit " + opponent.name + " hard with " + weaponReference[opponent.weaknessIndex] + " for " + hero.atk * 2 + " damage.");
    }
    else {
        opponent.hp -= hero.atk;
        console.log("Hit", opponent.hp)
        battleText.text("You hit " + opponent.name + " with " + hero.atkName + " for " + hero.atk + " damage.");
    }
    if (opponent.hp > 0) {
        counterAttack();
        console.log("you got hit back. your HP:", hero.hp);
        if (hero.hp < 0) {
            $("#heroArena").addClass("disabled");
            attackButton.addClass("invisible");
            console.log("you have been defeated!");
            //play death sound
        }
    }
    else {
        attackButton.addClass("invisible");
        selectedOpponentButton.addClass("invisible");
        instruction.text("Victory! You got\n" + opponent.atkName + ".\nSelect another opponent.");
        hero.weapons[opponent.weaponIndex] = true;
        characterSelect.on("click", setOpponent);
    }

}

function counterAttack() {
    if (opponent.weapons[hero.weaknessIndex]) {
        hero.hp -= opponent.counter * 2;
        console.log("counterattack", opponent.counter);
        battleText.text(opponent.name + " hits you hard with " + opponent.atkName + " for " + opponent.counter * 2 + " damage.");

    }
    else {
        hero.hp -= opponent.counter;
        console.log("counterattack", opponent.counter);
        console.log(battleText);
        battleText.text(opponent.name + " hits you with " + opponent.atkName + " for " + opponent.counter + " damage.");
    }
}

function stopGame() {
    //might not need this
}

function reset() {
    hero = new Character();
    opponent = new Character();
    //reset arenas
    //reset listeners
    $("#battleText").empty();
    //reset instructions
    //reset button disables
}
