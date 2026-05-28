import cloudinary from '../config/cloudinary.js';

export const uploadImagem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Nenhuma imagem foi enviada.'
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'hc-store/produtos',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            error: 'Erro ao enviar imagem para o Cloudinary.'
          });
        }

        return res.status(200).json({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro interno ao fazer upload da imagem.'
    });
  }
};