#!/usr/bin/env python3
"""
Entry point for LUMO FastAPI Assistant executable builds
"""
import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
