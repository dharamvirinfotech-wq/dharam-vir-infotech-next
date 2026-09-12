import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { caseStudiesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function ProjectImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size cannot exceed 10MB.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await caseStudiesApi.uploadImage(formData);
      if (res?.url) {
        onChange(res.url);
        toast({
          title: "Image Uploaded",
          description: "Cover showcase image uploaded successfully.",
        });
      }
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: err?.response?.data?.message || err?.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold">Cover / Showcase Image</Label>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Preview Thumbnail */}
        <div className="relative w-24 h-16 rounded-xl border border-border overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
          {value ? (
            <img
              src={value}
              alt="Project Cover Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          ) : (
            <ImageIcon size={20} className="text-muted-foreground/50" />
          )}
        </div>

        {/* Input & Upload Button */}
        <div className="flex-1 w-full space-y-1.5">
          <div className="flex gap-2">
            <Input
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. /portfolio/windowsutils.jpg or upload below"
              className="text-xs font-mono"
            />
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange("")}
                className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
                title="Clear image"
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
              id="portfolio-cover-file-input"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="h-7 text-[11px] gap-1.5 border-dashed border-accent/40 text-accent hover:bg-accent/10"
            >
              {uploading ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={12} /> Upload Image from Computer
                </>
              )}
            </Button>
            <span className="text-[10px] text-muted-foreground">
              Supports PNG, JPG, WebP up to 10MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
