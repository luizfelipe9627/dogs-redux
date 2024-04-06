// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import Textarea from "../Forms/Textarea";

// Importa o CSS Module.
import styles from "./PhotoCommentsForm.module.css";

// Importa o hook.
import useFetch from "../../hooks/useFetch";

// Importa o svg e transforma em um componente React chamado Enviar.
import { ReactComponent as Enviar } from "../../assets/svg/enviar.svg";

// Importa a api.
import { COMMENT_POST } from "../../Api";

// Importa o helper.
import Error from "../Helper/Error";

// Cria um componente chamado PhotoCommentsForm.
const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState(""); // Cria um estado para armazenar o comentário digitado pelo usuário e a função para atualizar o estado chamado setComment. O estado inicial é uma string vazia.

  const { request, error } = useFetch(); // Desestrutura o retorno do useFetch pegando apenas o que vai ser utilizado(no caso o request e o error) nas constantes request e error.

  async function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário que é enviar os dados para uma outra página e recarregar a página.

    const { url, options } = COMMENT_POST(id, { comment }); // Está desestruturando o retorno da função COMMENT_POST pegando apenas o que vai ser utilizado(no caso a url e options) nas constantes url e options e passando como parâmetro da função o id da foto e o comentário digitado pelo usuário em um objeto.

    // Desestrutura o retorno da função request armazenando a response que armazena o resultado do fetch e o json que armazena a resposta convertida em json nas constantes response e json. A função request recebe a url que é a url da API e options que são as opções da requisição.
    const { response, json } = await request(url, options); // O await faz com que a função espere a resposta da API

    if (response.ok) {
      setComment(""); // Limpa o textarea após o comentário ser enviado.
      setComments((comments) => [...comments, json]); // Atualiza o estado comments pegando todos os comentários já existentes e adicionando o novo comentário digitado pelo usuário que está armazenado na constante json.
    }
  }

  return (
    <form
      // Se o single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada.
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      {/* Chama o componente Textarea passando as propriedades name, value, placeholder e onChange como parâmetro. */}
      <Textarea
        name="comment"
        id="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      />
      {/* Se single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada. */}
      <button className={`${styles.button} ${single ? styles.single : ""}`}>
        <Enviar />
      </button>

      {/* Se o error for verdadeiro, ou seja se existir um erro, então renderiza o componente Error que é passado como propriedade o error que é a mensagem de erro da API. */}
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentsForm; // Exporta o componente PhotoCommentsForm.
