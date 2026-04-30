/*
  Warnings:

  - Added the required column `updatedAt` to the `carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `itemcarrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `itempedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `itemcarrinho` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `itempedido` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
