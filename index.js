document.addEventListener('DOMContentLoaded', function () {
    const userInput = prompt("Enter your name, participant ID, and experiment number (separated by commas):");

    // Split the user input using commas as the delimiter
    const [userName, pid, exp_no] = userInput.split(",").map(item => item.trim());

    // Now userName, pid, and ex_no hold the respective values entered by the user
    console.log(userName, pid, exp_no)


    if (!userName) {
        alert("Name cannot be empty. Please try again.");
        return;
    }

    let experimentRecords = [];
    const door1 = document.getElementById('door1');
    const door2 = document.getElementById('door2');
    const playButton = document.getElementById('play');
    
    const yay = new Audio('./assets/yey.mp3');
    const arrow = document.getElementById('arrow');
    
    let remainingTrials = 0;
    let trialStartTime;
    let blockTrails = 0;
    let cue = 0;
    let gifts=['A','A1','A3','A4','B','B1','B2','B3','B4','B5','B6','C','C1','C2','C3','C4','D','D2','D3','D4','E','E1','E2','E3','E4']

    let randomArray = [];
    
    // Function to generate an array with specified number of ones and zeroes
    function generateArrays(m, n, k, l) {
        // Function to generate an array with specified number of ones and zeroes
        function generateArray(n, m) {
            const array = Array(n).fill(1).concat(Array(m).fill(0));
            // Shuffle the array randomly
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        // Function to calculate cue based on two arrays
        function calculateCue(arr1, arr2) {
            const temp = [];
            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i] === 1) {
                    temp.push(arr1[i]);
                } else {
                    temp.push(arr1[i] === 0 ? 1 : 0);
                }
            }
            return temp;
        }
    
        // Generate box array and temp array
        const boxArr1 = generateArray(m, n);
        const boxArr2  = [];
        if((m+n)%2===0){
        const boxArr2 = generateArray((m+n)/2,(m+n)-((m+n)/2));
        }
        else{
        const boxArr2 = generateArray((m+n+1)/2,(m+n)-((m+n+1)/2));   
        }
        const resultArray = [];

        // Perform the AND operation for each element
        for (let i = 0; i < boxArr1.length; i++) {
            const andResult = boxArr1[i] & boxArr2[i]; // Using bitwise AND operator
            resultArray.push(andResult);
        }

        const tempArr = generateArray(k, l);
        const cueArr = calculateCue(resultArray, tempArr);
    
        return { resultArray, cueArr };
    }
    
    // Usage example
    

    // First 30 trials with 50% probability
    // randomArray = randomArray.concat(Array.from({ length: 30 }, () => (Math.random() < 0.50 ? 1 : 0)));

    let tempArray = [];
    let cueArray = [];
    let boxArr = [];
    let cueArr = [];

    // First 60 trials with 80% box probability
    
        //30 trails with 75% Cue probability
        const { boxArr: boxArr1, cueArr: cueArr1 } = generateArrays(24,6,23,7);
        tempArray = tempArray.concat(boxArr1);
        cueArray = cueArray.concat(cueArr1);

        //15 trails with 80% Cue probability
        const { boxArr: boxArr2, cueArr: cueArr2 } = generateArrays(12, 3, 12, 3);
        tempArray = tempArray.concat(boxArr2);
        cueArray = cueArray.concat(cueArr2);

        //15 trials with 20% Cue probability
        const { boxArr: boxArr3, cueArr: cueArr3 } = generateArrays(12, 3, 3, 12);
        tempArray = tempArray.concat(boxArr3);
        cueArray = cueArray.concat(cueArr3);

    // 20 trials with 20% box probability

        //  15 trials with 80% Cue probability
        const { boxArr: boxArr4, cueArr: cueArr4 } = generateArrays(3, 12, 12, 3);
        tempArray = tempArray.concat(boxArr4);
        cueArray = cueArray.concat(cueArr4);

        // 5 trials with 20% Cue probability

        const { boxArr: boxArr5s, cueArr: cueArr5s } = generateArrays(1, 4, 1, 4);
        tempArray = tempArray.concat(boxArr5s);
        cueArray = cueArray.concat(cueArr5s);

    // 20 trials with 80% box probability
        // 10 trials with 20% Cue probability
        const { boxArr: boxArr5, cueArr: cueArr5 } = generateArrays(8, 2, 2, 8);
        tempArray = tempArray.concat(boxArr5);
        cueArray = cueArray.concat(cueArr5);

        // 10 trials with 15% Cue probability
        const { boxArr: boxArr6s, cueArr: cueArr6s } = generateArrays(8, 2, 1, 9);
        tempArray = tempArray.concat(boxArr6s);
        cueArray = cueArray.concat(cueArr6s);

    // 20 trials with 20% box probability
        // 20 trials 15% Cue probability
        const { boxArr: boxArr6, cueArr: cueArr6 } = generateArrays(16, 4, 4, 16);
        tempArray = tempArray.concat(boxArr6);
        cueArray = cueArray.concat(cueArr6);

    if(exp_no==='1' || exp_no==='2'){
    
        if(exp_no==='1'){
            arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png'; 
        }
        else{
            arrow.src = cueArray[blockTrails]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 

        }
    }

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
        
     
        if (blockTrails < tempArray.length) {
            const reactionTime = new Date().getTime() - trialStartTime;
          
            const doorNumber = event.target.getAttribute('data-door-number');
            console.log('Door ' + doorNumber + ' clicked!');

            event.target.src = './assets/images/GFN.gif';
            arrow.src = '';
            door1.removeEventListener('click', handleDoorClick);
            door2.removeEventListener('click', handleDoorClick);
            
            let reward = 10;
            
            if(doorNumber === "1"){
               
                if(tempArray[blockTrails] ===1){
                    reward=1
                    setTimeout(() => {
                        let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                        event.target.src = './assets/images/' + randomGift + '.gif';
                        yay.play();
                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.jpg';
                        }, 800);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                        setTimeout(() => {
                            arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                        }, 400);
                        }
                        else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                        {
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                            }, 400);

                        }
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 800);
                        
                        trialStartTime = new Date().getTime();
                    }, 1200); 
                }                
                else{
                    reward=0
                    setTimeout(() => {          
                        event.target.src = './assets/images/S.png';

                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.jpg';
                        }, 600);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 400);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 400);
    
                            }
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 800);
                        trialStartTime = new Date().getTime();
                    }, 1000);
                }
            }

            else{
                if(tempArray[blockTrails] ===0){
                    reward=1
                    setTimeout(() => {
                        let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                        event.target.src = './assets/images/' + randomGift + '.gif';
                        yay.play();
                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.jpg';
                        }, 800);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 400);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 400);
    
                            }
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 800);
                        
                        trialStartTime = new Date().getTime();
                    }, 1200); 
                }                
                else{
                    reward=0
                    setTimeout(() => {          
                        event.target.src = './assets/images/S.png';

                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.jpg';
                        }, 800);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 400);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 400);
    
                            }
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 800);
                        trialStartTime = new Date().getTime();
                    }, 1000);
                }
            }

            

            //console.log('RandomNumber:' + (doorNumber == 1 ? tempArray[blockTrails] : (tempArray[blockTrails]==1?0:1)) + 'DoorNumber:' + doorNumber + 'ReactionTime:' + reactionTime / 1000 + 'Cue:' + cue);
            experimentRecords.push({ChoosedBox:doorNumber === "1"?"Left":"Right",CueShowed:cueArray[blockTrails]===1?"Left":"Right",  Rewards: reward, ReactionTime: reactionTime / 1000 });
            
            blockTrails++;
   
        } else {
            alert('Experiment completed!');
            setTimeout(() => {
                downloadExcel(userName+"_"+pid+"_"+exp_no);
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