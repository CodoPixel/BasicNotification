# BasicNotification

Creates a basic popup with Javascript. BasicNotification is the name of the repository, not the name of the javascript class.

## Fontawesome

By default, in order to customise the notifications, a specific icon from FontAwesome is displayed. For that, you have to add a css file : 

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
```

However, you can choose not to display the icon.

## The css file

BasicNotification needs a css file to work properly :

```
<link rel="stylesheet" href="css/popup.css">
```

## BasicPopup

Thanks to BasicPopup(), you can display two types of info : an error or a confirmation.
First of all, to display something, you have to instantiate BasicPopup like this :

```
var popup = new BasicPopup();
```

Then, you can display a notification to inform the user that an error has occured :

```
var text = "An error has occured".
var delay = 5; // default
var showLogo = true; // default
popup.sendNotification(new AlertNotification(text, delay), showLogo);
```

Same thing for a confirmation :

```
var text = "What a nice day !".
var delay = 5; // default
var showLogo = true; // default
popup.sendNotification(new ConfirmationNotification(text, delay), showLogo);
```

## BasicAgreement

Thanks to BasicAgreement(), you can ask a binary selectable question (yes or cancel) and execute a function accordingly. Moreovoer, you can also execute a function regardless of the user's choice. Remember that the user has to answer if he wants the notification to disppear. However, you can hide by yourself the notification.

First of all, you need to instantiate BasicAgreement like this :

```
var agreement = new BasicAgreement();
```

Then, you can display your question :

```
var question = "Do you agree with that ?";

function yes() {
    console.log("Yes, I agree");
}

function no() {
    console.log("No, I don't agree");
}

function all() {
    console.log("Hi ! I am executed regardless of the answer.");
}

agreement.askForAgreement(question, yes, no, all);
// [question] and [yes] are obligatory arguments.
// By default, [yes], [no] & [all] will hide the notification.
// Contrary to BasicPopup, there is no icon.
```

Finally, if the user really doesn't want to answer, you can hide the notification :

```
function onHiding() {
    // ...
}

agreement.hide(onHiding);
// [onHiding] is optional
```

## How to modify the style ?

There is actually no way to modify the styles of the notification via Javascript. However, you can modify a little bit the css file.

## Last informations

You can add popup.js in <head>, but create your notifications at the end of <body>.
To conclude, it's very precarious but you can do the basics with that.

## License

MIT License.