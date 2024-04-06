// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa o hook.
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

// Importa a API.
import { USER_POST } from "../../Api";

// Importa o helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../store/user";

// Criado um componente chamado LoginCreate.
const LoginCreate = () => {
  // Armazena todos os dados(estados, funções etc) do hook useForm nas variáveis username, email e password.
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  const { loading, error, request } = useFetch(); // Desestrutura o retorno da função useFetch e armazena a resposta da API nas constantes loading, error e request.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  // Criado uma função chamada handleSubmit responsável por fazer o envio dos dados do formulário para a API. O async faz com que a função espere a resposta da API para continuar o código.
  async function handleSubmit(event) {
    event.preventDefault(); // Impede que o formulário seja enviado e a página seja recarregada.

    // Desestrutura o retorno da função USER_POST e armazena a url e as options nas constantes url e options. Passa um objeto com os valores dos campos do formulário como parâmetro da função USER_POST.
    const { url, options } = USER_POST({
      // Passa os dados do que foi digitado no Form para criar o usuário na API.
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options); // Desestrutura o response da API e armazena a resposta da API na constante response. A constante request recebe a url e as options como parâmetro.

    // Se a resposta da API for ok, ou seja, se o usuário for criado com sucesso, executa o if e faz o login do usuário.
    if (response.ok) {
      // Dispacha a função userLogin que é responsável por fazer o login do usuário e passando como parâmetros um objeto que é o payload da action, definindo o username e o password.
      dispatch(
        userLogin({ username: username.value, password: password.value }),
      );
    }
  }

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Crie sua conta" />

      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as props label, type e name. */}
        {/* O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur. */}
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        {/* Se o estado loading for true, executa o if e exibe o texto "Cadastrando...". Se o estado loading for false, executa o else e exibe o texto "Cadastrar". */}
        {loading ? (
          // Está chamando o componente Button e passando a props disabled que recebe o texto Cadastrando....
          <Button disabled>Cadastrando...</Button>
        ) : (
          // Está chamando o componente Button e passando a props children que recebe o texto Cadastrar.
          <Button>Cadastrar</Button>
        )}
        {/* Está chamando o componente Error e passando a props error que recebe o estado error que armazena a mensagem de erro da API. */}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate; // Exportando o componente LoginCreate.
