// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import MinimalTiptapEditor from "./editor/rich-editor";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// export default function AdminEmailSection() {
//   const [editingContent, setEditingContent] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [id,setId] = useState(null)

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       const res = await fetch("/api/feature-sections");
//       if (!res.ok) throw new Error("Failed to fetch content");
//       const data = await res.json();
//       console.log("data",data)
//       if (data.length > 0) {
//         setId(data[0].id)
//         setEditingContent(data[0].htmlContent);
//       }
//     } catch (err) {
//       setError("Failed to load content. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveContent = async () => {
//     setIsSaving(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/feature-sections", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ htmlContent: editingContent, id }),
//       });
//       if (!res.ok) throw new Error("Failed to save content");
//       toast.success("Content Save Successfully")
//       fetchContent();
//     } catch (err) {
//       setError("Failed to save content. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto">
//       <Card>
//         <CardContent className="p-1">
//           <MinimalTiptapEditor
//             value={editingContent}
//             throttleDelay={3000}
//             className={cn('overflow-auto min-h-56 w-full rounded-xl')}
//             editorContentClassName="overflow-auto"
//             output="json"
//             onChange={(value) => setEditingContent(value as string)}
//             placeholder="This is your placeholder..."
//             editable={true}
//             editorClassName="focus:outline-none px-5 py-4 h-full"
//           />
//           <Button onClick={saveContent} className="w-72 mt-4" disabled={isSaving}>
//             {isSaving ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save"
//             )}
//           </Button>
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Loader2, Plus } from "lucide-react";
// import MinimalTiptapEditor from "./editor/rich-editor";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// type EmailTemplate = {
//   id?: string;
//   emailTitle: string;
//   content: any;
//   htmlContent?: string;
// };

// export default function AdminEmailSection() {
//   const [emails, setEmails] = useState<EmailTemplate[]>([]);
//   const [activeTab, setActiveTab] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       const res = await fetch("/api/feature-sections");
//       if (!res.ok) throw new Error("Failed to fetch content");
//       const data = await res.json();

//       const formatted = data.map((item: any) => ({
//         id: item.id,
//         emailTitle: item.emailTitle,
//         htmlContent: item.htmlContent,
//       }));

//       setEmails(formatted);
//       if (formatted.length > 0) {
//         setActiveTab(formatted[0].id);
//       }
//     } catch (err) {
//       setError("Failed to load content. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveContent = async (template: EmailTemplate) => {
//     const raw = JSON.stringify({
//       id: template.id,
//       emailTitle: template.emailTitle,
//       content: template.content,
//     })
//     setIsSaving(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/feature-sections", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: raw,
//       });
//       if (!res.ok) throw new Error("Failed to save content");
//       toast.success("Content saved successfully");
//       fetchContent();
//     } catch (err) {
//       setError("Failed to save content. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const addNewEmail = () => {
//     const newEmail: EmailTemplate = {
//       emailTitle: `New Email ${emails.length + 1}`,
//       content: { type: "doc", content: [] },
//     };
//     setEmails((prev) => [...prev, newEmail]);
//     setActiveTab(newEmail.emailTitle);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto">
//       <Card>
//         <CardContent className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Email Templates</h2>
//             <Button variant="outline" onClick={addNewEmail}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add New Email
//             </Button>
//           </div>

//           <Tabs
//             value={activeTab ?? ""}
//             onValueChange={(val) => setActiveTab(val)}
//           >
//             <TabsList className="flex flex-wrap gap-2">
//               {emails.map((email) => (
//                 <TabsTrigger key={email.id ?? email.emailTitle} value={email.id ?? email.emailTitle}>
//                   {email.emailTitle}
//                 </TabsTrigger>
//               ))}
//             </TabsList>

//             {emails.map((email, index) => (
//               <TabsContent
//                 key={email.id ?? index}
//                 value={email.id ?? email.emailTitle}
//               >
//                 <div className="mt-4 space-y-4">
//                   <Input
//                     value={email.emailTitle}
//                     onChange={(e) => {
//                       const newEmails = [...emails];
//                       newEmails[index].emailTitle = e.target.value;
//                       setEmails(newEmails);
//                     }}
//                     placeholder="Email Title"
//                   />

//                   <MinimalTiptapEditor
//                     value={email.htmlContent}
//                     throttleDelay={2000}
//                     className={cn("overflow-auto min-h-56 w-full rounded-xl")}
//                     editorContentClassName="overflow-auto"
//                     output="json"
//                     onChange={(value) => {
//                       const newEmails = [...emails];
//                       newEmails[index].content = value; 
//                       setEmails(newEmails);
//                     }}
//                     placeholder="Write email content..."
//                     editable={true}
//                     editorClassName="focus:outline-none px-5 py-4 h-full"
//                   />

//                   <Button
//                     onClick={() => saveContent(email)}
//                     className="w-40"
//                     disabled={isSaving}
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save"
//                     )}
//                   </Button>
//                   {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//               </TabsContent>
//             ))}
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import MinimalTiptapEditor from "./editor/rich-editor";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type EmailTemplate = {
  id: string;
  emailTitle: string;
  content: any;
  htmlContent?: string;
};

function generateId() {
  try {
    // @ts-ignore - some envs may not have this typed
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  } catch {
    return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}

export default function AdminEmailSection() {
  const [emails, setEmails] = useState<EmailTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/feature-sections");
      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();

      const formatted: EmailTemplate[] = data.map((item: any) => ({
        id: item.id ?? generateId(),
        emailTitle: item.emailTitle ?? "Untitled",
        content: item.htmlContent ?? "", // editor expects HTML
      }));

      setEmails(formatted);
      if (formatted.length > 0) {
        setActiveTab(formatted[0].id);
      } else {
        setActiveTab(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (template: EmailTemplate) => {
    setIsSaving(true);
    setError(null);
    try {
      const raw = JSON.stringify({
        emailTitle: template.emailTitle,
        htmlContent: template.content,
      });

      const res = await fetch("/api/feature-sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      });

      if (!res.ok) throw new Error("Failed to save content");
      toast.success("Content saved successfully");
      await fetchContent();
    } catch (err) {
      console.error(err);
      setError("Failed to save content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };


  const addNewEmail = () => {
    const newEmail: EmailTemplate = {
      id: generateId(),
      emailTitle: `New Email ${emails.length + 1}`,
      content: "", // empty HTML
    };
    setEmails((prev) => [...prev, newEmail]);
    setActiveTab(newEmail.id);
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
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button variant="outline" onClick={addNewEmail}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Email
            </Button>
          </div>

          <Tabs value={activeTab ?? ""} onValueChange={(val) => setActiveTab(val)}>
            <TabsList className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <TabsTrigger key={email.id} value={email.id}>
                  {email.emailTitle}
                </TabsTrigger>
              ))}
            </TabsList>

            {emails.map((email, index) => (
              <TabsContent key={email.id} value={email.id}>
                <div className="mt-4 space-y-4">
                  <Input
                    value={email.emailTitle}
                    onChange={(e) => {
                      const newEmails = [...emails];
                      newEmails[index] = {
                        ...newEmails[index],
                        emailTitle: e.target.value,
                      };
                      setEmails(newEmails);
                    }}
                    placeholder="Email Title"
                  />

                  <MinimalTiptapEditor
                    value={email.content} // pass editor JSON content
                    throttleDelay={2000}
                    className={cn("overflow-auto min-h-56 w-full rounded-xl")}
                    editorContentClassName="overflow-auto"
                    output="html"
                    onChange={(value) => {
                      const newEmails = [...emails];
                      newEmails[index] = { ...newEmails[index], content: value };
                      setEmails(newEmails);
                    }}
                    // onChange={(value) => {
                    //   const newEmails = [...emails];
                    //   newEmails[index] = {
                    //     ...newEmails[index],
                    //     content: value,
                    //   };
                    //   setEmails(newEmails);
                    // }}
                    placeholder="Write email content..."
                    editable={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full"
                  />

                  <Button onClick={() => saveContent(email)} className="w-40" disabled={isSaving}>
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
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
