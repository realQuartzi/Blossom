import { Command } from "./Command";
import { CoinFlip } from "../Commands/CoinFlip";
import { RPS } from "../Commands/RockPaperScissors";
import { Rank } from "../Commands/Rank";
import { EightBall } from "../Commands/EightBall";

export const Commands: Command[] = [CoinFlip, RPS, Rank, EightBall];