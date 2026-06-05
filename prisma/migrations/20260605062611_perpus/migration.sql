-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'PETUGAS', 'MEMBER') NOT NULL,
    `memberId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_username_key`(`username`),
    INDEX `user_memberId_fkey`(`memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `className` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_student` INTEGER NOT NULL,
    `id_book` INTEGER NOT NULL,
    `tgl_pinjaman` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tgl_kembali` DATETIME(3) NULL,

    INDEX `Peminjaman_id_book_fkey`(`id_book`),
    INDEX `Peminjaman_id_student_fkey`(`id_student`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengembalian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `tgl_kembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pengembalian_id_peminjaman_key`(`id_peminjaman`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_nis_key`(`nis`),
    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `walas` (
    `id_walas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_walas` VARCHAR(191) NOT NULL,
    `no_tlpn` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_walas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `Peminjaman_id_book_fkey` FOREIGN KEY (`id_book`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `Peminjaman_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `Pengembalian_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjaman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
