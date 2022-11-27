status="";
video="";
video="";
object=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+object.length;

            fill("red");
            percent = floor(object[i].confidence*100);
            text(object[i].label +" " +percent+"%", object[i].x+15, object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y,object[i].width,object[i].height);


        }
    }
function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML ="Status: Object Detecting";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        object=results;
    }
}}