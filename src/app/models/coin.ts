export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image:string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  description: {
    en: string;
  };
}
