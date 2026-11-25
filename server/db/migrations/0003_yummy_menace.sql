ALTER TABLE `gifts` ADD `reservation_token` TEXT;--> statement-breakpoint
CREATE UNIQUE INDEX `gifts_reservationToken_unique` ON `gifts` (`reservation_token`);--> statement-breakpoint
ALTER TABLE `wishlists` ADD `slug` TEXT NOT NULL DEFAULT '';--> statement-breakpoint
UPDATE `wishlists` SET `slug` = lower(hex(randomblob(9)));--> statement-breakpoint
CREATE UNIQUE INDEX `wishlists_slug_unique` ON `wishlists` (`slug`);
