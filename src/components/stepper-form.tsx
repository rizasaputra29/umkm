"use client";

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-[#E5E2DD] overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-[#E5E2DD]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
            Step {currentStep + 1}/{steps.length}
          </span>
          <span className="text-sm text-[#6B6B6B]">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-[#EDEAE6] rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-[#1A1A1A] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Step dots */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentStep ? 1 : -1);
                setCurrentStep(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "bg-[#1A1A1A] w-6"
                  : i < currentStep
                  ? "bg-[#1A1A1A]"
                  : "bg-[#E5E2DD]"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 md:p-8 min-h-[300px]">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-[#1A1A1A] mb-1">
            {steps[currentStep].title}
          </h2>
          {steps[currentStep].description && (
            <p className="text-sm text-[#6B6B6B]">
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
      <div className="p-6 md:p-8 border-t border-[#E5E2DD] flex items-center justify-between">
        <div>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-[#6B6B6B] hover:text-[#1A1A1A]"
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
              className="gap-2 border-[#E5E2DD] text-[#6B6B6B] hover:text-[#1A1A1A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali
            </Button>
          )}

          {isLast ? (
            <Button
              type="button"
              variant="coffee"
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
              variant="coffee"
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
