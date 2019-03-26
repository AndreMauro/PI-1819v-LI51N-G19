# PI-1819v-LI51N-G16


ROTAS:
Pesquisa de artistas- http://localhost:3000/yama/searchArtist
Obter os álbuns de um artista-  http://localhost:3000/yama/artist.getTopAlbums
Obter os detalhes de um álbum, onde consta, também as músicas que o constituem-http://localhost:3000/yama/artist.getInfo 


Gerir playlists (listas de músicas favoritas):
Criar, atribuindo-lhe um nome e descrição- POST http://localhost:3000/yama/playlist?nome={}&descricao={}
Editar, alterando o seu nome e descrição-PUT http://localhost:3000/yama/playlist?nome={}&descricao={}
Listar
Obter os detalhes, onde consta: o nome, descrição, total de tempo das músicas que o constituem e os detalhes de cada música (nome e duração).- GET//
Adicionar uma música POST 
Remover uma música- DELETE 
