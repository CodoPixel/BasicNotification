;(function() {
    class BasicNotification {
        constructor(text, delay) {
            this.defaultDelay = 5;
            this.text = text;
            this.delay = delay || this.defaultDelay;
        }
    }
    
    class ConfirmationNotification extends BasicNotification {
        constructor(text, delay) {
            super(text, delay);
            this.type = "confirmation";
            this.className = "popup-confirm";
            this.logo = "fas fa-check-circle";
        }
    }
    
    class AlertNotification extends BasicNotification {
        constructor(text, delay) {
            super(text, delay);
            this.type = "alert";
            this.className = "popup-alert";
            this.logo = "fas fa-exclamation-circle";
        }
    }
    
    class BasicPopup {
        constructor() {
            if (!document.querySelectorAll('.container-popup')[0]) {
                var popup = document.createElement("div");
                popup.classList.add("basicpopup-container");
                popup.classList.add("container-popup");

                var logo = document.createElement("div");
                logo.setAttribute('id', "popup-logo");
                popup.appendChild(logo);

                var p = document.createElement("p");
                p.setAttribute('id', "popup-text");
                popup.appendChild(p);

                document.body.appendChild(popup);
            }
        }
        
        getElement() {
            return document.querySelectorAll('.container-popup')[0];
        }
    
        getLogo() {
            return document.querySelector("#popup-logo");
        }
    
        _setIcon(icon, iconClass) {
            var LOGO = this.getLogo();
    
            // Delete the previous icon
            if (LOGO.firstElementChild) {
                LOGO.removeChild(LOGO.firstElementChild);
            }
    
            // Create the logo of the popup according to [icon]
            var sign = document.createElement("i");
            sign.className = icon;
    
            // Set the correct class name
            // and display the logo previously created
            LOGO.className = iconClass;
            LOGO.appendChild(sign);
        }

        _setText(text) {
            document.querySelector("#popup-text").innerHTML = text;
        }
    
        _show() {
            this.getElement().classList.add("popup-visible");
        }
    
        _hide() {
            this.getElement().classList.remove("popup-visible");
        }
    
        _create(Notif) {
            this._setIcon(Notif.logo, Notif.className);
            this._setText(Notif.text);
            this._show();
    
            var self = this;
            window.setTimeout(() => {
                self._hide();
            }, Notif.delay * 1000);
        }
    
        _isAlreadyShowing() {
            return this.getElement().classList.contains("popup-visible");
        }
    
        sendNotification(Notification) {
            if (this._isAlreadyShowing()) {
                this._hide();
    
                var self = this;
                window.setTimeout(() => {
                    self._create(Notification);
                }, 1000);
            } else {
                this._create(Notification);
            }
        }
    }

    class BasicAgreement {
        constructor() {
            // Create the POPUP for an agreement
            if (!document.querySelectorAll('.container-agreement')[0]) {
                var agree = document.createElement("div");
                agree.classList.add('basicpopup-container');
                agree.classList.add('container-agreement');

                var p = document.createElement("p");
                p.setAttribute('id', 'agreement-text');
                agree.appendChild(p);

                var containerbuttons = document.createElement("div");
                containerbuttons.setAttribute('id', 'agreement-buttons');
                
                var yesbutton = document.createElement("button");
                yesbutton.setAttribute('id', 'agreement-yes');
                yesbutton.innerHTML = "Oui";
                containerbuttons.appendChild(yesbutton);
                
                var nobutton = document.createElement("button");
                nobutton.setAttribute('id', 'agreement-no');
                nobutton.innerHTML = "Annuler";
                containerbuttons.appendChild(nobutton);

                agree.appendChild(containerbuttons);
                document.body.appendChild(agree);
            }
        }

        getElement() {
            return document.querySelectorAll('.container-agreement')[0];
        }

        _setText(text) {
            document.querySelector("#agreement-text").innerHTML = text;
        }

        _setCallbacks(callbacks) {
            var self = this;
            var allCases = callbacks.allCases;
            document.querySelector('#agreement-yes').addEventListener('click', function(e) {
                self._hide(allCases);
                if (callbacks.yes) callbacks.yes(e);
            });
            document.querySelector('#agreement-no').addEventListener('click', function(e) {
                self._hide(allCases);
                if (callbacks.no) callbacks.no(e);
            });
        }

        _show() {
            this.getElement().classList.add("popup-visible");
        }
    
        _hide(allCases) {
            this.getElement().classList.remove("popup-visible");
            if (allCases) allCases();
        }

        _isAlreadyShowing() {
            return this.getElement().classList.contains("popup-visible");
        }

        askForAgreement(text, yesCallback, noCallback, allCases) {
            if (!text) { throw new Error("popup.js : askForAgreement needs [text] !"); }
            if (this._isAlreadyShowing()) {
                return;
            } else {
                this._setText(text);
                this._setCallbacks({
                    yes: yesCallback,
                    no: noCallback,
                    allCases: allCases
                });
                this._show();
            }
        }
    }

    window.BasicPopup = BasicPopup;
    window.BasicAgreement = BasicAgreement;
    window.ConfirmationNotification = ConfirmationNotification;
    window.AlertNotification = AlertNotification;
})();