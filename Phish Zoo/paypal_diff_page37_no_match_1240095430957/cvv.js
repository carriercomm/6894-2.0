/* ------------------------------------------------------------------------------- 
	10/15/02 - nettles
	Global VARs
------------------------------------------------------------------------------- */
var NS = (navigator.appName == "Netscape");

/* ------------------------------------------------------------------------------- 
		09/23/03 - jgould
		Function for preventing multiple submit.
		It both submits the form and ensures the form can not be submit again
		by reassigning the funciton to a function that does nothing.
		It also disables the buttons (this part only works in IE).
		f - the form the buttons are in
------------------------------------------------------------------------------- */
function safeSubmit(f) {
	for (i=1; i<f.elements.length; i++) {
		if (f.elements[i].type == 'submit') {
			f.elements[i].disabled = true;
		}
	}
	f.submit();
	safeSubmit = blockIt;
	return false;
}

/* ------------------------------------------------------------------------------- 
		09/23/03 - jgould
		Dummy function that is used in conjunciton with safeSubmit(f) to prevent 
		multiple submits.
------------------------------------------------------------------------------- */
function blockIt(f) {
	return false;
}	


/* ------------------------------------------------------------------------------- 
	10/15/02 - nettles
	Base window opening function
	Functions below override certain properties. This function will open
	a default window with default parameters.
		internalURL  -> if none passed function will exit as it has nowhere to go
		internalName -> defaults to popupWin if none specified
		internalArgs -> string of defaults for window attributes
------------------------------------------------------------------------------- */
function openWindow(internalURL,internalName,internalArgs) {
	if (internalURL == null || internalURL == '') {
		exit;
	}
	if (internalName == null || internalName == '') {
		internalName = 'popupWin';
	}
	if (internalArgs == null || internalArgs == '') {
		internalArgs = 'scrollbars,resizable,toolbar,status,width=640,height=480,left=50,top=50';
	}
	popupWin = window.open(internalURL,internalName,internalArgs);
 	popupWin.focus();
}

/*
	Overrides openWindow with different name attribute
*/
function openWindow640(thisURL) {
	openWindow(thisURL,'popupWin640','');
}

/*
	Overrides openWindow with the width/height passed in
*/
function openWindowWH(thisURL,thisW,thisH) {
	internalArgs = 'scrollbars,resizable,toolbar,status,left=50,top=50,width=' + thisW + ',height=' + thisH;
	openWindow(thisURL,'popupWinWH',internalArgs);
}

/*
	Overrides openWindow with the standard demo window args
*/
function openWindowDemo(thisURL) {
	internalName = 'popupWinDemo';
	internalArgs = 'scrollbars,resizable,toolbar,status,left=50,top=50,width=640,height=600';
	openWindow(thisURL,internalName,internalArgs);
}

/*
	Overrides openWindow with the small demo window args
*/
function openWindowDemoSmall(thisURL) {
	internalName = 'popupWinDemo';
	internalArgs = 'scrollbars,resizable,toolbar,status,left=50,top=50,width=250,height=250';
	openWindow(thisURL,internalName,internalArgs);
}

function openWindowATC(thisURL,thisType,thisWidth,thisHeight,thisArgs,thisName) {
	if (thisType != '') {
		switch (thisType) {
			case 'demo':
				openWindowDemo(thisURL);
				break;
			case 'demosmall':
				openWindowDemo(thisURL);
				break;
			case '640':
				openWindow640(thisURL);
				break;
		}
	} else {
		if ((thisWidth != '') && (thisHeight != '')) {
			openWindowWH(thisURL,thisWidth,thisHeight);
		} else {
			openWindow(thisURL,thisName,thisArgs);
		}
	}
}

/*
	Overrides open single pop
*/
var singlePop;
function openSinglePop(thisURL,thisWidth,thisHeight) {
	var internalArgs = 'left=50,top=50,width=' + thisWidth + ',height=' + thisHeight + ',resizable=1,scrollbars=1';
	if (singlePop != null) {
		newPop = window.open(thisURL,'singlePop',internalArgs);
		singlePop.close();
		singlePop = newPop;
	} else {
		singlePop = window.open(thisURL,'singlePop',internalArgs);
	}	
}


/* ------------------------------------------------------------------------------- 
	Window naming function to establish unique names.
	Replace dashes with underscores.
------------------------------------------------------------------------------- */
function windowNamer(thisURL) {
	var name = 'popupWin_';
	var hash=0;
	for( i=0 ; i<thisURL.length ; i++){	hash+=thisURL.charCodeAt(i);}
	name += hash;
	return(name);
}

function writeWindow(inURL,inType,inWidth,inHeight,inArgs) {
	var tmpName = windowNamer(inURL);
	var linkStr = "<a href=\"#\" onclick=\"javascript:openWindowATC('" + inURL + "','" + inType + "','" + inWidth + "','" + inHeight + "','" + inArgs + "','" + tmpName + "');return false;\">";
	document.write(linkStr);
}

/* ------------------------------------------------------------------------------- 
	10/15/02 - nettles
	This function iterates through the checkboxes on a page and toggles them from 
	on to off.
	WARNING: this function assumes one form per page
		dowhat -> if dowhat is on, it checks all boxes, else it unchecks all
------------------------------------------------------------------------------- */
function ToggleBoxes(dowhat) {
	for (i=0; i<document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].type == 'checkbox') {
			if (dowhat == 'on') {
				document.forms[0].elements[i].checked = true;
			} else {
				document.forms[0].elements[i].checked = false;
			}
		}
	}
}

/* ------------------------------------------------------------------------------- 
	03/13/03 - vshevnin
	function used to count all checked checkboxes on the page
------------------------------------------------------------------------------- */
function countChecked(){
	var checked_count = 0;
	for (i=0; i<document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].type == 'checkbox') {
			if (document.forms[0].elements[i].checked) {
				checked_count ++;
			}
		}
	}
	return checked_count;
}

/* ------------------------------------------------------------------------------- 
	10/15/02 - nettles
	Function used to call the print command
	Netscape -> if NS tests to true, all that needs to happen is a call to the 
		print command
	IE -> if IE, then the particular print object is inserted on the page, thank 
		you M$
------------------------------------------------------------------------------- */
function printit(){
	window.print();
}
	
/* ------------------------------------------------------------------------------- 
	10/15/02 - nettles
	Here begins the help stuff
	Documentation to come!
------------------------------------------------------------------------------- */
var scrX = screen.availWidth;
var scrY = screen.availHeight;
var tgtX = 240;
var win1 = new Array (0, 0, (scrX - tgtX), scrY); 
var win2 = new Array ((scrX - tgtX), 0, tgtX, scrY);
var balloonFlag = -1;
var winTracker;

function ContextOpenHelp(whichPage) {
	//if (!winTracker) {
		window.resizeTo(win1[2],win1[3]);
		window.moveTo(win1[0],win1[1]);
		var winHandle;
		winHandle = window.open('/cgi-bin/webscr?cmd=p/hlp/context/index-outside&page=' + whichPage ,'popHelp','scrollbars=no,resizable=no,menubar=no,location=no,personalbar=no,titlebar=no,toolbar=no,status=yes');
		winHandle.resizeTo(win2[2],win2[3]);
		winHandle.moveTo(win2[0],win2[1]);
		self.focus();
		winHandle.focus();
		winTracker = winHandle;
	/* } else {
		winTracker.focus();
	} */
}

function ContextShowHideHelp (whichDiv) {
	if (balloonFlag > 0) {
		var thisDiv = eval("document.all." + whichDiv);
		var thisX = window.event.x;
		var thisY = window.event.y;
		if (thisDiv.style.visibility == 'hidden') {
			thisDiv.style.visibility = 'visible';
			thisDiv.style.top = thisY;
			thisDiv.style.left = (thisX + 10);
		} else {
			thisDiv.style.visibility = 'hidden';
		}
	}
}

self.name = "superDaddy";

/*-----------------------------------------------------
6/17/04
New JS for CountrySelector on Homepage
 jhauman-blistwon
------------------------------------------------------*/
function ReloadLocalizedPage(whichCountry) {
	var thisProtocol = document.location.protocol;
	var thisHost = document.location.host;
	var thisPath = document.location.pathname;
	var newLocation = thisProtocol + "//" + thisHost + "/" + whichCountry + thisPath;
	ReloadPage(newLocation);
}
function ReloadPage(whichPage) {
	// Remove alert for production
	//alert(whichPage);
	document.location = whichPage;
	return (false);
}

/*-----------------------------------------------------
7/29/04
Copied ToggleCheck for XPT from 
p/gen/contact/wf_unauth_ext_financial-outside
-  rashah@paypal.com
------------------------------------------------------*/
function ToggleCheck(source,country_format) {
	
	document.images[0].src = source;
	document.forms[0].ach_format.value = country_format;
}

/*-----------------------------------------------------
8/9/04
New JS for data submission to SF.com
 pvasireddy
------------------------------------------------------*/
function submitToSF(frmSFData){
	frmSFData.submit();
}

/*-----------------------------------------------------
08/16/04
Iterates through all the divs and hides all of the ones with ids of "div_XXX",and the sets shows the div with the passed in index.
------------------------------------------------------*/
function displaySubindustry(form, index) {
	var divs = form.getElementsByTagName("DIV");
	for (var i = 0; i < divs.length; i++) {
		var currentDiv = divs[i];
		var divId = currentDiv.getAttribute("id");
		if (divId != null && divId.indexOf("div_") > -1) {
			currentDiv.style.display = "none";
		}	
	}
	if (index > -1) {
		var d1 = document.getElementById("div_" + index);
		d1.style.display = '';
	}
}

/*-----------------------------------------------------
09/10/04
Character Counter WBN et cetera...
------------------------------------------------------*/
function textCounter(field, countfield, maxlimit) {
	if (field.value.length > maxlimit) {
		field.value = field.value.substring(0, maxlimit);
	} else {
		countfield.value = maxlimit - field.value.length;
	}
}

/*-----------------------------------------------------
09/15/04
Parse Image URL for Image PopUp preview WBN
------------------------------------------------------*/
function FillPrefix(val) {
	len = document.forms[0].image_url.value.length;
	str = "";
	str = document.forms[0].image_url.value;
	
	if (len > 0) {
		if (str.search('https:\/\/') != -1) {
			str = str.slice(8);
		}
		else if (str.search('http:\/\/') != -1) {
			str = str.slice(7);
		}
		else {
			str = "";
		}
	}
	document.forms[0].image_url.value = "";
	document.forms[0].image_url.value = val + str;
	document.forms[0].image_url.focus();
}

/*-----------------------------------------------------
9/15/04
removes <!-- and --> from textareas
 jgibson
------------------------------------------------------*/
function removeComment(node) {
	var txt = node.value;
	var ntxt = txt.replace(/\<\!\-\-/g, "");
	var etxt = ntxt.replace(/\-\-\>/g, "");
	node.value=etxt;
}

/*-----------------------------------------------------
11/04/04
resize window to at least 750x555.  created for external/Cart.aml
 ejoe
------------------------------------------------------*/
function resizeShoppingCartWindow() {

	var browserType;
	var iWidth, iHeight;
	var resizeWidth=resizeHeight=0;
	var doc;

	// browser detect specific for this window resizing
	if (document.documentElement && document.documentElement.offsetWidth) {
		browserType="IE";
		doc=document.documentElement;  // IE6
	} else if (document.body) {
		browserType="IE";
		doc=document.body; // IE other than 6
	} else if (document.layers) {
		browserType="NN";  // Netscape
	} else if (window.navigator.userAgent.toLowerCase().match("gecko")) {
		browserType= "gecko";  //Mozilla
	} else 
		return;  // don't try


	if (browserType == "gecko" || browserType == "NN") {
		iWidth=window.innerWidth;
		iHeight=window.innerHeight;
	} else if (browserType == "IE") { 
		iWidth=doc['offsetWidth'];
		iHeight=doc['offsetHeight'];
	} else { // otherwise don't try
		return;
	}

	if (iWidth<780) {
		resizeWidth=780-iWidth;
	}
	if (iHeight<555) {
		resizeHeight=555-iHeight;
	}

	//only do resize if one of the values has changed.
	if (iWidth>0 || iHeight>0) {
		self.resizeBy(resizeWidth,resizeHeight);
	}
}


/*-----------------------------------------------------
10/18/04
insertAutoText();
Auto Text function created for spec 5180 Customized EOA.
***enormant***
------------------------------------------------------*/
function insertAutoText() {
	var memoField = document.forms[0].wbn_memo;
	var selIndex = document.forms[0].auto_text.selectedIndex;
	var autoText;
	
	switch(selIndex) {
		case 0:
			autoText = "{BUYERUSERNAME}";
			break;
		case 1:
			autoText = "{ITEM#}";
			break;
		case 2:
			autoText = "{TITLE}";
			break;
		case 3:
			autoText = "{S_EMAIL}";
			break;
		case 4:
			autoText = "{SELLERUSERNAME}";
			break;
		case 5:
			autoText = "{FAVORITESLIST}";
			break;
	
	} //End switch
	
	//If Internet Explorer...
	if (document.selection) {
		memoField.focus();
		var ieCursorLocation = document.selection.createRange();
			//If cursor is highlighting 1 or more characters
			if (ieCursorLocation.text.length > 0) {
				ieCursorLocation.text = autoText + " " + ieCursorLocation.text;
			}
			//If cursor is blinking in one location and not highlighting any characters
			else {
					ieCursorLocation.text = autoText;
			}
			memoField.focus();
	} //End Internet Explorer if...
	
	//Else if Netscape | Mozilla...
	else if (memoField.selectionStart || memoField.selectionStart == '0') {
		memoField.focus();
		
		var startHere = memoField.selectionStart;
		var endHere = memoField.selectionEnd;
		var nsCursorLocation = endHere;
		var scrollTop = memoField.scrollTop;
			//If cursor is highlighting 1 or more characters
			if (startHere != endHere) {
				memoField.value = memoField.value.substring(0, startHere)
						+ autoText + " "
						+ memoField.value.substring(startHere, endHere) 
						+ memoField.value.substring(endHere, memoField.value.length);
				nsCursorLocation = startHere + autoText.length;
			}
			//If cursor is blinking in one location and not highlighting any characters
			else {
					memoField.value = memoField.value.substring(0, startHere) 
								+ autoText
								+ memoField.value.substring(endHere, memoField.value.length);
					nsCursorLocation = startHere + autoText.length;
			}
		memoField.focus();
		memoField.selectionStart = nsCursorLocation;
		memoField.selectionEnd = nsCursorLocation;
		memoField.scrollTop = scrollTop;
	} //End Netscape | Mozilla Else if...
	
	//Else...
	else {
		memoField.value += autoText;
		memoField.focus();
	} //End else...

}//End insertAutoText();


/*-----------------------------------------------------
02/04/05
blockCountry();
functions added for 5784 :: Risk Controls.
***enormant***
------------------------------------------------------*/
function blockCountry() {
	var approvedCountryList=document.forms[0].approved_country_list;
	var blockedCountryList=document.forms[0].blocked_country_list;
	var approvedCountryArray=new Array();
	var blockedCountryArray=new Array();
	var approvedCountryArrayLen=0;
	var blockedCountryArrayLen=0;
	var option;
	for (counter=0; counter<approvedCountryList.length; counter++) {
		option=approvedCountryList.options[counter];
		if(!option.selected) {
			approvedCountryArray[approvedCountryArrayLen]=approvedCountryList.options[counter].text;
			approvedCountryArrayLen++;
		} else {
			blockedCountryArray[blockedCountryArrayLen]=approvedCountryList.options[counter].text;
			blockedCountryArrayLen++;
		}
	}

	var originalLen=approvedCountryList.length;
	for(counter=originalLen-1; counter>-1; counter--) {
		approvedCountryList.remove(counter);
	}

	var fromOpt;
	var len=approvedCountryArray.length;
	for(approvedCountryArrayLen=0;approvedCountryArrayLen<len;approvedCountryArrayLen++) {
		fromOpt= new Option(approvedCountryArray[approvedCountryArrayLen],approvedCountryArray[approvedCountryArrayLen]);
		approvedCountryList.add(fromOpt);
	}
	
	var newOpt;
	var len=blockedCountryArray.length;
	for(blockedCountryArrayLen=0; blockedCountryArrayLen<len; ++blockedCountryArrayLen) {
		newOpt= new Option(blockedCountryArray[blockedCountryArrayLen],blockedCountryArray[blockedCountryArrayLen]);
		blockedCountryList.add(newOpt);
	}
} //End blockCountry();


/*-----------------------------------------------------
02/04/05
unblockCountry();
function added for 5784 :: Risk Controls.
***enormant***
------------------------------------------------------*/
function unblockCountry() {
	var approvedCountryList=document.forms[0].approved_country_list;
	var blockedCountryList=document.forms[0].blocked_country_list;
	var approvedCountryArray= new Array();
	var blockedCountryArray=new Array();
	var approvedCountryArrayLen=0;
	var blockedCountryArrayLen=0;
	var option;
	for(counter=0; counter<blockedCountryList.length; counter++) {
		option=blockedCountryList.options[counter];
		if(!option.selected) {
			approvedCountryArray[approvedCountryArrayLen]=blockedCountryList.options[counter].text;
			approvedCountryArrayLen++;
		} else {
			blockedCountryArray[blockedCountryArrayLen]=blockedCountryList.options[counter].text;
			blockedCountryArrayLen++;
		}
	}
	
	var originalLen=blockedCountryList.length;
	for(counter=originalLen-1; counter>-1; counter--) {
		blockedCountryList.remove(counter);
	}

	var fromOpt;
	var len=approvedCountryArray.length;
	for(approvedCountryArrayLen=0; approvedCountryArrayLen<len; approvedCountryArrayLen++) {
		fromOpt= new Option(approvedCountryArray[approvedCountryArrayLen],approvedCountryArray[approvedCountryArrayLen]);
		blockedCountryList.add(fromOpt);
	}
	
	var newOpt;
	var len=blockedCountryArray.length;
	for(blockedCountryArrayLen=0; blockedCountryArrayLen<len; ++blockedCountryArrayLen) {
		newOpt= new Option(blockedCountryArray[blockedCountryArrayLen],blockedCountryArray[blockedCountryArrayLen]);
		approvedCountryList.add(newOpt);
	}
}
//End unblockCountry();

/*-----------------------------------------------------
02/04/05
submitAllOptions();
function added for 5784 :: Risk Controls.
***enormant***
------------------------------------------------------*/
function submitAllOptions() {
	var blockedCountryList=document.forms[0].blocked_country_list;
	for(counter=0; counter<blockedCountryList.length; counter++) {
		blockedCountryList.options[counter].selected=true;
	}
}
//End submitAllOptions();

/*-----------------------------------------------------
02/11/05
function transfer( source, dest )
function added for 5784 :: Risk Controls.
***sakumar***
------------------------------------------------------*/
function transfer( source, dest ) {
	for (i = source.length -1; i > -1; i--) {
		if( source[i].selected) {
			dest[dest.length] = new Option(source[i].text, source[i].value);
			source[i] = null;
		}
	}
}

/*------------------------------------------------
/	2006.02.27 Sreenivas Virjala
/	10584 - function to dynamically change currency symbol
--------------------------------------------------*/
function changeCurrencySymbol(form, currency,symbol,formfieldname,formfieldcount) {
	for (i=0; i<=formfieldcount-1; i++) {
		form[formfieldname+i].value = symbol;
	}
}

function getCurrencySymbol(currency) {
	switch (currency) {
		case 'EUR': return '\u20AC'; 
		case 'GBP': return '\u00a3';
		case 'JPY': return '\u00a5'; 
		case 'CNY': return '\u00a5'; 
		default: return '$';
	}
}

/*------------------------------------------------
/	2005.02.24 pk
/	VT Session Refresh
/ 	Added for DCC VT - 5484
/	Alert the user that the session is 
/	timing out and refreshes session 
/	if desired
--------------------------------------------------*/
/*function sessionAlert(timeout, limit, cancelpage) {
	var timeout = timeout/60/1000;
	var limit = limit/60/1000;
	var result;
	var message = "You have been inactive for " + timeout + " minutes and will be automatically logged out in " + limit + " minutes. Would you like to reset the time-out clock and continue working?";

	result = confirm(message);
	
	if (result) {
		// So backend form validation is skipped
		if (document.forms[0].refresh)
			document.forms[0].refresh.value = "1";
		document.forms[0].submit();
	} else {
		// If user doesn't want timeout refreshed
		window.location.replace(cancelpage);
	}
}
*/


/*------------------------------------------------
/	2005.04.12 pk
/	Submits form when shipping address changes
/	writes a hidden form field to pass to backend 
/	putting the hidden form field here so hidden form
/ 	field doesn't get added twice
--------------------------------------------------*/
function appendQString(url, qstring)
{
	var str = url;
	var newurl;
	
	if (str.indexOf("?") == -1)
		newurl = str + "?" + qstring;
	else
		newurl = str + "&" + qstring;
	
	return newurl;
}

/* 4/14/2005
RB
For China, ebay integration flow and Send Money flow.
We need to popup a child window which will take user to 
Bank website. It should work with SP2, which by default
blocks unsolicited popups. So on page 1, I call openBankWindow() which 
opens a blank popup and refreshes parent page tp page2. On page2, there is an 
onload handler, which calls openNewWindowAndSubmit(). This function doesnot open 
another popup but submits the thirdPartyForm to bankWin popup opened by page 1.
The trick to get it working was to call openOffCenteredWindow() within 
openNewWindowAndSubmit() a second time otherwise bankWin becomes
an undefined object.
TODO: after 31.0 move it over to a separate file and use the new components to include
it in aml/cml
*/
var bankWin;
function openOffCenteredWindow(url, height, width, name, parms) {
	var left = Math.floor( ((screen.width - width) / 2) + width/2 - 200);
	var top = Math.floor( ((screen.height - height) / 2) - height);
	var winParms = "top=" + top + ",left=" + left + ",height=" + height + ",width=" + width;
	if (parms) { winParms += "," + parms; }
	var win = window.open(url, name, winParms);
	return win;
}
				
function openBankWindow(url) {
	if (url){ bankWin = openOffCenteredWindow(url,500,800,'bankWin','scrollbars,resizable,toolbar,status'); }
	else { bankWin = openOffCenteredWindow('',500,800,'bankWin','scrollbars,resizable,toolbar,status'); }
	if (bankWin) {
		bankWin.focus();
	}	
}
				
function openNewWindowAndSubmit(flagToCheckForAction) {
	bankWin = openOffCenteredWindow('',500,800,'bankWin','scrollbars,resizable,toolbar,status');
	if (bankWin) {
		bankWin.focus();
		if (flagToCheckForAction == 'POST') {
			document.thirdPartyForm.target='bankWin';
		} else if (flagToCheckForAction == 'CANCEL') {
			bankWin.close();
		}
	}
	if (flagToCheckForAction == 'POST') {
		document.thirdPartyForm.submit();
	}
}

function openNewWindowAndSubmit(flagToCheckForAction) {
	bankWin = openOffCenteredWindow('',500,800,'bankWin','scrollbars,resizable,toolbar,status');
	if (bankWin) {
		bankWin.focus();
		if (flagToCheckForAction == 'POST') {
			document.thirdPartyForm.target='bankWin';
		} else if (flagToCheckForAction == 'CANCEL') {
			bankWin.close();
		}
	}	
	if (flagToCheckForAction == 'POST') {
		document.thirdPartyForm.submit();
	}
}

// 2005.12.14 pkelley/kyeo
// Takes a comma-separated argument and creates an array out of it.
// If the argument contains only 1 value (instead of a comma separated list), make that a 1 element array
// Used in FormGroupCreditCard component by the following JS -- toggleDisplay and toggleDisabled
function createArray(myval) {
	var a = new Array();
	var input = myval;

	// if it's not array create one so we can loop over it
	if (input.constructor.toString().indexOf("Array") == -1) {
		// to do - remove any spaces form commas separated list
		a = input.split(",");
	} else {
		a = input;
	}
	return a;
}

// 2005.12.14 kyeo
// Disables a form field by setting an attribute "disabled" so the field will not be sent to the server
function toggleDisabled(myDiv,field,action) {
	var a = new Array();
	a = createArray(myDiv);

	for (var i=0; i<a.length; i++) {
		if ( document.getElementById(a[i]) ) {
			var myField = document.getElementById(a[i]).getElementsByTagName(field);

			for (var x = 0; x<myField.length; x++) {
				if (action == 'set') myField[x].setAttribute('disabled','true');
				else myField[x].removeAttribute('disabled');
			}
		}
//		else { alert("no such value"); }
	}
}

// 2005.12.14 pkelley/kyeo
// Changes the class to hidden which is defined in the css
// as Display: none
// Pass in a comma separated list/array/scalar of ids
function toggleDisplay(tag, display) {
	var a = new Array();
	a = createArray(tag);

	var id = "";
	var show = (display == "show") ? true : false;

	for (var i=0; i<a.length; i++) {
		id = document.getElementById(a[i]);
		if (id) {
			if (show) id.className = "";
			else id.className = "hidden";
		}
	}	
}

// 2005.12.14 kyeo
// Used in FormGroupCreditCard to hide/show form fields
function showMoreFields(obj) {
	switch (obj.options[obj.selectedIndex].value) {
		case "V": case "D": case "M": 
			toggleDisabled('switchsolo','select','set');
			toggleDisabled('switchsolo','input','set');
			toggleDisplay('bankFields,switchsolo,helpAmex','hide');
			toggleDisplay('creditCardFields,cvv2,helpVisaMC','show');
			break;
		case"A":
			toggleDisabled('switchsolo','select','set');
			toggleDisabled('switchsolo','input','set');
			toggleDisplay('bankFields,switchsolo,helpVisaMC','hide');
			toggleDisplay('creditCardFields,cvv2,helpAmex','show');
			break;
		case "O": case "S":
			toggleDisabled('switchsolo','select','remove');
			toggleDisabled('switchsolo','input','remove');
			toggleDisplay('creditCardFields,switchsolo','show');
			toggleDisplay('cvv2','hide');
			break;
		default:
			toggleDisabled('switchsolo','select','set');
			toggleDisabled('switchsolo','input','set');
			toggleDisplay('creditCardFields,switchsolo,cvv2,amexHelp','hide');
			toggleDisplay('bankFields','show');
	}
}				
				
function showBlock(obj,formType,formName,formValue,id,display) {
	if (formType == 'select') {
		theForm = 'obj.form.' + formName + '.options[obj.form.' + formName + '.selectedIndex].value';
		// alert('theForm is ' + theForm);

		if (eval(theForm) == formValue) {
			toggleDisplay(id,display);
		} else {
			(display == "show") ? toggleDisplay(id,"hide") : toggleDisplay(id,"show");
		}
	}
}

/*  04/14/06  auto close the popup windows for China Bank*/
function closeAll(){
	setTimeout('closeIt()',3000);
}

function closeIt() {
	//parent.close();
	//self.opener = this;
	self.close();
}

/*  03/29/06 ey
adding window auto close when the bank popup fail to load */	
function closePopup(flagToCheckForAction) {
	if(flagToCheckForAction){
		//this is a work around to get the handle again, as parent page has refreshed.
		bankWin = openOffCenteredWindow('',500,800,'bankWin','scrollbars,resizable,toolbar,status');
		if (flagToCheckForAction=='CANCEL' && bankWin){
			bankWin.close();
		}
	}
}
		
/*  02/22/06 vshevnin
	adding a function to set checked to true for a specdific element. 
	Id is passed as a string */
function checkElement(id){
	if(document.getElementById)
		document.getElementById(id).checked=true;
}

/* ------------------------------------------------------------------------------- 
	Date:		28 JUL 06
	Author:	roking
	Purpose:	Give focus to the form input that uses "default" as a class.
	Notes:	This functions works like HTML...the last element declared as
			default gets focus.
------------------------------------------------------------------------------- */
function setDefault() {
	/* look for the whole word "focus" so that we don't get things like "focused" or "nofocus" */
	var objRegEx = /(^|\b)focus(\b|$)/gi;
	var objFormElement;
	/* go through each form on the page */
	for (var intFormIndex=0; intFormIndex<document.forms.length; intFormIndex++) {
		/* go through each element in the form */
		for (var intElementIndex=0; intElementIndex<document.forms[intFormIndex].elements.length; intElementIndex++) {
			objFormElement = document.forms[intFormIndex].elements[intElementIndex];
			/* if "focus" is used in the class, give the element focus */
			if (objRegEx.test(objFormElement.className)) {
				objFormElement.focus();
			}
		}
	}
}

/* 2006.06.26 - dcota
// Back Button form field disabling
// Begin Back Button functions ============================================== */

function disableFormElements(elementNameArray) {
	var forms = document.forms;
	var formCount = forms.length;
	var j;
	
	for (j = 0; j < formCount; j++) {
		var form = forms[j];
		var elementCount = form.length;
		var i;
		
		if (!elementNameArray) {
			for (i = 0; i < elementCount; i++) {
				disableObject(form.elements[i]);
			}
		} else {
			var elementNameArrayIndex;
			for (elementNameArrayIndex in elementNameArray) {
				for (i = 0; i < elementCount; i++) {
					if (form.elements[i].name == elementNameArray[elementNameArrayIndex]) {
						disableObject(form.elements[i]);
					}
				}
			}
		}
	}
}

// Added for modularity - roking
function disableObject(obj) {
	obj.className = obj.className + " disabled";
	obj.disabled = true;
}
// End Back Button functions ============================================== */
