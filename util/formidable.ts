import express from "express";
import { Request,Response,NextFunction } from "express";
import formidable from "formidable";
export const uploadDir = "uploads";

export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles:1,
    maxFileSize: 10*1024**3,
    filter:(part)=> part.mimetype?.startsWith("image")||false,

});

export function formParsePromise(req:Request){
    return new Promise<any>((resolve,reject)=>{
        form.parse(req,(err,fields,files)=>{
            if(err){
                reject(err);
                return;
             }
             resolve({
                fields,
                files,
             });
        });
    });
}