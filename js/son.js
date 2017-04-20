
var context	= new AudioContext()

function collisionBrique() {
	
	var lib		= ["square",0.0000,0.4000,0.0000,0.3200,0.0000,0.2780,20.0000,496.0000,2400.0000,0.4640,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0235,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
	var buffer	= WebAudiox.getBufferFromJsfx(context, lib)

	var source	= context.createBufferSource()
	source.buffer	= buffer
	source.connect(context.destination)
	source.start(0)
}

function collisionBarre() {
	
	var lib	= ["saw",0.0000,0.4000,0.0000,0.0540,0.0000,0.1420,20.0000,797.0000,2400.0000,-0.4340,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.2480,0.0000]
	var buffer	= WebAudiox.getBufferFromJsfx(context, lib)

	var source	= context.createBufferSource()
	source.buffer	= buffer
	source.connect(context.destination)
	source.start(0)
}