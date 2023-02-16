# canvas-fade-in-out

This module allows for easy hiding of the canvas for players. It has options for setting the background and fade duration to customize the experience. Players will not be able to see or interract with the canvas whiel it is faded out.

Here is an example macro that will toggle a fade of the canvas to grey over 1 second.
````
await game.settings.set('canvas-fade-in-out', 'background', 'black')
await game.settings.set('canvas-fade-in-out', 'duration', 1000)
await game.settings.set('canvas-fade-in-out', 'visible', !game.settings.get('canvas-fade-in-out', 'visible'))
ui.notifications.notify(`Canvas ${game.settings.get('canvas-fade-in-out', 'visible')?'is':'is not'} visible to players`)
````

![demo](https://github.com/xaukael/canvas-fade-in-out/blob/58701d5309c121922dcfc7064301975a4f0d98ea/canvas-fade-small.gif)
