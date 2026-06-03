import axios from 'axios';

const baseURL =
  process.env.PAGBANK_ENV === 'production'
    ? 'https://api.pagseguro.com'
    : 'https://sandbox.api.pagseguro.com';

export const criarCheckoutPagBank = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: 'Nenhum item enviado.'
      });
    }

    const response = await axios.post(
      `${baseURL}/checkouts`,
      {
        reference_id: `HCSTORE-${Date.now()}`,

        redirect_url: `${process.env.FRONTEND_URL}/pagamento/sucesso`,

        items: items.map((item) => ({
          reference_id: String(item.id),
          name: item.nome,
          quantity: Number(item.quantidade),
          unit_amount: Math.round(Number(item.preco) * 100)
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const payLink = response.data.links?.find(
      (link) => link.rel === 'PAY'
    );

    if (!payLink) {
      return res.status(500).json({
        error: 'PagBank não retornou link.'
      });
    }

    return res.status(200).json({
      paymentUrl: payLink.href
    });

  } catch (error) {
    console.log(error.response?.data || error);

    return res.status(500).json({
      error: 'Erro ao criar checkout PagBank.',
      details: error.response?.data || null
    });
  }
};