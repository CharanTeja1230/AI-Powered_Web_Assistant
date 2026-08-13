import json

from g4f.api import create_app

app = create_app()

try:
    with open("openapi.json", "w") as f:
        data = json.dumps(app.openapi())
        f.write(data)
    print(f"openapi.json - {round(len(data)/1024, 2)} kbytes")
except Exception as e:
    print(f"Loaded FastAPI app for uvicorn deployment: {e}")
