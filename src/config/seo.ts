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
		defaultTitle: "Plexos — Introducing You to the Global Economy",
		template: "%s | Plexos",
		description:
			"Your all-in-one money app. Send money abroad, pay online worldwide, and hold multiple currencies — with international debit cards, real exchange rates, and zero monthly fees. The smart alternative to traditional banking.",
		keywords: [
			"Plexos",
			"fintech app",
			"neobank",
			"digital banking",
			"online banking",
			"mobile banking app",
			"money app",
			"international debit card",
			"virtual debit card",
			"prepaid card",
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
		ogTitle: "Plexos — Introducing You to the Global Economy",
		ogDescription:
			"Your all-in-one money app — send money abroad, pay online, hold multiple currencies. International debit cards with real exchange rates and zero monthly fees.",
		twitterTitle: "Plexos — Introducing You to the Global Economy",
		twitterDescription:
			"Your all-in-one money app — send money abroad, pay online, hold multiple currencies. International debit cards with real exchange rates and zero monthly fees.",
	},
	pt: {
		defaultTitle: "Plexos — A Sua Porta de Entrada na Economia Global",
		template: "%s | Plexos",
		description:
			"A sua app financeira completa. Envie dinheiro para o estrangeiro, pague online em todo o mundo e guarde várias moedas — com cartões de débito internacionais, câmbio real e zero taxas mensais. A alternativa inteligente aos bancos tradicionais.",
		keywords: [
			"Plexos",
			"app fintech",
			"neobanco",
			"banco digital",
			"banco online",
			"app bancária",
			"app de dinheiro",
			"cartão de débito internacional",
			"cartão de débito virtual",
			"cartão pré-pago",
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
		ogTitle: "Plexos — A Sua Porta de Entrada na Economia Global",
		ogDescription:
			"A sua app financeira completa — envie dinheiro, pague online, guarde várias moedas. Cartões de débito internacionais com câmbio real e zero taxas mensais.",
		twitterTitle: "Plexos — A Sua Porta de Entrada na Economia Global",
		twitterDescription:
			"A sua app financeira completa — envie dinheiro, pague online, guarde várias moedas. Cartões de débito internacionais com câmbio real e zero taxas mensais.",
	},
}

export const pageSeo: Record<string, Record<string, LocaleSeo>> = {
	home: {
		en: {
			title: "Plexos — Introducing You to the Global Economy",
			description:
				"The all-in-one money app that works like a bank — but better. International debit cards, instant money transfers, multi-currency accounts, cashback rewards, and zero monthly fees. Send, spend, and save worldwide.",
			ogTitle: "Plexos — Your Money. Everywhere.",
			ogDescription:
				"The all-in-one money app that works like a bank — but better. International debit cards, instant transfers, multi-currency accounts, and zero monthly fees.",
		},
		pt: {
			title: "Plexos — A Sua Porta de Entrada na Economia Global",
			description:
				"A app financeira completa que funciona como um banco — mas melhor. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda, cashback e zero taxas mensais. Envie, gaste e poupe em todo o mundo.",
			ogTitle: "Plexos — O Seu Dinheiro. Em Todo o Lado.",
			ogDescription:
				"A app financeira completa que funciona como um banco — mas melhor. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda e zero taxas mensais.",
		},
	},
	cards: {
		en: {
			title: "International Debit Cards — Virtual & Physical Mastercard",
			description:
				"Get a free international Mastercard debit card — virtual or physical. Pay online, tap contactless, use Apple Pay & Google Pay, earn cashback, and spend abroad at real exchange rates. No hidden fees.",
			ogTitle: "Plexos Cards — International Debit Card with Cashback",
			ogDescription:
				"Free international Mastercard debit card. Pay online and in-store, earn cashback, freeze in one tap. Virtual cards available instantly.",
		},
		pt: {
			title: "Cartões de Débito Internacionais — Mastercard Virtual e Físico",
			description:
				"Obtenha um cartão de débito Mastercard internacional gratuito — virtual ou físico. Pague online, toque contactless, use Apple Pay e Google Pay, ganhe cashback e gaste no estrangeiro com câmbio real. Sem taxas ocultas.",
			ogTitle: "Cartões Plexos — Cartão de Débito Internacional com Cashback",
			ogDescription:
				"Cartão de débito Mastercard internacional gratuito. Pague online e em loja, ganhe cashback, bloqueie com um toque. Cartões virtuais disponíveis instantaneamente.",
		},
	},
	whatWeOffer: {
		en: {
			title: "What We Offer — Payments, Transfers & Multi-Currency",
			description:
				"Send money instantly to friends and family worldwide. Hold 30+ currencies, exchange at the real rate, and pay with zero hidden fees. Up to 5x cheaper than traditional banks.",
			ogTitle: "Plexos — Instant Payments, Global Transfers & 30+ Currencies",
			ogDescription:
				"Send money globally, hold multiple currencies, and exchange at real rates. Peer-to-peer payments, bank transfers, and card-to-card — all in one fintech app.",
		},
		pt: {
			title: "O Que Oferecemos — Pagamentos, Transferências e Multi-Moeda",
			description:
				"Envie dinheiro instantaneamente para amigos e família em todo o mundo. Guarde mais de 30 moedas, troque ao câmbio real e pague com zero taxas ocultas. Até 5x mais barato do que os bancos tradicionais.",
			ogTitle: "Plexos — Pagamentos Instantâneos, Transferências Globais e 30+ Moedas",
			ogDescription:
				"Envie dinheiro globalmente, guarde várias moedas e troque ao câmbio real. Pagamentos entre pessoas, transferências bancárias e cartão a cartão — tudo numa app fintech.",
		},
	},
	downloadApp: {
		en: {
			title: "Download the Plexos App — Your Digital Banking Alternative",
			description:
				"Download Plexos and get instant access to international debit cards, money transfers, multi-currency accounts, and cashback rewards. Available on iOS and Android. Free to use, no monthly fees.",
			ogTitle: "Get the Plexos App — Your Money, Everywhere",
			ogDescription:
				"Download the Plexos fintech app. International debit cards, instant transfers, multi-currency accounts — all from your phone.",
		},
		pt: {
			title: "Descarregue a App Plexos — A Sua Alternativa ao Banco Digital",
			description:
				"Descarregue o Plexos e obtenha acesso instantâneo a cartões de débito internacionais, transferências, contas multi-moeda e cashback. Disponível para iOS e Android. Grátis, sem taxas mensais.",
			ogTitle: "Obtenha a App Plexos — O Seu Dinheiro, Em Todo o Lado",
			ogDescription:
				"Descarregue a app fintech Plexos. Cartões de débito internacionais, transferências instantâneas, contas multi-moeda — tudo a partir do telemóvel.",
		},
	},
	faqs: {
		en: {
			title: "Frequently Asked Questions",
			description:
				"Find answers to common questions about Plexos — international debit cards, money transfers, multi-currency accounts, fees, security, and how to get started with our fintech app.",
			ogTitle: "Frequently Asked Questions — Plexos",
			ogDescription:
				"Everything you need to know about Plexos. Cards, transfers, currencies, fees, and getting started.",
		},
		pt: {
			title: "Perguntas Frequentes",
			description:
				"Encontre respostas para as perguntas mais comuns sobre o Plexos — cartões de débito internacionais, transferências, contas multi-moeda, taxas, segurança e como começar a usar a nossa app fintech.",
			ogTitle: "Perguntas Frequentes — Plexos",
			ogDescription:
				"Tudo o que precisa de saber sobre o Plexos. Cartões, transferências, moedas, taxas e como começar.",
		},
	},
	help: {
		en: {
			title: "Help Centre — Plexos",
			description:
				"Find answers to your questions about Plexos. Browse our Help Centre for guides on accounts, cards, payments, transfers, security, and more.",
			ogTitle: "Plexos Help Centre",
			ogDescription:
				"Find answers to your questions about Plexos. Guides on accounts, cards, payments, transfers, and security.",
		},
		pt: {
			title: "Centro de Ajuda — Plexos",
			description:
				"Encontre respostas para suas perguntas sobre o Plexos. Navegue pelo nosso Centro de Ajuda com guias sobre contas, cartões, pagamentos, transferências, segurança e mais.",
			ogTitle: "Centro de Ajuda Plexos",
			ogDescription:
				"Encontre respostas para suas perguntas sobre o Plexos. Guias sobre contas, cartões, pagamentos, transferências e segurança.",
		},
	},
	support: {
		en: {
			title: "Support — Help Centre",
			description:
				"Get help with your Plexos account, cards, payments, and transfers. Browse our Help Centre or chat with our support team 24/7 in 100+ languages.",
			ogTitle: "Plexos Support — We're Here to Help, 24/7",
			ogDescription:
				"Get help with your Plexos account, cards, payments, and transfers. Chat with our support team 24/7.",
		},
		pt: {
			title: "Suporte — Centro de Ajuda",
			description:
				"Obtenha ajuda com a sua conta Plexos, cartões, pagamentos e transferências. Navegue pelo nosso Centro de Ajuda ou fale com a nossa equipa de suporte 24/7 em mais de 100 idiomas.",
			ogTitle: "Suporte Plexos — Estamos Aqui Para Ajudar, 24/7",
			ogDescription:
				"Obtenha ajuda com a sua conta Plexos, cartões, pagamentos e transferências. Fale com a nossa equipa de suporte 24/7.",
		},
	},
}
