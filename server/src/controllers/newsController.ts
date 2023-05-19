import { Request, Response } from 'express';
import News from '../models/news';
import NewsSimilarity from '../models/news_similarity';

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found', showToast: true });
    }

    const similarNews1 = await NewsSimilarity.find({ news1: news._id }).populate({
      path: 'news2',
      select: 'title -_id',
    });

    const similarNews2 = await NewsSimilarity.find({ news2: news._id }).populate({
      path: 'news1',
      select: 'title -_id',
    });

    let similarNews = [...similarNews1, ...similarNews2]
      .sort((a, b) => b.similarityFactor - a.similarityFactor)
      .slice(0, 5);

    const selectedSimilarNews = await Promise.all(
      similarNews.map(async (newsSimilarity) => {
        const id = newsSimilarity.news1?._id || newsSimilarity.news2?._id;
        const news = await News.findById(id);
        return news;
      }),
    );

    return res.status(200).json({ news, similarNews: selectedSimilarNews });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting the news with the provided id!', showToast: true });
  }
};
