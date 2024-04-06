// Get UI 

const getcontainer = document.querySelector('.container');
const getvideoscreen = document.getElementById('videoscreen');
const playbtn = document.getElementById('play');
const prebtn = document.getElementById('prev'),
    nextbtn = document.getElementById('next'),
    stopbtn = document.getElementById('stop');

const getprogress = document.getElementById('progress'),
    getprogressbar = document.getElementById('progress-bar');

const getdisplaytime = document.getElementById('displaytime');
const gettitle = document.getElementById('title');

const getopenfullscreen = document.getElementById('openfullscreen');
const getclosefullscreen = document.getElementById('closefullscreen');


const videos = ["samplevideo1","samplevideo2"];
let curridx = 0;

loadvideo(videos[curridx]);

function loadvideo(video){
    getvideoscreen.src = `./libs/${video}.mp4`;
    gettitle.textContent = video;

}


function playvideo(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
    
    getvideoscreen.play();
}

function pauevideo(){
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    
    getvideoscreen.pause();
}


function playpausevideo(){
    if(getvideoscreen.paused){
        playvideo();
    }else{
        pauevideo();
    }
}


function nextvideo(){
    // curridx++;
    curridx += 1;

    if(curridx > videos.length-1){
        curridx = 0;
    }

    loadvideo(videos[curridx]);
    playvideo();
}


function prevvideo(){
    // curridx--;
    curridx -= 1;

    if(curridx < 0){
        curridx = videos.length -1;
    }

    loadvideo(videos[curridx]);
    playvideo();
}


function stopvideo(){
    getvideoscreen.currentTime = "0";
    pauevideo();
}


function updateprogress(e){
    
    // one 
    // const currentTime = e.target.currentTime;
    // const duration = e.target.duration;
    // console.log(currentTime,duration);

    // two 
    // const {currentTime} = e.target;
    // const {duration} = e.target;
    // console.log(currentTime,duration);

    // three 
    //  const {currentTime,duration} = e.target;
    // console.log(currentTime,duration);

    // four 
    // const [currentTime,duration]= [e.target.currentTime,e.target.duration];
    // console.log(currentTime,duration);


    // five 
    const [currentTime,duration]= [e.srcElement.currentTime,e.srcElement.duration];
    // console.log(currentTime,duration);


    if(getvideoscreen.currentTime === 0){
        getprogressbar.style.width = "0%";
    }else{
        const progresspercent = (currentTime/duration) * 100;
        getprogressbar.style.width = `${progresspercent}%`;
    }


    let getmins = Math.floor(getvideoscreen.currentTime/60);
    let getsecs = Math.floor(getvideoscreen.currentTime%60);


    if(getmins < 10){
        // getmins = "0"+getmins;
        getmins = "0"+String(getmins);
    }


    // if(getsecs < 10){
    //     // getsecs = "0"+getsecs;
    //     getsecs = "0"+String(getsecs);
    // }

    // console.log(getmins,getsecs);

    const minutesvalue = getmins.toString().padStart(2,"0");
    const secondvalue = getsecs.toString().padStart(2,"0");
    // console.log(minutesvalue,secondvalue);

    getdisplaytime.innerText = `${minutesvalue}:${secondvalue}`;


}



function setprogress(e){
    const getclientwidth = e.target.clientWidth;
    const getclickx = e.offsetX;
    const duration = getvideoscreen.duration;

    getvideoscreen.currentTime = (getclickx/getclientwidth) * duration;
}



function openfullscreen(){

    if(getcontainer.requestFullscreen){
        getcontainer.requestFullscreen(); //standard
    }else if(getcontainer.mozRequestFullscreen()){
        getcontainer.mozRequestFullscreen(); //firefox
    }else if(getcontainer.webkitRequestFullscreen()){
        getcontainer.webkitRequestFullscreen(); //chrome,safari,oppora
    }else if(getcontainer.msRequestFullscreen()){
        getcontainer.msRequestFullscreen(); // id, edge
    }



    getopenfullscreen.style.display = "none";
    getclosefullscreen.style.display = "inline-block";
}


function closefullscreen(){

    if(document.exitFullscreen){
        document.exitFullscreen(); //standard
    }else if(document.mozCancelFullscreen()){
        document.mozCancelFullscreen(); //firefox
    }else if(document.webkitExitFullscreen()){
        document.webkitExitFullscreen(); //chrome,safari,oppora
    }else if(document.msExitFullscreen()){
        document.msExitFullscreen(); // id, edge
    }




    getopenfullscreen.style.display = "inline-block";
    getclosefullscreen.style.display = "none";
}




getvideoscreen.addEventListener('timeupdate',updateprogress);
getvideoscreen.addEventListener('ended',nextvideo);

playbtn.addEventListener('click',playpausevideo);
nextbtn.addEventListener('click',nextvideo);
prebtn.addEventListener('click',prevvideo);
stopbtn.addEventListener('click',stopvideo);

getprogress.addEventListener('click',setprogress);

getopenfullscreen.addEventListener('click',openfullscreen);
getclosefullscreen.addEventListener('click',closefullscreen);






// 5VD