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
    const arrow = document.getElementById('arrow');
    let remainingTrials = -1;
    let trialStartTime;
    let blockTrails = 0;
    let cue = 0;

    let randomArray = [];

    // First 30 trials with 75% probability
    randomArray = randomArray.concat(Array.from({ length: 15 }, () => (Math.random() < 0.75 ? 1 : 0)));

    let tempArray = [];

    // Next 10 trials with 80% probability
    tempArray = tempArray.concat(Array.from({ length: 5 }, () => (Math.random() < 0.8 ? 1 : 0)));

    // Next 10 trials with 20% probability
    tempArray = tempArray.concat(Array.from({ length: 5 }, () => (Math.random() < 0.2 ? 1 : 0)));

    // Next 10 trials with 80% probability
    tempArray = tempArray.concat(Array.from({ length: 5 }, () => (Math.random() < 0.8 ? 1 : 0)));

    // Next 10 trials with 20% probability
    tempArray = tempArray.concat(Array.from({ length: 5 }, () => (Math.random() < 0.2 ? 1 : 0)));

    // Last 50 trials with 15% probability
    tempArray = tempArray.concat(Array.from({ length: 25 }, () => (Math.random() < 0.15 ? 1 : 0)));

    playButton.addEventListener('click', startGame);

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
            remainingTrials++;
            const randomNumber = randomArray[remainingTrials] === 1 ? 1 : 0;
            const doorNumber = event.target.getAttribute('data-door-number');
            // console.log('Door ' + doorNumber + ' clicked!');
            event.target.src = './assets/images/opendoor.png';
            doorSound.play();
            const randomImageSrc = randomNumber === 0 ? './assets/images/laughing.gif' : './assets/images/gift.gif';
            if (doorNumber === '1') {
                door1Block.src = randomImageSrc;
            } else {
                door2Block.src = randomImageSrc;
            }
            const reactionTime = new Date().getTime() - trialStartTime;
            // console.log('RandomNumber:' + (doorNumber == 1 ? tempArray[blockTrails] : ~(tempArray[blockTrails])) + 'DoorNumber:' + doorNumber + 'ReactionTime:' + reactionTime / 1000);
            experimentRecords.push({ RandomNumber: doorNumber == 1 ? tempArray[blockTrails] : ~(tempArray[blockTrails]), DoorNumber: doorNumber, ReactionTime: reactionTime / 1000 });
            setTimeout(() => {
                event.target.src = './assets/images/closedoor.png';
            }, 800);
            if (remainingTrials === randomArray.length - 1) {
                arrow.src = tempArray[0] === 0 ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
                cue = arrow.src.includes('leftarrow') ? 1 : 2;
                arrow.classList.add('mh-btn');
            }
            door1.addEventListener('click', handleDoorClick);
            door2.addEventListener('click', handleDoorClick);
            trialStartTime = new Date().getTime();
        } else if (blockTrails < tempArray.length) {
            if (blockTrails === 0) {
                console.log(tempArray);
            }
            const doorNumber = event.target.getAttribute('data-door-number');
            // console.log('Door ' + doorNumber + ' clicked!');
            event.target.src = './assets/images/opendoor.png';
            doorSound.play();
            const randomImageSrc = tempArray[blockTrails] === 0 ? './assets/images/laughing.gif' : './assets/images/gift.gif';
            const oppRandomImageSrc = tempArray[blockTrails] === 1 ? './assets/images/laughing.gif' : './assets/images/gift.gif';
            door1Block.src = randomImageSrc;
            door2Block.src = oppRandomImageSrc;
            const reactionTime = new Date().getTime() - trialStartTime;
          
            // console.log('RandomNumber:' + (doorNumber == 1 ? tempArray[blockTrails] : (tempArray[blockTrails]==1?0:1)) + 'DoorNumber:' + doorNumber + 'ReactionTime:' + reactionTime / 1000 + 'Cue:' + cue);
            experimentRecords.push({ RandomNumber: doorNumber == 1 ? tempArray[blockTrails] : tempArray[blockTrails]==1?0:1, DoorNumber: doorNumber, ReactionTime: reactionTime / 1000, Cue: cue });
            setTimeout(() => {
                event.target.src = './assets/images/closedoor.png';
                door1.addEventListener('click', handleDoorClick);
                door2.addEventListener('click', handleDoorClick);
                trialStartTime = new Date().getTime();
            }, 800);
            blockTrails++;
            // Adjust the probability based on blockTrails
            if (blockTrails < 6) {
                const probabilityThreshold = tempArray[blockTrails] === 0 ? 0.8 : 0.2;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
            } else if (blockTrails < 11) {
                const probabilityThreshold = tempArray[blockTrails] === 0 ? 0.2 : 0.8;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
            } else if (blockTrails < 16) {
                const probabilityThreshold = tempArray[blockTrails] === 0 ? 0.8 : 0.2;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
            } else if (blockTrails < 21) {
                const probabilityThreshold = tempArray[blockTrails + 1] === 0 ? 0.2 : 0.8;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
            } else if (blockTrails < 46) {
                const probabilityThreshold = tempArray[blockTrails + 1] === 0 ? 0.15 : 0.85;
                arrow.src = Math.random() < probabilityThreshold ? './assets/images/rightarrow.png' : './assets/images/leftarrow.png';
            }

            // Set cue value after determining the arrow direction
            cue = arrow.src.includes('leftarrow') ? 1 : 2;
            arrow.classList.add('mh-btn');
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
