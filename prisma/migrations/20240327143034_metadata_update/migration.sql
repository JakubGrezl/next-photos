/*
  Warnings:

  - You are about to drop the column `fileType` on the `Metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Metadata` DROP COLUMN `fileType`,
    ADD COLUMN `aperture` DOUBLE NULL,
    ADD COLUMN `camera` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `editedIn` VARCHAR(191) NULL,
    ADD COLUMN `exposure` INTEGER NULL,
    ADD COLUMN `flash` VARCHAR(191) NULL,
    ADD COLUMN `focalLength` INTEGER NULL,
    ADD COLUMN `iso` INTEGER NULL,
    ADD COLUMN `lens` VARCHAR(191) NULL,
    ADD COLUMN `whiteBalance` VARCHAR(191) NULL,
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;
