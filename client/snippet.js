let ws = new WebSocket("wss://api.vzvlad.dev/video-multiplayer/subscribe")
let video = document.getElementsByTagName('video')[0]

video.onplay = async (event) => {
	ws.send("play")
}
video.onpause = async (event) => {
	ws.send("pause")
}

ws.onmessage = (event) => {
	if (event.data === "play")
		video.play()
	else if (event.data === "pause")
		video.pause()
	else
		console.warn("Unknown command: " + event.data)
}
