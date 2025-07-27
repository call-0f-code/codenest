import { useEffect, useState } from "react";
import { Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Mastering Binary Search: A Complete Guide",
    excerpt:
      "Learn the fundamentals of binary search algorithm and its various applications in competitive programming...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    views: 2450,
    category: "Algorithms",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Dynamic Programming Patterns Every Developer Should Know",
    excerpt:
      "Explore the most common DP patterns that appear in coding interviews and how to recognize them...",
    author: "Alex Rodriguez",
    date: "2024-01-12",
    readTime: "12 min read",
    views: 3200,
    category: "Dynamic Programming",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Graph Algorithms: From Theory to Practice",
    excerpt:
      "A comprehensive guide to graph traversal algorithms including DFS, BFS, and their real-world applications...",
    author: "Mike Johnson",
    date: "2024-01-10",
    readTime: "15 min read",
    views: 1800,
    category: "Graph Theory",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Time Complexity Analysis Made Simple",
    excerpt:
      "Understanding Big O notation and how to analyze the efficiency of your algorithms...",
    author: "Emily Davis",
    date: "2024-01-08",
    readTime: "6 min read",
    views: 4100,
    category: "Fundamentals",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Advanced Tree Traversal Techniques",
    excerpt:
      "Go beyond basic tree traversals and learn advanced techniques for solving complex tree problems...",
    author: "David Kim",
    date: "2024-01-05",
    readTime: "10 min read",
    views: 2750,
    category: "Trees",
    image: "/placeholder.svg",
  },
];

const categories = [
  "All",
  "Algorithms",
  "Dynamic Programming",
  "Graph Theory",
  "Fundamentals",
  "Trees",
];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [blogs, setBlogs] = useState([]);

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // fetching all the blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getBlogs`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tech Blogs</h1>
        <p className="text-gray-400">
          Stay updated with the latest in DSA and programming concepts
        </p>
      </div>

      {/* Category Filter */}
      {/* <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`${
              selectedCategory === category 
                ? "bg-purple-600 hover:bg-purple-700 text-white" 
                : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div> */}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {/* <span className="px-2 py-1 bg-purple-600 text-purple-100 text-xs font-medium rounded-full">
                  {post.category}
                </span> */}
              </div>

              <h2 className="text-xl font-semibold text-white mb-3 hover:text-purple-400 cursor-pointer">
                {blog.title}
              </h2>

              {/* <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p> */}

              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    {/* <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span> */}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center">
                    {/* <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span> */}
                  </div>
                  <div className="flex items-center">
                    {/* <Eye className="w-4 h-4 mr-1" />
                    <span>{post.views.toLocaleString()}</span> */}
                  </div>
                </div>

                <Link to={`/dashboard/blogs/${blog._id}`}>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
