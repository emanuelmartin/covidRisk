import { UPDATE_BAR_CODE, CLEAN_BAR_CODE } from './types';

export const cleanBarCode = () => ({
  type: CLEAN_BAR_CODE,
});

export const updateBarCode = ({ barCode, barType, pageRequest }) => ({
  type: UPDATE_BAR_CODE,
  barCode,
  barType,
  pageRequest
});
