//////////////////////////////////////////////////////////////////////
//JavaScript variable and functions used for SpanishOLB global header
//////////////////////////////////////////////////////////////////////
var focusIndicator = "";
var arrowFocus = false;
var hideMenuTimeout = null;

//preload on/off arrow icon images
var menuTrigger = new Image();
menuTrigger.src = "/sas/sas-docs/images/solb_arrow_up.gif";
var menuTriggerOn = new Image();
menuTriggerOn.src = "/sas/sas-docs/images/solb_arrow_over.gif";

var originalKeyDownFunc = null;
var navigateMenuSet = false;

function hideMenuToggle() {
	var langToggle = document.getElementById('langToggleM');
	var menuToggle = document.getElementById('langMenuM');
	var menuTriggerImg = document.getElementById('icon');
	arrowFocus = false;
	menuTriggerImg.src = menuTrigger.src;
	setCSSClass(langToggle.id,"");
	setCSSClass(menuToggle.id,"");
	focusIndicator = "";
	document.onkeydown = originalKeyDownFunc;
	navigateMenuSet = false;
}


function languageToggleHandler(e) {
	//for firefox event hanbdling
	if (!e) var e = window.event;
	
	if ( hideMenuTimeout != null ) {
		clearTimeout(hideMenuTimeout);
		hideMenuTimeout = null;
	}
	
	var langToggle = document.getElementById('langToggleM');
	var menuToggle = document.getElementById('langMenuM');
	var langPrefLink = document.getElementById('en-langPref');
	var langPrefLinkEs = document.getElementById('es-langPref');
	var arrow = document.getElementById('arrowIcon');
	
	var menuTriggerImg = document.getElementById('icon');			
				
	//show menu
	//toggle "Show language preference menu" to "Hide language preference menu"
	if (e.type == "mouseover") {
		arrowFocus = false;
		menuTriggerImg.src = menuTriggerOn.src;
		setCSSClass(langToggle.id,"on");
		setCSSClass(menuToggle.id,"displayLangLincs");
		if (!navigateMenuSet) {
			originalKeyDownFunc = document.onkeydown;
			document.onkeydown = navigateMenu;
			navigateMenuSet = true;
		}
	}
	
	if (e.type == "mouseout") {
		hideMenuTimeout = setTimeout("hideMenuToggle();", 1000);
	}
	
	//show menu
	//toggle "Show language preference menu" to "Hide language preference menu"
	if (e.type == "focus") {
		setCSSClass(langToggle.id,"on");
		setCSSClass(menuToggle.id,"displayLangLincs");
		arrow.focus();		
		arrowFocus = true;		
		if (!navigateMenuSet) {
			originalKeyDownFunc = document.onkeydown;
			document.onkeydown = navigateMenu;
			navigateMenuSet = true;
		}
	}
	
	//hide menu
	//toggle "Hide language preference menu" to "Show language preference menu"
	if (e.type == "blur" && arrowFocus) {	
		if (focusIndicator == langPrefLink.id || focusIndicator == langPrefLinkEs.id) {
			var focusVar = document.getElementById(focusIndicator);
			focusVar.focus();
		} else {
			hideMenuTimeout = setTimeout("hideMenuToggle();", 1000);
		}
	}
	
	if (e.type == "keydown") {

	}
}

function languageToggleHandler(e, isSearchUpgradeSwitchOn) {
	//for firefox event handling
	if (!e) var e = window.event;
	var langToggle = document.getElementById('langToggleM');
	var menuToggle = document.getElementById('langMenuM');
	var langPrefLink = document.getElementById('en-langPref');
	var langPrefLinkEs = document.getElementById('es-langPref');
	var arrow = document.getElementById('arrowIcon');
	//show menu
	//toggle "Show language preference menu" to "Hide language preference menu"
	if (e.type == "mouseover") {
		setCSSClass(langToggle.id,"on");
		if(isSearchUpgradeSwitchOn  == true){

			setCSSClass(menuToggle.id,"displayLangLincsSU");
		}else{

			setCSSClass(menuToggle.id,"displayLangLincs");
		}
		
	}

	if (e.type == "mouseout") {
		setCSSClass(langToggle.id,"");
		setCSSClass(menuToggle.id,"");
	}

	//show menu
	//toggle "Show language preference menu" to "Hide language preference menu"
	if (e.type == "focus") {
		setCSSClass(langToggle.id,"on");

		if(true == isSearchUpgradeSwitchOn){

			setCSSClass(menuToggle.id,"displayLangLincsSU");
		}else{

			setCSSClass(menuToggle.id,"displayLangLincs");
		}
		arrow.focus();
	}

	//hide menu
	//toggle "Hide language preference menu" to "Show language preference menu"
	if (e.type == "blur") {
		if (focusIndicator == langPrefLink.id || focusIndicator == langPrefLinkEs.id) {
			var focusVar = document.getElementById(focusIndicator);
			focusVar.focus();
		} else {
			setCSSClass(langToggle.id,"");
			setCSSClass(menuToggle.id,"");
		}
	}

	if (e.type == "keydown") {
	}
}
function navigateMenu(e) {
	if (!e) var e = window.event;
	var increment = 0;
	var focusElement;
				
	var langPrefLink = document.getElementById('en-langPref');
	var langPrefLinkEs = document.getElementById('es-langPref');
	var arrow = document.getElementById('arrowIcon');
						
	switch (e.keyCode) {
		
		case 38: 
			if (focusIndicator == langPrefLinkEs.id) {
				focusIndicator = langPrefLink.id;
				langPrefLink.focus();
			} else if (focusIndicator == langPrefLink.id) {
				arrow.focus();
				focusIndicator = "";
			}
			return false;
		case 40: 
			if (focusIndicator == "") {
				focusIndicator = langPrefLink.id;
				langPrefLink.focus();
			} else if (focusIndicator == langPrefLink.id) {
				focusIndicator = langPrefLinkEs.id;
				langPrefLinkEs.focus();
			}
			return false;
	} 
	
							
}