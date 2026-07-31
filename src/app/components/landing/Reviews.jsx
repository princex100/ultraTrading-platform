const reviewsData = [
  {
    rating: "⭐⭐⭐⭐⭐",
    text: '"Finally a platform that made trading easy."',
    author: "Rahul Sharma"
  },
  {
    rating: "⭐⭐⭐⭐☆",
    text: '"Very realistic market simulation."',
    author: "Priya Gupta"
  },
  {
    rating: "⭐⭐⭐⭐⭐",
    text: '"Excellent experience for beginners."',
    author: "Aman Verma"
  },
  {
    rating: "⭐⭐⭐⭐⭐",
    text: '"Clean interface and smooth trading."',
    author: "Neha Singh"
  },
  {
    rating: "⭐⭐⭐⭐☆",
    text: '"Great way to understand investing."',
    author: "Arjun Mehta"
  }
];

const ReviewCard = ({ rating, text, author }) => (
  <div className="bg-white dark:bg-[#1e1e2d] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-5 w-64 text-left flex flex-col gap-3 transition-colors duration-200">
    <div className="text-sm tracking-widest">{rating}</div>
    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-snug">
      {text}
    </p>
    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
      — {author}
    </p>
  </div>
);

const Reviews = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8 mb-24">
      
      <div className="flex flex-wrap justify-center gap-6">
        {reviewsData.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>

    </div>
  );
};

export default Reviews;
