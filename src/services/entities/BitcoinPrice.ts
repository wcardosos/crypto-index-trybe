export enum Currency {
    USD = "USD",
    BTC = "BTC",
    BRL = "BRL",
    EUR = "EUR",
    CAD = "CAD"
}

export enum CurrencyDescription {
    USD = "United States Dollar",
    BTC = "Bitcoin",
    BRL = "Brazilian Real",
    EUR = "Euro",
    CAD = "Canadian Dollar"
}


export class BitcoinPrice {
    private description: string;
    constructor(
        private price: number,
        private currency: Currency,
    ) {
        this.description = BitcoinPrice.stringToCurrencyDescription(
            BitcoinPrice.currencyToString(this.currency)
        )
    }

    public getPrice(): number { return this.price }
    public getDescription(): string { return BitcoinPrice.currencyDescriptionToString(this.description) }
    public getCurrency(): string { return BitcoinPrice.currencyToString(this.currency) }

    public static stringToCurrencyDescription(value: string): CurrencyDescription {
        switch(value) {
            case "BTC":
                return CurrencyDescription.BTC;
            case "BRL":
                return CurrencyDescription.BRL;
            case "EUR":
                return CurrencyDescription.EUR;
            case "CAD":
                return CurrencyDescription.CAD;
            default:
                return CurrencyDescription.USD;
        }
    }

    public static currencyDescriptionToString(value: string): string {
        switch(value) {
            case CurrencyDescription.BTC:
                return "Bitcoin";
            case CurrencyDescription.BRL:
                return "Brazilian Real";
            case CurrencyDescription.EUR:
                return "Euro";
            case CurrencyDescription.CAD:
                return "Canadian Dollar";
            default:
                return "United States Dollar";
        }
    }

    public static stringToCurrency(value: string): Currency {
        switch(value) {
            case "BTC":
                return Currency.BTC;
            case "BRL":
                return Currency.BRL;
            case "EUR":
                return Currency.EUR;
            case "CAD":
                return Currency.CAD;
            default:
                return Currency.USD;
        }
    }

    public static currencyToString(value: string): string {
        switch(value) {
            case Currency.BTC:
                return "BTC";
            case Currency.BRL:
                return "BRL";
            case Currency.EUR:
                return "EUR";
            case Currency.CAD:
                return "CAD";
            default:
                return "USD";
        }
    }
}