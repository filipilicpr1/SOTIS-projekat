from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS
from .constants import CHUNK_SIZE, CHUNK_OVERLAP
import pickle
import os
from repository.course_repository import get_vectore_store_for_id,save_new_course_document,update_course
from database.models.course import Course

def pickle_document(pdf_file,course_id):
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
    
    course = get_vectore_store_for_id(course_id)
    
    if course != None :
        VectorStore = pickle.loads(course.vectore_store)
        VectorStore.add_texts(chunks)
    else:
        VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
        
    return pickle.dumps(VectorStore)

def save_documents(docs, name):
    course = get_vectore_store_for_id(name)
    
    if course is None :
        course=Course(name,docs)
        save_new_course_document(course)
    else :
        update_course(course,docs)
        
def get_document(name):
    document = get_vectore_store_for_id(name)
    
    if document is None :
        return None
    else:
        VectoreStore = pickle.loads(document.vectore_store)
        return VectoreStore