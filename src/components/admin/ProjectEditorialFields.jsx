import React from "react";
import { ChevronDown, ChevronUp, FileText, Sparkles, TrendingUp, Award, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectEditorialFields({
  formData,
  onChange,
  isCollapsed,
  onToggleCollapse,
}) {
  const updateField = (key, value) => {
    onChange({ ...formData, [key]: value });
  };

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border space-y-3">
      {/* Collapsible Section Header */}
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono flex items-center gap-1.5">
            <FileText size={15} /> 3. Case Study Editorial Content (Directly Updates Details Page)
          </h4>
          <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
            {isCollapsed ? "Collapsed" : "Expanded"}
          </span>
        </div>

        <button
          type="button"
          className="p-1 rounded-md text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Control the exact narrative on the Details page: Approach, Overview, Key Features, ROI, and What They Gained.
      </p>

      {/* Content Form when NOT collapsed */}
      {!isCollapsed && (
        <div className="space-y-4 pt-2">
          {/* 1. Approach & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <Sparkles size={13} className="text-accent" /> Approach Narrative
              </Label>
              <Textarea
                rows={3}
                value={formData.approach || ""}
                onChange={(e) => updateField("approach", e.target.value)}
                placeholder="Explain the engineering approach, cloud migration framework, or pipeline..."
                className="text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <FileText size={13} className="text-accent" /> Overview Narrative
              </Label>
              <Textarea
                rows={3}
                value={formData.overview || ""}
                onChange={(e) => updateField("overview", e.target.value)}
                placeholder="High-level overview of how DVI engineered solutions for the client..."
                className="text-xs mt-1"
              />
            </div>
          </div>

          {/* 2. Key Features vs Return on Investment (ROI) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <Layers size={13} className="text-accent" /> Key Features (One bullet per line)
              </Label>
              <Textarea
                rows={3}
                value={formData.key_features || ""}
                onChange={(e) => updateField("key_features", e.target.value)}
                placeholder="Zero-cloud offline stream parser guaranteeing client privacy.&#10;Court-admissible Bates numbering engine.&#10;Multi-core batch conversion support."
                className="text-xs font-mono mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <TrendingUp size={13} className="text-emerald-600" /> Return Of Investment (ROI) (One bullet per line)
              </Label>
              <Textarea
                rows={3}
                value={formData.roi_metrics || ""}
                onChange={(e) => updateField("roi_metrics", e.target.value)}
                placeholder="Sub-80ms low latency query response.&#10;Zero data loss SLA maintained.&#10;45% reduction in recurring cloud costs."
                className="text-xs font-mono mt-1"
              />
            </div>
          </div>

          {/* 3. What They Gained & Architecture Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <Award size={13} className="text-amber-500" /> What They Gained (One bullet per line)
              </Label>
              <Textarea
                rows={3}
                value={formData.what_they_gained || ""}
                onChange={(e) => updateField("what_they_gained", e.target.value)}
                placeholder="Future-ready cloud ecosystem.&#10;Streamlined operations with real-time telemetry.&#10;Enhanced customer trust."
                className="text-xs font-mono mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold flex items-center gap-1">
                <Layers size={13} className="text-blue-500" /> Technical Architecture Details
              </Label>
              <Textarea
                rows={3}
                value={formData.architecture_details || ""}
                onChange={(e) => updateField("architecture_details", e.target.value)}
                placeholder="Deep technical breakdown: C++ addons, streaming pipelines, caching layers, database schemas..."
                className="text-xs mt-1"
              />
            </div>
          </div>

          {/* 4. Key Highlights (for portfolio card previews) */}
          <div>
            <Label className="text-xs font-semibold">Key Highlights (Card summary points - One per line)</Label>
            <Textarea
              rows={2}
              value={formData.key_highlights || ""}
              onChange={(e) => updateField("key_highlights", e.target.value)}
              placeholder="100% Offline Processing&#10;Multi-Threaded Conversion Engine&#10;Court-Admissible Bates Numbering"
              className="text-xs font-mono mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
