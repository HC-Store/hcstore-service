import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import usuarioRoutes from './routes/usuario.routes.js'
import categoriaRoutes from "./routes/categoria.routes.js";
import produtoRoutes from "./routes/produto.routes.js";
import enderecoRoutes from "./routes/endereco.routes.js";
import carrinhoRoutes from "./routes/carrinho.routes.js";
import itemCarrinhoRoutes from "./routes/itemcarrinho.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import authRoutes from "./routes/authRoutes.js";
import produtoImagemRoutes from "./routes/produtoImagem.routes.js";

const app = express()

app.use(cors())
app.use(express.json())

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HC Store API',
      version: '1.0.0',
      description: 'Documentação da API HC Store'
    },
    servers: [
      {
        url: 'https://hcstore-service.onrender.com'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api', usuarioRoutes)
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/enderecos", enderecoRoutes);
app.use("/api/carrinho", carrinhoRoutes);
app.use("/api/itemcarrinho", itemCarrinhoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/produto-imagem", produtoImagemRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🔥')
})

app.listen(3000, () => {
  console.log('🔥 Server rodando na porta 3000')
})