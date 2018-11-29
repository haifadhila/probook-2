CREATE SCHEMA IF NOT EXISTS `bank_svc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ;

USE `bank_svc` ;

CREATE TABLE IF NOT EXISTS `bank_svc`.`accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `card_number` VARCHAR(45) NOT NULL,
  `balance` BIGINT NOT NULL COMMENT 'in cents',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`card_number`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bank_svc`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `acct` INT NOT NULL,
  `amount` BIGINT NOT NULL COMMENT 'in cents',
  `type` ENUM('deposit', 'withdrawal', 'transfer', 'correction') NOT NULL,
  `remarks` text,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`acct`),
  FOREIGN KEY (`acct`) REFERENCES `bank_svc`.`accounts` (`id`)
) ENGINE = InnoDB;

