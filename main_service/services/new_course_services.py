import requests
from decouple import config

PYTHON_SERVICE_API_URI = config('PYTHON_SERVICE_API_URI')

def upload_new_pdf_and_send_to_service(pdf_file):
    files = {
        'file' : pdf_file
    }

    r = requests.post(f'{PYTHON_SERVICE_API_URI}', files=files)
    
    with open(f'test_name.pkl', "wb") as f:
        f.write(r.content)