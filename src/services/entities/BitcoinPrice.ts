export enum Currency {
    USD = "USD",
    BTC = "BTC",
    BRL = "BRL",
    EUR = "EUR",
    CAD = "CAD"
}


export class BitcoinPrice {
    constructor(
        private price: number,
        private currency: Currency
    ) {}

    public getPrice(): number { return this.price }
    public getCurrency(): Currency { return this.currency }

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