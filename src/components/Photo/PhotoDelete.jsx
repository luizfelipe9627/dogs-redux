// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./PhotoDelete.module.css";

// Importa a Api.
import { PHOTO_DELETE } from "../../Api";

// Importa o hook.
import useFetch from "../../hooks/useFetch";

// Cria um componente chamado PhotoDelete.
const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch(); // Desestrutura o retorno da função useFetch pegando apenas as propriedades loading e request e armazenando nas constantes.

  // Cria uma função assíncrona chamada handleClick que executa a função request passando a url e options como parâmetro. O async está fazendo com que a função handleClick espere a resposta da API para continuar a execução.
  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar?"); // Cria uma constante chamada confirm que recebe o retorno da função confirm que exibe uma mensagem para o usuário e retorna true ou false.

    // Se o usuário clicar em ok, executa o if.
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id); // Desestrutura o retorno da função PHOTO_DELETE e armazena a url e options nas constantes url e options. A função PHOTO_DELETE recebe o id da foto.

      // O await faz com que a função handleClick espere a resposta da API para continuar a execução.
      const { response } = await request(url, options); // Desestrutura o retorno da função request e armazena a resposta da API na constante response. No request é passado a url que é a url da API e options que são as opções da requisição.

      // Se a resposta da API for ok, executa o if.
      if (response.ok) {
        window.location.reload(); // Recarrega a página.
      }
    }
  }

  return (
    // O React.Fragment é usado para renderizar mais de um elemento sem precisar criar um elemento pai como uma div por exemplo. */}
    <React.Fragment>
      {/* Se o estado loading for true, renderiza o botão desabilitado. Se não, renderiza o botão que executa a função handleClick. */}
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </React.Fragment>
  );
};

export default PhotoDelete; // Exporta o componente.
