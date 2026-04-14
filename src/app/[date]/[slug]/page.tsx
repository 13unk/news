import newsData from "../../../../data/news.json";
import ArticleClient from "./ArticleClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return newsData.map((news) => ({
    date: news.dateUrl,
    slug: news.slug,
  }));
}

export default async function ArticlePage({ params }: { params: any }) {
  const { slug, date } = await params;
  
  // Find the specific article based on slug and date from URL
  const article = newsData.find(news => 
    news.slug === slug && news.dateUrl === date
  );

  if (!article) {
    // Look for fallback if specific article is not found
    const fallback = newsData.find(n => n.id === 276);
    if (fallback) {
      return <ArticleClient article={fallback} />;
    }
    notFound();
  }

  return <ArticleClient article={article} />;
}
