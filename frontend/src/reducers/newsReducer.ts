import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import News from '../models/news';
import { CustomRootState, DefaultState } from '../store/state';
import { getNews } from '../actions/newsAction';

export interface NewsPageData {
  news?: News;
  similarNews: News[];
}

const InitialNewsPageData: NewsPageData = {
  news: undefined,
  similarNews: [],
};

export interface NewsState {
  details: NewsPageData;
}

type NewsStateWithRootState = NewsState & CustomRootState;

const InitialState: NewsStateWithRootState = {
  ...DefaultState,
  details: InitialNewsPageData,
};

const newsSlice = wrapSliceWithCommonFunctions({
  name: 'news',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction<NewsStateWithRootState, NewsPageData, any>(builder, getNews, {
      pending: (state) => {
        state.status = 'loading';
        state.details = InitialNewsPageData;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      },
      rejected: (state, action) => {
        state.status = 'failed';
      },
    });
  },
});

export default newsSlice.reducer;
