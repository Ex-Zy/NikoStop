//for correct work form must have
// - class "al-form"
// - option with selected country in select name="country"
// - two text fields with name "name, phone"
// - button submit
// - if "settings" (fills below) hasn't "phonesCode" for country - this validation ignore

;(function (GlobalObj) {
	// data
	var settings = {
		//phone codes
		phonesCode: {
			DE: 49,
			FR: 33
		},

		//phone length
		phoneMinLength: 9,

		//allow btn codes
		allowedBtnCodes: [43, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 32, 40, 41, 229, 8, 13],

		//massages errors list
		massages: {
			EN: {
				fillName: "Enter your name",
				fillPhone: "Enter your number",
				incorrectPhone: "Error, incorrect number"
			},
			RU: {
				fillName: "Введите ФИО",
				fillPhone: "Введите номер",
				incorrectPhone: "Ошибка, некорректный номер"
			},
			ES: {
				fillName: "Introduzca su nombre comleto",
				fillPhone: "Introduzca su número de teléfono",
				incorrectPhone: "Error, el número de teléfono incorrecto"
			},
			FR: {
				fillName: "Entrez votre nom et prénom",
				fillPhone: "Entrez le numéro de téléphone",
				incorrectPhone: "Erreur, numéro incorrect"
			},
			IT: {
				fillName: "Inserire il nome ed il cognome",
				fillPhone: "Inserire il numero di telefono",
				incorrectPhone: "Errore, numero sbagliato"
			},
			PT: {
				fillName: "Introduza seu nome e sobrenome",
				fillPhone: "Introduza o número de telemovel",
				incorrectPhone: "Error, número incorrecto"
			},
			GR: {
				fillName: "Εισάγετε το όνομα και το επώνυμο",
				fillPhone: "Εισάγετε τον αριθμό τηλεφώνου",
				incorrectPhone: "Σφάλμα, λάθος νούμερο"
			},
			BG: {
				fillName: "Име",
				fillPhone: "Телефон номер",
				incorrectPhone: "Грешка, невалиден номер"
			},
			SL: {
				fillName: "Napišite svoje ime in priimek",
				fillPhone: "Napišite svojo telefonsko številko",
				incorrectPhone: "Napačna številka"
			},
			SK: {
				fillName: "Zadajte Meno a Priezvisko",
				fillPhone: "Zadajte telefónne číslo",
				incorrectPhone: "Chyba, zlé číslo"
			},
			CZ: {
				fillName: "Zadejte Jméno Příjmení",
				fillPhone: "Zadejte telefonní číslo",
				incorrectPhone: "Chyba, není platné číslo"
			},
			HU: {
				fillName: "Vezetéknév, keresztnév",
				fillPhone: "Telefon",
				incorrectPhone: "Hiba, helytelen számot adott meg"
			},
			RO: {
				fillName: "Nume de tip",
				fillPhone: "Introduceţi numărul de",
				incorrectPhone: "Număr invalid eroare"
			},
			PL: {
				fillName: "Wpisz swoje imię i nazwisko",
				fillPhone: "Podaj swoj numer",
				incorrectPhone: "Błąd , nieprawidłowy numer"
			},
			DE: {
				fillName: "Geben Sie Ihren Namen ein",
				fillPhone: "Geben Sie Ihre Telefonnummer ein",
				incorrectPhone: "Eingabefehler, die Nummer ist inkorrekt",
				lessNineSymbols: "Fehler: Sie haben weniger als 9 Symbole eingegeben"
			}
		}
	};

	//Validator main
	function Validator (settings) {
		this.forms = [].slice.call(document.querySelectorAll('.al-form'));
		this.settings = settings || {};
		this._addEvents();
		return this;
	};

	Validator.prototype.DEFAULT_SETTINGS = {
		phonesCode: "",
		phoneMinLength: 9,
		allowedBtnCodes: [43, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 32, 40, 41, 229, 8, 13],
		massages: {
			fillName: "Enter your name",
			fillPhone: "Enter your number",
			incorrectPhone: "Error, incorrect number"
		}
	};

	Validator.prototype._getCountry = function () {
		if(this.forms[0].country) {
			var options = this.forms[0].country.options;
		} else {
			var options = this.forms[0].querySelector("select").options;
		}
		var optionsLength = options.length,
				i;
		for (i = 0; i < optionsLength; i++) {
			if(options[i].selected) {
				var selectedCountryCode = options[i].value;
			}
			if(selectedCountryCode) {
				return selectedCountryCode.toString().toUpperCase().match(/[A-Z]{2}/i)[0];
			}
		}
	};

	Validator.prototype._getProp = function (prop) {
		var countryCode = this._getCountry();
		return this.settings[prop][countryCode] || this.DEFAULT_SETTINGS[prop];
	};

	Validator.prototype._clearPhone = function (phone) {
		return phone.replace(/[^\d]+/gi,'');
	}

	Validator.prototype._createError = function (element, massage) {
		var elId = element.id;
		if(elId)
			var label = document.querySelector("[for=" + elId + "]");
		if(label)
			label.innerText = massage;
		if (element.classList)
			element.classList.add('error');
		else
			element.className += ' ' + 'error';
	};

	Validator.prototype._validate = function (form) {
		this.massages = this._getProp("massages");
		this.phonesCode = this._getProp("phonesCode");
		this.phoneMinLength = this.settings.phoneMinLength || this.DEFAULT_SETTINGS.phoneMinLength;

		var errorFields = form.querySelectorAll(".error");
		if(errorFields) {
			var errorFieldsLength = errorFields.length,
					i;
			for(i = 0; i < errorFieldsLength; i++) {
				if (errorFields[i].classList)
					errorFields[i].classList.remove("error");
				else
					errorFields[i].className = errorFields[i].className.replace(new RegExp('(^|\\b)' + 'error' + '(\\b|$)', 'gi'), ' ');
			}
		}

		var valid = true;

		//validate name
		if(form.name) {
			if (form.name.value === null || form.name.value == "" || form.name.value === undefined) {
				this._createError(form.name, this.massages.fillName);
				valid = false;
			}
		}

		//validate phone
		if(form.phone) {
			var clearTel = this._clearPhone(form.phone.value),
					phoneCodeRegEx = new RegExp ('^(00)?' + this.phonesCode, 'i'),
					phoneDigitRepeatRegEx = /(\d)\1{4,}/gi;
			if (clearTel === null || form.phone.value == "" || clearTel === undefined) {
				this._createError(form.phone, this.massages.fillPhone);
				valid = false;
			} else if ((clearTel == "" && form.phone.value.length > 0) || clearTel.search(phoneCodeRegEx) == -1 || clearTel.search(phoneDigitRepeatRegEx) > -1) {
				this._createError(form.phone, this.massages.incorrectPhone);
				valid = false;
			} else if (this._getCountry() == "DE") {
				var phoneRegExForDE = new RegExp ('^(00)?' + this.phonesCode + '0+', 'i');
				if(clearTel.search(phoneRegExForDE) > -1) {
					this._createError(form.phone, this.massages.incorrectPhone);
					valid = false;
				} else if (clearTel.length < this.phoneMinLength) {
					this._createError(form.phone, this.massages.lessNineSymbols);
					valid = false;
				}
			} else if (clearTel.length < 6) {
				this._createError(form.phone, this.massages.incorrectPhone);
				valid = false;
			}
		}

		//if something isn't valid
		if(!valid) return false;

		//if all valid
		else return true;
	};

	Validator.prototype._addEvents = function () {
		var _this = this,
				formLength = this.forms.length,
				i;

		for(i = 0; i < formLength; i++) {
			var form = this.forms[i],
					elementsLength = form.elements.length,
					j;

			for(j = 0; j < elementsLength; j++) {
				if(form.elements[j].getAttribute('type') == 'button' || form.elements[j].getAttribute('type') == 'submit' || form.elements[j].tagName == "BUTTON") {
					form.elements[j].addEventListener("click", function(event) {
						var valid = _this._validate(this.form);
						if (valid) {
							this.form.phone.value = _this._clearPhone(this.form.phone.value);
							return;
						} else {
							event.preventDefault();
						}
					});
				}
			}

			if(form.phone) {
				form.phone.addEventListener("focus", function() {
					if (!this.value)
						this.value = "+" + _this._getProp("phonesCode");
				});

				//not for android chrome
				form.phone.addEventListener("keypress", function(event) {
					if (_this.settings.allowedBtnCodes.indexOf(event.which) < 0) {
						event.preventDefault();
						return false;
					}
				});
			}
		}
	};

	GlobalObj.addEventListener("load", function() {
		new Validator(settings);
	});
}(window));