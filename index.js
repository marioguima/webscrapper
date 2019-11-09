const rp = require('request-promise')
const cheerio = require('cheerio')
const state = require('./state.js')

const options = {
    uri: 'https://www.tuasaude.com/frutas-que-emagrecem/',
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  

  rp(options)
  .then(($) => {
    const content = state.load()
    // console.log(content)
    
    // console.log($)
    // const novoArtigo = lerArtigo(content);
    content.artigos = lerArtigo(content);

    function lerArtigo(content) {
      const artigo = {titulo: $('#article-container > div.article-box.clearfix > h1').text(),
                      elementos: []}

      for (let i = 0; i < $('.artigo-body').children().length; i++) {
        const item = $('.artigo-body').children()[i]
        let textoParagrafo = $(item)[0].children[0].data
        console.log("textoParagrafo: " + textoParagrafo)
        console.log($(item))
        if(i>3) {
          break
        }
        if ($(item)[0].name == "p") {
          let textoParagrafo = $(item)[0].children[0].data
          artigo.elementos.push([{tipo: "p",
                                  texto: textoParagrafo}])
        }
      }

      return artigo
    }
        
    // console.dir(content, { depth: null })

    state.save(content)
  })
  .catch((err) => {
    console.log(err);
  })