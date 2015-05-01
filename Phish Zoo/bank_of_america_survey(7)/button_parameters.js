var lpdbButtonName;
if (typeof(lpdbButtonName)=="undefined") {
	lpdbButtonName = lpUASunit + "-" + lpUASlanguage;	
} 

var lpdbButtonRoom;
if (typeof(lpdbButtonRoom)=="undefined") {
	lpdbButtonRoom = lpUASunit + "-" + lpUASlanguage;	
}

var lpUASrepOnlineButtonImageName;
var lpUASrepOfflineButtonImageName;
var lpUASrepOccupiedButtonImageName;
if (typeof(lpUASrepOnlineButtonImageName)=="undefined"){
	lpUASrepOnlineButtonImageName = "reponline.gif";
}

if (typeof(lpUASrepOfflineButtonImageName)=="undefined"){
	lpUASrepOfflineButtonImageName = "repoffline.gif";
}

if (typeof(lpUASrepOccupiedButtonImageName)=="undefined"){
	lpUASrepOccupiedButtonImageName = "repoccupied.gif";
}


var lpdbButtonContext = lpUAScontext;

if (lpUASunit.indexOf("((shared))")==0) {
	lpdbButtonName=lpdbButtonName.substring("((shared))".length,lpdbButtonName.length+1);
	lpdbButtonContext="((shared))"+lpdbButtonContext;
}

var lpdbButtonImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/" + lpUASrepOnlineButtonImageName; 
var lpdbAlternateButtonBusyImageURL = lpUASimagesPath +	"/" + lpUASbuttonImagesFolder + "/" + lpUASrepOccupiedButtonImageName;
var lpdbAlternateButtonOfflineImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/" + lpUASrepOfflineButtonImageName;

var lpUASalternateButtonImageName;
if (typeof(lpUASalternateButtonImageName)=="undefined") {
	lpUASalternateButtonImageName = "transparent-image.gif";
}
var lpdbAlternateImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/" + lpUASalternateButtonImageName;


function lpdbAlternateFunctionDefault() {
	window.open(lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/service_temporarily_unavailable.html"); 
}
if (typeof(lpUASalternateButtonFunction)!="undefined") {
	lpdbAlternateFunction=lpUASalternateButtonFunction;
} else {	
	lpdbAlternateFunction=lpdbAlternateFunctionDefault;
}

var lpdbRefreshRate;
if (typeof(lpdbRefreshRate)=="undefined")
	lpdbRefreshRate=-1;

var lpdbSSL;
if (typeof(lpdbSSL)=="undefined")
	lpdbSSL=true;

/* 
NOTE: Optional - Define width and height for button image 
      In the code below you may provide BOFA-wide button image height/width (in pixels)	
*/
if (typeof(lpdbButtonImageHeight)=="undefined" || lpdbButtonImageHeight.indexOf('<')>=0)
	lpdbButtonImageHeight = "<BOFA-wide button image height>";
if (typeof(lpdbButtonImageWidth)=="undefined" || lpdbButtonImageWidth.indexOf('<')>=0)
	lpdbButtonImageWidth = "<BOFA-wide button image width>";

