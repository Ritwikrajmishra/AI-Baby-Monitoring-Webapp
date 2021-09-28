alarm_sound = "";
objectDetector = "";
status1 = "";
objects = [];

function preload()
{
    alarm_sound = loadSound("mixkit-alert-alarm-1005.wav");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if(status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label == "person")
        {
            alarm_sound.stop();
            document.getElementById("status").innerHTML = "Baby found";
        }

        else{
            alarm_sound.play();
            document.getElementById("status").innerHTML = "Baby not found";
        }

        if(objects.length == 0)
        {
            document.getElementById("status").innerHTML = "Baby not found";
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}