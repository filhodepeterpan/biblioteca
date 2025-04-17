function buscaLivros() {
    const termo = document.getElementById("searchInput").value;
    const categoria = document.getElementById("filtroCategoria").value;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termo)}`;
  
    if (categoria) {
      url += `+subject:${encodeURIComponent(categoria)}`;
    }
  
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
          const autores = info.authors?.join(", ") || "Autor desconhecido";
  
          container.innerHTML += `
            <section>
              <img src="${capa}" alt="Capa" style="height:150px;">
              <h3>${titulo}</h3>
              <p><strong>Autor(es):</strong> ${autores}</p>
            </section>
          `;
        });
      })
      .catch(err => {
        console.error("Erro ao buscar livros:", err);
      });
  }
  