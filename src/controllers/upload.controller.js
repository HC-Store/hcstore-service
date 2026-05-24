export const uploadImagem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
    }
    return res.json({ url: req.file.path });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer upload.' });
  }
};