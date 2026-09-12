import React from "react";
import { Plus, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectFaqBuilder({ faqs = [], onChange, isCollapsed, onToggleCollapse }) {
  const addFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    onChange(faqs.filter((_, idx) => idx !== index));
  };

  const updateFaq = (index, key, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border space-y-3">
      {/* Collapsible Header */}
      <div className="flex items-center justify-between cursor-pointer select-none" onClick={onToggleCollapse}>
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono flex items-center gap-1.5">
            <HelpCircle size={15} /> 4. Project Specific FAQs ({faqs.length})
          </h4>
          <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
            {isCollapsed ? "Collapsed" : "Expanded"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addFaq();
              }}
              size="sm"
              variant="outline"
              className="h-7 text-xs border-accent/40 text-accent hover:bg-accent/10 gap-1"
            >
              <Plus size={13} /> Add FAQ Field
            </Button>
          )}
          <button
            type="button"
            className="p-1 rounded-md text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Add custom questions and answers for this specific case study.
      </p>

      {/* Content body when NOT collapsed */}
      {!isCollapsed && (
        <div className="space-y-3 pt-2">
          {faqs.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-border rounded-xl text-muted-foreground text-xs space-y-2">
              <p>No FAQs added yet for this project.</p>
              <Button
                type="button"
                onClick={addFaq}
                variant="outline"
                size="sm"
                className="text-accent text-xs h-8 border-accent/30 gap-1"
              >
                <Plus size={13} /> Add First FAQ
              </Button>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={index}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-border/80 shadow-2xs space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-accent uppercase font-mono">
                    FAQ #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                    title="Remove this FAQ"
                  >
                    <X size={14} />
                  </button>
                </div>

                <Input
                  placeholder="Question: e.g. Is internet required to run converters?"
                  value={faq.question || ""}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  className="text-xs font-medium"
                />

                <Textarea
                  rows={2}
                  placeholder="Answer: e.g. No, all conversions execute locally on the device with zero cloud exposure."
                  value={faq.answer || ""}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  className="text-xs text-slate-700 dark:text-slate-300"
                />
              </div>
            ))
          )}

          {faqs.length > 0 && (
            <Button
              type="button"
              onClick={addFaq}
              size="sm"
              variant="ghost"
              className="w-full border border-dashed border-border hover:border-accent text-xs text-muted-foreground hover:text-accent gap-1 mt-2 h-8"
            >
              <Plus size={13} /> Add Another FAQ
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
