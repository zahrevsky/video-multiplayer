var USE_FETCH = false

let ws = new WebSocket("wss://vzvlad.dev:8080/shared-video-control/subscribe")
let video = document.getElementsByTagName('video')[0]

video.onplay = async (event) => {
	if (USE_FETCH)
		fetch('https://vzvlad.dev:8080/shared-video-control/play', {method: 'POST'})
	else
		ws.send("play")
}
video.onpause = async (event) => {
	if (USE_FETCH)
		fetch('https://vzvlad.dev:8080/shared-video-control/pause', {method: 'POST'})
	else
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
