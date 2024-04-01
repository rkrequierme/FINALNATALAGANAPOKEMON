document.addEventListener("DOMContentLoaded", function () {
    // Function to play background music
    function playBackgroundMusic() {
        var audio = document.getElementById("bg-music");
        audio.play();
    }
    playBackgroundMusic();


  const charmander = {
      name: "Charmander",
      hp: 100,
      type: "Fire",
      attacks: {
          "Scratch": { power: 10, type: "Normal" },
          "Ember": { power: 15, type: "Fire" },
          "Fire Spin": { power: 20, type: "Fire" },
          "Dragon Breath": { power: 25, type: "Fire" }
      }
  };

  const pikachu = {
      name: "Pikachu",
      hp: 100,
      type: "Electric",
      attacks: {
          "Thunder Shock": { power: 15, type: "Electric" },
          "Quick Attack": { power: 17, type: "Normal" },
          "Thunderbolt": { power: 21, type: "Electric" },
          "Thunder": { power: 25, type: "Electric" }
      }
  };

  const charmanderHP = document.getElementById("charmander-hp");
  const pikachuHP = document.getElementById("pikachu-hp");
  const charmanderHPText = document.getElementById("charmander-hp-text");
  const pikachuHPText = document.getElementById("pikachu-hp-text");

  const charmanderAttacks = document.querySelectorAll("#charmander .attack-btn");
  const pikachuAttacks = document.querySelectorAll("#pikachu .attack-btn");

  // Game Over 
  const gameOverScreen = document.getElementById("game-over-screen");
  const winnerMessage = document.getElementById("winner-message");
  const playAgainBtn = document.getElementById("play-again-btn");

  charmanderHP.style.width = charmander.hp + "%";
  pikachuHP.style.width = pikachu.hp + "%";
  charmanderHPText.innerText = "HP: " + charmander.hp;
  pikachuHPText.innerText = "HP: " + pikachu.hp;

  charmanderAttacks.forEach(function (attackBtn) {
      attackBtn.addEventListener("click", function () {
          attack(charmander, pikachu, charmander.attacks[attackBtn.innerText], pikachuHP, pikachuHPText);
      });
  });

  pikachuAttacks.forEach(function (attackBtn) {
      attackBtn.addEventListener("click", function () {
          attack(pikachu, charmander, pikachu.attacks[attackBtn.innerText], charmanderHP, charmanderHPText);
      });
  });

  function attack(attacker, defender, attackDetails, hpBar, hpText) {
    // Calculate the chance of the attack hitting 
    const hitChance = Math.random(); 
    const attackHit = hitChance <= 0.8; // Adjust the chance as needed

    if (attackHit) {
        let damage = attackDetails.power;
        // Check for type effectiveness
        if (attackDetails.type === "Fire" && defender.type === "Electric") {
            damage *= 1.5; // Fire is super effective against Electric
        } else if (attackDetails.type === "Electric" && defender.type === "Fire") {
            damage *= 0.5; // Electric is not very effective against Fire
        }
        defender.hp -= damage;
        if (defender.hp < 0) {
            defender.hp = 0;
        }
        hpBar.style.width = defender.hp + "%";
        hpText.innerText = "HP: " + defender.hp;

        if (defender.hp <= 0) {
            setTimeout(function () {
                gameOverScreen.style.display = "block";
                winnerMessage.innerText = attacker.name + " wins!";
            }, 500);
        }

        // Shake effect 
        const defenderElement = document.getElementById(defender.name.toLowerCase());
        const pokemonImage = defenderElement.querySelector("img");
        pokemonImage.classList.add('shake');

        // Apply red tint to the Pokémon temporarily
        pokemonImage.style.filter = "hue-rotate(0deg) saturate(200%) brightness(70%)"; // Adjust filter as needed
        setTimeout(function() {
            pokemonImage.classList.remove('shake');
            pokemonImage.style.filter = "none"; // Reset filter after a short delay
        }, 500); // Adjust the time as needed for the animation duration
    } else {
        // Attack missed, display a message
        setTimeout(function () {
            alert(attacker.name + "'s attack missed!");
        }, 500);
    }
}

  function resetGame() {
      charmander.hp = 100;
      pikachu.hp = 100;
      charmanderHP.style.width = charmander.hp + "%";
      pikachuHP.style.width = pikachu.hp + "%";
      charmanderHPText.innerText = "HP: " + charmander.hp;
      pikachuHPText.innerText = "HP: " + pikachu.hp;
      gameOverScreen.style.display = "none";
  }

  // play again button to reset the game
  playAgainBtn.addEventListener("click", function () {
      resetGame();
  });

});
function playBackgroundMusic() {
  var audio = document.getElementById("bg-music");
  audio.play();
  
}

