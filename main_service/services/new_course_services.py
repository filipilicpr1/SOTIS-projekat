import requests
from decouple import config

PYTHON_SERVICE_API_URI = config('PYTHON_SERVICE_API_URI')

def upload_new_pdf_and_send_to_service(pdf_file):
    files = {
    'data' : pdf_file
    }

    headers = {
    'Accept': "multipart/form-data",
    'Content-Type': "application/pdf",
    'Cache-Control': "no-cache",
    }

    r = requests.post(f'Server URL: {PYTHON_SERVICE_API_URI}', files=files, headers=headers)
    
    with open(pdf_file,"wb") as f:
        f.write(r)