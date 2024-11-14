

Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
        }
    },
    // -----------------------------------------------watchers
    watch: {
        playerHealth (value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
                //t3adol
            } else if(value <= 0){
                this.winner = 'monster'
                //player lost
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
                //t3
            }else if (value <= 0) {
                this.winner = 'player'
                // m lost
            }
        },
    },
    // ----------------------------------------------- computed
    computed:{
        monsterBarHealth(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarHealth(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecial(){
            return  this.currentRound % 3 !=0
        },
    },
    // ------------------------------------------------ metods
    methods:{
        attackMonster(){
            this.currentRound++
            const attackValue = Math.floor(Math.random() *(12 -5))+5;
            this.monsterHealth = this.playerHealth - attackValue;
            console.log(this.monsterHealth);  
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = Math.floor(Math.random() *(12 -8))+8;
            this.playerHealth = this.playerHealth - attackValue;
            console.log(this.playerHealth);
            
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = Math.floor(Math.random() *(25 -10))+10;
            this.monsterHealth = this.monsterHealth -attackValue
            this.attackPlayer()
        },
        playerChangeHeal(){
            this.currentRound++
            const healValue = Math.floor(Math.random() *(20 -8))+8;
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else{
                this.playerHealth = this.playerHealth + healValue
            }
            this.attackPlayer() 
        },
        surrender (){
            this.winner = 'monster'
        },
        startGame() {
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.winner = null,
            this.currentRound = 0

        }
    },
}).mount('#game')