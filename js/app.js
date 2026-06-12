
//$(document).ready(function() {
 //   var editor = CodeMirror.fromTextArea(document.getElementById("bibtex"), {
  //      lineNumbers: false,
   //     lineWrapping: true,
    //    readOnly:true
    //});
  //  $(function () {
  //      $('[data-toggle="tooltip"]').tooltip()
  //  });
    

// var frameNumber = 0, // start video at frame 0
//     // lower numbers = faster playback
//     playbackConst = 500, 
//     // get page height from video duration
//     setHeight = document.getElementById("main"), 
//     // select video element         
//     vid = document.getElementById('v0'); 
//     // var vid = $('#v0')[0]; // jquery option

    
    

// // Use requestAnimationFrame for smooth playback
// function scrollPlay(){  
//   var frameNumber  = window.pageYOffset/playbackConst;
//   vid.currentTime  = frameNumber;
//   window.requestAnimationFrame(scrollPlay);
// console.log('scroll');
// }
    
// // dynamically set the page height according to video length
// vid.addEventListener('loadedmetadata', function() {
//   setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
// });
    
    
//     window.requestAnimationFrame(scrollPlay);
//});

// JavaScript to handle mouseover and mouseout events
var activeMethodPill = null;
var activeScenePill = null;
var activeModePill = null;
var activeMethodPill_syn = null;
var activeScenePill_syn = null;
var activeModePill_syn = null;
var activeMethodPill_abl = null;
var activeVidID = 0;
var select = false;


$(document).ready(function () {
    var editor = CodeMirror.fromTextArea(document.getElementById("bibtex"), {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    activeMethodPill = $('.method-pill').filter('.active')[0];
    activeModePill = $('.mode-pill').filter('.active')[0];
    activeScenePill = $('.scene-pill').filter('.active')[0];

    activeMethodPill_syn = $('.method-pill-syn').filter('.active')[0];
    activeModePill_syn = $('.mode-pill-syn').filter('.active')[0];
    activeScenePill_syn = $('.scene-pill-syn').filter('.active')[0];

    activeMethodPill_abl = $('.method-pill-abl').filter('.active')[0];


    //resizeAndPlay($('#sparsity')[0]);
});

function selectCompVideo(methodPill, scenePill, n_views, modePill) {
    method = methodPill.getAttribute("data-value");
    // Ensure we have a valid scenePill reference. Fall back to the global activeScenePill
    // or the first scene pill in the DOM so clicks don't throw when scenePill is null.
    if (!scenePill) {
        scenePill = (typeof activeScenePill !== 'undefined' && activeScenePill) ? activeScenePill : document.querySelector('.scene-pill.active') || document.querySelector('.scene-pill');
    }
    if (scenePill != null) {
        pill = scenePill.getAttribute("data-value");
    } else {
        pill = '';
    }
    // Your existing logic for video selection
    // var video = document.getElementById("compVideo");
    select = true;
    var videoSwitch = document.getElementById("compVideoSwitch");
    var viewNum = document.getElementById("compVideoValue");
    if (method.indexOf("bell") == 0 || method.indexOf("cup") == 0){
        if (activeMethodPill_abl){
            activeMethodPill_abl.classList.remove("active");
        }
        activeMethodPill_abl = methodPill;
    }
    else if (pill.indexOf("nerfds") == 0 ) {
        if (activeMethodPill) {
            activeMethodPill.classList.remove("active");
        }
        if (activeScenePill) {
            activeScenePill.classList.remove("active");
        }
        if (modePill) {
            activeModePill.classList.remove("active");
            modePill.classList.add("active");
            activeModePill = modePill;
        }
        activeMethodPill = methodPill;
        activeScenePill = scenePill;
    }
    else{
        if (activeMethodPill_syn) {
            activeMethodPill_syn.classList.remove("active");
        }
        if (activeScenePill_syn) {
            activeScenePill_syn.classList.remove("active");
        }
        if (modePill) {
            activeModePill_syn.classList.remove("active");
            modePill.classList.add("active");
            activeModePill_syn = modePill;
        }
        activeMethodPill_syn = methodPill;
        activeScenePill_syn = scenePill;
    }
    methodPill.classList.add("active");
    if(scenePill != null){
        scenePill.classList.add("active");
    }
    //mode = activeModePill.getAttribute("data-value");

    // if (videoSwitch.checked) {
    //     mode = 'depth'
    // } else {
    //     mode = 'rgb'
    // }

    // swap video to avoid flickering
    //console.log(pill.indexOf("nerfds") == 1 ) ;
    if  (method.indexOf("bell") == 0 || method.indexOf("cup") == 0){
        var video_active = document.getElementById("ablVideo");
        video_active.src = "static/videos/ablation/" + method + "_vs_ours.mp4";
        console.log(video_active.src);
        video_active.load(); 
    }
    else if (pill.indexOf("nerfds") == 0 ) {
        activeVidID = 0;
        var video_active = document.getElementById("compVideo0");
        var video_hidden = document.getElementById("compVideo1");
        video_active.src = "static/videos/comparison/" + pill + "_" + method + "_vs_ours.mp4";
        console.log(video_active.src);
        video_active.load(); 
    }
    else {
        activeVidID = 1;
        var video_active = document.getElementById("compVideo1");
        var video_hidden = document.getElementById("compVideo0");

    var video_rot = document.getElementById("dnerfextraVideoRot");
    video_rot.src = "static/videos/dnerfextra/" + pill + "_rotate.mp4";
	video_rot.load();

    var video_fix = document.getElementById("dnerfextraVideoFix");
    video_fix.src = "static/videos/dnerfextra/" + pill + "_fix.mp4";
	video_fix.load();

    var video_track = document.getElementById("dnerfextraVideoTrack");
    video_track.src = "static/videos/dnerfextra/" + pill + "_track.mp4";
	video_track.load();
	
        video_active.src = "static/videos/comparison/" + pill + "_" + method + "_vs_ours.mp4";
        console.log(video_active.src);
        video_active.load();
    }
    

    if (n_views) {
        viewNum.innerHTML = n_views;
    }
}
