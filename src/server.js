import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import usuarioRoutes from './routes/usuario.routes.js'
import categoriaRoutes from "./routes/categoria.routes.js";
import produtoRoutes from "./routes/produto.routes.js";
import enderecoRoutes from "./routes/endereco.routes.js";
import carrinhoRoutes from "./routes/carrinho.routes.js";
import itemCarrinhoRoutes from "./routes/itemcarrinho.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import authRoutes from "./routes/authRoutes.js"
<<<<<<< HEAD
import produtoImagemRoutes from "./routes/produtoImagem.routes.js";
=======
>>>>>>> 20a41d8cbec901779cd33f66c1299dd7445aa4da

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', usuarioRoutes)
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/enderecos", enderecoRoutes);
app.use("/api/carrinho", carrinhoRoutes);
app.use("/api/itemcarrinho", itemCarrinhoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/auth", authRoutes)
<<<<<<< HEAD
app.use("/api/produto-imagem", produtoImagemRoutes);
=======
>>>>>>> 20a41d8cbec901779cd33f66c1299dd7445aa4da

app.get('/', (req, res) => {
  res.send('API rodando 🔥')
})

app.listen(3000, () => {
  console.log('🔥 Server rodando na porta 3000')
})