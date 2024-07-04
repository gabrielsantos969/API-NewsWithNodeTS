CREATE TABLE `news`.`category_news` (
    `id_news` INT NOT NULL,
    `id_category` INT NOT NULL,
    PRIMARY KEY (id_news, id_category),
    CONSTRAINT fk_id_news FOREIGN KEY (`id_news`) REFERENCES `news`.`news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_id_category FOREIGN KEY  (`id_category`) REFERENCES `news`.`category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
)