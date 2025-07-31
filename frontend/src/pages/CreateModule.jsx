import { useForm, useFieldArray } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from 'react-hot-toast';

const CreateModule = () => {
  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      createdBy: user ? user.username : "",
      questions: [
        { questionName: "", difficulty: "Easy", link: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async(data) => {
    const cleanedQuestions = data.questions.filter(
      (q) => q.questionName.trim() !== ""
    );
    const finalData = { ...data, questions: cleanedQuestions };
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/createModule` , finalData , {
            headers : {"Content-Type" : "application/json"},
            withCredentials : true
        } );
        if(res.data.success){
            toast.success(res.data.message);
        }
    }
    catch(err){
        toast.error("Module Create Failed")
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Module</h1>
        <p className="text-gray-400">Design a comprehensive learning module with practice questions</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Module Details */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Module Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">Module Title</Label>
              <Input
                {...register("title", { required: true })}
                placeholder="Enter an engaging module title"
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
              />
              {errors.title && <p className="text-red-400 text-sm">Title is required</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">Description</Label>
              <Textarea
                {...register("description", { required: true })}
                placeholder="Describe what students will learn..."
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 min-h-[120px] resize-none"
              />
              {errors.description && <p className="text-red-400 text-sm">Description is required</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">Created By</Label>
              <Input
                {...register("createdBy")}
                placeholder="Your name or organization"
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Practice Questions ({fields.length})
            </CardTitle>
            <Button
              type="button"
              onClick={() => append({ questionName: "", difficulty: "Easy", link: "" })}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-gray-900 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Question {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-300">Question Name</Label>
                    <Input
                      {...register(`questions.${index}.questionName`)}
                      placeholder="Enter question or problem statement"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Difficulty Level</Label>
                    <Select
                      value={watch(`questions.${index}.difficulty`)}
                      onValueChange={(value) => setValue(`questions.${index}.difficulty`, value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="Easy" className="text-green-400">Easy</SelectItem>
                        <SelectItem value="Medium" className="text-yellow-400">Medium</SelectItem>
                        <SelectItem value="Hard" className="text-red-400">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Problem Link</Label>
                    <Input
                      {...register(`questions.${index}.link`)}
                      placeholder="https://leetcode.com/problems/..."
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      type="url"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Create Module
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg font-medium transition-all duration-200"
          >
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateModule;

