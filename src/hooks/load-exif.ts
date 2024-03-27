"use server";

import { photoLoad } from "@/actions/loadPhotos";
import exifr from 'exifr';
import axios from 'axios';
import { db } from "@/lib/db";
import { uploadExifData } from "@/actions/uploadExifData";


export interface ExifData {
    Make: string;
    Model: string;
    XResolution: number;
    YResolution: number;
    ResolutionUnit: string;
    Software: string;
    ModifyDate: string;
    ExposureTime: number;
    FNumber: number;
    ExposureProgram: string;
    ISO: number;
    SensitivityType: number;
    RecommendedExposureIndex: number;
    ExifVersion: string;
    DateTimeOriginal: string;
    CreateDate: Date;
    OffsetTime: string;
    ShutterSpeedValue: number;
    ApertureValue: number;
    ExposureCompensation: number;
    MaxApertureValue: number;
    MeteringMode: string;
    Flash: string;
    FocalLength: number;
    SubSecTimeOriginal: string;
    SubSecTimeDigitized: string;
    ColorSpace: number;
    FocalPlaneXResolution: number;
    FocalPlaneYResolution: number;
    FocalPlaneResolutionUnit: string;
    CustomRendered: string;
    ExposureMode: string;
    WhiteBalance: string;
    SceneCaptureType: string;
    SerialNumber: string;
    LensInfo: [number, number, null | number, null | number];
    LensModel: string;
    LensSerialNumber: string;
  }
  

export const loadExif = async (id : string) => {
    const photo = await photoLoad(id);
    
    const response = await axios.get(photo.path,  { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, "utf-8")
    
    
    if (buffer) {
        const exifData : ExifData = await exifr.parse(buffer)
        const data = uploadExifData(id, exifData);
        return data;
    } 
}

export const loadExifBuffer = async (buffer? : Buffer) => {    
    if (buffer) {
        const exifData : ExifData = await exifr.parse(buffer)
        return exifData;
    } 
}

export const loadExifDatabase = async (id : string) => {
    const metadata = await db.metadata.findMany({
        where: {
            photoId: id
        }
    })
    if (metadata) {
        return metadata[0];
    }
}