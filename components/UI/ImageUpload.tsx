"use client";

import { useMutation } from "convex/react";
import { Camera, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";

interface ImageUploadProps {
  currentImage?: string;
  onImageUpdate: (storageId: string) => void;
  size?: "small" | "medium" | "large";
  isEditing?: boolean;
  resetTrigger?: number;
}

export const ImageUpload = ({
  currentImage,
  onImageUpdate,
  size = "medium",
  isEditing = false,
  resetTrigger,
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.users.generateUploadUrl);

  useEffect(() => {
    if (resetTrigger) {
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [resetTrigger]);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-40 h-40",
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);

      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await result.json();

      setPreviewUrl(URL.createObjectURL(file));

      onImageUpdate(storageId);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className="relative inline-block group">
      <div
        className={`${
          sizeClasses[size]
        } bg-gray-100 flex items-center justify-center  border  border-gray-300 rounded-full relative transition-all duration-200 ${
          isEditing ? "cursor-pointer group-hover:border-gray-400" : ""
        }`}
        onClick={isEditing ? () => fileInputRef.current?.click() : undefined}
      >
        {displayImage ? (
          <div className="w-full h-full relative ">
            <Image
              src={displayImage}
              alt="Profile"
              className="w-full h-full group-hover:animate-pulse object-cover rounded-full transition-transform invert duration-200 group-hover:scale-110"
              width={200}
              height={200}
            />
            <Image
              src={displayImage}
              alt="Profile"
              className="w-full absolute  inset-0 h-full rounded-full object-cover transition-transform duration-200 "
              width={200}
              height={200}
              priority
            />
          </div>
        ) : (
          <Camera
            className={`${
              size === "small"
                ? "w-6 h-6"
                : size === "medium"
                ? "w-12 h-12"
                : "w-20 h-20"
            } text-gray-400 transition-colors duration-200 group-hover:text-gray-600`}
          />
        )}

        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded-full">
            <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        )}
      </div>

      {isEditing && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      )}
    </div>
  );
};
