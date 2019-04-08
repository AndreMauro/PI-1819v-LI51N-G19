# PI-1819v-LI51N-G19


ROTAS:

Pesquisa de artistas- http://localhost:3000/yama/searchArtist
GET/api/searchArtist
 Returns artist matches sorted by relevance.


Obter os álbuns de um artista-  http://localhost:3000/yama/artist.getTopAlbums
GET/api/artist.getTopAlbums
  Get the top albums for an artist on Last.fm, ordered by popularity.
  
Obter os detalhes de um álbum, onde consta, também as músicas que o constituem-http://localhost:3000/yama/artist.getInfo 
GET/api/artist.getInfo
  Get the metadata and tracklist for an album on Last.fm using the album name or a musicbrainz id.
  
Gerir playlists (listas de músicas favoritas):
Criar, atribuindo-lhe um nome e descrição- POST http://localhost:3000/yama/playlist?nome={}&descricao={}
  POST/api/

Editar, alterando o seu nome e descrição-PUT http://localhost:3000/yama/playlist?nome={}&descricao={}
  PUT/api/
  
Listar-
  GET/
Obter os detalhes, onde consta: o nome, descrição, total de tempo das músicas que o constituem e os detalhes de cada música (nome e duração).-
  GET/
Adicionar uma música-
  POST/
Remover uma música- 
DELETE/
