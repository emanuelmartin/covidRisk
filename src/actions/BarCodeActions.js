import { UPDATE_BAR_CODE, CLEAN_BAR_CODE } from './types';

export const cleanBarCode = () => ({
  type: CLEAN_BAR_CODE,
});

export const updateBarCode = ({ barCode, barType }) => ({
  type: UPDATE_BAR_CODE,
  barCode,
  barType
});
