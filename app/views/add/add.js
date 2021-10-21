var frameModule = require("@nativescript/core/ui/frame");
var pageModule = require("@nativescript/core/ui/page");

exports.loaded = function() {
  console.log("hello");
};

exports.signIn = function(args) {
  const button = args.object;
  const page = button.page;
  page.frame.navigate({
    moduleName: "views/home/home-page",
    clearHistory: true
  });
};

exports.signUp = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/register/register");
};

exports.doneTap = function(args) {
  var textField = args.object;
  textField.dismissSoftInput();
};

exports.clearTextfieldFocus = function(args) {
  var layout = args.object;
  // console.log(layout.getViewById("passwordField"));
  // if (layout.getViewById("emailField")) {
  var emailField = layout.getViewById("emailField");
  emailField.android.clearFocus();
  // } else if (layout.getViewById("passwordField")) {
  var textField = layout.getViewById("passwordField");
  textField.android.clearFocus();
  // }
};
