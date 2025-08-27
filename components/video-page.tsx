// @ts-nocheck

'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { Button } from './ui/button'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Loader2, PlusCircle, X } from 'lucide-react'
import { Input } from './ui/input'
import { useSession } from 'next-auth/react'
import { API_ENDPOINT, BASE_URL } from '@/config/api-endpoint'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
  
  interface VideoData {
    videoSrc: string
    thumbnailSrc: string
    thumbnailAlt: string
  }
  
  interface FormData {
    title: string
    videoData: VideoData[],
    titleId?: string
  }


export default function VideoTable({apiResponse}:{apiResponse:any[]}) {
  const [showInactive, setShowInactive] = useState(false)
  const router =  useRouter()
  const [loader,setLoader] = useState(false)
  const  [openDialog,setOpenDialog] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    videoData: [{ videoSrc: '', thumbnailSrc: '', thumbnailAlt: '' }]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target
    if (index !== undefined) {
      const newVideoData = [...formData.videoData]
      newVideoData[index] = { ...newVideoData[index], [name]: value }
      setFormData({ ...formData, videoData: newVideoData })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const addMoreVideoData = () => {
    setFormData({
      ...formData,
      videoData: [...formData.videoData, { videoSrc: '', thumbnailSrc: '', thumbnailAlt: '' }]
    })
  }

  const removeVideoData = (index: number) => {
    const newVideoData = formData.videoData.filter((_, i) => i !== index)
    setFormData({ ...formData, videoData: newVideoData })
  }

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINT.youtubeVideo}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setOpenDialog(false)
        router.refresh();
        toast.success("Video Added Successfully");
      } else {
        toast.error(data.error || "Failed to submit data");
      }
    } catch (error) {
      toast.error("Error submitting data");
    } finally {
      setLoader(false);
    }
  };

  const handleVideoActiveDeactive=async (id:string)=>{
    setLoader(true)
    const bData = { id }
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINT.youtubeVideo}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bData),
      })
      if (response.ok) {
          router.refresh()
      } else {
          router.refresh()
      }
    } catch (error) {
      router.refresh()
    } finally{
      setLoader(false)
    }
  }

  if(loader){
    return(
        <div className='flex h-[40rem] justify-center items-center'>
            <Loader2 className='animate-spin'/>
        </div>
    )
  }

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`${BASE_URL}${API_ENDPOINT.youtubeVideo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("Video deleted successfully");
        router.refresh()
      } else {
        router.refresh()
        toast.error("Failed to delete video");
      }
    } catch (err) {
      router.refresh()
      toast.error("Error deleting video");
    }
  };


  return (
    <>
      <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-x-2 mb-4">
          <div className='flex items-center gap-3'>
              <Switch
              id="show-inactive"
              checked={showInactive}
              onCheckedChange={setShowInactive}
              />
              <Label htmlFor="show-inactive">Show Inactive Videos</Label>
          </div>
      </div>
      {apiResponse.map((videoData) => (
          <div key={videoData.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{videoData.title}</h2>
          <Table className='border'>
              <TableHeader>
              <TableRow>
                  <TableHead className="w-[100px]">Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Video Source</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {videoData.video.filter(video => showInactive || video.isActive).map((video) => (
                  <TableRow key={video.id}>
                      <TableCell>
                      <img 
                        className='h-full w-full rounded-md' 
                        src={video.thumbnailSrc}
                        alt={video.thumbnailAlt}
                      />
                      </TableCell>
                      <TableCell className="font-medium">{video.thumbnailAlt}</TableCell>
                      <TableCell>
                      <a
                          href={video.videoSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                      >
                          {video.videoSrc}
                      </a>
                      </TableCell>
                      <TableCell className="text-center">
                      <Button asChild variant={"outline"}>
                      {video.isActive ? (
                          <span className="text-green-500 cursor-pointer" onClick={()=>handleVideoActiveDeactive(video.id)}>Active</span>
                      ) : (
                          <span className="text-red-500 cursor-pointer" onClick={()=>handleVideoActiveDeactive(video.id)}>Inactive</span>
                      )}
                      </Button>
                      </TableCell>
                      <TableCell className="text-center">
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
          </Table>

          <Button
            variant="destructive"
            className='mt-2'
            onClick={() => {
              setFormData({ 
              title: videoData.title, 
              videoData: [{ videoSrc: '', thumbnailSrc: '', thumbnailAlt: '' }],
              titleId: videoData.id
            })
            setOpenDialog(true)
            }}
          >
            Add Video to {videoData.title}
          </Button>
          </div>
      ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
              <Button variant="outline">Add Video Data</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl overflow-auto max-h-[40rem]">
              <DialogHeader>
              <DialogTitle>Add Video Data</DialogTitle>
              <DialogDescription>
                  Enter the video details below. Click the plus button to add more videos.
              </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="">Title</Label>
                  <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
              </div>
              {formData.videoData.map((video, index) => (
                  <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Video {index + 1}</h4>
                          {index > 0 && (
                          <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeVideoData(index)}
                          >
                              <X className="h-4 w-4" />
                          </Button>
                          )}
                      </div>

                      <div className="grid grid-cols-4 items-center gap-1">
                          <Label htmlFor={`videoSrc-${index}`} className="">Video Src</Label>
                          <Input
                              id={`videoSrc-${index}`}
                              name="videoSrc"
                              value={video.videoSrc}
                              onChange={(e) => handleInputChange(e, index)}
                              className="col-span-3"
                          />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-1">
                          <Label htmlFor={`thumbnailSrc-${index}`} className="">Thumbnail Src</Label>
                          <Input
                              id={`thumbnailSrc-${index}`}
                              name="thumbnailSrc"
                              value={video.thumbnailSrc}
                              onChange={(e) => handleInputChange(e, index)}
                              className="col-span-3"
                          />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-1">
                          <Label htmlFor={`thumbnailAlt-${index}`} className="">Thumbnail Alt</Label>
                          <Input
                              id={`thumbnailAlt-${index}`}
                              name="thumbnailAlt"
                              value={video.thumbnailAlt}
                              onChange={(e) => handleInputChange(e, index)}
                              className="col-span-3"
                          />
                      </div>

                  </div>
              ))}
              </div>
              <DialogFooter className="sm:justify-between">
                  <Button type="button" variant="outline" onClick={addMoreVideoData}><PlusCircle className="mr-2 h-4 w-4" />Add More Video</Button>
                  <Button type="button" onClick={handleSubmit}>Submit</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  )
}

