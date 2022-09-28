song="";
scoreRightWrist=0;
scoreLeftWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(400, 300);
    canvas.position(480,230);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", obtainedResults)
}

function modelLoaded(){
    console.log("Model's been initialised");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function obtainedResults(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLefttWrist=results[0].pose.keypoints[9].score;
        console.log("The Right Wrist's score's "+scoreRightWrist+" and the Left Wrist's score's ")+scoreLeftWrist;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristX=results[0].pose.leftWrist.x;
        console.log("right wrist x position = "+rightWristX+" and left wrist x position = "+leftWristX);
        rightWristY=results[0].pose.rightWrist.y;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("right wrist y position = "+rightWristY+" and left wrist y position = "+leftWristY);
    }
}

function draw(){
    image(video, 0, 0, 400, 300);
    fill("red");
    stroke("red");
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5X";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed = 1X";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5X";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed = 2X";
            song.rate(2);
        }
        else if(rightWristY>400){
            document.getElementById("speed").innerHTML="Speed = 2.5X";
            song.rate(2.5);
        }
    }
    if(scoreLeftWrist>0.2){
        cirlce(leftWristX, leftWristY, 20);
        inNumberLeftWristY=Number(leftWristY);
        removeDecimals=floor(inNumberLeftWristY);
        volume=removeDecimals/500;
        document.getElementById("volume").innerHTML="Volume = "+volume
    }
}