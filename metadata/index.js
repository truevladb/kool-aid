const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/nft.json', function(req, res) {
  const data = {
    "description": "Collect limited Kool-Aid flavors and mix them into rare NFT cocktails. We're the first bar where you're not allowed to drink.",
    "external_link": "https://kool.lol/",
    "name": "Kool Bar",
    "image": "https://kool.lol/image/kool-logo.png"
}
  res.send(data)
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const person = db[tokenId]
  const data = {
    'attributes': [
      {
        "trait_type": "Rarity",
        "value": person.rarity
      },
      {
        "trait_type": "Sugar",
        "value": person.sugar,
        "max_value": 100
      },
      {
        "trait_type": "Acidity",
        "value": person.acidity,
        "max_value": 10
      },
      {
        "trait_type": "Toxicity",
        "value": person.toxicity,
        "max_value": 10
      }
    ],
    'description': person.description,
    'image': person.image,
    'name': person.name
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
