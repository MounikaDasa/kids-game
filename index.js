document.addEventListener('DOMContentLoaded', function () {
    const userName = prompt("Enter your name:");

    if (!userName) {
        alert("Name cannot be empty. Please try again.");
        return;
    }

    let experimentRecords = [];
    const door1 = document.getElementById('door1');
    const door2 = document.getElementById('door2');
    const door1Block = document.getElementById('door1Block');
    const door2Block = document.getElementById('door2Block');
    const playButton = document.getElementById('play');
    const doorSound = new Audio('./assets/click.mp3');
    const yay = new Audio('./assets/yey.mp3');
    
    const arrow = document.getElementById('arrow');
    let remainingTrials = 0;
    let trialStartTime;
    let blockTrails = 0;
    let cue = 0;
    let gifts=['A','A1','A3','A4','B','B1','B2','B3','B4','B5','B6','C','C1','C2','C3','C4','D','D2','D3','D4','E','E1','E2','E3','E4']

    let randomArray = [];

    // First 30 trials with 50% probability
    randomArray = randomArray.concat(Array.from({ length: 30 }, () => (Math.random() < 0.50 ? 1 : 0)));

    let tempArray = [];
    // First 30 trials with 50% probability
    tempArray = tempArray.concat(Array.from({ length: 30 }, () => (Math.random() < 0.50 ? 1 : 0)));

    // Next 10 trials with 80% probability
    tempArray = tempArray.concat(Array.from({ length: 10 }, () => (Math.random() < 0.8 ? 1 : 0)));

    // Next 10 trials with 20% probability
    tempArray = tempArray.concat(Array.from({ length: 10 }, () => (Math.random() < 0.2 ? 1 : 0)));

    // Next 10 trials with 80% probability
    tempArray = tempArray.concat(Array.from({ length: 10 }, () => (Math.random() < 0.8 ? 1 : 0)));

    // Next 10 trials with 20% probability
    tempArray = tempArray.concat(Array.from({ length: 10 }, () => (Math.random() < 0.2 ? 1 : 0)));

    // Last 50 trials with 15% probability
    tempArray = tempArray.concat(Array.from({ length: 50 }, () => (Math.random() < 0.15 ? 1 : 0)));

    playButton.addEventListener('click', startGame);
    console.log(tempArray)
    function startGame() {
        // console.log('Game is starting...');
        trialStartTime = new Date().getTime();
        door1.addEventListener('click', handleDoorClick);
        door2.addEventListener('click', handleDoorClick);
        // Reset cue at the beginning of each trial
        cue = 0;
    }

    function handleDoorClick(event) {
        if (remainingTrials < randomArray.length) {
            
            const reactionTime = new Date().getTime() - trialStartTime;
            const doorNumber = event.target.getAttribute('data-door-number');
            //console.log('Door ' + doorNumber + ' clicked!');
            event.target.src = './assets/images/GFN.gif';
            doorSound.play();
           
           
            //console.log('RandomNumber:' + randomArray[remainingTrials] + 'DoorNumber:' + doorNumber + 'ReactionTime:' + reactionTime / 1000);
            experimentRecords.push({ GiftInFirstBox:randomArray[remainingTrials],GiftInSecondBox:randomArray[remainingTrials]===1?0:1, OpenedBoxNumber: doorNumber, Reward: randomArray[remainingTrials],ReactionTime: reactionTime / 1000 });
           
            if(randomArray[remainingTrials]===1){
                
            setTimeout(() => {
                let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
               event.target.src = './assets/images/' + randomGift + '.gif';
               yay.play();
                // This line will execute after the timeout
                setTimeout(() => {
                    event.target.src = './assets/images/GF.jpg';
                }, 800);
                door1.addEventListener('click', handleDoorClick);
                door2.addEventListener('click', handleDoorClick);
                trialStartTime = new Date().getTime();
            }, 1200); }
            else{
                setTimeout(() => {          
                    event.target.src = './assets/images/S.png';
                     // This line will execute after the timeout
                     setTimeout(() => {
                         event.target.src = './assets/images/GF.jpg';
                     }, 600);
                     door1.addEventListener('click', handleDoorClick);
                     door2.addEventListener('click', handleDoorClick);
                     trialStartTime = new Date().getTime();
                 }, 1000);
            }

            if (remainingTrials === randomArray.length - 1) {
                arrow.src = tempArray[0] === 0 ? './assets/images/smileR.png' : './assets/images/smileL.png';
                cue = arrow.src.includes('smileL') ? 1 : 2;
               
            }
            
            remainingTrials++;
        } else if (blockTrails < tempArray.length) {
            const reactionTime = new Date().getTime() - trialStartTime;
          
            const doorNumber = event.target.getAttribute('data-door-number');
            //console.log('Door ' + doorNumber + ' clicked!');
            event.target.src = './assets/images/GFN.gif';
            doorSound.play();
            const left=cue===1?1:0
            const right=cue===2?1:0
       
            
          
            //console.log('RandomNumber:' + (doorNumber == 1 ? tempArray[blockTrails] : (tempArray[blockTrails]==1?0:1)) + 'DoorNumber:' + doorNumber + 'ReactionTime:' + reactionTime / 1000 + 'Cue:' + cue);
            experimentRecords.push({GiftInFirstBox:tempArray[blockTrails],GiftInSecondBox:tempArray[blockTrails]===1?0:1,  OpenedBoxNumber: doorNumber,Reward: doorNumber === 1 ? tempArray[blockTrails] : tempArray[blockTrails]===1?0:1, ReactionTime: reactionTime / 1000, Left: left, Right:right,cue:cue });
            
            if(doorNumber === 1 ? tempArray[blockTrails] : tempArray[blockTrails]===1?0:1===1){
                setTimeout(() => {
                    let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                   event.target.src = './assets/images/' + randomGift + '.gif';
                   yay.play();
                    // This line will execute after the timeout
                    setTimeout(() => {
                        event.target.src = './assets/images/GF.jpg';
                    }, 800);
                    door1.addEventListener('click', handleDoorClick);
                    door2.addEventListener('click', handleDoorClick);
                    trialStartTime = new Date().getTime();
                }, 1200); }
                else{
                    setTimeout(() => {          
                       event.target.src = './assets/images/S.png';

                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.jpg';
                        }, 600);
                        door1.addEventListener('click', handleDoorClick);
                        door2.addEventListener('click', handleDoorClick);
                        trialStartTime = new Date().getTime();
                    }, 1000);}
            
            
     
            blockTrails++;
            // Adjust the probability based on blockTrails
            if (blockTrails < 31) {
                const probabilityThreshold = tempArray[blockTrails+1] === 0 ? 0.5 : 0.5;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            } else if (blockTrails < 41) {
                const probabilityThreshold = tempArray[blockTrails+1] === 0 ? 0.8 : 0.2;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            } else if (blockTrails < 51) {
                const probabilityThreshold = tempArray[blockTrails+1] === 0 ? 0.2 : 0.8;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            } else if (blockTrails < 61) {
                const probabilityThreshold = tempArray[blockTrails+1] === 0 ? 0.8 : 0.2;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            } else if (blockTrails < 71) {
                const probabilityThreshold = tempArray[blockTrails + 1] === 0 ? 0.2 : 0.8;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            }
            else if (blockTrails < 121) {
                const probabilityThreshold = tempArray[blockTrails + 1] === 0 ? 0.15 : 0.85;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/smileR.png' : './assets/images/smileL.png';
            }

            // Set cue value after determining the arrow direction
            cue = arrow.src.includes('smileL') ? 1 : 2;
           
        } else {
            alert('Experiment completed!');
            setTimeout(() => {
                downloadExcel(userName);
            }, 300);
        }
    }

    function downloadExcel(userName) {
        const ws = XLSX.utils.json_to_sheet(experimentRecords);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Experiment Results');
        XLSX.writeFile(wb, `${userName}_experiment_results.xlsx`);
    }
});