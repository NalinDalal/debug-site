import React from "react";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";

const showToast = (title: string, description: string, variant: "default" | "destructive") => {
    toast({
        title,
        description,
        variant,
        className: variant === "default" ? "bg-gray-900 text-white border border-green-500" : "bg-red-500 text-white",
        action: (
            <ToastAction
                className="hover:text-gray-900 border border-green-500"
                altText="close"
            >
                Close
            </ToastAction>
        ),
    });
}


export default showToast;