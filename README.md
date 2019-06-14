# PI-1819v-LI51N-G19

Descrição da estrutura da aplicação(servidora):
-
     -> 1.yama-server.js:
          1.1 inicia as dependências para os outros módulos
          1.2 inicia o servidor 
     -> 2.yama-web-api.js
          2.1 implementar as rotas 
          2.2 fornecer os parâmetros necessários à camada de serviço 
     -> 3.yama-services.js
          3.1 coordenar os acessos às camadas de dados 
          3.2 implementar a lógica do negócio 
     -> 4.last.fm-data
          4.1  implementar métodos para o acesso à base de dados das musicas
     -> 5.yama-db.js
          5.1  implementar métodos para o acesso à base de dados das playlists

Temos ainda uma outra peça servidora para gerir os users e autenticação.
com as seguintes rotas:
     /yama/auth/session -> adequirir a sessão
     /yama/auth/login' -> fazer login
     /yama/auth/logout' -> logout e fechar a sessão
     /yama/auth/signup' -> registo de um user na base de dados


Descrição da estrutura da aplicação(cliente):
-
     -> A aplicação cliente tem um entry.js, onde é verificado o hash do URL e "contruida" uma pagina para cada hash
     Existem 4 separadores
          Inicio -> landing page.
          Artistas -> onde o user escolhe o nome de um artista, e depois vai navegando até a um album especifico.
          Playlists -> onde o utiliar que tenha feito login pode manipular as suas playlists
          Login -> onde é o Login
          
          
Para correr a aplicação é necessário ir a diretoria projeto através da linha de comandos e correr o comando npm install, ter o elasticSearch a correr e correr o comando npm start na mesma diretória.

 


ROTAS:

Pesquisa de artistas 
-
 -> GET http://localhost:3000/yama/searchArtist/{{artist}}
 
Obter os álbuns de um artista 
-
 -> GET http://localhost:3000/yama/artist/{{artistName2}}/Albums
 
Obter os detalhes de um álbum, onde consta, também as músicas que o constituem
-
 -> GET http://localhost:3000/yama/artist/{{artistName3}}/Album/{{albumName3}}
 
Gerir playlists (listas de músicas favoritas):
Criar, atribuindo-lhe um nome e descrição
-
 -> POST http://localhost:3000/yama/playlists
 
Editar, alterando o seu nome e descrição
-
-> PUT http://localhost:3000/yama/playlists/{{playListId}}  **Body com as alterações da playlist**

Listar uma playlist 
-
-> GET http://localhost:3000/yama/playlists/{{playListId}}

Listar todas as playlists
-
-> GET http://localhost:3000/yama/playlists/

Adicionar uma música
-
-> POST http://localhost:3000/yama/playlists/{{playListId}}    **Body com a musica a inserir**

Remover uma música
-
-> DELETE http://localhost:3000/yama/playlists/{{playListId}}?artist={{artist}}&track={{track}}}  

Contar tempo total de uma playlist
-
-> GET http://localhost:3000/yama/playlists/{{playListId}}/totaltime


Na raiz do projeto existe uma diretoria denominada Postman com a colecção dos comandos e variaveis de ambiente.
Devem ser utilizados para verificar o correto funcionamento da aplicação
