# PI-1819v-LI51N-G19


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
