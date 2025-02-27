import React from "react";
import './style.css';
const Product = () => {
    return (
        <section id="product" className="product">

            <div className="product_text-wrapper">
                <h1>
                    Our Services
                </h1>

            </div>
            <div className="product_text-wrapper2">
                <div className="h5-box">
                    <h5><span className="first-word">Model</span> <span className="second-word">Validation</span></h5>
                    <ul>
                        <li>Delivers comparative analysis of the models in contex to data.</li>
                        <li>Validation happening using the matrix like of the model in contact BLEU perplexity rouge scores as standard natural language matrics.</li>
                    
                    </ul>
                    <button>Learn More</button>
                </div>
                <div className="h5-box">
                    <h5><span className="first-word">Rag</span> <span className="second-word">Orchestration</span></h5>
                    <ul>
                        <li>Components of Rag/individual services and combinations is offered as RAG as-a-service.</li>
                        <li>Data Chunking,data splitting,embedding generation,Q-A and Sementic search as-a-service.</li>
                        
                    </ul>
                    <button>Learn More</button>
                </div>
                <div className="h5-box">
                    <h5><span className="first-word">Responsible</span> <span className="second-word">AI</span></h5>
                    <ul>
                        <li>Validation services for hallucination reponse,bias response,toxicity response and profanity response.</li>
                        <li>Transparency and Accountability Validation services for hallucination reponse,bias response.</li>
                        
                    </ul>
                    <button>Learn More</button>
                </div>
            </div>
        </section>
    );
};
export default Product;
