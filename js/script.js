//criando as Classes
const CARD='card'
const FRONT='card_front'
const BACK='card_back'
const ICON='icon'

//Function para inicilaizar o jogo
starGame()
//Function para da inicio ao jogo
function starGame(){
initalizaCards(game.createCardFromTech())
}
//Function criar as cartas na tela
function initalizaCards(cards){
    let gameBoard=document.getElementById('gameBoard')
    gameBoard.innerHTML=''
    game.cards.forEach((cards=>{
        let cardElement=document.createElement('div')
        cardElement.id=cards.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon=cards.icon
        createCardContent(cards,cardElement)
        cardElement.addEventListener('click',flipCard)
        gameBoard.appendChild(cardElement)
    }))
}
//Function para colocar os conteúdos da cartas
function createCardContent(card,cardElement){
    createCardFace(FRONT,card,cardElement)
    createCardFace(BACK,card,cardElement)
}
//Function para adcionar frente e verso
function createCardFace(face,card,Element){
    let cardElementFace=document.createElement('div')
    cardElementFace.classList.add(face)
    if(face==FRONT){
        let iconElement=document.createElement('img')
        iconElement.src=`./images/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML='&lt/&gt'
    }
    Element.appendChild(cardElementFace)
    
}
//Function para poder virar a carta
function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add('flip')
        if(game.secondCard){
            if(game.checkMath()){
            game.clearCard()
            if(game.checkGameOver()){
                let gameOver=document.getElementById('gameOver')
                gameOver.style.display='flex'
            }
          }else{
              setTimeout(()=>{
                  let firstCardView=document.getElementById(game.firstCard.id)
                  let secondCardView=document.getElementById(game.secondCard.id)
                  firstCardView.classList.remove('flip')
                  secondCardView.classList.remove('flip')
                  game.unFlipedCard()
              },1000)
          }
        }
    }
}
//function para restar o jogo
function restar(){
    starGame()
    let gameOver=document.getElementById('gameOver')
                gameOver.style.display='none'
}