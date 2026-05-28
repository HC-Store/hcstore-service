import { prisma } from '../prisma/client.js';

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
      imagens,
      composicaoMaterial,
      instrucaoLavagem,
      enviosDevolucoes,
      quantidadePorTamanho
    } = req.body;

    if (!nome || !preco || !estoque || !categoriaId) {
      return res.status(400).json({
        error: 'Nome, preço, estoque e categoria são obrigatórios.'
      });
    }

    const categoriaExiste = await prisma.categoria.findUnique({
      where: {
        id: Number(categoriaId)
      }
    });

    if (!categoriaExiste) {
      return res.status(400).json({
        error: 'Categoria não existe.'
      });
    }

    const imagensValidas = Array.isArray(imagens)
      ? imagens.filter(Boolean).slice(0, 3)
      : [];

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        categoriaId: Number(categoriaId),
        marca,
        tamanho,
        composicaoMaterial,
        instrucaoLavagem,
        enviosDevolucoes,
        quantidadePorTamanho: quantidadePorTamanho
          ? JSON.stringify(quantidadePorTamanho)
          : null,

        imagens: imagensValidas.length
          ? {
              create: imagensValidas.map((url) => ({ url }))
            }
          : undefined
      },
      include: {
        categoria: true,
        imagens: true
      }
    });

    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao criar produto.'
    });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true,
        imagens: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(produtos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao listar produtos.'
    });
  }
};

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
        error: 'Produto não encontrado.'
      });
    }

    return res.json(produto);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao buscar produto.'
    });
  }
};

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
      imagens,
      composicaoMaterial,
      instrucaoLavagem,
      enviosDevolucoes,
      quantidadePorTamanho
    } = req.body;

    const imagensValidas = Array.isArray(imagens)
      ? imagens.filter(Boolean).slice(0, 3)
      : [];

    const produto = await prisma.produto.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        descricao,
        preco: preco !== undefined ? Number(preco) : undefined,
        estoque: estoque !== undefined ? Number(estoque) : undefined,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
        marca,
        tamanho,
        composicaoMaterial,
        instrucaoLavagem,
        enviosDevolucoes,
        quantidadePorTamanho: quantidadePorTamanho
          ? JSON.stringify(quantidadePorTamanho)
          : undefined,

        imagens: imagensValidas.length
          ? {
              deleteMany: {},
              create: imagensValidas.map((url) => ({ url }))
            }
          : undefined
      },
      include: {
        categoria: true,
        imagens: true
      }
    });

    return res.json(produto);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao atualizar produto.'
    });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.produto.delete({
      where: {
        id: Number(id)
      }
    });

    return res.json({
      message: 'Produto deletado com sucesso.'
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao deletar produto.'
    });
  }
};
