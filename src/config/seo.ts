type LocaleSeo = {
	title: string
	description: string
	ogTitle: string
	ogDescription: string
}

type LayoutSeo = {
	defaultTitle: string
	template: string
	description: string
	keywords: string[]
	ogTitle: string
	ogDescription: string
	twitterTitle: string
	twitterDescription: string
}

export const layoutSeo: Record<string, LayoutSeo> = {
	en: {
		defaultTitle: "Sinku — Introducing You to the Global Economy",
		template: "%s | Sinku",
		description:
			"Your all-in-one money app. Send money abroad, pay online worldwide, and hold multiple currencies — with international debit cards, real exchange rates, and zero monthly fees. The smart alternative to traditional banking.",
		keywords: [
			"Sinku",
			"fintech app",
			"neobank",
			"digital banking",
			"online banking",
			"mobile banking app",
			"money app",
			"international debit card",
			"virtual debit card",
			"prepaid card",
			"Visa debit card",
			"Mastercard debit card",
			"contactless payments",
			"send money abroad",
			"international money transfer",
			"cross-border payments",
			"remittance app",
			"multi-currency account",
			"currency exchange app",
			"hold multiple currencies",
			"digital wallet",
			"cashback card",
			"no fee bank account",
			"free bank account",
			"bank alternative",
			"mobile payments",
			"peer-to-peer payments",
			"send money online",
			"international payments app",
			"travel card",
			"spending abroad",
			"exchange rate",
			"Apple Pay",
			"Google Pay",
			"virtual card",
			"freeze card",
			"spending insights",
			"real-time notifications",
			"instant transfers",
			"split bills",
			"money management app",
		],
		ogTitle: "Sinku — Introducing You to the Global Economy",
		ogDescription:
			"Your all-in-one money app — send money abroad, pay online, hold multiple currencies. International debit cards with real exchange rates and zero monthly fees.",
		twitterTitle: "Sinku — Introducing You to the Global Economy",
		twitterDescription:
			"Your all-in-one money app — send money abroad, pay online, hold multiple currencies. International debit cards with real exchange rates and zero monthly fees.",
	},
	pt: {
		defaultTitle: "Sinku — A Sua Porta de Entrada na Economia Global",
		template: "%s | Sinku",
		description:
			"A sua app financeira completa. Envie dinheiro para o estrangeiro, pague online em todo o mundo e guarde várias moedas — com cartões de débito internacionais, câmbio real e sem taxas mensais. A alternativa inteligente aos bancos tradicionais.",
		keywords: [
			"Sinku",
			"app fintech",
			"neobanco",
			"banco digital",
			"banco online",
			"app bancária",
			"app de dinheiro",
			"cartão de débito internacional",
			"cartão de débito virtual",
			"cartão pré-pago",
			"cartão Visa",
			"cartão Mastercard",
			"pagamentos contactless",
			"enviar dinheiro para o estrangeiro",
			"transferência internacional",
			"pagamentos internacionais",
			"app de remessas",
			"conta multi-moeda",
			"app de câmbio",
			"guardar várias moedas",
			"carteira digital",
			"cartão com cashback",
			"conta sem taxas",
			"conta gratuita",
			"alternativa ao banco",
			"pagamentos móveis",
			"pagamentos entre pessoas",
			"enviar dinheiro online",
			"app de pagamentos internacionais",
			"cartão de viagem",
			"gastar no estrangeiro",
			"taxa de câmbio",
			"Apple Pay",
			"Google Pay",
			"cartão virtual",
			"bloquear cartão",
			"análise de gastos",
			"notificações em tempo real",
			"transferências instantâneas",
			"dividir contas",
			"app de gestão financeira",
		],
		ogTitle: "Sinku — A Sua Porta de Entrada na Economia Global",
		ogDescription:
			"A sua app financeira completa — envie dinheiro, pague online, guarde várias moedas. Cartões de débito internacionais com câmbio real e sem taxas mensais.",
		twitterTitle: "Sinku — A Sua Porta de Entrada na Economia Global",
		twitterDescription:
			"A sua app financeira completa — envie dinheiro, pague online, guarde várias moedas. Cartões de débito internacionais com câmbio real e sem taxas mensais.",
	},
}

export const pageSeo: Record<string, Record<string, LocaleSeo>> = {
	home: {
		en: {
			title: "Sinku — Introducing You to the Global Economy",
			description:
				"The all-in-one money app that works like a bank — but better. International debit cards, instant money transfers, multi-currency accounts, cashback rewards, and no monthly fees. Send, spend, and save worldwide.",
			ogTitle: "Sinku — Your Money. Everywhere.",
			ogDescription:
				"The all-in-one money app that works like a bank — but better. International debit cards, instant transfers, multi-currency accounts, and no monthly fees.",
		},
		pt: {
			title: "Sinku — A Sua Porta de Entrada na Economia Global",
			description:
				"A app financeira completa que funciona como um banco — mas melhor. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda, cashback e sem taxas mensais. Envie, gaste e poupe em todo o mundo.",
			ogTitle: "Sinku — O Seu Dinheiro. Em Todo o Lado.",
			ogDescription:
				"A app financeira completa que funciona como um banco — mas melhor. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda e sem taxas mensais.",
		},
	},
	cards: {
		en: {
			title: "International Debit Cards — Virtual & Physical Visa and Mastercard",
			description:
				"Get a free international Visa and Mastercard debit card — virtual or physical. Pay online, tap contactless, use Apple Pay & Google Pay, earn cashback, and spend abroad at real exchange rates. No hidden fees.",
			ogTitle: "Sinku Cards — International Debit Card with Cashback",
			ogDescription:
				"Free international Visa and Mastercard debit card. Pay online and in-store, earn cashback, freeze in one tap. Virtual cards available instantly.",
		},
		pt: {
			title: "Cartões de Débito Internacionais — Visa e Mastercard Virtual e Físico",
			description:
				"Obtenha um cartão de débito Visa e Mastercard internacional gratuito — virtual ou físico. Pague online, toque contactless, use Apple Pay e Google Pay, ganhe cashback e gaste no estrangeiro com câmbio real. Sem taxas ocultas.",
			ogTitle: "Cartões Sinku — Cartão de Débito Internacional com Cashback",
			ogDescription:
				"Cartão de débito Visa e Mastercard internacional gratuito. Pague online e em loja, ganhe cashback, bloqueie com um toque. Cartões virtuais disponíveis instantaneamente.",
		},
	},
	whatWeOffer: {
		en: {
			title: "What We Offer — Payments, Transfers & Multi-Currency",
			description:
				"Send money instantly to friends and family worldwide. Hold 30+ currencies, exchange at the real rate, and pay with zero hidden fees. Up to 5x cheaper than traditional banks.",
			ogTitle: "Sinku — Instant Payments, Global Transfers & 30+ Currencies",
			ogDescription:
				"Send money globally, hold multiple currencies, and exchange at real rates. Peer-to-peer payments, bank transfers, and card-to-card — all in one fintech app.",
		},
		pt: {
			title: "O Que Oferecemos — Pagamentos, Transferências e Multi-Moeda",
			description:
				"Envie dinheiro instantaneamente para amigos e família em todo o mundo. Guarde mais de 30 moedas, troque ao câmbio real e pague sem taxas ocultas. Até 5x mais barato do que os bancos tradicionais.",
			ogTitle: "Sinku — Pagamentos Instantâneos, Transferências Globais e 30+ Moedas",
			ogDescription:
				"Envie dinheiro globalmente, guarde várias moedas e troque ao câmbio real. Pagamentos entre pessoas, transferências bancárias e cartão a cartão — tudo numa app fintech.",
		},
	},
	downloadApp: {
		en: {
			title: "Download the Sinku App — Your Digital Banking Alternative",
			description:
				"Download Sinku and get instant access to international debit cards, money transfers, multi-currency accounts, and cashback rewards. Available on iOS and Android. Free to use, no monthly fees.",
			ogTitle: "Get the Sinku App — Your Money, Everywhere",
			ogDescription:
				"Download the Sinku fintech app. International debit cards, instant transfers, multi-currency accounts — all from your phone.",
		},
		pt: {
			title: "Descarregue a App Sinku — A Sua Alternativa ao Banco Digital",
			description:
				"Descarregue o Sinku e obtenha acesso instantâneo a cartões de débito internacionais, transferências, contas multi-moeda e cashback. Disponível para iOS e Android. Grátis, sem taxas mensais.",
			ogTitle: "Obtenha a App Sinku — O Seu Dinheiro, Em Todo o Lado",
			ogDescription:
				"Descarregue a app fintech Sinku. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda — tudo a partir do telemóvel.",
		},
	},
	faqs: {
		en: {
			title: "Frequently Asked Questions",
			description:
				"Find answers to common questions about Sinku — international debit cards, money transfers, multi-currency accounts, fees, security, and how to get started with our fintech app.",
			ogTitle: "Frequently Asked Questions — Sinku",
			ogDescription:
				"Everything you need to know about Sinku. Cards, transfers, currencies, fees, and getting started.",
		},
		pt: {
			title: "Perguntas Frequentes",
			description:
				"Encontre respostas para as perguntas mais comuns sobre o Sinku — cartões de débito internacionais, transferências, contas multi-moeda, taxas, segurança e como começar a usar a nossa app fintech.",
			ogTitle: "Perguntas Frequentes — Sinku",
			ogDescription:
				"Tudo o que precisa de saber sobre o Sinku. Cartões, transferências, moedas, taxas e como começar.",
		},
	},
	help: {
		en: {
			title: "Help Centre — Sinku",
			description:
				"Find answers to your questions about Sinku. Browse our Help Centre for guides on accounts, cards, payments, transfers, security, and more.",
			ogTitle: "Sinku Help Centre",
			ogDescription:
				"Find answers to your questions about Sinku. Guides on accounts, cards, payments, transfers, and security.",
		},
		pt: {
			title: "Centro de Ajuda — Sinku",
			description:
				"Encontre respostas para suas perguntas sobre o Sinku. Navegue pelo nosso Centro de Ajuda com guias sobre contas, cartões, pagamentos, transferências, segurança e mais.",
			ogTitle: "Centro de Ajuda Sinku",
			ogDescription:
				"Encontre respostas para suas perguntas sobre o Sinku. Guias sobre contas, cartões, pagamentos, transferências e segurança.",
		},
	},
	waitlist: {
		en: {
			title: "Join the Waitlist — Be the First to Try Sinku",
			description:
				"Sign up for early access to Sinku — the international money app with low-fee transfers, multi-currency accounts, and Visa and Mastercard debit cards. Be the first to know when we launch.",
			ogTitle: "Join the Sinku Waitlist — Coming Soon",
			ogDescription:
				"Be the first to experience borderless finance. Sign up for early access to international cards, low-fee transfers, and multi-currency accounts.",
		},
		pt: {
			title: "Lista de Espera — Seja o Primeiro a Experimentar o Sinku",
			description:
				"Registe-se para acesso antecipado ao Sinku — a app financeira internacional com transferências a baixo custo, contas multi-moeda e cartões Visa e Mastercard. Seja o primeiro a saber quando lançarmos.",
			ogTitle: "Junte-se à Lista de Espera Sinku — Em Breve",
			ogDescription:
				"Seja o primeiro a experimentar finanças sem fronteiras. Registe-se para acesso antecipado a cartões internacionais, transferências com taxas baixas e contas multi-moeda.",
		},
	},
	howWeWork: {
		en: {
			title: "How We Work — Transparency & Technology",
			description:
				"Understand how Sinku works. Learn about our technology, partners, non-custodial wallet architecture, card issuance through our licensed partner, and why we are not a bank.",
			ogTitle: "How Sinku Works — Technology, Partners & Transparency",
			ogDescription:
				"Discover how Sinku operates. Non-custodial wallets, licensed partner card issuance, Visa and Mastercard networks, and full transparency on our fintech architecture.",
		},
		pt: {
			title: "Como Funcionamos — Transparência e Tecnologia",
			description:
				"Entenda como o Sinku funciona. Conheça a nossa tecnologia, parceiros, arquitectura de carteiras não custodiais, emissão de cartões pelo nosso parceiro licenciado e porque não somos um banco.",
			ogTitle: "Como o Sinku Funciona — Tecnologia, Parceiros e Transparência",
			ogDescription:
				"Descubra como o Sinku opera. Carteiras não custodiais, emissão de cartões pelo nosso parceiro licenciado, redes Visa e Mastercard e total transparência sobre a nossa arquitectura fintech.",
		},
	},
	support: {
		en: {
			title: "Support — Help Centre",
			description:
				"Get help with your Sinku account, cards, payments, and transfers. Browse our Help Centre or chat with our support team 24/7 in 100+ languages.",
			ogTitle: "Sinku Support — We're Here to Help, 24/7",
			ogDescription:
				"Get help with your Sinku account, cards, payments, and transfers. Chat with our support team 24/7.",
		},
		pt: {
			title: "Suporte — Centro de Ajuda",
			description:
				"Obtenha ajuda com a sua conta Sinku, cartões, pagamentos e transferências. Navegue pelo nosso Centro de Ajuda ou fale com a nossa equipa de suporte 24/7 em mais de 100 idiomas.",
			ogTitle: "Suporte Sinku — Estamos Aqui Para Ajudar, 24/7",
			ogDescription:
				"Obtenha ajuda com a sua conta Sinku, cartões, pagamentos e transferências. Fale com a nossa equipa de suporte 24/7.",
		},
	},
}
