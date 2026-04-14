import NewsHeader from "@/components/NewsHeader";
import NewsNav from "@/components/NewsNav";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <NewsHeader />
      <div className="pt-24 md:pt-48">
        <NewsNav />
        {children}
      </div>
    </div>
  );
}
