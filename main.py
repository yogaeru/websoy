from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from modules.router import router_predict

app = FastAPI()

# Enable CORS for development (optional)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="src", html=False), name="static") 

# ============================================================================
@app.get("/")
def read_root():
    return FileResponse("src/index.html")

# Use the prediction router
app.include_router(router_predict, prefix="/api")