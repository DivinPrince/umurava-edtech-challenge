"use client"

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/drawer"

import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCreateSubmissionMutation } from "@/lib/redux/features/submissionApi";
import { toast } from "sonner";

import { useState } from "react";


const submissionSchema = z.object({
    projectUrl: z.string().url(),
    additionalNotes: z.string().min(100, "Please provide more info of your work eg. challenges, how many team members")
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

interface SubmitProps {
    challengeId: string;
    children: React.ReactNode
}

// Helper function to format submission data
const formatSubmissionData = (data: SubmissionFormValues, challengeId: string) => {
    return {
        challengeId,
        content: `Project URL: ${data.projectUrl}\n\nAdditional Notes:\n${data.additionalNotes}`
    };
};

export function SubmitWork({ challengeId, children }: SubmitProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useIsMobile()
    const [createSubmission, { isLoading }] = useCreateSubmissionMutation();

    const handleSubmit = async (data: SubmissionFormValues) => {
        try {
            const formattedData = formatSubmissionData(data, challengeId);
            await createSubmission(formattedData).unwrap();
            toast.success("Work submitted successfully!");
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to submit work. Please try again.");
            console.error("Submission error:", error);
        }
    }

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    {children}
                </DrawerTrigger>
                <DrawerContent className="sm:max-w-[500px] px-4">
                    <DrawerHeader>
                        <DrawerTitle>Submit Your Work</DrawerTitle>
                    </DrawerHeader>
                        <DrawerDescription>
                            <div className="space-y-4 mt-4">
                                Submit your work and provide either a GitHub repository URL or Google Drive link.
                                <div className="text-sm text-muted-foreground ml-4 space-y-4 mt-4">
                                    • For public repositories: Share the GitHub URL<br />
                                    • For private repositories: Provide a Google Drive link with view access
                                    • Share the file/folder with <span className="font-semibold">team@umurava.africa</span> (Note: Ensure &apos;Viewer&apos; access is granted)
                                </div>
                            </div>
                        </DrawerDescription>
                    <SubmissionForm onSubmit={handleSubmit} isLoading={isLoading} />
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Submit Your Work</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-4 mt-4">
                            Submit your work and provide either a GitHub repository URL or Google Drive link.
                            <div className="text-sm text-muted-foreground ml-4 space-y-4 mt-4">
                                • For public repositories: Share the GitHub URL<br />
                                • For private repositories: Provide a Google Drive link with view access
                                • Share the file/folder with <span className="font-semibold">team@umurava.africa</span> (Note: Ensure &apos;Viewer&apos; access is granted)
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <SubmissionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}

interface SubmissionFormProps {
    onSubmit?: (data: SubmissionFormValues) => void;
    isLoading?: boolean;
}

export function SubmissionForm({ onSubmit, isLoading }: SubmissionFormProps) {
    const form = useForm<SubmissionFormValues>({
        resolver: zodResolver(submissionSchema)
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Your Work"}
                </Button>
            </form>
        </Form>
    );
}
