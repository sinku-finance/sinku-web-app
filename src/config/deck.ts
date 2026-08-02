export const DECK_SLUGS = [
	"bynd",
	"castle-island",
	"dfs-lab",
	"djassi",
	"fuze",
	"hoaq",
	"lattice",
	"shilling",
	"start-ventures",
	"web-summit",
	"general",
] as const

export type DeckSlug = (typeof DECK_SLUGS)[number]

export function isDeckSlug(value: string): value is DeckSlug {
	return (DECK_SLUGS as readonly string[]).includes(value)
}
