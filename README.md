### Video multiplayer — a JS snippet to sync video play-pause state<br><sup>Backed by syncronization server at zahrevsky.com<br/></sup>

Video multiplayer helps you watch a movie together remotely without screen-sharing. Each user opens the same web page with a video and inserts a JS snippet in the developer console. Now, when one user toggles play-pause, it toggles for everyone.

**Note** This is a proof-of-concept pet-project rather than a finished user-friendly product.

<br/>

**How to use**<br/>1. Open web page with the video you are going to watch<br/>2. Insert code from `client/snippet.js` into DevTools console

<br/>

**Under the hood**<br/>When `snippet.js` code is inserted, it:<br/>1. Identifies a video on a page and hooks to it<br/>2. Establishes websocket connection with the server

Now, each time client toggles play-pause, the following transaction happens:<br/>1. Client sends websocket message to the server<br/>2. On receiving this message, server broadcasts another web-socket message to all connected clients<br/>3. Each connected client toggles play-pause on receiving websocket message from server
