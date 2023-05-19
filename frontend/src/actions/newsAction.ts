import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../services/httpRequest';
import { NewsPageData } from '../reducers/newsReducer';
export const getNews = createAsyncThunk<NewsPageData, any>('news/getNews', async (id: any) => {
  return await get(`news/${id}`);
});
