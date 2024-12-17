"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AdminEmailSection() {
  const [htmlContent, setHtmlContent] = useState("");
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
        setHtmlContent(data[0].htmlContent);
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
      setHtmlContent(editingContent);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HTML Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              rows={20}
              className="w-full"
              placeholder="Enter your HTML here..."
            />
            <Button onClick={saveContent} className="mt-4" disabled={isSaving}>
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
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border p-4 min-h-[200px] prose max-w-none"
              dangerouslySetInnerHTML={{ __html: editingContent }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
