"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { manualCheckInUser } from "@/actions/admin/scanner-admin-actions";
import { ReactNode } from "react";

interface ManualCheckInDialogProps {
	userID: string;
	name: string;
	// Optional trigger. When omitted, control the dialog with open/onOpenChange (e.g. from a dropdown item).
	children?: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export default function ManualCheckInDialog({
	userID,
	name,
	children,
	open,
	onOpenChange,
}: ManualCheckInDialogProps) {
	const { execute, status } = useAction(manualCheckInUser, {
		onSuccess: () => {
			toast.dismiss();
			toast.success(`${name} has been checked in!`);
		},
		onError: ({ error }) => {
			toast.dismiss();
			console.error(error);
			toast.error(
				error.serverError ??
					"An error occurred while checking in this user.",
			);
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{children && (
				<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			)}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Check in {name}?</AlertDialogTitle>
					<AlertDialogDescription>
						This will manually check the user in to the hackathon
						without scanning their QR code.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={status === "executing"}
						onClick={() => {
							toast.loading("Checking user in...");
							execute({ userID });
						}}
					>
						Check In
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
