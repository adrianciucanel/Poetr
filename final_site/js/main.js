
/*window.onload = addlisteners;*/

window.onload = function() {
	addlisteners();
	checkcookies();
	var credit = CKEDITOR.replace( 'my_text');
	atachEventsToTextArea();
	verifyedit(credit);
}

function verifyedit(bodyEditor){
	
	bodyEditor.on('mode', function () {
    if (this.mode == 'source') {
        var editable = bodyEditor.editable();
        editable.attachListener(editable, 'input', function () {
              });
    }
});
	bodyEditor.on('change', function () {
		var data = CKEDITOR.instances.my_text.getData();
		var lg1 = data.length; 
		if (lg1>14){
			if (data.charCodeAt(lg1-15)==10){
					var poz1 = data.lastIndexOf(" ",lg1-13);
					var cuvant = String(data.substring(poz1+1,lg1-20));
					lg1=cuvant.length;
					var cuv="";
					for (var i =0;i<lg1;i++){
						var s1=cuvant.charCodeAt(i);
						if ((s1>64 && s1<91) || (s1>96 && s1<123) ){
							cuv +=cuvant.charAt(i);
						}
						
					}
	/*				alert ("cuv"+cuvant);
					document.getElementById('wordsearch').innerText=cuv;
					cuv = document.getElementById('wordsearch').value;*/
					if (cuv.length>1){
				cautarima(cuv);
					}
			}
		}
		
   /* alert('change fired');*/
});
}

function atachEventsToTextArea() {
	$('#my_text').on('keydown, keyup', checkLastWord);
}

function checkLastWord() {
	
}

function checkcookies(){
	
	
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} 

function checkCookieUser() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function addlisteners(){

/*document.getElementById('inputIdi').addEventListener('change', handleFileSelect, false);*/
document.getElementById('btnrim').addEventListener('click', setLblSearchRim);
document.getElementById('btndic').addEventListener('click', setLblSearchDic);
document.getElementById('btnsin').addEventListener('click', setLblSearchSin);
document.getElementById('bgf').addEventListener("click", changebackground, false);
document.getElementById('baf').addEventListener("click", updateSource, false);
document.getElementById('selAvat').addEventListener("click", updateAvat, false);
document.getElementById('listresult').addEventListener('click', addWord);
document.getElementById('wordsearch').addEventListener('click', function(event) {
document.getElementById('wordsearch').style.backgroundImage="none";})
document.getElementById('add').addEventListener('click', getDataFromEditor);
document.getElementById('add').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
	
       getDataFromEditor();
    }
});
document.getElementById('wordsearch').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
	
       searchword();
    }
});

document.getElementById('src-btn').addEventListener('click', function(event) {
    event.preventDefault();
    searchword();
});

var dataImage = localStorage.getItem('b');
bannerImg = document.getElementById('body');
}

function setLblSearchRim(){
	document.getElementById('lblsearch').innerHTML= "Rhymes";
}

function setLblSearchDic(){
	document.getElementById('lblsearch').innerHTML= "Dictionary";
}

function setLblSearchSin(){
	document.getElementById('lblsearch').innerHTML= "Synonyms";
}

function searchword(){
	var searchtype = document.getElementById('lblsearch').textContent;
	var cuvant = document.getElementById('wordsearch').value;
	switch(searchtype){
		
		case "Rhymes": 
		cautarima(cuvant);
		break;
		case "Dictionary": 
		cautadictionar();
		break;
		case "Synonyms": 
		cautasinonime();
		break;
	}
	
}

function cautadictionar(cuvant){


 $.ajax({
    url: 'https://wordsapiv1.p.mashape.com/words/'+cuvant, // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function (data) {
text1 =''; 
     text1 += '<ul type="1" id ="listresult">';
      $.each(data.results, function (i, obj) {
     text1 += '<li>'+ obj['definition'] + '</li>'; 
		})
      text1 += '</ul>';  
 	document.getElementById('listresult').innerHTML = text1;
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "ReGiQBvzCQmshF245ZczPPbYARaUp1zQj8XjsnrVrzhcMVVOEK"); // Enter here your Mashape key
    }
});

} 	
	
function cautasinonime(){
var cuvant = document.getElementById('wordsearch').value;

 $.ajax({
    url: 'https://wordsapiv1.p.mashape.com/words/'+cuvant+'/synonyms', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
		
    success: function (data) {
		text1 =''; 
      text1 += '<ul type="1" id ="listresult">';
      $.each(data.synonyms, function (i, sin) {
		
       text1 += '<li>'+ sin + '</li>';  
		})
       text1 += '</ul>';  
	document.getElementById('listresult').innerHTML = text1;
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "ReGiQBvzCQmshF245ZczPPbYARaUp1zQj8XjsnrVrzhcMVVOEK"); // Enter here your Mashape key
    }
});
} 		


function cautarima(cuvant){



 $.ajax({
    url: 'https://wordsapiv1.p.mashape.com/words/'+cuvant+'/rhymes', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function (data) {
		text1 =''; 
     text1 += '<ul type="1" id ="listresult">';
      $.each(data.rhymes.all, function (i, theRhyme) {
		 /*   text1 +=theRhyme+'\n';*/
      text1 += '<li>'+ theRhyme + '</li>';  
		})
       text1 += '</ul>';  
	 document.getElementById('listresult').innerHTML = text1;
    },
    error: function(err) { alert("eroare"+err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "ReGiQBvzCQmshF245ZczPPbYARaUp1zQj8XjsnrVrzhcMVVOEK"); // Enter here your Mashape key
    }
});
} 

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
	var nume1="";
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
				  nume1=f.name;
    }
	var f1= files[0];
/*  document.getElementById('right').innerHTML = '<ul>' + output.join('') + '</ul><p>numele este '+adresa1+'</p>';*/

	$(switchBackground);
var oFReader = new FileReader(),
    rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

oFReader.onload = function(oFREvent) {
	imgData = getBase64Image(f1);
	localStorage.setItem('b', imgData);
  /*  localStorage.setItem('b', oFREvent.target.result);*/
	
	
	
	
    switchBackground();
};

function switchBackground() {
  var backgroundImage = localStorage.getItem('b');
  if (backgroundImage) {
    $('body').css('background-image', 'url(' + backgroundImage + ')');    
  } 
}

function loadImageFile(testEl) {
  if (! testEl.files.length) { return; }
  var oFile = testEl.files[0];
  if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
  oFReader.readAsDataURL(oFile);
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



  }

  
  
  
  function changebackground(e){
	  if (e.target !== e.currentTarget) {
        var img1 = 'url(images/'+e.target.innerHTML+'.jpg';
	  $(document).ready(function() {
		  
        $('body').css('background-image', img1);
		 
	});
  }
 
    e.stopPropagation();
}
  
	  function updateSource(e) { 
		 if (e.target !== e.currentTarget) {
        var aud1 = 'audio/'+e.target.innerHTML+'.mp3';

	  var audio = document.getElementById('audio');

 
        audio.src=aud1;

        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    }
	  }
 
 function updateAvat(e){
	 if (e.target !== e.currentTarget) {
        var img1 = 'images/'+e.target.innerHTML+'.png';
	  $(document).ready(function() {
		  
        $('#avat').attr('src',img1);
		 
	});
  }
 
    e.stopPropagation();
	 
 }

function addWord(e){
	 if (e.target !== e.currentTarget) {
        var cuvant = e.target.innerText;
	  $(document).ready(function() {
		  
        CKEDITOR.instances.my_text.insertText(cuvant);
		 
	});
  }
 
    e.stopPropagation();
	 
 }
 
  
function getDataFromEditor(){
	 var data = CKEDITOR.instances.my_text.getData();
	 document.getElementById('test').innerHTML = data;
	
}
