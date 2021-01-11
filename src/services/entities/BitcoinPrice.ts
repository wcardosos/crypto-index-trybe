import { InvalidParameterError } from "../errors/InvalidParameterError";

export enum ICurrency {
    USD = "USD",
    BTC = "BTC",
    BRL = "BRL",
    EUR = "EUR",
    CAD = "CAD"
}

export enum ICurrencyDescription {
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
        private currency: ICurrency,
    ) {
        this.description = BitcoinPrice.stringToCurrencyDescription(
            BitcoinPrice.currencyToString(this.currency)
        )
    }

    public getPrice(): number { return this.price }
    public getDescription(): string { return BitcoinPrice.currencyDescriptionToString(this.description) }
    public getCurrency(): string { return BitcoinPrice.currencyToString(this.currency) }

    public static stringToCurrencyDescription(value: string): ICurrencyDescription {
        switch(value) {
            case "USD":
                return ICurrencyDescription.USD;
            case "BTC":
                return ICurrencyDescription.BTC;
            case "BRL":
                return ICurrencyDescription.BRL;
            case "EUR":
                return ICurrencyDescription.EUR;
            case "CAD":
                return ICurrencyDescription.CAD;
            default:
                throw new InvalidParameterError("Moeda inválida");
        }
    }

    public static currencyDescriptionToString(value: string): string {
        switch(value) {
            case ICurrencyDescription.USD:
                return "United States Dollar";
            case ICurrencyDescription.BTC:
                return "Bitcoin";
            case ICurrencyDescription.BRL:
                return "Brazilian Real";
            case ICurrencyDescription.EUR:
                return "Euro";
            case ICurrencyDescription.CAD:
                return "Canadian Dollar";
            default:
                throw new InvalidParameterError("Moeda inválida");
        }
    }

    public static stringToCurrency(value: string): ICurrency {
        switch(value) {
            case "USD":
                return ICurrency.USD;
            case "BTC":
                return ICurrency.BTC;
            case "BRL":
                return ICurrency.BRL;
            case "EUR":
                return ICurrency.EUR;
            case "CAD":
                return ICurrency.CAD;
            default:
                throw new InvalidParameterError("Moeda inválida");
        }
    }

    public static currencyToString(value: string): string {
        switch(value) {
            case ICurrency.USD:
                return "USD";
            case ICurrency.BTC:
                return "BTC";
            case ICurrency.BRL:
                return "BRL";
            case ICurrency.EUR:
                return "EUR";
            case ICurrency.CAD:
                return "CAD";
            default:
                throw new InvalidParameterError("Moeda inválida");
        }
    }
}