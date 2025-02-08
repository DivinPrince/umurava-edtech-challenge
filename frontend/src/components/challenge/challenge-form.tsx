"use client"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { Challenge } from "@/types/challenge"
import { DatePicker } from "@/components/ui/date-picker"

const challengeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.coerce.date().min(new Date(), "Deadline must be in the future"),
  duration: z.string().min(1, "Duration is required"),
  prize: z.number().min(1, "Prize amount is required"),
  contactEmail: z.string().email("Invalid email"),
  projectBrief: z.string().min(1, "Project brief is required"),
  projectDescription: z.string().min(1, "Project description is required"),
  projectRequirements: z.string().min(1, "Project requirements is required"),
  skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
  seniorityLevers: z.array(z.string()).min(1, "At least one seniority level is required"),
  deliverables: z.string().min(1, "Deliverables are required"),
})

type ChallengeFormValues = z.infer<typeof challengeSchema>
type ApiChallengeFormValues = Omit<ChallengeFormValues, 'deadline'> & {
  deadline: string;
}
type ChallengeFormProps = {
  initialData?: Challenge;
  onSubmit: (data: ApiChallengeFormValues) => Promise<void>;
  isLoading?: boolean;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
}

function FormLoading() {
  return (
    <Card className="h-fit">
      <CardHeader className="space-y-2 text-center">
        <CardTitle><Skeleton className="h-6 w-48 mx-auto" /></CardTitle>
        <Skeleton className="h-4 w-72 mx-auto" />
      </CardHeader>
      <CardContent className="px-6 space-y-4">
        {/* Repeat the form field pattern with skeletons */}
        {Array.from({ length: 11 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            {index === 1 || index === 6 || index === 7 || index === 8 || index === 11 ? (
              <Skeleton className="h-24 w-full" /> // For textareas
            ) : (
              <Skeleton className="h-12 w-full" /> // For inputs
            )}
          </div>
        ))}
        <Skeleton className="h-12 w-full" /> {/* Button */}
      </CardContent>
    </Card>
  )
}

export default function ChallengeForm({ initialData, onSubmit, isLoading = false, isSubmitting = false, mode = 'create' }: ChallengeFormProps) {
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: initialData ? {
      ...initialData,
      deadline: initialData.deadline ? new Date(initialData.deadline) : undefined,
    } : {
      title: "",
      description: "",
      deadline: undefined,
      duration: "",
      prize: 0,
      contactEmail: "",
      projectBrief: "",
      projectDescription: "",
      projectRequirements: "",
      skillsRequired: [],
      seniorityLevers: [],
      deliverables: "",
    },
  })

  if (isLoading) {
    return <FormLoading />
  }

  const handleSubmit = async (data: ChallengeFormValues) => {
    try {
      await onSubmit({
        ...data,
        deadline: data.deadline ? new Date(data.deadline).toISOString() : "",
      })
      if (mode === 'create') {
        form.reset()
      }
      toast.success(`Challenge ${mode === 'create' ? 'created' : 'updated'} successfully!`)
    } catch {
      toast.error(`Failed to ${mode} challenge. Please try again.`)
    }
  }

  return (
    <Card className="h-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle>{mode === 'create' ? 'Create New Challenge' : 'Edit Challenge'}</CardTitle>
            <p className="text-[#8C94A6] text-lg">
              {mode === 'create' 
                ? 'Fill out these details to build your broadcast'
                : 'Update the challenge details'}
            </p>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge/Hackathon Title</FormLabel>
                  <FormControl>
                    <Input className="h-12" placeholder="Enter title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input className="h-12" placeholder="e.g., 2 weeks" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prize"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Prize Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      className="h-12" 
                      placeholder="Enter prize amount" 
                      onChange={(e) => onChange(Number(e.target.value))}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="h-12" placeholder="Enter contact email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectBrief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Brief</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project brief" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Requirements</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project requirements" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skillsRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input 
                      className="h-12" 
                      placeholder="e.g., React, Node.js, TypeScript" 
                      onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                      value={field.value.join(', ')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seniorityLevers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seniority Levels (comma-separated)</FormLabel>
                  <FormControl>
                    <Input 
                      className="h-12" 
                      placeholder="e.g., Junior, Mid-Level, Senior" 
                      onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                      value={field.value.join(', ')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliverables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deliverables</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter expected deliverables" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
              {isLoading ? `${mode === 'create' ? 'Creating' : 'Updating'}...` : `${mode === 'create' ? 'Create' : 'Update'} Challenge`}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}