
var fadeCanvas = function() {
  if (game.user.isGM) return;
  $('body').css({background:game.settings.get('canvas-fade-in-out', 'background')})
  if (game.settings.get('canvas-fade-in-out', 'visible')) $("#board").fadeIn(game.settings.get('canvas-fade-in-out', 'duration'));
  else $("#board").fadeOut(game.settings.get('canvas-fade-in-out', 'duration'));
}

Hooks.once("socketlib.ready", () => {
	window.socketForCanvasFade = socketlib.registerModule("canvas-fade-in-out");
	window.socketForCanvasFade.register("fadeCanvas", fadeCanvas);
});

Hooks.on('canvasInit', (canvas)=>{
  if (game.user.isGM) return;
  if (game.settings.get('canvas-fade-in-out', 'visible')) return;
  $('body').css({background:game.settings.get('canvas-fade-in-out', 'background')})
  $("#board").hide();
});

Hooks.once("setup", async () => {
  game.settings.register('canvas-fade-in-out', 'visible', {
    name: `Is the canvas visible`,
    hint: `Determines whether to hide the canvas`,
    scope: "world",
    config: false,
    type: Boolean,
    default: true,
    onChange: value => { window.socketForCanvasFade.executeForOthers("fadeCanvas"); }
  });
  game.settings.register('canvas-fade-in-out', 'duration', {
    name: `Fade Duration`,
    hint: `How long in milliseconds is the fade`,
    scope: "world",
    config: true,
    type: Number,
    default: 400,
    onChange: value => { }
  });
  game.settings.register('canvas-fade-in-out', 'background', {
    name: `Background CSS Style`,
    hint: `This defines what will be visible when the canvas is not visible.`,
    scope: "world",
    config: true,
    type: String,
    default: 'black',
    onChange: value => {$('body').css({background:value}) }
  });
});