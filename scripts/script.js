const campoBuscar = document.getElementById("inputBusca");
const botaoBuscar = document.getElementById("buscar");

campoBuscar.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    buscaLivros();
  }
});

function buscaLivros() {
    const termo = document.getElementById("inputBusca").value;
    const categoria = document.getElementById("filtroCategoria").value;
    const nomeDaCategoria = document.getElementById("nome-da-categoria");

    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termo)}`;
  
    if (categoria) {
      url += `+subject:${encodeURIComponent(categoria)}`;
    }

    categoria? nomeDaCategoria.innerHTML = `Categoria: ${categoria}`: nomeDaCategoria.innerHTML = `Todos`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("resultadoLivros");
        container.innerHTML = "";
  
        if (!data.items) {
          container.innerHTML = "<p>Não possuímos este livro disponível.</p>";
          return;
        }
  
        data.items.forEach(livro => {
          const info = livro.volumeInfo;
          const capa = info.imageLinks?.thumbnail || "";
          const titulo = info.title || "Sem título";
          const generos = info.categories?.[0] || "Desconhecido";
          const autores = info.authors?.join(", ") || "Autor desconhecido";
  
          container.innerHTML += 
            `
              <section>
                <img src="${capa}" alt="Capa de ${titulo}" id="livro-capa">
                <div id="livro-info">
                  <b>${titulo}</b>
                  <p><strong>Autor(es):</strong> ${autores}</p>
                  <p><strong>Gênero(s):</strong> ${generos}</p>
                </div>
              </section>
            `;
        });
      })
      .catch(err => {
        console.error("Erro ao buscar livros:", err);
      });
  }
  