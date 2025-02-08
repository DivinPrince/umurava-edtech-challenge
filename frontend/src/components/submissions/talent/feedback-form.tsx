"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateSubmissionMutation } from "@/lib/redux/features/submissionApi";
import { toast } from "sonner";

const feedbackSchema = z.object({
    feedback: z.string().min(1, "Feedback cannot be empty")
});

interface FeedbackFormProps {
    submissionId: string;
    feedback?: string;
    onSuccess?: (feedback: string) => void;
}

export function FeedbackForm({ submissionId, feedback = "", onSuccess }: FeedbackFormProps) {
    const [updateSubmission, { isLoading }] = useUpdateSubmissionMutation();
    const form = useForm<z.infer<typeof feedbackSchema>>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: { feedback }
    });

    const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
        try {
            await updateSubmission({ 
                id: submissionId, 
                feedback: data.feedback 
            }).unwrap();
            toast.success("Feedback updated successfully");
            onSuccess?.(data.feedback);
        } catch (error: unknown) {
            console.error('Feedback update failed:', error);
            toast.error("Failed to update feedback");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your feedback..."
                                    className="min-h-[100px]"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Feedback"}
                </Button>
            </form>
        </Form>
    );
} 