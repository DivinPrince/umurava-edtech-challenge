"use client"

import { useGetChallengeQuery, useGetUserSubmissionQuery } from "@/lib/redux/features/challengeApi";
import { useUpdateSubmissionMutation, submissionApi } from "@/lib/redux/features/submissionApi";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,  
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDispatch } from "react-redux";
import React from "react";
import { Input } from "@/components/ui/input";
import { Link, Pencil } from "lucide-react";
import { FeedbackForm } from "./feedback-form";
import { toast } from "sonner";

// Helper function to extract data from submission content
const extractSubmissionData = (content: string): Partial<SubmissionFormValues> => {
    const projectUrlMatch = content.match(/Project URL: (.*?)(?:\n|$)/);
    const additionalNotesMatch = content.match(/Additional Notes:\n([\s\S]*?)$/);

    return {
        projectUrl: projectUrlMatch?.[1] || '',
        additionalNotes: additionalNotesMatch?.[1]?.trim() || ''
    };
};

const submissionSchema = z.object({
    projectUrl: z.string().url(),
    additionalNotes: z.string().min(100, "Please provide more info of your work eg. challenges, how many team members")
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

interface SubmissionViewProps {
    challengeSlug: string;
    participantId: string;
    children: React.ReactNode;
    mode: 'admin' | 'talent';  // Add mode prop to determine view type
}

// Helper function to format submission data
const formatSubmissionData = (data: SubmissionFormValues) => {
    return {
        content: `Project URL: ${data.projectUrl}\n\nAdditional Notes:\n${data.additionalNotes}`
    };
};

export function SubmissionView({ challengeSlug, participantId, children, mode }: SubmissionViewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const isMobile = useIsMobile();
    const dispatch = useDispatch();

    const { data: challenge, isLoading: isLoadingChallenge } = useGetChallengeQuery({ 
        id: challengeSlug, 
        type: 'slug' 
    });

    const { data: submission, isLoading: isLoadingSubmission, refetch } = useGetUserSubmissionQuery(
        { 
            id: challenge?.id || '', 
            userId: participantId 
        },
        { skip: !challenge?.id }
    );

    const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();

    const extractedData = submission ? extractSubmissionData(submission.content) : undefined;

    const handleSubmit = async (data: SubmissionFormValues) => {
        try {
            const formattedData = formatSubmissionData(data);
            await updateSubmission({ 
                id: submission!.id,
                ...formattedData
            }).unwrap();
            
            // Invalidate and refetch the submission data
            dispatch(submissionApi.util.invalidateTags([
                { type: 'Submission', id: submission!.id },
                { type: 'Submission', id: challenge!.id }
            ]));
            
            // Force refetch to get latest data
            await refetch();
            
            toast.success("Submission updated successfully!");
            setIsEditing(false);
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to update submission. Please try again.");
            console.error("Update error:", error);
        }
    };

    // Reset editing state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
        }
    }, [isOpen]);

    // Reset editing state when submission changes
    useEffect(() => {
        if (submission) {
            setIsEditing(false);
        }
    }, [submission]);

    const Content = () => {
        if (isLoadingChallenge || isLoadingSubmission) {
            return <SubmissionSkeleton />;
        }

        if (!submission) {
            return (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">No Submission Found</h2>
                    <p className="text-sm text-muted-foreground">
                        {mode === 'admin' 
                            ? "This participant hasn't submitted their work yet."
                            : "No submission has been made yet."}
                    </p>
                </div>
            );
        }

        if (mode === 'admin') {
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <Badge variant={
                            submission.status === 'REJECTED' ? 'destructive' :
                            submission.status === 'APPROVED' ? 'outline' :
                            'default'
                        }>
                            {submission.status}
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Project URL</h3>
                        <a 
                            href={extractedData?.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                            <Link className="h-4 w-4" />
                            {extractedData?.projectUrl}
                        </a>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Additional Notes</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {extractedData?.additionalNotes}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Feedback</h3>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? "Cancel" : "Edit Feedback"}
                            </Button>
                        </div>
                        
                        {isEditing ? (
                            <FeedbackForm 
                                submissionId={submission.id}
                                onSuccess={() => {
                                    setIsEditing(false);
                                    refetch();
                                }}
                            />
                        ) : submission.feedback ? (
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {submission.feedback}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">
                                No feedback provided yet
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        // Talent mode view
        return (
            <div className="space-y-6">
                {!isEditing ? (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <Badge variant={
                                submission.status === 'REJECTED' ? 'destructive' :
                                submission.status === 'APPROVED' ? 'success' :
                                'default'
                            }>
                                {submission.status}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Project URL</h3>
                            <a href={extractedData?.projectUrl} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-primary hover:underline break-all flex items-center gap-2">
                                <Link className="h-4 w-4" />
                                {extractedData?.projectUrl}
                            </a>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Additional Notes</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                                {extractedData?.additionalNotes}
                            </p>
                        </div>
                        {submission.feedback && (
                            <div>
                                <h3 className="font-medium mb-2">Feedback</h3>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {submission.feedback}
                                </p>
                            </div>
                        )}
                        {submission.status === 'PENDING' && (
                            <Button 
                                onClick={() => setIsEditing(true)}
                                className="w-full"
                                variant="outline"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Submission
                            </Button>
                        )}
                    </>
                ) : (
                    <SubmissionForm 
                        defaultValues={{
                            projectUrl: extractedData?.projectUrl || '',
                            additionalNotes: extractedData?.additionalNotes || ''
                        }}
                        onSubmit={handleSubmit}
                        isLoading={isUpdating}
                        onCancel={() => setIsEditing(false)}
                    />
                )}
            </div>
        );
    };

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    {children}
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Submission Details</DrawerTitle>
                        <DrawerDescription>
                            {mode === 'admin' 
                                ? "View participant's submission for this challenge"
                                : "View and manage your submission"}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                        <Content />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submission Details</DialogTitle>
                    <DialogDescription>
                        {mode === 'admin' 
                            ? "View participant's submission for this challenge"
                            : "View and manage your submission"}
                    </DialogDescription>
                </DialogHeader>
                <Content />
            </DialogContent>
        </Dialog>
    );
}

interface SubmissionFormProps {
    onSubmit?: (data: SubmissionFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    defaultValues?: SubmissionFormValues;
}
function SubmissionForm({ onSubmit, onCancel, isLoading, defaultValues }: SubmissionFormProps) {
    const form = useForm<SubmissionFormValues>({
        resolver: zodResolver(submissionSchema),
        defaultValues: {
            projectUrl: defaultValues?.projectUrl || '',
            additionalNotes: defaultValues?.additionalNotes || ''
        }
    });

    const handleSubmit = (data: SubmissionFormValues) => {
        onSubmit?.(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="projectUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project URL</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="https://github.com/u/my-awesome-project"
                                        className="pl-9"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Link className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your submission (min. 100 characters). Include: challenges faced, team members involved, live demo link, key features..."
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

function SubmissionSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-6 w-[100px]" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
} 
