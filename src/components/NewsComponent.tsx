// filepath: /C:/Users/karan/Projects/my-vite-app/src/components/NewsComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
          params: {
            api_token: 'HW98srglDvyiB79URBYFESWozuUMJNcKaFNLCl3P', // Replace with your API key
            locale: 'in',
          },
        });
        setNews(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="news-component">
      <h2 className="text-2xl font-bold mb-4">Latest News from India</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <li key={article.uuid} className="bg-white shadow-md rounded-lg p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold text-lg">
              {article.title}
            </a>
            <p className="text-gray-700 mt-2">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;