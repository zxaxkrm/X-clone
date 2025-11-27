-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_parentPostId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_repostId_fkey`;

-- DropIndex
DROP INDEX `Post_parentPostId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Post_repostId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `repostId` INTEGER NULL,
    MODIFY `parentPostId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_repostId_fkey` FOREIGN KEY (`repostId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_parentPostId_fkey` FOREIGN KEY (`parentPostId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
