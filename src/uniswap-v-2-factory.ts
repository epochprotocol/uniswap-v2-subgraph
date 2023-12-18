import { BigInt } from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/ERC20/ERC20";
import { PairCreated as PairCreatedEvent } from "../generated/UniswapV2Factory/UniswapV2Factory";
import { Pair, Token } from "../generated/schema";

export function handlePairCreated(event: PairCreatedEvent): void {
  let entity = new Pair(event.params.token0.concat(event.params.token1));
  let token0 = Token.load(event.params.token0);
  if (token0 === null) {
    token0 = new Token(event.params.token0);
    let tokenInstance = ERC20.bind(event.params.token0);
    let tryName = tokenInstance.try_name();
    if (!tryName.reverted) {
      token0.name = tryName.value;
    } else {
      token0.name = "N/A";
    }
    let trySymbol = tokenInstance.try_symbol();
    if (!trySymbol.reverted) {
      token0.symbol = trySymbol.value;
    } else {
      token0.symbol = "N/A";
    }
    let tryDecimals = tokenInstance.try_decimals();
    if (!tryDecimals.reverted) {
      token0.decimals = BigInt.fromString(tryDecimals.value.toString());
    } else {
      token0.decimals = BigInt.fromString("18");
    }
    token0.save();
  }

  let token1 = Token.load(event.params.token1);
  if (token1 === null) {
    token1 = new Token(event.params.token1);
    let tokenInstance = ERC20.bind(event.params.token1);
    let tryName = tokenInstance.try_name();
    if (!tryName.reverted) {
      token1.name = tryName.value;
    } else {
      token1.name = "N/A";
    }
    let trySymbol = tokenInstance.try_symbol();
    if (!trySymbol.reverted) {
      token1.symbol = trySymbol.value;
    } else {
      token1.symbol = "N/A";
    }
    let tryDecimals = tokenInstance.try_decimals();
    if (!tryDecimals.reverted) {
      token1.decimals = BigInt.fromString(tryDecimals.value.toString());
    } else {
      token1.decimals = BigInt.fromString("18");
    }
    token1.save();
  }
  entity.token0 = token0.id;
  entity.token1 = token1.id;
  entity.pair = event.params.pair;
  entity.param3 = event.params.param3;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
