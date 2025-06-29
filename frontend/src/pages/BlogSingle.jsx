import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const BlogSingle = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/getBlog/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setBlog(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/dashboard/blogs">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/dashboard/blogs">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        {/* Blog Header */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="mb-6">
              <span className="px-3 py-1 bg-purple-600 text-purple-100 text-sm font-medium rounded-full">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{"8 Min"}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{blog.views?.toLocaleString() || '0'} views</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Content */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                className="text-gray-300 leading-relaxed"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center">
          <Link to="/dashboard/blogs">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;
