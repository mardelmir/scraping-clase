const express = require('express')
const app = express()

const cheerio = require('cheerio')
const axios = require('axios')

// Extraer datos de página web (enlaces e imágenes)

// const url = 'https://carlosdiazgirol.github.io/dashboard/'
const url = 'https://mardelmir.github.io/project-break-dashboard/'

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data // res.send(html) trae la página completa
            const $ = cheerio.load(html)

            const pageTitle = $('title').text()
            const links = []
            const imgs = []

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })

            res.send(`
                <h1>${pageTitle}</h1>
                    <h2>Enlaces</h2>
                        <ul>${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                        </ul>
                    <h2>Imágenes</h2>
                        <ul>${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                        </ul>
                `)
        }
    })
})


app.use((req, res) => { res.status(404).send('<h1>Página no encontrada</h1><a href="/">Volver</a>') })

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000')
})