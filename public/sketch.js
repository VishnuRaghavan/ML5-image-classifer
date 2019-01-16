let mobileNet;
let label = '';
let accuracy = '';
const accuracyArray = [];
let video;

function modelReady(){
    //console.log('Model is Ready');
    mobileNet.predict(gotResult);
}

function gotResult(err, data){
    if(err) console.error(err);
    else {

        accuracy = Math.floor(data[0].probability * 100);
        label = data[0].className;

        //console.log(data);
        // for(let i = 0; i < data.length; i++) {
        //     accuracyArray.push(data[i].probability);
        // }

        // accuracyArray.sort((a, b) => {
        //     return b-a;
        // });

        // for(let i = 0; i< data.length; i++){
        //     if(data[i].probability === accuracyArray[0])
        //      label = data[i].className;
        // }

        // let accuracy = `${Math.floor(data[0].probability * 100)}%`;

        mobileNet.predict(gotResult);
    }
}

function setup() {
    createCanvas(600, 450);
    background(0);
    video = createCapture(VIDEO);
    video.hide();
    mobileNet = ml5.imageClassifier('MobileNet',video,{ version: 1, alpha: 1.0, topk: 3, }, modelReady);
}

function draw(){
    image(video, 0, 0);
    fill(255);
    textSize(30);
    text( `Accuracy: ${accuracy}`, 10, height - 10);
    text( `Kind: ${label}`, 10, height - 50);
}