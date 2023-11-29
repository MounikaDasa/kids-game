document.addEventListener('DOMContentLoaded', function () {
    const door1 = document.getElementById('door1');
    const door2 = document.getElementById('door2');
    const door1Block = document.getElementById('door1Block');
    const door2Block = document.getElementById('door2Block');
    const playButton = document.getElementById('play');
    const doorSound = new Audio('./assets/click.mp3');
    const arrow = document.getElementById('arrow');
    
    let Trials = [0,1,0,1,0,1,0,1,0,1,0,1,0];
    let remainingTrials=0

    playButton.addEventListener('click', startGame);

    function startGame() {
        // Check if there are remaining trials
        
            // Decrement the remaining trials
           

            // Add logic to perform any initialization before the game starts
            console.log('Game is starting...');

            // Add logic to handle the game state when the play button is clicked

            // Add click event listeners to each door
            door1.addEventListener('click', handleDoorClick);
            door2.addEventListener('click', handleDoorClick);
    
    }

    function handleDoorClick(event) {
        remainingTrials++;
        if (remainingTrials < 10) {

            
        const clickedDoor = event.target;
        const doorNumber = clickedDoor.getAttribute('data-door-number');
        
    
        // Add logic to handle what should happen when a door is clicked
        console.log('Door ' + doorNumber + ' clicked!');

        if (remainingTrials > 5) {
            if(Trials[remainingTrials]==0){
            arrow.src='./assets/images/leftarrow.png'
            arrow.classList.add('mh-btn')
            }
            else{
            arrow.src='./assets/images/rightarrow.png'
            arrow.classList.add('mh-btn')
            }


        }

      

    
        // Change the door image to the open door image
        clickedDoor.src = './assets/images/opendoor.png';
         
        
        // Play the door sound
        doorSound.play();

        // Generate a random number (0 or 1)
        const randomNumber = Trials[remainingTrials]

        // Choose the appropriate image based on the random number
        const randomImageSrc = randomNumber === 0 ? './assets/images/laughing.gif' : './assets/images/gift.gif';
        console.log(randomNumber,doorNumber)
        if(doorNumber==='1'){
            door1Block.src=randomImageSrc
        }
        else{
            door2Block.src=randomImageSrc
        }

        // Close the door after 2 seconds
        setTimeout(() => {
            // Change the door image back to the closed door image
            clickedDoor.src = './assets/images/closedoor.png';
            
            

            // Remove both elements
        }, 500);
    }
    else {
        // No remaining trials, display a blank screen
        document.body.innerHTML = '';
    }
}

}
);
