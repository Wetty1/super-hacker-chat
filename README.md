# Hacker-Chat

Projeto da Semana JSExpert, ministrado por [ErickWendel](https://www.linkedin.com/in/erickwendel/). O objetivo deste projeto foi criar um chat em terminais unix que se comunicam de ponta-a-ponta utilizando o protocolo web socket e sem utilizar qualquer lib.

## Conteúdos

- Protocolo web socket (sem socket.io)
- Interface no terminal com blessed
- Design Patern Build
- Eventos internos

## Screenshots

![](screenshots/nickname.png)
![](screenshots/rooms.png)
![](screenshots/chat-print.png)
![](screenshots/server-hacker-chat.png)

## Como rodar este projeto

Em produção

```bash
# instale o executavel do chat via npm
$ npm i -g @wetty1/super-hacker-chat-client

# execute o chat
$ super-hacker-chat
```

Para um teste adequado é recomendado abrir 3 abas do seu terminal unix.

```bash
# primeirto terminal ira ficar responsável pelo servidor
# entre na pasta server
$ cd server/

# instale todas as dependências
$ npm install

# ligue o servidor
npm run start
```

Os dois restantes irão ser dois clients

```bash
# entre na pasta client
$ cd client/

# instale todas as dependências
$ npm install

# execute o client
npm run start
```