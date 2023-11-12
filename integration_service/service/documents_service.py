from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS
from .constants import CHUNK_SIZE, CHUNK_OVERLAP
import pickle
import os
from repository.course_repository import get_course_from_id,save_new_course_document,update_course
from database.models.course import Course

def create_chunks(pdf_file, filename):
    pdf_reader = PdfReader(pdf_file)
    
    text = "Naredni tekst se odnosi na nastavni materijal {document_name}\n".format(document_name = filename)
    for page in pdf_reader.pages:
        text += page.extract_text()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = CHUNK_SIZE,
        chunk_overlap = CHUNK_OVERLAP,
        length_function = len
    )

    chunks = text_splitter.split_text(text)
    return chunks

def pickle_document(pdf_file, filename, course_id):
    chunks = create_chunks(pdf_file, filename)
    embeddings = OpenAIEmbeddings()
    
    course = get_course_from_id(course_id)
    
    if course != None :
        VectorStore = pickle.loads(course.vectore_store)
        VectorStore.add_texts(chunks)
        
        return pickle.dumps(VectorStore)
    
    VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
        
    return pickle.dumps(VectorStore)

def save_documents(docs, name):
    course = get_course_from_id(name)
    
    if course is None :
        course=Course(name,docs)
        save_new_course_document(course)
        return;
    
    update_course(course,docs)

def update_course_materials(docs, course_id):
    course = get_course_from_id(course_id)
    
    if course is not None :
        update_course(course,docs)

      
def get_document(name):
    document = get_course_from_id(name)
    
    if document is None :
        return None
    
    VectoreStore = pickle.loads(document.vectore_store)
    return VectoreStore