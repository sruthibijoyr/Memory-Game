
var cards = ['',''];
var count =0, score = 0, level=1;
var clear=0;
var failed = new Audio("audio/failed.mp3");
var flip = new Audio("audio/flip.mp3");
var success = new Audio("audio/success.mp3");
var win = new Audio("audio/win.mp3");
var myTimer;
   function clock(c) {
     myTimer = setInterval(myClock, 1000);

     function myClock() {
       document.getElementById("timer").innerHTML = "TIMER : "+--c;
       if(c<10)
       {
         document.getElementById("timer").style.color = "#e40017";
       }
       else{
         document.getElementById("timer").style.color = "#ffff";
       }
       if (c == 0) {
         if(score!=8)
         {
           var i;
          for(i=1;i<=16;++i)
          {
            flipBack("card"+i);
            setElement("card"+i);
          }
           document.getElementById("level").innerHTML = "TIME UP! BETTER LUCK NEXT TIME";
           document.getElementById("start-btn").innerHTML = "RE-START";
          document.body.style.backgroundImage= "linear-gradient(to right, #91091e , #e40017)";
          failed.play();
         }
         else
         {
           
           success.play();
           if(level!=3)
           {
             document.getElementById("level").innerHTML = "LEVEL "+level+" CLEARED";
            document.getElementById("start-btn").innerHTML = "NEXT LEVEL";
           }
           else
           {
             win.play();
             document.getElementById("game-grid").style.backgroundImage= 'url("images/win.gif")';
             document.getElementById("level").innerHTML = "YOU WIN!";
             document.getElementById("start-btn").innerHTML = "RE-START";
           }
           
         }
         clearInterval(myTimer);    
       }
     }
   }

function imgClicked(index)
{
    image = document.getElementById("card"+index);
    var src = image.src;
    cards[count] = image;
    count++;
    if(count==2)
    {
      if(cards[0].src===cards[1].src && cards[0].id!=cards[1].id)
      {
        score++;
        document.getElementById("score").innerHTML = "SCORE : "+score;
        setTimeout(function() {
         removeElement(cards[0].id);
          removeElement(cards[1].id);
        }, 300);
        count = 0;
        if(score==8)
        {
          success.play();
          if(level!=3)
          {
            document.getElementById("level").innerHTML = "LEVEL "+level+" CLEARED";
          document.getElementById("start-btn").innerHTML = "NEXT LEVEL";
          }
          else
          {
            win.play();
            document.getElementById("game-grid").style.backgroundImage= 'url("images/win.gif")';
            document.getElementById("level").innerHTML = "YOU WIN!";
            document.getElementById("start-btn").innerHTML = "RE-START";
          }
          clearInterval(myTimer);
        }
        return;
      }
      count = 0;
      setTimeout(function() {
         flipBack(cards[0].id);
         flipBack(cards[1].id);
      }, 400);
    }
}


function start(){
  document.body.style.backgroundImage= "linear-gradient(to right, #00587a , #32e0c4)";
  var i;
  for(i=1;i<=16;++i)
  {
    flipBack("card"+i);
    setElement("card"+i);
  }
  var buttontext = document.getElementById("start-btn").innerHTML;
  if(buttontext=="START" || buttontext=="RE-START")
  {
    level=1;
  }
  else if(buttontext=="NEXT LEVEL")
  {
    level++;
  }
  count=0;
  score=0;
  clearInterval(myTimer);
  if(level==1)
  {
    document.getElementById("game-grid").style.backgroundImage= 'none';
    c=60;
  }
  else if(level==2)
  {
    c=50;
  }
  else{
    c=40;
  }
  document.getElementById("timer").innerHTML = "TIMER : "+c;
  document.getElementById("level").innerHTML = "LEVEL "+level;
  document.getElementById("score").innerHTML = "SCORE : "+score;
  document.getElementById("start-btn").innerHTML = "RE-START";
  clock(c);
  shuffle();
}


function shuffle(){
  let array = [1, 2, 3, 4, 5, 6, 7, 8];
  var i,j,temp;
  for (i = array.length - 1; i > 0; i--) { 
    j = Math.floor(Math.random() * (i + 1)); 

    temp = array[i]; 
    array[i] = array[j]; 
    array[j] = temp; 
  }
  let grid = []
  for (i = 1; i <= 16; i++) { 
    grid.push(i);
  }
  for (i = grid.length - 1; i > 0; i--) { 
    j = Math.floor(Math.random() * (i + 1)); 
    temp = grid[i]; 
    grid[i] = grid[j]; 
    grid[j] = temp; 
  }
  for(i=0;i<8;++i)
  {
    document.getElementById("card"+(grid[i])).src = "images/icon"+array[i]+".png";
    document.getElementById("front-img"+(grid[i])).src = "images/flipped-img.jpg";
    document.getElementById("card"+(grid[i+8])).src = "images/icon"+array[i]+".png";
    document.getElementById("front-img"+(grid[i+8])).src = "images/flipped-img.jpg";
  }
  
}


function flipCard(id1)
{
  flip.play();
  const l = id1.length;
  if(l==6)
  {
    str=id1[l-1]
  }
  else{
    str=id1[l-2]+id1[l-1]
  }
  id2 = "inner"+str;
  document.getElementById(id2).style.transform = "rotateY(180deg)";
  imgClicked(str);
}

function flipBack(id1)
{
  flip.play();
  const l1 = id1.length;
  if(l1==5)
  {
    str1=id1[l1-1]
  }
  else{
    str1=id1[l1-2]+id1[l1-1]
  }
  newid1 = "inner"+str1;
  document.getElementById(newid1).style.transform = "rotateY(0)";
}

function removeElement(id1) {
  document.getElementById(id1).style.visibility='hidden';
}

function setElement(id1) {

  document.getElementById(id1).style.visibility='visible';
}