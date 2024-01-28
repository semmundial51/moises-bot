# Moises Bot

Este é um bot que utiliza a API do Moises para processamento de áudio.

## Configuração

Antes de executar o bot, é necessário configurar um arquivo `.env` com duas informações essenciais:

1. `BOT_KEY`: Chave do bot.
2. `MOISES_KEY`: Chave da API do Moises.

Além disso, é importante adicionar o bot a um grupo ou canal para que ele possa operar corretamente.

## Execução

Após configurar o arquivo `.env` e adicionar o bot ao seu grupo ou canal, siga estes passos:

1. Clone este repositório para o seu ambiente local.
2. Abra o terminal na pasta do projeto.
3. Execute o seguinte comando para instalar as dependências:
   ```
   npm install
   ```
4. Em seguida, inicie o bot com o seguinte comando:
   ```
   nodemon
   ```

## Comandos Disponíveis

Atualmente, o bot suporta os seguintes comandos:

- `/start`: É necessário rodá-lo antes de usar os demais comandos.
- `/overdriveguitar`: Aplica efeito de overdrive na guitarra.
- `/isolatebass`: Isola o som do baixo.
- `/isolateguitar`: Isola o som da guitarra.
- `/reverseguitar`: Inverte o áudio da guitarra.
- `/reverbguitar`: Aplica reverb na guitarra.
- `/aimastering`: Aplica masterização usando IA.
- `/muteguitar`: Remove o som da guitarra.
- `/halfstepdown`: Reduz a afinação em meio tom.
- `/halfstepup`: Aumenta a afinação em meio tom.
- `/mutevocals`: Remove o som dos vocais.