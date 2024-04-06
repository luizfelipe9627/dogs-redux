// Importa a biblioteca React.
import React from "react";

// Importa o helper.
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";

// Importa o hook.
import useFetch from "../../hooks/useFetch";

// Importa a API.
import { STATS_GET } from "../../Api";

// Armazena o componente UserStatsGraphs em uma variável e usa o React.lazy para carregar o componente apenas quando ele for usado.
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

// Criado um componente chamado UserStats.
const UserStats = () => {
  const { data, loading, error, request } = useFetch(); // Desestrutura o retorno da função useFetch e armazena a resposta da API nas constantes data, loading, error e request.

  // O React.useEffect é executado sempre que o componente for renderizado ou quando uma variável passada no array de dependências for alterada.
  React.useEffect(() => {
    // O async/await é usado para que a função getData espere a resposta da API para depois executar o resto do código.
    async function getData() {
      const { url, options } = STATS_GET(); // Desestrutura o retorno da função STATS_GET, sendo que a constante url recebe a url da API e a constante options recebe as opções da requisição.
      const { response, json } = await request(url, options); // Desestrutura o retorno da função request e armazena a resposta nas constantes response e json.
    }
    getData(); // Chama a função getData.
  }, [request]);

  // Se loading for true, retorna o componente Loading.
  if (loading) return <Loading />;
  // Se error for true, retorna o componente Error passando a props error que recebe a mensagem de erro da API.
  if (error) return <Error error={error} />;
  // Se data for true, ou seja se o usuário estiver logado, retorna o componente Head e o componente UserStatsGraphs.
  if (data) {
    return (
      // Para utilizar o React.lazy é necessário colocar o componente UserStatsGraphs dentro de um Suspense que recebe a props fallback que é o componente que será renderizado enquanto o componente UserStatsGraphs não for carregado.
      <React.Suspense fallback={<div></div>}>
        {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
        <Head title="Estastisticas" />
        {/* Chama o componente UserStatsGraphs e passa a props data que recebe a resposta da API. */}
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else {
    return null; // Se data for false, retorna null.
  }
};

export default UserStats; // Exporta o componente UserStats.
