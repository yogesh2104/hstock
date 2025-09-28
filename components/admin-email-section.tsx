"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import MinimalTiptapEditor from "./editor/rich-editor";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminEmailSection() {
  const [editingContent, setEditingContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [id,setId] = useState(null)

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/feature-sections");
      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();
      if (data.length > 0) {
        setId(data[0].id)
        setEditingContent(data[0].htmlContent);
      }
    } catch (err) {
      setError("Failed to load content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/feature-sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent: editingContent, id }),
      });
      if (!res.ok) throw new Error("Failed to save content");
      toast.success("Content Save Successfully")
      fetchContent();
    } catch (err) {
      setError("Failed to save content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardContent className="p-1">
          <MinimalTiptapEditor
            value={editingContent}
            throttleDelay={3000}
            className={cn('overflow-auto min-h-56 w-full rounded-xl')}
            editorContentClassName="overflow-auto"
            output="json"
            onChange={(value) => setEditingContent(value as string)}
            placeholder="This is your placeholder..."
            editable={true}
            editorClassName="focus:outline-none px-5 py-4 h-full"
          />
          <Button onClick={saveContent} className="w-72 mt-4" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
