import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../config/site-config.json");

export const obterConfiguracoes = (req, res) => {
  try {
    const data = fs.readFileSync(configPath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao ler configurações." });
  }
};

export const salvarConfiguracoes = (req, res) => {
  try {
    fs.writeFileSync(
      configPath,
      JSON.stringify(req.body, null, 2),
      "utf8"
    );

    res.json({
      message: "Configurações salvas com sucesso."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao salvar configurações."
    });
  }
};