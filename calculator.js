/**
 * @author: rafsan
 *
 */
$(document).ready(function() {
	var keyLists = $('#calculator span');
	var operators = ['+', '-', 'x', '÷'];
	var openingBracket = 0;
	var hasDot = false;
	for (var i = 0; i < keyLists.length; i++) {
		keyLists[i].onclick = function(e) {
			var display = $(".display");
			var displayText = display.html();
			var presentKeyValue = this.innerHTML;
			var length = displayText.length;
			if (presentKeyValue === "AC") {
				displayText = "";
				hasDot = false;
			} else if (presentKeyValue === "=") {
				displayText = displayText.replace(/x/g, "*");
				displayText = displayText.replace(/÷/g, "/");
				hasDot = false;
				displayText = eval(displayText);
			} else if (isOperator(presentKeyValue)) {
				var lastChar = '&';
				if (length > 0) {
					lastChar = displayText[length - 1];
				}

				if (length == 0 && presentKeyValue != '-') {
					presentKeyValue = '';
				} else if (isOperator(lastChar) || lastChar === '.') {
					if (length != 1) {
						if ((lastChar === 'x' || lastChar === '÷') && (presentKeyValue === '+' || presentKeyValue === '-')) {
							displayText += presentKeyValue;
						} else {
							displayText = displayText.replace(/.$/, presentKeyValue);
						}
					}
				} else {
					displayText+=presentKeyValue;
				}

				hasDot = false;
			} else if (isDot(presentKeyValue)) {
				if (hasDot == false) {
					hasDot = true;
				} else {
					presentKeyValue = '';
				}
				displayText += presentKeyValue;

			} else {
				if (presentKeyValue === '(') {
					openingBracket = openingBracket + 1;
				}
				if (presentKeyValue === ')') {
					if(openingBracket==0||(displayText.match(/\(/g)||[]).length==length){
						presentKeyValue='';
					}else {
						openingBracket = openingBracket - 1;
					}
				}

				displayText += presentKeyValue;
			}

			display.html(displayText);
		};
	}

	function isOperator(value) {
		if (operators.indexOf(value) > -1) {
			return true;
		}
		return false;
	}

	function isDot(value) {
		return value === '.';
	}

	// document.getElementById("test").innerHTML=keyLists.length;
});
