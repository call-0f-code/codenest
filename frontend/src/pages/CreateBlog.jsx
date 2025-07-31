import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async(data) => {
    const blogData = {
      ...data,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/createBlog` ,blogData , {
            headers : {"Content-Type" : "application/json"},
            withCredentials : true 
        } );
        if(res.data.success){
            toast.success(res.data.message);
        }

    }
    catch(err){
       toast.error(err.response.data.message);
    }
    
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Blog Post</h1>
        <p className="text-gray-400">Share knowledge with the community</p>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Blog Title</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Enter blog title"
              className="bg-gray-800 border-gray-700 text-white"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-white">Author</Label>
            <Input
              id="author"
              {...register("author", { required: true })}
              placeholder="Enter author name"
              className="bg-gray-800 border-gray-700 text-white"
            />
            {errors.author && <p className="text-red-500 text-sm">Author is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">Content</Label>
            <Textarea
              id="content"
              {...register("content", { required: true })}
              placeholder="Write your blog content here..."
              className="bg-gray-800 border-gray-700 text-white min-h-[300px]"
            />
            {errors.content && <p className="text-red-500 text-sm">Content is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-white">Tags</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="Enter tags separated by commas (e.g., JavaScript, React, Tutorial)"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-gray-500 text-sm">Separate multiple tags with commas</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Publish Blog
            </Button>
            <Button type="button" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
