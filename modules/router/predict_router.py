from fastapi import APIRouter
from modules.services import predict_obesity

router_predict = APIRouter()

@router_predict.post("/predict")
async def submit(data: dict):
    print("Menerima data...........")
    print("Memproses data..........")
    result = predict_obesity(data)
    print("Mengirim hasil prediksi..........")
    return result