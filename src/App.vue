<template>
  <div id="app">
    <div class="section scores">
      <div class="score">
        <img class="hero" src="../public/images/male_hero.png"/>
        <h1>Player</h1>
        <div class="life-bar">
          <div
            class="life"
            :class="[{ medium: playerLife < 50 }, { low: playerLife <= 25 }]"
            :style="{ width: playerLife + '%' }"
          ></div>
        </div>
        <div>{{ playerLife }}%</div>
      </div>
      <div class="score">
        <img src="../public/images/BigGoblin_monster.png" />
        <h1>Monster</h1>
        <div class="life-bar">
          <div
            class="life"
            :class="[{ medium: monsterLife < 50 }, { low: monsterLife <= 25 }]"
            :style="{ width: monsterLife + '%' }"
          ></div>
        </div>
        <div>{{ monsterLife }}%</div>
      </div>
    </div>
    <div class="section result" v-if="hasResult">
      <div class="win" v-if="monsterLife == 0">
        <p>Congratulations, you win!</p>
      </div>

      <div class="lose" v-if="playerLife == 0">
        <p>Defeat, you lost!</p>
      </div>
    </div>
    <div class="section btns">
      <template v-if="running">
        <button class="btn attack" @click="attack(false)">Attack</button>
        <button class="btn sp-attack" @click="attack(true)">
          Special Attack
        </button>
        <button @click="healHurt" class="btn heal">Heal</button>
        <button @click="giveUp" class="btn give-up">Give Up</button>
      </template>

      <button @click="startGame" v-else class="btn new-game">Start game</button>
    </div>
    <div v-if="logs.length" class="section logs">
      <ul>
        <li v-for="log in logs" :class="log.cls" class="log" :key="log">{{ log.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerLife: 100,
      monsterLife: 100,
      running: true,
      logs: [],
    };
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    },
  },
  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    giveUp() {
      this.running = false;
    },
    attack(sp) {
      this.hurt("monsterLife", 5, 10, sp, "Jogador", "Monstro", "player");
      if (this.monsterLife > 0) {
        this.hurt("playerLife", 7, 12, false, "Monstro", "Jogador", "monster");
      }
    },
    hurt(atr, min, max, sp, source, target, cls) {
      const plus = sp ? 7 : 0;
      const hurt = this.getRadom(min + plus, max + plus);
      this[atr] = Math.max(this[atr] - hurt, 0);
      this.regLog(`${source} atingiu ${target} com ${hurt}`, cls);
    },
    getRadom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    healHurt() {
      this.heal(10, 15);
      this.hurt("playerLife", 7, 12, false, "Monstro", "Jogador", "monster");
    },
    heal(min, max) {
      const heal = this.getRadom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.regLog(`Jogador ganhou cura de ${heal}`, "healou");
    },
    regLog(text, cls) {
      this.logs.unshift({ text, cls });
    },
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
}
img {
  width: 60px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.hero {
  transform: rotateY(180deg);
}

#app {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.section {
  width: 100%;
  max-width: 800px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(78, 78, 78, 0.5);
  background-color: rgb(245, 240, 234);
}
.scores {
  display: flex;
}
.score {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.score h1 {
  font-weight: 300;
}

.life-bar {
  width: 85%;
  height: 15px;
  border: 1px solid #aaa;
  margin-bottom: 5px;
  overflow: hidden;
}

.life-bar .life {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: rgb(0, 255, 76);
  transition: all 0.3s linear;
}

.life-bar .life.medium {
  background-color: rgba(255, 196, 0, 0.795);
}

.life-bar .life.low {
  background-color: rgba(255, 0, 0, 0.753);
}

.result {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.result .win {
  color: rgb(17, 167, 109);
}
.result .lose {
  color: rgb(233, 44, 60);
}

/*----------btns-----------*/

.btns {
  display: flex;
  justify-content: center;
}

.btn {
  cursor: pointer;
  width: 150px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.1rem;
  color: rgb(240, 236, 231);
}
.attack {
  background-color: rgb(240, 55, 55);
  color: white;
}

.sp-attack {
  background-color: rgb(240, 162, 18);
}
.heal {
  background-color: rgb(37, 216, 147);
}

.give-up {
  color: #aaa;
}

.new-game {
  background-color: rgb(13, 122, 223);
}

/*----------log----------*/
.logs ul li {
  margin: 10px;
  padding: 15px;
  border-radius: 6px;

  font-weight: 500;

  display: flex;
  justify-content: center;
}
.healou {
  background-color: rgb(135, 236, 174);
}
.player {
  background-color: rgb(165, 202, 223);
}
.monster {
  background-color: rgb(248, 153, 140);
}
</style>
