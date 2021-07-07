new Vue({
    el: "#app",
    data:{
        playerLife: 100,
        monsterLife: 100,
        running:true,
        logs: []
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0 
        }
    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        giveUp(){
            this.running = false
        },
        attack(sp){
            this.hurt("monsterLife",5,10,sp,"Jogador","Monstro","player")
            if(this.monsterLife >0){

                this.hurt("playerLife",7,12,false,"Monstro","Jogador","monster")
            }
            
        },
        hurt(atr, min, max, sp, source, target, cls){
            const plus = sp ? 7 : 0
            const hurt = this.getRadom( min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.regLog(`${source} atingiu ${target} com ${hurt}`, cls)
        },
        getRadom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)

        },
        healHurt(){
            this.heal(10,15)
            this.hurt("playerLife", 7, 12, false, "Monstro", "Jogador", "monster")
        },
        heal(min, max){
            const heal = this.getRadom(min, max)
            this.playerLife = Math.min(this.playerLife + heal,100)
            this.regLog(`Jogador ganhou cura de ${heal}`, "healou")
        },
        regLog(text,cls){
            this.logs.unshift({text, cls})
        }
         
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }

})