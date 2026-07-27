import { GameId } from '../types';

import perfectHoldImg from '../assets/images/perfect_hold_custom_1785095013433.jpg';
import twentyOneImg from '../assets/images/twenty_one_thumb_custom_1785093216149.jpg';
import perfectLineImg from '../assets/images/perfect_line_custom_new_1785111733166.jpg';
import perfectCircleImg from '../assets/images/perfect_circle_thumb_1785092658041.jpg';
import memoryOrderImg from '../assets/images/memory_order_custom_1785096036834.jpg';
import colorTrapImg from '../assets/images/color_trap_custom_1785093503596.jpg';
import codeBreakImg from '../assets/images/code_break_custom_1785093650432.jpg';
import copyMoveImg from '../assets/images/copy_move_custom_1785093578053.jpg';
import missingPieceImg from '../assets/images/missing_piece_custom_1785094511638.jpg';
import wrongAnswerImg from '../assets/images/wrong_answer_custom_1785093731275.jpg';
import numberRushImg from '../assets/images/number_rush_custom_1785093824678.jpg';
import ticTacToeImg from '../assets/images/tic_tac_toe_thumb_1785092761491.jpg';
import sameWordImg from '../assets/images/same_word_custom_1785095522834.jpg';
import connectFourImg from '../assets/images/connect_four_custom_1785093909758.jpg';
import beeHiveImg from '../assets/images/bee_hive_custom_1785094749807.jpg';

export const GAME_THUMBNAILS: Record<GameId, string> = {
  'perfect-hold': perfectHoldImg,
  '21-game': twentyOneImg,
  'perfect-line': perfectLineImg,
  'perfect-circle': perfectCircleImg,
  'memory-order': memoryOrderImg,
  'color-trap': colorTrapImg,
  'code-break': codeBreakImg,
  'copy-move': copyMoveImg,
  'missing-piece': missingPieceImg,
  'wrong-answer': wrongAnswerImg,
  'number-rush': numberRushImg,
  'tic-tac-toe': ticTacToeImg,
  'same-word': sameWordImg,
  'connect-four': connectFourImg,
  'bee-hive-defense': beeHiveImg,
};

export function getGameThumbnail(gameId: GameId): string {
  return GAME_THUMBNAILS[gameId] || perfectHoldImg;
}

export function getGameThumbnailStyle(_gameId: GameId): string {
  return 'object-cover object-center';
}
