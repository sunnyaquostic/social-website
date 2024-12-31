"use client"
import { useState } from "react"
import Image from "./Image"
import NextImage  from "next/image"
import { shareAction } from "@/actions"
import ImageEditor from "./imageEditor"

const Share = () => {
    const [media, setMedia] = useState<File | null>(null)
    const [isEditorOpened, setIsEditorOpened] = useState(false)
    const [settings, setSettings] = useState<{
        type: "original" | "wide" | "square";
        sensitive: boolean;
    }>({
        type: "original",
        sensitive: false,
    })

    const handleMediaChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMedia(e.target.files[0])
        }
    }

    const previewURL = media ? URL.createObjectURL(media) : null;

    return (
        <form className="p-4 flex gap-4" action={((formDdata) => shareAction(formDdata, settings))}>
            {/* AVATAR */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image path="general/avatar.png"  alt="" w={100} h={100} tr={true}/>
            </div>

            {/* OTHERS */}
            <div className="flex-1 flex flex-col gap-4">
                <input 
                    type="text" 
                    name="desc"
                    placeholder="what is happening?!" 
                    className="bg-transparent outline-none placeholder:text-textGray text-xl"
                />
                {
                    //  preview image
                    media?.type.includes("image") && previewURL && (<div className="relative rounded-xl overflow-hidden">
                        <NextImage 
                            src={previewURL} 
                            alt="" 
                            width={600} 
                            height={600} 
                            className={`w-full ${settings.type === 'original' 
                                ? 'h-full object-contain'
                                : settings.type === 'square' 
                                ? 'aspect-square object-cover'
                                : 'aspect-video object-cover'
                            }`}
                        />
                        <div 
                            onClick={() => setIsEditorOpened(true)}
                            className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-black text-sm cursor-pointer"
                        >
                            Edit
                        </div>
                        <div 
                            onClick={() => setMedia(null)}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
                        >
                            X
                        </div>
                    </div>
                )}

                {
                    media?.type.includes("video") && previewURL && (
                        <div className="relative">
                            <video src={previewURL} controls/>
                            <div 
                                onClick={() => setMedia(null)}
                                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
                            >
                                X
                            </div>
                        </div>
                    )
                }

                {
                    isEditorOpened && previewURL && (
                    <ImageEditor 
                        onClose={() => setIsEditorOpened(false)}
                        previewURL={previewURL} 
                        settings={settings}
                        setSettings={setSettings}
                        
                    />)
                }
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex gap-4 flex-wrap">
                        <input 
                            type="file" 
                            name="file"
                            onChange={handleMediaChange} 
                            className="hidden" 
                            id="file" 
                            accept="image/*,video/*"
                        />
                        <label htmlFor="file">
                            <Image path="icons/image.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                        </label>
                        <Image path="icons/gif.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                        <Image path="icons/poll.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                        <Image path="icons/emoji.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                        <Image path="icons/schedule.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                        <Image path="icons/location.svg" alt="" w={20} h={20} classname="cursor-pointer" />
                    </div>

                    <button className="bg-white text-black font-bold rounded-full py-2 px-4">Post</button>
                </div>
            </div>

        </form>
    )
}

export default Share