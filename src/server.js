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
import cupomRoutes from "./routes/cupom.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import pagamentoRoutes from "./routes/pagamento.routes.js";
import siteConfigRoutes from "./routes/siteConfig.routes.js";
import vendaPresencialRoutes from "./routes/vendaPresencial.routes.js";

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
        url: 'https://hcstore-service-8os6.onrender.com/api'
      }
    ]
  },
  apis: ['./src/routes/*.js']
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
app.use("/api/cupons", cupomRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/pagamentos", pagamentoRoutes);
app.use("/api/site-config", siteConfigRoutes);
app.use("/api/venda-presencial", vendaPresencialRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🔥')
})

app.listen(3000, () => {
  console.log('🔥 Server rodando na porta 3000')
})