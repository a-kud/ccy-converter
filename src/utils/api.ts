import { RateResponseType } from "../types";

export function getExchangeApiURL(base: string, quote: string): string {
  return `http://api.exchangeratesapi.io/latest?access_key=528660395d275b9a9badd1e34cf7e087&base=${base}&symbols=${quote}`;
}

function handleFail(response: RateResponseType): string {
  console.error(response.error);
  alert(response.error.type);
  return "0";
}

export async function getRate(base: string, quote: string): Promise<string> {
  const url = getExchangeApiURL(base, quote);
  const response = await fetch(url);
  const json = await response.json();
  if (!json.success) {
    return handleFail(json);
  }
  return json.rates[quote].toString();
}
