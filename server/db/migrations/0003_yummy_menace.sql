ALTER TABLE `gifts` ADD `reservation_token` text;--> statement-breakpoint
CREATE UNIQUE INDEX `gifts_reservationToken_unique` ON `gifts` (`reservation_token`);--> statement-breakpoint
ALTER TABLE `wishlists` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `wishlists_slug_unique` ON `wishlists` (`slug`);