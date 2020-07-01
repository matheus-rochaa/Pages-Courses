const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const sites = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    return res.render("courses", { items: sites })
})

server.get("/about", function(req, res) {
    const about = {
        avatar_url: "https://rocketseat.com.br/static/images/logo-rocketseat.svg",
        title: "Rocketseat",
        description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        mainTec: "Principais tecnologias:",
        tecs: [
            { name: "NodeJS"},
            { name: "ReactJS"},
            { name: "React Native"}
        ]
    }
    return res.render("about", { about })
})

server.get("/site", function(req, res) {
    const id = req.query.id
    
    const site = sites.find(function(site) {
        return site.id == id
    })

    if (!site) {
        return res.send("Site not found!")
    }

    return res.render("site", { item: site })

    res.send(id)
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function() {
    console.log("Server is running")
})