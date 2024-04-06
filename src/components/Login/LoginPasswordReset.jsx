// Importa a biblioteca React.
import React from "react";

// Importa o componenete.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa o hook.
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

// Importa a API.
import { PASSWORD_RESET } from "../../Api";

// Importa o componente do React Router DOM.
import { useNavigate } from "react-router-dom";

// Importa o helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Criado um componente chamado LoginPasswordReset.
const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState(""); // Cria um estado chamado login e uma função chamada setLogin que atualiza o estado login. O valor inicial do estado login é uma string vazia.
  const [key, setKey] = React.useState(""); // Cria um estado chamado key e uma função chamada setKey que atualiza o estado key. O valor inicial do estado key é uma string vazia.

  const navigate = useNavigate(); // Armazena na variável navigate todas as funções de navegação, sendo elas: navigate, goBack, goForward e canGo.

  // Armazena todos os dados(estados, funções etc) do hook useForm na variável password.
  const password = useForm("password");

  const { loading, error, request } = useFetch(); // Desestrutura o retorno da função useFetch e armazena a resposta da API nas constantes data, loading, error e request.

  // O useEffect é executado sempre que a página é carregada/recarregada, pois a array de dependências está vazia.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Cria uma constante chamada params que cria um novo objeto URLSearchParams que contém a query string da URL atual.
    const key = params.get("key"); // Cria uma constante chamada key que recebe o valor da chave key da query string da URL atual.
    const login = params.get("login"); // Cria uma constante chamada login que recebe o valor da chave login da query string da URL atual.

    // Se key for verdeiro, ou seja se tiver algum valor, executa o if.
    if (key) {
      setKey(key); // Altera o estado key com o valor da constante key.
    }
    // Se login for verdeiro, ou seja se tiver algum valor, executa o if.
    if (login) {
      setLogin(login); // Altera o estado login com o valor da constante login.
    }
  }, []);

  // Função chamada handleSubmit que recebe o evento como parâmetro e que é responsável por fazer a requisição para a API. O async/await é responsável por esperar a requisição ser feita para depois executar o restante do código.
  async function handleSubmit(event) {
    event.preventDefault(); // Previne que o formulário seja enviado.

    // Se o password for válido, ou seja, se o password não estiver vazio, então executa o if.
    if (password.validate()) {
      // Desestrutura o retorno da função PASSWORD_LOST e armazena a url e options nas constantes url e options. A função PHOTOS_GET recebe o id da foto como parâmetro.
      const { url, options } = PASSWORD_RESET({
        login, // Está armazenando o valor do estado login na propriedade login.
        key, // Está armazenando o valor do estado key na propriedade key.
        password: password.value, // Está armazenando o valor do input password na propriedade password.
      });

      // O await faz com que a função espere a resposta da API para continuar o código.
      const { response, json } = await request(url, options); // Desestrutura o retorno da função request armazenando a response que armazena o resultado do fetch e o json que armazena a resposta convertida em json nas constantes response e json. A função request recebe a url que é a url da API e options que são as opções da requisição.
      console.log(json);
      // Se a response for verdadeira, ou seja, se a response for 200, então executa o if.
      if (response.ok) {
        navigate("/login"); // Redireciona o usuário para a página de login.
      }
    }
  }

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Resete a sonta" />

      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as props label, type e name. */}
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          // O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur.
          {...password}
        />

        {/* Se loading for true, então o botão ficará desabilitado, caso contrário, o botão ficará habilitado. */}
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      {/* Chama o componente Error e passando a props error que contém o erro retornado pela API. */}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset; // Exportando o componente LoginPasswordReset.
