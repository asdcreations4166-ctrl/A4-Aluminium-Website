import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve the repository statically. Bind to localhost by default to avoid
# exposing the development server to the network. To intentionally allow
# remote access set the environment variable ALLOW_REMOTE=1 (not recommended).
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    import os
    host = "127.0.0.1"
    # If developer explicitly opts-in to remote bind, be explicit about it.
    if os.environ.get("ALLOW_REMOTE") == "1":
        host = "0.0.0.0"
    uvicorn.run(app, host=host, port=8000)