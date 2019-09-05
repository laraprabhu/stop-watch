
/*  CODE WRITTEN BY : RAJAPRABHU A [Lead programmer]
 *  
 *  Started on   : 18-09-2013 22:30
 *  Completed on : 20-09-2013 01:30
 *  Please exclude the office hours  09:30 - 20:30
 *  
 *  Jquery was used here to implement the animation concept only. Just 2 lines.
 */


//------div selectors----------
var xLiMillisec = null;
var xDivHours = null;
var xDivMinutes = null;
var xDivSeconds = null;
//------div selectors----------

//------variables for calculations------
var xStartedTime = null; 
var xCurrentTime = null;
var xValueHolder = 0;
var xDigitChecker = null;
//------variables for calculations------

var xInterval = null; //variable to hold timer

window.onload = function(){
InitialSetup();      //Initial setting
}

function InitialSetup()
{
	//----selecting necessary elements [This will restrict us to use document.getElementById all the time]--------
	xLiMilliSec = document.getElementById("LiMilliSec");
	xDivHours = document.getElementById("DivHours"); 
	xDivMinutes = document.getElementById("DivMinutes");
	xDivSeconds = document.getElementById("DivSeconds");
	//------------
	
	//------Adding handlers for the buttons(LIST ITEMS)------
	document.getElementById("LiStart").addEventListener("click", startWatch, false);
	document.getElementById("LiStop").addEventListener("click", stopWatch, false);
	document.getElementById("LiSplit").addEventListener("click", splitWatch, false);
	document.getElementById("LiClear").addEventListener("click", clearWatch, false);
	//---------------
	
}


function startWatch()
{	
	//-----Check the Timer is not null, then proceed to set the started time and start the timer--------
	if(xInterval == null)
		{
			xStartedTime = new Date().getTime();
			//~~~~~~Will be Running in 40 FPS
			xInterval = window.setInterval(Tick, 40);	
		}
	//---------------------------------------------
}

function flushTimer()
{
	//---clear the timer and set its default value null---
	clearInterval(xInterval);
	xInterval = null;
	//--------------
}

function splitWatch()
{
	//---Ensure whether the timer is running or not. if yes, then set the current timings to a span and add it to the div.
	if(xInterval != null)
	{
		var span = document.createElement("span");
		span.innerHTML =  xDivHours.innerHTML + " : " + xDivMinutes.innerHTML + " : " + xDivSeconds.innerHTML + " : " + (+(xLiMilliSec.innerHTML)%1000) + "<br>";
		document.getElementById("DivSplittedResult").appendChild(span);
	}
	//-----------------------
}

function clearWatch()
{
	//-----Clear the timer and then set default values to all the elements which are in display.
	flushTimer();
	
	xValueHolder = 0;
	xLiMilliSec.innerHTML = "0.0";
	document.getElementById("DivSplittedResult").innerHTML = "";
	xDivHours.innerHTML = "00";
	xDivMinutes.innerHTML = "00";
	xDivSeconds.innerHTML = "00";
	//--------------------------------------------
}

function stopWatch()
{	
	//----Clear the timer and store the current millisecond in order to continue the process later
	 flushTimer();
	 xValueHolder = +xLiMilliSec.innerHTML;	 
	//-------
}

function Tick()
{
	
	//----Get the current time, which means get the time for each tick event occurs
	xCurrentTime = new Date().getTime();
	//-----
	
	
	//~~~~~~~~~~If xValueHolder > 0 then we can tell that the timer is in pause mode
	if(xValueHolder > 0) 
	{
		//--##--Formula: xStopped MilliSecond + (CurrentTick's time - Current process started time)
		xLiMilliSec.innerHTML =  xValueHolder + (xCurrentTime - xStartedTime);
	}
	else
	{
		//--##--Formula: (CurrentTick's time - Current process started time)
		xLiMilliSec.innerHTML = xCurrentTime - xStartedTime;
	}
	//~~~~~~~~~~

	
	//~~~~~~~Formula for hour calc. : ((Millisec/1000)/3600) % 60
	xDigitChecker = (Math.floor((+(xLiMilliSec.innerHTML) / 1000) / 3600 ) % 60) + "";
	
	    //---If change detected in hour then display the new value
		if(+(xDigitChecker) > +(xDivHours.innerHTML))
			{
				AnimateHours();
			}
		//------
	//~~~~~~~~~~
	
	
	//~~~~~~~Formula for minute calc. : ((Millisec/1000)/60) % 60	
	xDigitChecker = (Math.floor((+(xLiMilliSec.innerHTML) / 1000) / 60 ) % 60) + "";
	
		//---If change detected in minute then display the new value
		if(+(xDigitChecker) > +(xDivMinutes.innerHTML) || (+(xDigitChecker)==0 && +(xDivMinutes.innerHTML) == 59))
			{
				AnimateMinutes();
			}
		//---
	//~~~~~~~~~~
	
		
	//~~~~~~~Formula for second calc. : (Millisec/1000) % 60
	xDigitChecker = (Math.floor(+(xLiMilliSec.innerHTML) / 1000) % 60) + "";
	
		//---If change detected in second then display the new value
		if(+(xDigitChecker) > +(xDivSeconds.innerHTML) || (+(xDigitChecker)==0 && +(xDivSeconds.innerHTML) == 59))
			{
				AnimateSeconds();
			}
		//-------
	//~~~~~~~~~~
		
}

function AnimateHours()
{
	//~~~set the id as disposable for the div which is going to be deleted
	xDivHours.id = "DisposableHour";
	//~~~get the div which is present below the displaying div (Reserved div) | DivCollection[0] : div is in visible state ; DivCollection[1] : div is in hidden state 
	xDivHours = document.getElementById("DivHourContainer").getElementsByTagName("div")[1];
	//~~~change the reserved divs id to the cyrrent div's id
	xDivHours.id = "DivHours"
	//~~~~~set the hour value in two digit format i.e] 0-9 then append a 0 before it.	
	xDivHours.innerHTML = (xDigitChecker.length == 1)? "0"+xDigitChecker : xDigitChecker;
	//~~~animate the reserved div to the displaying div position and then remove the same.
	$("#DisposableHour").animate({"height":0},400,function(){ $(this).remove(); });
	
	//~~~~Now add a reserved div to continue the cyclic process.
	var div = document.createElement("div");
	div.className = "NumberSettings";
	document.getElementById("DivHourContainer").appendChild(div);
	//~~~~~~~~
}


//------please refer the AnimateHours function to understand the below
function AnimateMinutes()
{
	xDivMinutes.id = "DisposableMinute";
	xDivMinutes = document.getElementById("DivMinutesContainer").getElementsByTagName("div")[1];
	xDivMinutes.id = "DivMinutes"	
	xDivMinutes.innerHTML = (xDigitChecker.length == 1)? "0"+xDigitChecker : xDigitChecker;
	$("#DisposableMinute").animate({"height":0},400,function(){ $(this).remove(); });
	var div = document.createElement("div");
	div.className = "NumberSettings";
	document.getElementById("DivMinutesContainer").appendChild(div);
}

//------please refer the AnimateHours function to understand the below
function AnimateSeconds()
{
	xDivSeconds.id = "DisposableSecond";
	xDivSeconds = document.getElementById("DivSecondsContainer").getElementsByTagName("div")[1];
	xDivSeconds.id = "DivSeconds"
	xDivSeconds.innerHTML = (xDigitChecker.length == 1)? "0"+xDigitChecker : xDigitChecker;
	$("#DisposableSecond").animate({"height": 0},400,function(){ $(this).remove(); });
	var div = document.createElement("div");
	div.className = "NumberSettings";
	document.getElementById("DivSecondsContainer").appendChild(div);
}

