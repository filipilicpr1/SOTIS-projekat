from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS
from .constants import CHUNK_SIZE, CHUNK_OVERLAP
import pickle

def get_documents(pdf_file):
    pdf_reader = PdfReader(pdf_file)

    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = CHUNK_SIZE,
        chunk_overlap = CHUNK_OVERLAP,
        length_function = len
    )

    chunks = text_splitter.split_text(text)
    embeddings = OpenAIEmbeddings()
    VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
    
    return pickle.dumps(VectorStore)

def save_documents(docs, name):
    with open(f"{name}.pkl", "wb") as f:
        f.write(docs)