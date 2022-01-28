let game={
    firstCard:null, //Primeira carta
    secondCard:null, //Segunda carta
    cards:null, //carta
    lockMode:false, //Modo Tranca
     techs:[  //array das techs
       'bootstrap',
       'css',
       'electron',
       'firebase',
       'html',
       'javascript',
       'jquery',
       'mongo',
       'node',
       'react'
    ],
    //Function para ser carta está ou não esta´virada
    setCard:function(id){
         let card=this.cards.filter(card=>card.id===id)[0]
         if(card.flipped || this.lockMode){
             return false
         }
         if(!this.firstCard){
             this.firstCard=card
             this.firstCard.flipped=true
             return true
         }else{
             this.secondCard=card
             this.secondCard.flipped=true
             this.lockMode=true
             return true
         }
    },
    //Metdo reponsavel por checar se cartas são iquais
    checkMath:function(){
        if(!this.firstCard||!this.secondCard){
          return false
        }
        return this.firstCard.icon===this.secondCard.icon
    },
    //Está function é para limpar as cartas
    clearCard:function(){
        this.firstCard=null
        this.secondCard=null
        this.lockMode=false
    },
    //Metedo para volar ao normal as cartas
    unFlipedCard:function(){
       this.firstCard.flipped=false
       this.secondCard.flipped=false
       this.clearCard()
    },
    //Metedo para fazer o fim do jogo
    checkGameOver:function(){
     return this.cards.filter(card=>!card.flipped).length==0
    },
    //Metodo responsavel pela criação de carta
    createCardFromTech:function(){
        this.cards=[]
        this.techs.forEach((tech)=>{
            this.cards.push(this.createPairFromTech(tech))
        })
        this.cards=this.cards.flatMap(pair=>pair)
            this.shuffleCard()
            return this.cards
       
    },
    //Para criar os pares
    createPairFromTech:function(tech){
        return[{
            id:this.createIdinTech(tech),
            icon:tech,
            flipped:false
        },{
          id:this.createIdinTech(tech),
          icon:tech,
          flipped:false, 
        }]
    },
    //para criar id para cartas
    createIdinTech(tech){
        return tech+ parseInt(Math.random()*1000)
    },
    //Para embaralhar as cartas
    shuffleCard(cards){
        let currentIndex=this.cards.length
        let randomIndex=0
        while(currentIndex!==0){
            randomIndex=Math.floor(Math.random()*currentIndex)
            currentIndex--
            [this.cards[randomIndex],this.cards[currentIndex]]=[this.cards[currentIndex],this.cards[randomIndex]]
        }
    }
}