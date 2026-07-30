"use client";

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Check } from "lucide-react";

export interface Step {
  title: string;
  description?: string;
  content: ReactNode;
}

interface StepperFormProps {
  steps: Step[];
  onSubmit: () => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function StepperForm({
  steps,
  onSubmit,
  submitLabel = "Simpan",
  isSubmitting = false,
  onCancel,
}: StepperFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  const goNext = useCallback(() => {
    if (!isLast) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  }, [isLast]);

  const goPrev = useCallback(() => {
    if (!isFirst) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [isFirst]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-card border border-border/50 overflow-hidden rounded-[12px]">
      {/* Header */}
      <div className="px-6 pt-8 pb-0 md:px-8 md:pt-10">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => {
                  setDirection(i > currentStep ? 1 : -1);
                  setCurrentStep(i);
                }}
                className="flex flex-col items-center gap-2 group"
                aria-label={`Go to step ${i + 1}: ${step.title}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  i < currentStep
                    ? "bg-foreground text-background"
                    : i === currentStep
                    ? "border-2 border-foreground text-foreground"
                    : "border-2 border-border text-muted-foreground group-hover:border-muted-foreground group-hover:text-foreground"
                }`}>
                  {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-[10px] leading-snug text-center font-medium tracking-[0.05em] transition-colors duration-200 ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`h-px w-10 md:w-16 mx-1.5 md:mx-2.5 transition-colors duration-300 ${
                  i < currentStep ? "bg-foreground" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mt-8 mb-0">
          <div className="flex-1 h-1 bg-muted overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 md:p-8 min-h-[300px]">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-foreground mb-1">
            {steps[currentStep].title}
          </h2>
          {steps[currentStep].description && (
            <p className="text-sm text-muted-foreground">
              {steps[currentStep].description}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-6 md:p-8 flex items-center justify-between">
        <div>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              Batal
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          {!isFirst && (
            <Button
              type="button"
              variant="outline"
              onClick={goPrev}
              className="gap-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali
            </Button>
          )}

          {isLast ? (
            <Button
              type="button"
              variant="default"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {submitLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              onClick={goNext}
              className="gap-2"
            >
              Selanjutnya
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
