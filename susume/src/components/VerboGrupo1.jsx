import React, { useState, useEffect } from 'react';
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import "./niveis-jlpt/niveis-jlpt.css";
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';


const VerboGrupo1 = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 36; // Número total de páginas
  const maxButtons = 10; // Número máximo de botões a serem exibidos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/verboG1?page=${currentPage}`);
        setVocabularies(response.data);
      } catch (error) {
        console.error('Error fetching vocabularies:', error);
      }
    };

    fetchData();

    // Scroll to top ao mudar de página
    // window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// Função para gerar os botões de paginação
const renderPageButtons = () => {
  const buttons = [];
  const maxPages = Math.ceil(36);
  let startPage, endPage;

  if (maxPages <= maxButtons) {
    startPage = 1;
    endPage = maxPages;
  } else {
    const middle = Math.ceil(maxButtons / 2);
    if (currentPage <= middle) {
      startPage = 1;
      endPage = maxButtons;
    } else if (currentPage >= totalPages - middle) {
      startPage = totalPages - maxButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middle + 1;
      endPage = currentPage + middle - 1;
    }
  }

  // Botão "Primeira Página"
  if (currentPage > 1) {
    buttons.push(
      <button key="first" className='paginacaoPagina' onClick={() => handlePageClick(1)}>
        &lt;&lt; Primeira
      </button>
    );
  }

  // Botão "Anterior"
  if (currentPage > 1) {
    buttons.push(
      <button key="prev" className="paginacaoPagina" onClick={() => handlePageClick(currentPage - 1)}>
        &lt; Anterior
      </button>
    );
  }

  // Botões de número de página
  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageClick(i)}
        className={`paginacaoPagina ${currentPage === i ? 'active' : ''}`}
      >
        {i}
      </button>
    );
  }

  // Botão "Próxima Página"
  if (currentPage < totalPages) {
    buttons.push(
      <button key="next" className='paginacaoPagina' onClick={() => handlePageClick(currentPage + 1)}>
        Próxima &gt;
      </button>
    );
  }

  // Botão "Última Página"
  if (currentPage < totalPages) {
    buttons.push(
      <button key="last" className='paginacaoPagina' onClick={() => handlePageClick(totalPages)}>
        Última &gt;&gt;
      </button>
    );
  }

  return buttons;
};


  return (
    <div>
      <Cabecalho />
      <h1 className="tituloVerbo">Lista de Verbos - Grupo I</h1>
      <p className="textoVerbo"> Esta lista contém 898 palavras. </p>

      <div className="container">
        <div className="containerVerbos">

        {vocabularies.map((vocabulary, index) => (
          <div key={vocabulary.id}>
            <div className="containerAccordion">
              <div className="idAccordion">
                {vocabulary.id}
              </div>
              <div className="displayAccordion">
                <Accordion elevation={0} className='accordionLargura'>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    sx={{
                      backgroundColor: "#f2e6d8"
                    }}
                  >
                    <Typography>
                      <p className='kanji-vocabulario'>{vocabulary.Vocabulary}</p>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{
                      backgroundColor: "#f2e6d8"
                    }}
                  >
                    <Typography>
                      {vocabulary.Translation}
                      <br />
                      <br />
                      <strong>
                      <p><strong> {vocabulary.Vocabulary} [{vocabulary.Pronunciation}] </strong> {vocabulary["Word-Type"]}</p>
                      
                      {/* testando passar parametro pra url */}
                      <Link to={`/detalhes-palavra/${vocabulary.Vocabulary}`}>
                        <p className='saibaMais'><u>SAIBA MAIS</u></p>
                      </Link>
                        
                        {/* pegar infos da palavra atual e passar como parâmetro pra página? */}
                      </strong>
                      
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <hr className='linha' />
            {/* {index !== vocabularies.length - 1 && <hr className='linha' />} Adiciona uma linha horizontal se não for o último item */}
          </div>
        ))}

          
        </div>
        <div className="pagination">
          {renderPageButtons()}
        </div>
        <br />
        <br />
      </div>
      <Rodape />
    </div>
  );
}

export default VerboGrupo1;
