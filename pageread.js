const rp = require('request-promise');
const $ = require('cheerio');

var options = {
    method: 'GET',
    uri: 'https://cosmos.bluesoft.com.br/pesquisar',
    form: {
        q: '7896007941636'
    }
    // ,
    // json: true // Automatically stringifies the body to JSON
};
rp(options)
  .then(function (body) {
      console.log(body.split("<h1 class='page-header'>")[1].split('<img alt="Produto Registrado em Brasil"')[0].trim());
  })
  .catch(function(err){
    console.log(err);
  });
