import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from 'react-hot-toast';

const CreateInterviewExp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log("Creating interview experience:", data);
    
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/createInterviewExp` , data , {
            headers : {"Content-Type" : "application/json"},
            withCredentials : true
        });

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
        <h1 className="text-3xl font-bold text-white mb-2">Share Your Interview Experience</h1>
        <p className="text-gray-400">Help others by sharing your interview journey</p>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">Company</Label>
            <Input
              id="company"
              placeholder="Enter company name"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("company", { required: true })}
            />
            {errors.company && <p className="text-red-500 text-sm">Company name is required.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Input
              id="role"
              placeholder="Enter job role"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("role", { required: true })}
            />
            {errors.role && <p className="text-red-500 text-sm">Role is required.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidate" className="text-white">Candidate Name</Label>
            <Input
              id="candidate"
              placeholder="Enter your name"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("candidate")}
            />
            {errors.candidate && <p className="text-red-500 text-sm">Your name is required.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="verdict" className="text-white">Interview Result</Label>
            <Select
              onValueChange={(value) => setValue("verdict", value, { shouldValidate: true })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select interview result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Selected">Selected</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("verdict", { required: true })}
            />
            {errors.verdict && <p className="text-red-500 text-sm">Verdict is required.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">Interview Experience</Label>
            <Textarea
              id="content"
              placeholder="Share your detailed interview experience, including rounds, questions asked, tips, etc..."
              className="bg-gray-800 border-gray-700 text-white min-h-[300px]"
              {...register("content", { required: true })}
            />
            {errors.content && <p className="text-red-500 text-sm">Experience content is required.</p>}
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Share Experience
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInterviewExp;
