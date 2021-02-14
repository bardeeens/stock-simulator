let axios = require('axios')
// axios({
//     method: 'get',
//     url: 'https://financialmodelingprep.com/api/v3/stock/list?apikey=e4c3802b17d8e6960e1ea266d24d68d6',
//     responseType: 'stream'
//   })
//     .then(function (response) {
//       console.log(response);
//     });
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,BRK.A,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = "e4c3802b17d8e6960e1ea266d24d68d6";


axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`).then(function (response) {
        // for (let i = 0; i < 50; i++) {
        //   const element = array[i];
          
        // }    
console.log(response.data[0]);
  })

  

// const https = require('https')

// const options = {
//   hostname: 'financialmodelingprep.com',
//   port: 443,
//   path: '/api/v3/quote-short/AAPL?apikey=e4c3802b17d8e6960e1ea266d24d68d6',
//   method: 'GET'
// }

// const req = https.request(options, (res) => {
//   res.on('data', (d) => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', (error) => {
//   console.error(error)
// })

// req.end()

// https://financialmodelingprep.com/api/v3/stock/list?apikey=e4c3802b17d8e6960e1ea266d24d68d6
