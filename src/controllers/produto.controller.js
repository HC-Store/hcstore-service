import { prisma } from "../prisma/client.js";

// ✅ CRIAR PRODUTO
export const criarProduto = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      estoque,
      categoriaId,
      marca,
      tamanho,
      imagem
    } = req.body;

    // ✅ valida categoria
    if (!categoriaId) {
      return res.status(400).json({
        error: "categoriaId é obrigatório"
      });
    }

    // ✅ verifica se categoria existe
    const categoriaExiste = await prisma.categoria.findUnique({
      where: {
        id: Number(categoriaId)
      }
    });

    if (!categoriaExiste) {
      return res.status(400).json({
        error: "Categoria não existe"
      });
    }

    // ✅ cria produto
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        categoriaId: Number(categoriaId),
        marca,
        tamanho,

        // ✅ salva imagem na tabela produtoImagem
        imagens: imagem
          ? {
              create: [
                {
                  url: imagem
                }
              ]
            }
          : undefined
      },

      include: {
        categoria: true,
        imagens: true
      }
    });

    res.status(201).json(produto);

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

// ✅ LISTAR PRODUTOS
export const listarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true,
        imagens: true
      }
    });

    res.json(produtos);

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

// ✅ BUSCAR PRODUTO POR ID
export const buscarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
      where: {
        id: Number(id)
      },

      include: {
        categoria: true,
        imagens: true
      }
    });

    if (!produto) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    res.json(produto);

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

// ✅ ATUALIZAR PRODUTO
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      descricao,
      preco,
      estoque,
      categoriaId,
      marca,
      tamanho,
      imagem
    } = req.body;

    const produto = await prisma.produto.update({
      where: {
        id: Number(id)
      },

      data: {
        nome,
        descricao,
        preco: preco ? Number(preco) : undefined,
        estoque: estoque ? Number(estoque) : undefined,
        categoriaId: categoriaId
          ? Number(categoriaId)
          : undefined,
        marca,
        tamanho,

        imagens: imagem
          ? {
              create: [
                {
                  url: imagem
                }
              ]
            }
          : undefined
      },

      include: {
        categoria: true,
        imagens: true
      }
    });

    res.json(produto);

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

// ✅ DELETAR PRODUTO
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.produto.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Produto deletado"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
