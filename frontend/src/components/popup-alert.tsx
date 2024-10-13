"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, XCircleIcon, XIcon } from "lucide-react";
import { createPortal } from "react-dom";

interface PopupAlertProps {
  type: "success" | "error";
  title: string;
  message: string;
  show: boolean;
  onDismiss: () => void;
  duration?: number;
}

export default function PopupAlertComponent({
  type,
  title,
  message,
  show,
  onDismiss,
  duration = 5000,
}: PopupAlertProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  const alertContent = (
    <div
      className={`fixed right-4 top-4 z-50 w-96 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <Alert
        className={`mb-4 ${type === "success" ? "bg-green-50" : "bg-red-50"} shadow-lg`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            {type === "success" ? (
              <CheckCircle2Icon className="mt-0.5 h-5 w-5 text-green-600" />
            ) : (
              <XCircleIcon className="mt-0.5 h-5 w-5 text-red-600" />
            )}
            <div className="ml-3">
              <AlertTitle
                className={
                  type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {title}
              </AlertTitle>
              <AlertDescription
                className={
                  type === "success" ? "text-green-700" : "text-red-700"
                }
              >
                {message}
              </AlertDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`-mr-2 -mt-2 ${type === "success" ? "hover:bg-green-100" : "hover:bg-red-100"}`}
            onClick={handleDismiss}
          >
            <XIcon
              className={`h-4 w-4 ${type === "success" ? "text-green-600" : "text-red-600"}`}
            />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </Alert>
    </div>
  );

  return createPortal(alertContent, document.body);
}
