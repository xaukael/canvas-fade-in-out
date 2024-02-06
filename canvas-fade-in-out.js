
var fadeCanvas = function() {
  if (game.user.isGM && !game.settings.get('canvas-fade-in-out', 'forGM')) return;
  let background = game.settings.get('canvas-fade-in-out', 'background')
  if (background.includes(';')) $('#canvas-fade-style').text(`body{${background}}`)
  else $('#canvas-fade-style').text(`body{background:${background};}`)
  if (game.settings.get('canvas-fade-in-out', 'visible')) $("#board").fadeIn(game.settings.get('canvas-fade-in-out', 'duration'));
  else $("#board").fadeOut(game.settings.get('canvas-fade-in-out', 'duration'));
}

Hooks.on('canvasInit', (canvas)=>{
  if (game.user.isGM && !game.settings.get('canvas-fade-in-out', 'forGM')) return;
  if (game.settings.get('canvas-fade-in-out', 'visible')) return;
  if (! $('#canvas-fade-style').length) $('body').append(`<style id="canvas-fade-style"></style>`)
  let background = game.settings.get('canvas-fade-in-out', 'background')
  if (background.includes(';')) $('#canvas-fade-style').text(`body{${background}}`)
  else $('#canvas-fade-style').text(`body{background:${background};}`)
  //$('body').css({background:game.settings.get('canvas-fade-in-out', 'background')})
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
    onChange: value => { fadeCanvas() }
  });

  game.settings.register('canvas-fade-in-out', 'forGM', {
    name: `Apply to GM`,
    hint: `Determines whether to hide the canvas for the GM`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: value => { }
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
    onChange: value => {
      if (value.includes(';')) $('#canvas-fade-style').text(`body{${value}}`)
      else $('#canvas-fade-style').text(`body{background:${value};}`)
    }
  });

});