import { Command } from "./Command";
import { CoinFlip } from "../Commands/CoinFlip";
import { RPS } from "../Commands/RockPaperScissors";
import { Rank } from "../Commands/Rank";

export const Commands: Command[] = [CoinFlip, RPS, Rank];