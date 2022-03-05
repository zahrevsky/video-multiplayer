let video = document.getElementsByTagName('video')[0]

let ws = new WebSocket("ws://localhost:8000/ws")

video.onplay = (event) => {
	ws.send('play')
	// event.preventDefault()
}
video.onpause = (event) => {
	ws.send('pause')
	// event.preventDefault()
}

ws.onmessage = (event) => {
	if (event.data === "play")
		video.play()
	else if (event.data === "pause")
		video.pause()
	else
		console.log("Unknown command: " + event.data)
}