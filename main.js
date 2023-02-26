 
 song1="";
 song2="";
 song1_status="";
 song2_status="";
 leftWristX=0;
 leftWristY=0;
 rightWristX=0;
 rightWristY=0;
 scoreLeftWrist=0;
 scoreRightWrist=0;

 function preload(){
    song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
 }
 function setup(){
    canvas=createCanvas(600,500);
    canvas.center();


 
video = createCapture(VIDEO);
 video.hide();
  
 poseNet = ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotPoses);
 }
 function modelLoaded(){
   console.log('PoseNet is initialized');
   
  
 }
 function gotPoses(results)
 {
   if(results.length>0)
   {
      console.log(results);
      scoreRightWrist = results[0].pose.keypoints[10].score;
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log("scoreRightWrist"+scoreRightWrist+"scoreLeftWrist"+scoreLeftWrist);
      
      leftWristX=results[0].pose.leftWrist.X;
   leftWristY=results[0].pose.leftWrist.Y;
   console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

   rightWristX=results[0].pose.rightWrist.X;
   rightWristY=results[0].pose.rightWrist.Y;
   console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
   }
 }

 function draw(){
    image(video,0,0,600,500);

    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();

    fill ("#AD2B89");
    stroke("#AD2B89");
    if(scoreRightWrist > 0.2){

    circle(rightWristY,rightWristX,20);
    song2.stop();

    if(song1_status==false)
    {
      song1.play();
      document.getElementById("song" ).innerHTML= "Playing - Harry Potter Theme Song" ; 
      
    }
    
   }

   if(scoreLeftWrist > 0.2){

    circle(leftWristY,leftWristX,20);
    song1.stop();

    if(song2_status==false)
    {
      song2.play();
      document.getElementById("song").innerHTML= "Playing - Peter Pan Song";
      
    }


   }

 }
  function play(){
    song1.play();
    
 }

 
