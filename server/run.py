from typing import List, Dict
import datetime

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse


class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket):
        self.active_connections[websocket] = {
            'last_message_time': datetime.datetime.now(),
            'ignore': False
        }
        await websocket.accept()

    def disconnect(self, websocket: WebSocket):
        self.active_connections.pop(websocket)

    async def process_message(self, websocket: WebSocket, message: str):
        conn_data = self.active_connections[websocket]

        curr_message_time = datetime.datetime.now()
        message_interval = curr_message_time - conn_data['last_message_time']

        conn_data['last_message_time'] = curr_message_time

        if not conn_data['ignore']:
            if message_interval <= datetime.timedelta(seconds=0.1):
                conn_data['ignore'] = True
            else:
                await manager.broadcast(message)
        else:
            if message_interval >= datetime.timedelta(seconds=1):
                conn_data['ignore'] = False

    async def send_personal_message(self, message: str, websocket: WebSocket):
        if websocket not in self.ignored_connections:
            await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


app = FastAPI()
manager = ConnectionManager()


@app.websocket("/subscribe")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.process_message(websocket, message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
