/*
  Warnings:

  - You are about to drop the column `imagem` on the `produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `imagem`,
    ADD COLUMN `marca` VARCHAR(191) NULL,
    ADD COLUMN `tamanho` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `produtoImagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `produtoId` INTEGER NOT NULL,

    INDEX `produtoImagem_produtoId_idx`(`produtoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtoImagem` ADD CONSTRAINT `produtoImagem_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
