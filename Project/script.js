var data;
			
function checkmemory() {
	var getmemory = localStorage.getItem("data");
	if (getmemory) {
		var parseddata = JSON.parse(getmemory);
		for (i = 0; i < parseddata.length; i++) {
			createsticker(parseddata[i].index,parseddata[i].txt,parseddata[i].date);
		}
	}else{
		data=[];
	}
}
					
function save() {
	var thetxt = document.getElementById('describe').value,
		thedate = document.getElementById('selectdate').value,
		
		key = new Date().getTime(),
		newimgstick,
		newimgdelete,
		elemtxtarea,
		newdate,
		elemdatentime,
		newsticker,
		newtxt;
						
	if(thetxt != '' && thetxt != '!!PLEASE PROVIDE A DESCRIPTION AND A VALID DATE!!' && thetxt != 'Insert a description'
	&& thedate != '' && thedate != 'Date: dd / mm / yyyy'){
		var key = new Date().getTime();
		createsticker(key,thetxt,thedate);
		var getmemory = localStorage.getItem("data");
		if (getmemory) {
			var parseddata = JSON.parse(getmemory);					
			var objdata = {index:key, txt:thetxt, date:thedate};
			var position = parseddata.length;
			parseddata[position] = objdata;
			var strdata = JSON.stringify(parseddata);
			localStorage.setItem("data",strdata);
						
		}else{
			var objdata = { index:key, txt:thetxt, date:thedate};
			data[0] = objdata;
			var strdata = JSON.stringify(data);
			localStorage.setItem("data",strdata);
		}	
	}else{
		document.getElementById("describe").value = "!!PLEASE PROVIDE A DESCRIPTION AND A VALID DATE!!";
	}
}
					
								
function createsticker(thekey,txt,date){
	// the sticker s background image
	newimgstick = document.createElement('img');
	newimgstick.setAttribute('src', './imgs/notebg.png');
	newimgstick.className="notepic";
					
	// the sticker s delete icon
	newimgdelete = document.createElement('img');
	newimgdelete.setAttribute('src', './imgs/delete.png');
	newimgdelete.addEventListener('click', close);
	newimgdelete.className = "deletepic";
				
	// the description
	newtxt = document.createTextNode(txt);
	elemtxtarea = document.createElement('div');
	elemtxtarea.className = 'txtstick';
	elemtxtarea.appendChild(newtxt);
					
	// the date
	newdate = document.createTextNode(date);
	elemdatentime = document.createElement('div');
	elemdatentime.className = 'datentime';					
	elemdatentime.appendChild(newdate);
					
	// the whole sticker and append children
	newsticker = document.createElement('div');
	newsticker.className = 'sticker';
	newsticker.appendChild(newimgstick);
	newsticker.appendChild(newimgdelete);
	newsticker.appendChild(elemtxtarea);
	newsticker.appendChild(elemdatentime);
	newsticker.setAttribute('index', thekey)
			
	// create event mouseover/out				
	newsticker.addEventListener("mouseover",function(a){
		a.target.parentNode.childNodes[1].className = 'deletepic on';
	})
						
	newsticker.addEventListener("mouseout",function(a){
		a.target.parentNode.childNodes[1].className = 'deletepic';
	})	
					
	document.getElementById('stickersarea').appendChild(newsticker);
	document.getElementById("describe").value = "Insert a description";
	document.getElementById('selectdate').value = "Date: dd / mm / yyyy";
				
}
			
			
			
function close(a) {
	var thestick = a.target.parentElement;
	var indexdex = thestick.getAttribute('index');
				
	document.getElementById('stickersarea').removeChild(thestick);
	var getmemory = localStorage.getItem("data");
	var parseddata = JSON.parse(getmemory);
	for (i = 0; i < parseddata.length; i++) {
		if(parseddata[i].index == indexdex) {
			parseddata.splice(i, 1);
			var strdata = JSON.stringify(parseddata);
			localStorage.setItem("data",strdata);						
		}
	}
}