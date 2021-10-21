var frameModule = require("@nativescript/core/ui/frame");

exports.loaded = function () {
  console.log("hello");
}

exports.signUp = function () {
  const button = args.object;
  const page = button.page;
  page.frame.navigate({
    moduleName: "views/home/home-page",
    clearHistory: true
  });
}

exports.onNavTap = function () {
  var topmost = frameModule.topmost();
  topmost.navigate("views/login/login");
}