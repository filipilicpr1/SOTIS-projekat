from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.callbacks import get_openai_callback

def get_answer(VectorStore,question):
    question_docs = VectorStore.similarity_search(query = question, k=6)   

    pdf_question = """
                    U kom nastavnom materijalu mogu da pronadjem odgovor na pitanje"{question}"?
                    Daj mi samo naziv nastavnog materijala.
                   """.format(question = question)
    
    pdf_docs = VectorStore.similarity_search(query = pdf_question, k=6)  
    
    llm = OpenAI(temperature=0)
    
    chain = load_qa_chain(llm=llm,chain_type="stuff")
    
    with get_openai_callback() as cb:
        answer = chain.run(input_documents = question_docs,question = question)
        pdf_name = chain.run(input_documents = pdf_docs, question = pdf_question)
        return answer, pdf_name